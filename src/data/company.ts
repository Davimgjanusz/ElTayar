/**
 * Dados corporativos em um único lugar.
 *
 * ANTES DE PUBLICAR, confirme os valores marcados com "CONFIRMAR" e troque os
 * marcados com "PROVISÓRIO". O CRECI é obrigatório em anúncios imobiliários.
 */
export const company = {
  shortName: "El Tayar",
  legalName: "El Tayar Empreendimentos Imobiliários Ltda",
  // CONFIRMAR: CNPJ, endereço e telefone vieram de diretório empresarial público.
  cnpj: "47.258.223/0004-60",
  phoneDisplay: "(11) 2281-9498",
  phoneHref: "tel:+551122819498",
  phoneE164: "+551122819498",
  address: {
    street: "Rua Antônio Guganis, 321",
    neighborhood: "Jardim São Paulo",
    city: "São Paulo",
    state: "SP",
    postalCode: "02044-110",
  },
  // PROVISÓRIO: número fictício.
  creci: "CRECI-J 00000",
  // Preencha com { label, href } para exibir no rodapé.
  social: [] as { label: string; href: string }[],
} as const;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const navLinks = [
  { href: "#edificio", label: "O Edifício" },
  { href: "#tour", label: "Tour 3D" },
  { href: "#plantas", label: "Plantas" },
  { href: "#video", label: "Vídeo" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
] as const;
