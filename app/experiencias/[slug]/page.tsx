import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experiences } from "@/lib/content";
import { PageHead } from "@/components/ui";
import ExperienceVideo from "@/components/ExperienceVideo";
import styles from "./page.module.css";

type Params = { slug: string };

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp) return {};
  return { title: exp.title, description: exp.summary };
}

export default async function ExperienciaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = experiences.findIndex((e) => e.slug === slug);
  if (index === -1) notFound();
  const exp = experiences[index];
  const next = experiences[(index + 1) % experiences.length];

  return (
    <>
      <PageHead
        eyebrow={`Experiencia ${String(index + 1).padStart(2, "0")} / ${String(experiences.length).padStart(2, "0")}`}
        lines={[exp.title]}
        lead={exp.subtitle}
        crumbs={[{ href: "/experiencias", label: "Experiencias" }]}
      />

      <section className="container">
        {exp.embed ? (
          <div className={styles.embed}>
            <iframe
              src={exp.embed}
              title={`${exp.title}: recorrido 360°`}
              allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
              allowFullScreen
              loading="lazy"
              data-lenis-prevent
            />
          </div>
        ) : exp.videos ? (
          <div className={styles.videos}>
            {exp.videos.map((v) => (
              <article key={v.src} className={styles.videoCard}>
                <ExperienceVideo src={v.src} title={v.title} accent={exp.accent} poster={v.poster} ratio="9 / 16" />
                <h2 className={styles.videoTitle}>{v.title}</h2>
                <p className={styles.videoBody}>{v.body}</p>
              </article>
            ))}
          </div>
        ) : (
          <ExperienceVideo src={exp.video} title={exp.title} accent={exp.accent} poster={exp.poster} backdrop={exp.backdrop} />
        )}
        <div className={styles.body}>
          <p>{exp.body}</p>
          <Link href="/experiencias" className="pill">
            ← Todas las experiencias
          </Link>
        </div>
      </section>

      <section className={`container ${styles.nextWrap}`}>
        <Link href={`/experiencias/${next.slug}`} className={styles.next} data-cursor="Siguiente">
          <span className="eyebrow">Siguiente experiencia</span>
          <span className={styles.nextTitle}>
            {next.title} <span aria-hidden="true">→</span>
          </span>
        </Link>
      </section>
    </>
  );
}
