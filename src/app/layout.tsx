import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { MotionProvider } from "@/components/ui/motion-provider";
import { company, siteUrl } from "@/data/company";
import { KALIL_ADDRESS, KALIL_SUBTITLE, KALIL_TITLE, kalilCover } from "@/data/kalil";
import { WHATSAPP_PHONE } from "@/lib/whatsapp";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const title = `${KALIL_TITLE} | El Tayar Empreendimentos`;
const description = `${KALIL_SUBTITLE}. Apartamentos de 1 a 2 dormitórios com suíte e vagas privativas, prontos para morar. Conheça em 3D e agende sua visita.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "El Tayar Empreendimentos",
    title,
    description,
    images: [{ url: kalilCover.src, width: kalilCover.width, height: kalilCover.height, alt: kalilCover.alt }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${siteUrl}/#empresa`,
      name: company.legalName,
      url: siteUrl,
      telephone: company.phoneE164,
      image: `${siteUrl}${kalilCover.src}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        addressRegion: company.address.state,
        postalCode: company.address.postalCode,
        addressCountry: "BR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${WHATSAPP_PHONE}`,
        availableLanguage: "Portuguese",
      },
    },
    {
      "@type": "ApartmentComplex",
      "@id": `${siteUrl}/#edificio`,
      name: KALIL_TITLE,
      description: KALIL_SUBTITLE,
      url: `${siteUrl}/#edificio`,
      image: `${siteUrl}${kalilCover.src}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: KALIL_ADDRESS,
        addressCountry: "BR",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <MotionProvider>{children}</MotionProvider>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
