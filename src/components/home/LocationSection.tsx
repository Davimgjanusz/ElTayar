"use client";

import { useInView } from "framer-motion";
import { GraduationCap, HeartPulse, ShoppingBag, TrainFront, Trees, type LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { KALIL_ADDRESS, KALIL_TITLE, kalilCoordinates, kalilPointsOfInterest } from "@/data/kalil";
import type { PoiCategory } from "@/types";

const LocationMap = dynamic(() => import("@/components/home/LocationMap"), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse bg-slate-100" />,
});

const categoryIcon: Record<PoiCategory, LucideIcon> = {
  transporte: TrainFront,
  educacao: GraduationCap,
  saude: HeartPulse,
  compras: ShoppingBag,
  lazer: Trees,
};

export function LocationSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const mapSlotRef = useRef<HTMLDivElement>(null);
  const shouldLoadMap = useInView(mapSlotRef, { once: true, margin: "400px" });

  return (
    <section id="localizacao" className="py-20 sm:py-24">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Localização" title="Comodidades ao alcance de uma caminhada">
          {KALIL_ADDRESS}.
        </SectionHeading>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div>
            <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
              {kalilPointsOfInterest.map((point) => {
                const Icon = categoryIcon[point.category];
                const active = point.id === activeId;
                return (
                  <li key={point.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(point.id)}
                      aria-pressed={active}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                        active ? "bg-el-red-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="size-4 shrink-0 text-el-red-600" aria-hidden="true" />
                      <span className="flex-1 text-sm font-medium text-slate-900">{point.name}</span>
                      <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-600">
                        {point.travelTime}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-xs leading-relaxed">
              Tempos a pé estimados a partir da distância. Os círculos no mapa marcam 500 m e 1 km do
              edifício.
            </p>
          </div>

          <div
            ref={mapSlotRef}
            className="relative h-[24rem] overflow-hidden rounded-lg border border-slate-200 lg:h-auto lg:min-h-[32rem]"
          >
            {shouldLoadMap ? (
              <LocationMap
                origin={kalilCoordinates}
                originLabel={KALIL_TITLE}
                originAddress={KALIL_ADDRESS}
                points={kalilPointsOfInterest}
                activeId={activeId}
              />
            ) : (
              <div className="size-full bg-slate-100" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
