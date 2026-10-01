import { useTranslations } from "next-intl";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const paragraphs = ["intro", "industry", "ai", "looking"] as const;
const facts = ["location", "mode", "education", "interests"] as const;

const stack = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Flutter",
  "Dart",
  "Tailwind CSS",
  "GSAP",
  "next-intl",
  "Firebase",
  "Git",
  "Vercel",
  "Claude Code",
];

export default function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-[75rem] px-5 pt-24 md:px-8 md:pt-36"
    >
      <Reveal className="grid gap-10 md:grid-cols-[7fr_5fr] md:gap-20">
        <div>
          <SectionHeading id="about-title" index={2} title={t("title")} />
          <div className="mt-8 flex flex-col gap-4.5 text-base leading-[1.65] text-muted md:mt-9 md:text-lg">
            {paragraphs.map((key) => (
              <p key={key}>{t(`paragraphs.${key}`)}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10 md:pt-22">
          <dl className="border-t border-border">
            {facts.map((key) => (
              <div
                key={key}
                className="grid grid-cols-[7rem_1fr] gap-4 border-b border-border py-3.5 md:grid-cols-[8.125rem_1fr]"
              >
                <dt className="label pt-0.5 text-[0.6875rem]">
                  {t(`facts.${key}Label`)}
                </dt>
                <dd className="text-[0.9375rem] leading-normal">{t(`facts.${key}`)}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h3 className="font-semibold">{t("stackTitle")}</h3>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {stack.map((tech) => (
                <li key={tech} className="border border-border bg-surface px-3 py-1.5">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
