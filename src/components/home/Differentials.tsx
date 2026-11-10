import {
  Blinds,
  Droplets,
  Gem,
  Hammer,
  Layers,
  Leaf,
  Snowflake,
  VolumeX,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { kalilFinishes, kalilTechnical } from "@/data/kalil";
import type { DifferentialIcon } from "@/types";

const icons: Record<DifferentialIcon, LucideIcon> = {
  layers: Layers,
  hammer: Hammer,
  gem: Gem,
  volume: VolumeX,
  droplets: Droplets,
  blinds: Blinds,
  snowflake: Snowflake,
  leaf: Leaf,
};

export function Differentials() {
  return (
    <section id="diferenciais" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Diferenciais" title="O que está por trás do acabamento" />

        <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {kalilFinishes.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="bg-white">
                <Reveal delay={index * 0.06} className="h-full p-6">
                  <Icon className="size-6 text-el-red-600" aria-hidden="true" />
                  <h3 className="mt-4 font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed">{item.description}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {kalilTechnical.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="flex gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-slate-900" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
