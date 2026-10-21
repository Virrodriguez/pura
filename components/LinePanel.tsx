import type { Line } from "@/lib/content";
import { RenderPlaceholder } from "./ui";
import styles from "./LinePanel.module.css";

/** Banner de una línea: número + nombre, texto, características con íconos y render del producto. */
export default function LinePanel({ line, flip = false, className = "" }: { line: Line; flip?: boolean; className?: string }) {
  return (
    <article
      id={`linea-${line.id}`}
      className={`${styles.panel} ${className}`}
      data-flip={flip || undefined}
      style={{ "--line": line.color, "--ink": line.ink } as React.CSSProperties}
      aria-labelledby={`t-${line.id}`}
    >
      <div className={styles.copy}>
        <h3 id={`t-${line.id}`} className={styles.title}>
          <span className={styles.num}>{line.number}</span> {line.name}
        </h3>
        <p className={styles.intro}>{line.intro}</p>
        <ul className={styles.features}>
          {line.features.map((f) => (
            <li key={f.label}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.icon} alt="" width={28} height={28} />
              <span>{f.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.media}>
        <RenderPlaceholder label={`Render ${line.short}`} />
      </div>
    </article>
  );
}
