import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/layout/Logo";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Política de Privacidade | El Tayar Empreendimentos",
  description: "Como a El Tayar trata os dados pessoais enviados pelo site, conforme a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

const sections = [
  {
    title: "Quais dados coletamos",
    body: "Nome, e-mail, telefone, empreendimento de interesse, mensagem, data desejada para visita e a origem da visita ao site (parâmetros UTM).",
  },
  {
    title: "Para que usamos",
    body: "Para responder ao seu contato, agendar visitas e enviar informações sobre os empreendimentos que você indicou. A base legal é o seu consentimento, registrado no envio do formulário.",
  },
  {
    title: "Com quem compartilhamos",
    body: "Os dados ficam em provedor de banco de dados contratado pela El Tayar e são acessados apenas pela equipe comercial. Não vendemos dados pessoais.",
  },
  {
    title: "Por quanto tempo guardamos",
    body: "Pelo tempo necessário ao atendimento ou até que você peça a exclusão, ressalvadas as obrigações legais de guarda.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="border-b border-stone-200">
        <div className="mx-auto flex h-[4.5rem] max-w-3xl items-center px-4 sm:px-6">
          <Link href="/" aria-label="Voltar à página inicial">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-4xl font-extrabold">Política de Privacidade</h1>
        <p className="mt-4 text-lg leading-relaxed">
          Esta política explica como a {company.legalName} trata os dados pessoais enviados por este
          site, em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).
        </p>
        {sections.map((section) => (
          <section key={section.title} className="mt-10">
            <h2 className="text-xl font-bold">{section.title}</h2>
            <p className="mt-2 leading-relaxed">{section.body}</p>
          </section>
        ))}
        <section id="direitos" className="mt-10">
          <h2 className="text-xl font-bold">Seus direitos</h2>
          <p className="mt-2 leading-relaxed">
            Você pode pedir acesso, correção, portabilidade ou exclusão dos seus dados e revogar o
            consentimento a qualquer momento pelo telefone{" "}
            <a href={company.phoneHref} className="font-medium text-slate-900 underline underline-offset-2">
              {company.phoneDisplay}
            </a>{" "}
            ou no endereço {company.address.street}, {company.address.neighborhood},{" "}
            {company.address.city} – {company.address.state}.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
