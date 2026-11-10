"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useId, type ReactNode } from "react";
import { useForm, type FieldError, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import { submitLead } from "@/app/actions/contact";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/whatsapp-link";
import { company } from "@/data/company";
import { useUtm } from "@/lib/use-utm";
import {
  contactSubmissionSchema,
  todayInSaoPaulo,
  UNIT_INTEREST_LABEL,
  type ContactFormValues,
} from "@/lib/validations";
import { generateWhatsAppLink } from "@/lib/whatsapp";

const inputStyles =
  "mt-1.5 block w-full rounded-md border border-stone-200 bg-white px-3.5 py-3 text-base text-slate-900 transition-colors placeholder:text-slate-600/60 focus:border-slate-900 focus:outline-none aria-[invalid=true]:border-el-red-600 sm:text-sm";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: FieldError;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-slate-900">
        {label}
      </label>
      {children}
      {error?.message ? (
        <p id={`${id}-erro`} role="alert" className="mt-1.5 text-xs font-medium text-el-red-700">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

const describedBy = (id: string, error?: FieldError) => (error ? `${id}-erro` : undefined);

export function ContactForm() {
  const uid = useId();
  const utm = useUtm();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSubmissionSchema) as Resolver<ContactFormValues>,
    defaultValues: {
      intent: "contato",
      fullName: "",
      email: "",
      phone: "",
      contactMethod: "whatsapp",
      message: "",
      consentLgpd: false,
      website: "",
    },
  });

  const intent = watch("intent");
  const messageLength = watch("message")?.length ?? 0;
  const isVisit = intent === "visita";
  const fieldId = (name: string) => `${uid}-${name}`;

  async function onSubmit(values: ContactFormValues) {
    try {
      const result = await submitLead({
        ...values,
        utmSource: utm.source,
        utmMedium: utm.medium,
        utmCampaign: utm.campaign,
      });

      if (result.success) {
        toast.success(
          isVisit ? "Pedido de visita recebido. Vamos confirmar o horário." : "Mensagem recebida. Retornaremos em breve.",
        );
        reset();
        return;
      }

      if (result.errors) {
        for (const [name, messages] of Object.entries(result.errors)) {
          if (messages?.[0]) {
            setError(name as keyof ContactFormValues, { message: messages[0] });
          }
        }
      }
      toast.error(result.message ?? "Não foi possível enviar. Tente novamente.", {
        action: result.errors
          ? undefined
          : {
              label: "WhatsApp",
              onClick: () =>
                window.open(generateWhatsAppLink({ placement: "erro-formulario", utm }), "_blank", "noopener"),
            },
      });
    } catch {
      toast.error("Falha de conexão. Verifique sua internet e tente novamente.");
    }
  }

  const intentOptions = [
    { value: "contato", label: "Receber contato" },
    { value: "visita", label: "Agendar visita" },
  ] as const;

  const methodOptions = [
    { value: "whatsapp", label: "WhatsApp" },
    { value: "email", label: "E-mail" },
    { value: "ambos", label: "Ambos" },
  ] as const;

  const consentId = fieldId("consent");

  return (
    <section id="contato" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-site gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading eyebrow="Contato" title="Agende sua visita ao Edifício Kalil 321">
            Fale agora com um consultor pelo WhatsApp ou deixe seus dados para retornarmos.
          </SectionHeading>

          <WhatsAppLink placement="contato" className={buttonStyles("primary", "mt-8 px-6 py-3.5")}>
            <WhatsAppIcon />
            Chamar no WhatsApp
          </WhatsAppLink>

          <ul className="mt-10 space-y-4 border-t border-stone-200 pt-8 text-sm">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-el-red-600" aria-hidden="true" />
              <a href={company.phoneHref} className="font-medium text-slate-900 hover:text-el-red-600">
                {company.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-el-red-600" aria-hidden="true" />
              <span>
                {company.address.street}, {company.address.neighborhood}
                <br />
                {company.address.city} – {company.address.state}
              </span>
            </li>
          </ul>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-lg border border-stone-200 bg-white p-5 sm:p-8"
        >
          <fieldset>
            <legend className="sr-only">O que você deseja?</legend>
            <div className="grid grid-cols-2 gap-1 rounded-md bg-slate-100 p-1">
              {intentOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded px-3 py-2.5 text-center text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-el-red-600 ${
                    intent === option.value ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    className="sr-only"
                    {...register("intent", {
                      onChange: () => {
                        setValue("visitDate", undefined);
                        setValue("visitPeriod", undefined);
                      },
                    })}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field id={fieldId("nome")} label="Nome completo" error={errors.fullName}>
                <input
                  id={fieldId("nome")}
                  type="text"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={describedBy(fieldId("nome"), errors.fullName)}
                  className={inputStyles}
                  {...register("fullName")}
                />
              </Field>
            </div>

            <Field id={fieldId("email")} label="E-mail" error={errors.email}>
              <input
                id={fieldId("email")}
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={describedBy(fieldId("email"), errors.email)}
                className={inputStyles}
                {...register("email")}
              />
            </Field>

            <Field id={fieldId("telefone")} label="Telefone ou WhatsApp" error={errors.phone}>
              <input
                id={fieldId("telefone")}
                type="tel"
                autoComplete="tel"
                placeholder="(11) 90000-0000"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={describedBy(fieldId("telefone"), errors.phone)}
                className={inputStyles}
                {...register("phone")}
              />
            </Field>

            <div className="sm:col-span-2">
              <Field id={fieldId("interesse")} label="Planta de interesse" error={errors.unitInterest}>
                <select
                  id={fieldId("interesse")}
                  defaultValue=""
                  aria-invalid={Boolean(errors.unitInterest)}
                  aria-describedby={describedBy(fieldId("interesse"), errors.unitInterest)}
                  className={inputStyles}
                  {...register("unitInterest", {
                    setValueAs: (value: string) => value || undefined,
                  })}
                >
                  <option value="">Selecione</option>
                  {Object.entries(UNIT_INTEREST_LABEL).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {isVisit ? (
              <>
                <Field id={fieldId("data")} label="Data da visita" error={errors.visitDate}>
                  <input
                    id={fieldId("data")}
                    type="date"
                    min={todayInSaoPaulo()}
                    aria-invalid={Boolean(errors.visitDate)}
                    aria-describedby={describedBy(fieldId("data"), errors.visitDate)}
                    className={inputStyles}
                    {...register("visitDate")}
                  />
                </Field>
                <Field id={fieldId("periodo")} label="Período" error={errors.visitPeriod}>
                  <select
                    id={fieldId("periodo")}
                    defaultValue=""
                    aria-invalid={Boolean(errors.visitPeriod)}
                    aria-describedby={describedBy(fieldId("periodo"), errors.visitPeriod)}
                    className={inputStyles}
                    {...register("visitPeriod", {
                      setValueAs: (value: string) => value || undefined,
                    })}
                  >
                    <option value="">Selecione</option>
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                  </select>
                </Field>
              </>
            ) : null}
          </div>

          <fieldset>
            <legend className="text-sm font-medium text-slate-900">Prefere retorno por</legend>
            <div className="mt-2 flex flex-wrap gap-5">
              {methodOptions.map((option) => (
                <label key={option.value} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" value={option.value} className="size-4 accent-el-red-600" {...register("contactMethod")} />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <Field id={fieldId("mensagem")} label="Mensagem (opcional)" error={errors.message}>
            <textarea
              id={fieldId("mensagem")}
              rows={3}
              maxLength={600}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={describedBy(fieldId("mensagem"), errors.message)}
              className={`${inputStyles} resize-y`}
              {...register("message")}
            />
            <p className="mt-1 text-right text-xs tabular-nums">{messageLength}/600</p>
          </Field>

          {/* Honeypot: fora da tela e do teclado, só robôs preenchem. */}
          <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
            <label>
              Site
              <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </label>
          </div>

          <div>
            <label htmlFor={consentId} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
              <input
                id={consentId}
                type="checkbox"
                aria-invalid={Boolean(errors.consentLgpd)}
                aria-describedby={describedBy(consentId, errors.consentLgpd)}
                className="mt-0.5 size-4 shrink-0 accent-el-red-600"
                {...register("consentLgpd")}
              />
              <span>
                Autorizo a El Tayar a usar meus dados para entrar em contato sobre o Edifício Kalil 321,
                conforme a{" "}
                <Link
                  href="/politica-de-privacidade"
                  target="_blank"
                  className="font-medium text-slate-900 underline underline-offset-2"
                >
                  Política de Privacidade
                </Link>
                .
              </span>
            </label>
            {errors.consentLgpd?.message ? (
              <p id={`${consentId}-erro`} role="alert" className="mt-1.5 text-xs font-medium text-el-red-700">
                {errors.consentLgpd.message}
              </p>
            ) : null}
          </div>

          <button type="submit" disabled={isSubmitting} className={buttonStyles("primary", "w-full py-3.5")}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            {isSubmitting ? "Enviando..." : isVisit ? "Solicitar visita" : "Enviar mensagem"}
          </button>
        </form>
      </div>
    </section>
  );
}
