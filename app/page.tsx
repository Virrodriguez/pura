import Link from "next/link";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Gallery from "@/components/home/Gallery";
import LineCards from "@/components/home/LineCards";
import ExperienceGrid from "@/components/ExperienceGrid";
import { SectionHead } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Gallery />
      <LineCards />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <SectionHead
          eyebrow="Conocé el producto"
          title="Experiencias"
          aside={
            <Link href="/experiencias" className="pill">
              Ver todas
            </Link>
          }
        />
        <ExperienceGrid />
      </section>
    </>
  );
}
