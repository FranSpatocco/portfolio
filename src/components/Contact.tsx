import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Usuario visible del link: último segmento de la URL, sin el sufijo
// numérico que LinkedIn agrega a las URLs (franco-spatocco-0a7161163)
const handle = (url: string) =>
  url
    .replace(/\/$/, "")
    .split("/")
    .pop()
    ?.replace(/-[0-9a-f]{6,}$/, "");

export default function Contact() {
  const t = useTranslations("contact");

  const channels = [
    { key: "email", href: `mailto:${site.email}`, text: site.email, external: false },
    { key: "linkedin", href: site.linkedin, text: `${handle(site.linkedin)} ↗`, external: true },
    { key: "github", href: site.github, text: `${handle(site.github)} ↗`, external: true },
  ] as const;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-[75rem] px-5 pt-24 md:px-8 md:pt-36"
    >
      <Reveal className="grid gap-10 md:grid-cols-[5fr_7fr] md:gap-20">
        <div>
          <SectionHeading id="contact-title" index={4} title={t("title")} />
          <p className="mt-5 leading-relaxed text-muted md:text-lg">{t("subtitle")}</p>
          <dl className="mt-9 border-t border-border">
            {channels.map((c) => (
              <div
                key={c.key}
                className="grid min-h-14 grid-cols-[6.875rem_1fr] items-center border-b border-border"
              >
                <dt className="label text-[0.6875rem]">{t(`channels.${c.key}`)}</dt>
                <dd className="min-w-0">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`block truncate font-medium transition-colors ${
                      c.key === "email"
                        ? "text-accent hover:text-accent-hover"
                        : "hover:text-accent"
                    }`}
                  >
                    {c.text}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <ContactForm />
      </Reveal>
    </section>
  );
}
