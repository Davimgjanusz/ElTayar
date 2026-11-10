import { ArrowRight, BedDouble, Car, MapPin, Bath } from "lucide-react";
import Image from "next/image";
import { SpecBadge, StatusBadge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/whatsapp-link";
import { KALIL_ADDRESS, KALIL_STATUS, KALIL_SUBTITLE, kalilCover } from "@/data/kalil";

/**
 * Server Component sem animação de entrada: título e imagem são o LCP da página
 * e precisam pintar assim que o HTML chega.
 */
export function HeroWhite() {
  return (
    <section id="inicio" className="bg-white">
      <div className="mx-auto grid max-w-site lg:min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 lg:px-8">
        <div className="flex flex-col justify-center px-4 pb-12 pt-28 sm:px-6 lg:px-0 lg:pb-16">
          <div>
            <StatusBadge>{KALIL_STATUS}</StatusBadge>
          </div>
          <h1 className="mt-6 text-6xl font-extrabold leading-[0.98] text-slate-900 sm:text-7xl xl:text-8xl">
            Edifício
            <br />
            Kalil <span className="text-el-red-600">321</span>
          </h1>
          <p className="mt-6 max-w-md text-xl leading-relaxed">{KALIL_SUBTITLE}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <SpecBadge icon={<BedDouble className="size-3.5" />}>1 a 2 dormitórios</SpecBadge>
            <SpecBadge icon={<Bath className="size-3.5" />}>Com suíte</SpecBadge>
            <SpecBadge icon={<Car className="size-3.5" />}>Vaga privativa</SpecBadge>
          </div>

          <p className="mt-5 flex items-center gap-1.5 text-sm">
            <MapPin className="size-4 shrink-0 text-el-red-600" aria-hidden="true" />
            {KALIL_ADDRESS}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contato" className={buttonStyles("primary", "px-6 py-3.5")}>
              Agendar visita
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <WhatsAppLink placement="hero" className={buttonStyles("outline", "px-6 py-3.5")}>
              <WhatsAppIcon />
              Falar no WhatsApp
            </WhatsAppLink>
          </div>
        </div>

        <div className="relative min-h-[26rem] lg:mt-24 lg:min-h-0">
          <div className="clip-gable absolute inset-0">
            <Image
              src={kalilCover.src}
              alt={kalilCover.alt}
              fill
              preload
              sizes="(min-width: 1312px) 640px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
