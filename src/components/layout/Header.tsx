"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { buttonStyles } from "@/components/ui/button";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/whatsapp-link";
import { navLinks } from "@/data/company";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-site items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" aria-label="El Tayar Empreendimentos, voltar ao início">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-medium text-slate-900 transition-colors hover:text-el-red-600">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppLink placement="header" className={buttonStyles("primary", "max-sm:hidden")}>
            <WhatsAppIcon />
            Fale com um Consultor
          </WhatsAppLink>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="rounded-md p-2 text-slate-900 xl:hidden"
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu móvel"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-white xl:hidden"
          >
            <ul className="flex flex-col px-4 pb-5 sm:px-6">
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-stone-200 last:border-0">
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3.5 font-medium text-slate-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 sm:hidden">
                <WhatsAppLink placement="menu-mobile" className={buttonStyles("primary", "w-full")}>
                  <WhatsAppIcon />
                  Fale com um Consultor
                </WhatsAppLink>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
