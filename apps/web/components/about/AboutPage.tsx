"use client";

import { useLanguage } from "@/hooks/useLanguage";
import type { AboutTranslations } from "@/locales/about.types";
import en from "@/locales/en/about";
import bn from "@/locales/bn/about";
import ar from "@/locales/ar/about";
import ur from "@/locales/ur/about";
import fa from "@/locales/fa/about";
import tr from "@/locales/tr/about";

const translations: Record<string, AboutTranslations> = { en, bn, ar, ur, fa, tr };
const fontClasses: Record<string, string> = {
  bn: "font-bangla",
  ar: "font-arabic",
  ur: "font-urdu",
  fa: "font-persian",
};

function EditorialBlocks({ blocks, dark = false }: { blocks: AboutTranslations["section02"]; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return <h3 className="hv-h3 pt-8" style={dark ? { color: "var(--surface)" } : undefined} key={`${block.type}-${index}`}>{block.text}</h3>;
        }
        if (block.type === "quote") {
          return (
            <blockquote className="border-s-2 border-[var(--accent)] ps-6 font-heading text-xl leading-relaxed sm:text-2xl" style={{ color: dark ? "var(--surface)" : "var(--primary-dark)" }} key={`${block.type}-${index}`}>
              {block.text.split("\n").map((line, lineIndex) => <span className="block" key={lineIndex}>{line}</span>)}
            </blockquote>
          );
        }
        return <p className="hv-body-lg text-pretty" style={dark ? { color: "var(--text-on-dark-muted)" } : undefined} key={`${block.type}-${index}`}>{block.text}</p>;
      })}
    </div>
  );
}

