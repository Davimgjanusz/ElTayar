import { KALIL_TITLE } from "@/data/kalil";
import type { UtmParams } from "@/types";

export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5511999999999";

const MAX_MESSAGE_LENGTH = 1000;

interface WhatsAppLinkOptions {
  phone?: string;
  propertyTitle?: string;
  customMessage?: string;
  /** UTMs da visita atual, quando existirem. */
  utm?: UtmParams;
  /** Posição do botão na página (vira utm_content). */
  placement?: string;
}

/**
 * Monta um link wa.me com mensagem pré-preenchida e parâmetros UTM.
 *
 * O WhatsApp não repassa query strings ao atendente. Por isso a origem paga
 * também é escrita na própria mensagem: é assim que ela chega ao corretor.
 */
export function generateWhatsAppLink({
  phone = WHATSAPP_PHONE,
  propertyTitle = KALIL_TITLE,
  customMessage,
  utm,
  placement,
}: WhatsAppLinkOptions = {}): string {
  const defaultText = `Olá! Gostaria de receber mais informações e agendar uma visita ao *${propertyTitle}* que vi no site.`;

  const origin = [utm?.source, utm?.campaign].filter(Boolean).join(" / ");
  const text = [customMessage ?? defaultText, origin ? `(Origem: ${origin})` : ""]
    .filter(Boolean)
    .join("\n\n")
    .slice(0, MAX_MESSAGE_LENGTH);

  const params = new URLSearchParams({
    utm_source: utm?.source ?? "site",
    utm_medium: utm?.medium ?? "landing-page",
    utm_campaign: utm?.campaign ?? "kalil-321",
  });
  if (placement) params.set("utm_content", placement);

  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}&${params.toString()}`;
}
