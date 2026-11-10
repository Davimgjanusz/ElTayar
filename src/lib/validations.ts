import { z } from "zod";

/** Data de hoje (AAAA-MM-DD) no fuso da operação comercial. */
export function todayInSaoPaulo(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export const UNIT_INTEREST_LABEL = {
  "1-dormitorio": "1 dormitório",
  "2-dormitorios": "2 dormitórios",
  indefinido: "Ainda não sei",
} as const;

/* Os limites de tamanho espelham as colunas de public.leads em schema.sql. */
const utmField = z.string().trim().max(80).optional();

const leadFields = {
  fullName: z
    .string()
    .trim()
    .min(3, "Por favor, digite seu nome completo.")
    .max(120, "Nome muito longo.")
    // eslint-disable-next-line no-control-regex
    .regex(/^[^\u0000-\u001F\u007F]+$/, "Nome inválido."),
  email: z
    .string()
    .trim()
    .max(160, "E-mail muito longo.")
    .pipe(z.email("Insira um endereço de e-mail válido.")),
  phone: z
    .string()
    .trim()
    .min(10, "Informe um telefone ou WhatsApp com DDD.")
    .max(30, "Telefone muito longo.")
    .regex(/^[\d\s()+-]+$/, "Formato de telefone inválido.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 13;
    }, "Informe um telefone ou WhatsApp com DDD."),
  unitInterest: z.enum(["1-dormitorio", "2-dormitorios", "indefinido"], {
    error: "Selecione a planta de seu interesse.",
  }),
  contactMethod: z.enum(["email", "whatsapp", "ambos"], {
    error: "Escolha como prefere ser contatado.",
  }),
  message: z
    .string()
    .trim()
    .max(600, "A mensagem deve conter no máximo 600 caracteres.")
    .optional(),
  consentLgpd: z.boolean().refine((value) => value === true, {
    message: "Você deve autorizar o contato para prosseguir.",
  }),
  utmSource: utmField,
  utmMedium: utmField,
  utmCampaign: utmField,
  /** Honeypot: fica oculto para pessoas e só é preenchido por robôs. */
  website: z.string().max(200).optional(),
};

/** Formulário de contato. */
export const leadFormSchema = z.object({
  intent: z.literal("contato"),
  ...leadFields,
});

/** Formulário de agendamento de visita. */
export const visitFormSchema = z.object({
  intent: z.literal("visita"),
  ...leadFields,
  visitDate: z
    .string({ error: "Escolha a data da visita." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Escolha a data da visita.")
    .refine((value) => value >= todayInSaoPaulo(), "Escolha uma data a partir de hoje."),
  visitPeriod: z.enum(["manha", "tarde"], {
    error: "Escolha o período da visita.",
  }),
});

/** União validada pela Server Action. */
export const contactSubmissionSchema = z.discriminatedUnion("intent", [
  leadFormSchema,
  visitFormSchema,
]);

export type LeadFormData = z.infer<typeof leadFormSchema>;
export type VisitFormData = z.infer<typeof visitFormSchema>;
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

/** Estado do formulário: os campos de visita só existem quando intent = "visita". */
export type ContactFormValues = Omit<LeadFormData, "intent"> & {
  intent: "contato" | "visita";
  visitDate?: string;
  visitPeriod?: "manha" | "tarde";
};
