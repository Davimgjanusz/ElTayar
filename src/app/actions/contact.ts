"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import { KALIL_TITLE } from "@/data/kalil";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  contactSubmissionSchema,
  UNIT_INTEREST_LABEL,
  type ContactSubmission,
} from "@/lib/validations";
import type { LeadActionResult, LeadInsert } from "@/types";

function interestLabel(lead: ContactSubmission): string {
  return `${KALIL_TITLE} · ${UNIT_INTEREST_LABEL[lead.unitInterest]}`;
}

const PERIOD_LABEL = { manha: "Manhã", tarde: "Tarde" } as const;
const METHOD_LABEL = { email: "E-mail", whatsapp: "WhatsApp", ambos: "E-mail e WhatsApp" } as const;

/** Todo valor vindo do formulário passa por aqui antes de entrar no HTML do e-mail. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatVisitDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

function toLeadRow(lead: ContactSubmission): LeadInsert {
  const isVisit = lead.intent === "visita";
  return {
    full_name: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    property_interest: interestLabel(lead),
    intent: lead.intent,
    contact_method: lead.contactMethod,
    visit_date: isVisit ? lead.visitDate : null,
    visit_period: isVisit ? lead.visitPeriod : null,
    message: lead.message || null,
    consent_lgpd: lead.consentLgpd,
    utm_source: lead.utmSource || null,
    utm_medium: lead.utmMedium || null,
    utm_campaign: lead.utmCampaign || null,
  };
}

function buildEmailHtml(lead: ContactSubmission): string {
  const rows: [string, string][] = [
    ["Nome", lead.fullName],
    ["E-mail", lead.email],
    ["Telefone / WhatsApp", lead.phone],
    ["Interesse", interestLabel(lead)],
    ["Prefere retorno por", METHOD_LABEL[lead.contactMethod]],
  ];
  if (lead.intent === "visita") {
    rows.push(["Visita", `${formatVisitDate(lead.visitDate)} · ${PERIOD_LABEL[lead.visitPeriod]}`]);
  }
  rows.push(["Mensagem", lead.message || "Não informada"], ["Consentimento LGPD", "Confirmado"]);

  const origin = [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ");

  return `
    <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
      <h2 style="color: #E11D2A; margin-top: 0;">${lead.intent === "visita" ? "Novo agendamento de visita" : "Novo lead capturado no site"}</h2>
      <hr style="border: 0; border-top: 1px solid #e2e8f0;" />
      ${rows.map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join("")}
      <p style="font-size: 12px; color: #64748b; margin-top: 24px;">Origem: ${escapeHtml(origin || "Direto")}</p>
    </div>
  `;
}

async function sendNotification(lead: ContactSubmission): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_NOTIFICATION_EMAIL } =
    process.env;

  if (!SMTP_HOST || !SMTP_FROM || !CONTACT_NOTIFICATION_EMAIL) {
    console.error("SMTP não configurado: lead gravado sem notificação por e-mail.");
    return;
  }

  const port = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 10_000,
  });

  const kind = lead.intent === "visita" ? "Visita" : "Novo Lead Site";
  await transporter.sendMail({
    from: `"El Tayar Web" <${SMTP_FROM}>`,
    to: CONTACT_NOTIFICATION_EMAIL,
    replyTo: lead.email,
    subject: `[${kind}] ${lead.fullName} — ${interestLabel(lead)}`,
    html: buildEmailHtml(lead),
  });
}

export async function submitLead(data: unknown): Promise<LeadActionResult> {
  // O argumento de uma Server Action vem da rede: nada aqui é confiável antes do Zod.
  const parsed = contactSubmissionSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Revise os campos destacados.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const lead = parsed.data;

  // Robô preencheu o honeypot: responde sucesso e não grava nada.
  if (lead.website) return { success: true };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("Supabase não configurado: lead não foi gravado.");
    return {
      success: false,
      message: "Não foi possível enviar agora. Fale conosco pelo WhatsApp.",
    };
  }

  const { error: dbError } = await supabase.from("leads").insert(toLeadRow(lead));
  if (dbError) {
    console.error("Erro ao gravar lead no Supabase:", dbError.code, dbError.message);
    return { success: false, message: "Falha ao gravar os dados. Tente novamente." };
  }

  // O lead já está salvo: uma falha de SMTP não pode virar erro para o visitante.
  try {
    await sendNotification(lead);
  } catch (mailError) {
    console.error("Falha ao enviar e-mail de notificação:", mailError);
  }

  return { success: true };
}
