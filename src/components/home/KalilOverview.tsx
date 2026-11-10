import { KalilGallery } from "@/components/home/KalilGallery";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { kalilFacts } from "@/data/kalil";

export function KalilOverview() {
  return (
    <section id="edificio" className="py-20 sm:py-24">
      <div className="mx-auto max-w-site space-y-14 px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="O Edifício" title="Cada ambiente pensado para quem vai morar">
            Apartamentos de 1 a 2 dormitórios com suíte e vagas demarcadas e privativas.
          </SectionHeading>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 lg:grid-cols-5">
            {kalilFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={`bg-white p-5 ${index === kalilFacts.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <dt className="text-xs font-semibold uppercase tracking-wider">{fact.label}</dt>
                <dd className="mt-2 font-display text-base font-bold text-slate-900">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <KalilGallery />
      </div>
    </section>
  );
}
