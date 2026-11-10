"use client";

import { useInView } from "framer-motion";
import { Compass } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { BuildingPoster } from "@/components/3d/BuildingPoster";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const BuildingCanvas = dynamic(() => import("@/components/3d/BuildingCanvas"), {
  ssr: false,
  loading: () => <BuildingPoster />,
});

const VirtualTourViewer = dynamic(() => import("@/components/home/VirtualTourViewer"), {
  ssr: false,
});

export function Building3DSection() {
  const slotRef = useRef<HTMLDivElement>(null);
  const shouldLoadCanvas = useInView(slotRef, { once: true, margin: "300px" });
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <section id="tour" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto grid max-w-site items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionHeading eyebrow="Experiência 3D" title="Da fachada ao interior, sem sair de casa">
            Gire o modelo volumétrico do edifício e depois entre nos ambientes: sala, cozinha, suíte e
            banheiro.
          </SectionHeading>
          <button
            type="button"
            onClick={() => setTourOpen(true)}
            className={buttonStyles("primary", "mt-8 px-6 py-3.5")}
          >
            <Compass className="size-4" aria-hidden="true" />
            Explorar Interior em 3D / Tour Virtual
          </button>
        </div>

        <div
          ref={slotRef}
          className="relative h-[26rem] overflow-hidden rounded-lg border border-slate-200 sm:h-[30rem]"
        >
          {shouldLoadCanvas ? <BuildingCanvas /> : <BuildingPoster />}
        </div>
      </div>

      {tourOpen ? <VirtualTourViewer onClose={() => setTourOpen(false)} /> : null}
    </section>
  );
}
