import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import LineStory from "@/components/LineStory";
import { lines } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nuestras líneas",
  description: "Clásica, Pieles sensibles y Con color: tres protectores solares en barra con FPS 50+ y amplio espectro.",
};

export default function NuestrasLineas() {
  return (
    <>
      <PageHead
        eyebrow="Nuestras líneas"
        lines={["Una barra", "para cada piel."]}
        lead="Las tres comparten lo esencial: FPS 50+, amplio espectro UVA/UVB, 20 gr y un formato que entra en el bolsillo. Cambia lo que tu piel necesita."
      />
      {lines.map((line, i) => (
        <LineStory key={line.id} line={line} index={i} />
      ))}
    </>
  );
}
