import { useTranslations } from "next-intl";
import { stack } from "@/data/stack";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const paragraphs = ["intro", "industry", "ai", "looking"] as const;
// Formación va última y a lo ancho: es el dato más largo
const facts = ["status", "mode", "location", "interests", "education"] as const;

export default function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-[75rem] px-4 pt-24 md:px-6 md:pt-32"
    >
      <Reveal>
        <SectionHeading id="about-title" label={t("label")} title={t("title")} />
      </Reveal>

      <Reveal className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:gap-6 lg:grid-cols-12">
        <div className="card flex flex-col gap-4.5 p-6 text-base leading-[1.7] text-muted md:p-9 md:text-lg lg:col-span-7">
          {paragraphs.map((key) => (
            <p key={key}>{t(`paragraphs.${key}`)}</p>
          ))}
        </div>

        <div className="flex flex-col gap-4 md:gap-6 lg:col-span-5">
          <dl className="card grid gap-2.5 p-2.5 sm:grid-cols-2 md:p-3">
            {facts.map((key) => (
              <div
                key={key}
                className="flex flex-col gap-2 rounded-[1.125rem] border border-line bg-inset p-4 sm:last:col-span-2"
              >
                <dt className="label text-[0.6875rem]">{t(`facts.${key}Label`)}</dt>
                <dd className="text-[0.9375rem] leading-normal">{t(`facts.${key}`)}</dd>
              </div>
            ))}
          </dl>
          <div className="card flex-1 p-6 md:p-7">
            <h3 className="font-semibold">{t("stackTitle")}</h3>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border-strong bg-raised px-3 py-1.5"
                >
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
