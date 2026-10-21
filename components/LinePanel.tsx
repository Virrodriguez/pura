import Link from "next/link";
import type { Line } from "@/lib/content";
import { RenderPlaceholder } from "./ui";
import styles from "./LinePanel.module.css";

/**
 * Banner de una línea en pantalla dividida:
 * izquierda, la frase grande en mayúsculas (cada palabra en su máscara para el revelado);
 * derecha, el render del producto a sangre.
 */
export default function LinePanel({ line, flip = false, className = "" }: { line: Line; flip?: boolean; className?: string }) {
  const words = line.statement.split(" ");
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

        <p className={styles.statement} aria-label={line.statement}>
          {words.map((w, i) => (
            <span key={i} aria-hidden="true">
              <span className={styles.mask}>
                <span className={styles.word} data-word>
                  {w}
                </span>
              </span>{" "}
            </span>
          ))}
        </p>

        <div className={styles.foot}>
          <ul className={styles.features}>
            {line.features.map((f) => (
              <li key={f.label} title={f.label.replace("\n", " ")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.icon} alt="" width={22} height={22} />
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
          <Link href={`/nuestras-lineas#${line.id}`} className={styles.more}>
            [Ver línea]
          </Link>
        </div>
      </div>
      <div className={styles.media}>
        <RenderPlaceholder label={`Render ${line.short}`} />
      </div>
    </article>
  );
}
