import { Building3DSection } from "@/components/home/Building3DSection";
import { InstagramReel } from "@/components/home/client-sections";
import { ContactForm } from "@/components/home/ContactForm";
import { Differentials } from "@/components/home/Differentials";
import { FloorPlansSection } from "@/components/home/FloorPlansSection";
import { HeroWhite } from "@/components/home/HeroWhite";
import { KalilOverview } from "@/components/home/KalilOverview";
import { LocationSection } from "@/components/home/LocationSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroWhite />
        <KalilOverview />
        <Building3DSection />
        <FloorPlansSection />

        <section id="video" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto grid max-w-site items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <SectionHeading eyebrow="Vídeo" title="Veja o Kalil 321 em movimento">
              Um passeio rápido pelo empreendimento, direto do nosso Instagram.
            </SectionHeading>
            <div>
              <InstagramReel />
            </div>
          </div>
        </section>

        <Differentials />
        <LocationSection />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
