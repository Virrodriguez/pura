import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import ExperienceGrid from "@/components/ExperienceGrid";

export const metadata: Metadata = {
  title: "Viví la experiencia",
  description: "Cuatro formas de conocer el SUNBAR de PURA: turnaround, 3D interactivo, VR-360 y realidad aumentada.",
};

export default function Experiencias() {
  return (
    <>
      <PageHead
        eyebrow="Viví la experiencia"
        lines={["Cuatro formas", "de conocer PURA."]}
        lead="Giralo, abrilo, llevalo a tu mano. Elegí una experiencia para ver el producto de cerca."
      />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <ExperienceGrid priority />
      </section>
    </>
  );
}