export default function AboutPage() {
  const { currentLang, currentLanguage } = useLanguage();
  const content = translations[currentLang] ?? en;
  const fontClass = fontClasses[currentLang] ?? "";

  return (
    <div className={fontClass} lang={currentLang} dir={currentLanguage.dir}>
      <header className="hv-section bg-[var(--background)] text-[var(--text-dark)]">
        <div className="hv-container text-center">
          <div className="mx-auto max-w-4xl">
            <p className="hv-tagline-soft mb-5">{content.heroEyebrow}</p>
            <h1 className="hv-h1 font-heading" style={{ color: "var(--primary-dark)" }}>{content.heroTitle}</h1>
            <div className="mx-auto my-8 h-px w-10 bg-[var(--accent)]" aria-hidden="true" />
            <div className="mx-auto max-w-3xl space-y-5">
              {content.heroDescription.map((paragraph, index) => (
                <p className="hv-body-lg text-pretty" key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </header>

        <section className="hv-section bg-[var(--background)]" aria-labelledby="founder-note-title">
          <div className="hv-container">
            <div className="mx-auto mb-12 max-w-3xl">
              <p className="hv-tagline-soft mb-3">02</p>
              <h2 className="hv-h2" id="founder-note-title">{content.section02Title}</h2>
            </div>
            <EditorialBlocks blocks={content.section02} />
          </div>
        </section>

        <section className="hv-section bg-[var(--background)]" aria-labelledby="why-hudaverse-title">
          <div className="hv-container text-center">
            <div className="mx-auto max-w-2xl">
              <p className="hv-tagline-soft mb-3">03</p>
              <h2 className="hv-h2" id="why-hudaverse-title">{content.section03Title}</h2>
              <div className="mx-auto my-8 h-px w-10 bg-[var(--accent)]" aria-hidden="true" />
              <div className="space-y-5">
                {content.section03Body.map((paragraph, index) => (
                  <p className="hv-body-lg text-pretty" key={index}>{paragraph}</p>
                ))}
              </div>
              <p className="hv-body-lg mt-8 font-semibold text-[var(--primary-dark)]">
                {content.section03Closing}
              </p>
            </div>
          </div>
        </section>

        <section className="hv-section bg-[var(--surface)]" aria-labelledby="vision-mission-title">
          <div className="hv-container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="hv-tagline-soft mb-3">04</p>
              <h2 className="hv-h2" id="vision-mission-title">{content.section04Title}</h2>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
              <article className="lg:pe-10">
                <h3 className="hv-h3 mb-4">{content.section04VisionTitle}</h3>
                <p className="hv-body-lg text-pretty">{content.section04Vision}</p>
              </article>
              <article className="border-t border-[var(--border-light)] pt-8 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
                <h3 className="hv-h3 mb-4">{content.section04MissionTitle}</h3>
                <p className="hv-body-lg text-pretty">{content.section04Mission}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="hv-section bg-[var(--primary-dark)]" aria-labelledby="philosophy-title">
          <div className="hv-container">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="hv-tagline mb-3" style={{ color: "var(--accent)" }}>05</p>
              <h2 className="hv-h2 font-heading" id="philosophy-title" style={{ color: "var(--surface)" }}>{content.section05Title}</h2>
              <p className="hv-body-lg mt-5" style={{ color: "var(--surface)" }}>{content.section05Intro}</p>
            </div>
            <ol className="mx-auto max-w-5xl">
              {content.section05Principles.map((principle, index) => (
                <li className="grid grid-cols-1 gap-3 border-t border-white/15 py-7 first:border-t-0 sm:gap-4 lg:grid-cols-3 lg:gap-8" key={principle.title}>
                  <div className="flex items-baseline gap-4 lg:col-span-1">
                    <span className="font-heading text-lg" style={{ color: "var(--accent)" }}>{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="hv-h3 font-heading" style={{ color: "var(--surface)" }}>{principle.title}</h3>
                  </div>
                  <p className="hv-body-lg text-pretty lg:col-span-2" style={{ color: "var(--surface)" }}>{principle.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="hv-section bg-[var(--background)]" aria-labelledby="ecosystem-title">
          <div className="hv-container">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="hv-tagline-soft mb-3">06</p>
              <h2 className="hv-h2 font-heading" id="ecosystem-title">{content.section06Title}</h2>
              <p className="hv-body-lg mt-5 text-pretty">{content.section06Intro}</p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
              {content.section06Domains.map((domain, index) => (
                <article className="border-t border-[var(--border-light)] pt-5" key={domain.title}>
                  <p className="hv-overline mb-3" style={{ color: "var(--accent)" }}>{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="hv-h3 font-heading mb-3">{domain.title}</h3>
                  <p className="hv-body-lg text-pretty">{domain.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hv-section bg-[var(--surface)]" aria-labelledby="commitment-title">
          <div className="hv-container">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <p className="hv-tagline-soft mb-3">07</p>
              <h2 className="hv-h2 font-heading" id="commitment-title">{content.section07Title}</h2>
              <p className="hv-body-lg mt-5 text-pretty">{content.section07Intro}</p>
            </div>
            <ol className="mx-auto max-w-5xl">
              {content.section07Commitments.map((commitment, index) => (
                <li className="grid grid-cols-1 gap-3 border-t border-[var(--border-light)] py-7 first:border-t-0 sm:gap-4 lg:grid-cols-5 lg:gap-8" key={commitment.title}>
                  <div className="flex items-baseline gap-4 lg:col-span-2">
                    <span className="font-heading text-lg" style={{ color: "var(--accent)" }}>{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="hv-h3 font-heading">{commitment.title}</h3>
                  </div>
                  <p className="hv-body-lg text-pretty lg:col-span-3">{commitment.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="hv-section hv-dark-section" aria-labelledby="vision-journey-title">
          <div className="hv-container">
            <div className="mx-auto mb-12 max-w-3xl">
              <p className="hv-tagline mb-3">08</p>
              <h2 className="hv-h2" style={{ color: "var(--surface)" }} id="vision-journey-title">{content.section08Title}</h2>
            </div>
            <EditorialBlocks blocks={content.section08} dark />
          </div>
        </section>

        <section className="hv-section bg-[var(--background)]" aria-labelledby="about-closing-title">
          <div className="hv-container text-center">
            <div className="mx-auto max-w-2xl">
              <p className="hv-tagline-soft mb-3">09</p>
              <h2 className="hv-h2 font-heading" id="about-closing-title">{content.section09Title}</h2>
              <div className="mt-8 space-y-5">
                {content.section09Body.map((paragraph, index) => (
                  <p className="hv-body-lg text-pretty" key={index}>{paragraph}</p>
                ))}
              </div>
              <p className="hv-h3 mt-8 font-heading" style={{ color: "var(--primary-dark)" }}>
                {content.section09Closing}
              </p>
            </div>
          </div>
        </section>

        <section className="hv-section bg-[var(--primary-dark)]" aria-labelledby="about-final-title">
          <div className="hv-container text-center">
            <div className="mx-auto max-w-3xl">
              <p className="hv-tagline mb-3" style={{ color: "var(--accent)" }}>10</p>
              <h2 className="hv-h2 font-heading" id="about-final-title" style={{ color: "var(--surface)" }}>{content.section10Title}</h2>
              <div className="mx-auto my-8 h-px w-10 bg-[var(--accent)]" aria-hidden="true" />
              <div className="space-y-5">
                {content.section10Body.map((paragraph, index) => (
                  <p className="hv-body-lg text-pretty" style={{ color: "var(--surface)" }} key={index}>{paragraph}</p>
                ))}
              </div>
              <p className="hv-h3 mt-8 font-heading" style={{ color: "var(--accent)" }}>{content.section10Closing}</p>
            </div>
          </div>
        </section>

        <section className="hv-section border-t border-[var(--border-light)] bg-[var(--surface)]" aria-label={content.principleTitle}>
          <div className="hv-container text-center">
            <p className="hv-overline mb-2">{content.principleTitle}</p>
            <p className="hv-h4">{content.principle}</p>
          </div>
        </section>
    </div>
  );
}
