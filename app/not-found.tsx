import Link from "next/link";
import { PageHead } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageHead eyebrow="Error 404" lines={["Esta página", "tomó demasiado sol."]} lead="No encontramos lo que buscabas." />
      <div className="container" style={{ paddingBottom: "var(--section)" }}>
        <Link href="/" className="pill">
          Volver al inicio
        </Link>
      </div>
    </>
  );
}
