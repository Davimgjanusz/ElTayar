import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { company, navLinks } from "@/data/company";

const linkStyles = "text-sm text-slate-600 transition-colors hover:text-el-red-700";
const headingStyles = "font-display text-xs font-semibold uppercase tracking-[0.16em] text-slate-900";

export function Footer() {
  const { address } = company;

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Edifícios e residências desenvolvidos com rigor técnico, do projeto à entrega das chaves.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <h2 className={headingStyles}>Navegação</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={`/${link.href}`} className={linkStyles}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingStyles}>El Tayar</h2>
          <address className="mt-4 space-y-2.5 text-sm not-italic leading-relaxed">
            <p>
              {address.street}
              <br />
              {address.neighborhood}, {address.city} – {address.state}
              <br />
              CEP {address.postalCode}
            </p>
            <p>
              <a href={company.phoneHref} className={linkStyles}>
                {company.phoneDisplay}
              </a>
            </p>
          </address>
          {company.social.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-4">
              {company.social.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkStyles}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <h2 className={headingStyles}>Privacidade</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/politica-de-privacidade" className={linkStyles}>
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/politica-de-privacidade#direitos" className={linkStyles}>
                Seus direitos na LGPD
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-site flex-col gap-2 px-4 py-6 text-xs leading-relaxed sm:px-6 lg:flex-row lg:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {company.legalName} · CNPJ {company.cnpj} · {company.creci}
          </p>
          <p>Imagens e plantas ilustrativas. Metragens sujeitas a confirmação no memorial descritivo.</p>
        </div>
      </div>
    </footer>
  );
}
