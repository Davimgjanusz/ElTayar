"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FloorPlanDrawing } from "@/components/home/FloorPlanDrawing";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, tabId, tabPanelId } from "@/components/ui/tabs";
import { kalilFloorPlans } from "@/data/kalil";

const ID_PREFIX = "plantas";
const FALLBACK_PLAN = kalilFloorPlans[0]!;

export function FloorPlansSection() {
  const [activeId, setActiveId] = useState<string>(FALLBACK_PLAN.id);
  const plan = kalilFloorPlans.find((item) => item.id === activeId) ?? FALLBACK_PLAN;

  const metrics = [
    { label: "Área privativa", value: `${plan.privateArea} m²` },
    { label: "Dormitórios", value: String(plan.bedrooms) },
    { label: "Suítes", value: String(plan.suites) },
    { label: "Banheiros", value: String(plan.bathrooms) },
    { label: "Vaga privativa", value: String(plan.parkingSpaces) },
  ];

  return (
    <section id="plantas" className="py-20 sm:py-24">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Plantas" title="Escolha a planta que combina com você" />

        <div className="mt-8">
          <Tabs
            items={kalilFloorPlans.map(({ id, label }) => ({ id, label }))}
            active={plan.id}
            onChange={setActiveId}
            idPrefix={ID_PREFIX}
            label="Plantas disponíveis"
          />

          <div
            id={tabPanelId(ID_PREFIX)}
            role="tabpanel"
            aria-labelledby={tabId(ID_PREFIX, plan.id)}
            className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-10"
          >
            <div className="rounded-lg border border-stone-200 bg-white p-3 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  {plan.image ? (
                    <Image
                      src={plan.image.src}
                      alt={plan.image.alt}
                      width={plan.image.width ?? 1200}
                      height={plan.image.height ?? 800}
                      className="h-auto w-full"
                    />
                  ) : (
                    <FloorPlanDrawing
                      layout={plan.id}
                      label={`Planta ilustrativa de ${plan.label}: ${plan.rooms.join(", ")}`}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
              <p className="mt-3 text-xs">
                Planta ilustrativa. Layout e metragens sujeitos a confirmação no memorial descritivo.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                {plan.label}, {plan.privateArea} m²
              </h3>
              <dl className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
                {metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between py-3">
                    <dt className="text-sm">{metric.label}</dt>
                    <dd className="font-display text-base font-bold tabular-nums text-slate-900">{metric.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-5 grid grid-cols-2 gap-2">
                {plan.rooms.map((room) => (
                  <li key={room} className="flex items-center gap-2 text-sm">
                    <Check className="size-3.5 shrink-0 text-el-red-600" aria-hidden="true" />
                    {room}
                  </li>
                ))}
              </ul>
              <a href="#contato" className={buttonStyles("primary", "mt-6 w-full")}>
                Agendar visita
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
