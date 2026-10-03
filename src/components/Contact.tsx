import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import ContactForm from "./ContactForm";
import { ArrowUpRight, GitHub, LinkedIn, Mail } from "./icons";
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
    { key: "email", href: `mailto:${site.email}`, text: site.email, Icon: Mail, external: false },
    { key: "linkedin", href: site.linkedin, text: handle(site.linkedin), Icon: LinkedIn, external: true },
    { key: "github", href: site.github, text: handle(site.github), Icon: GitHub, external: true },
  ] as const;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-[75rem] px-4 pt-24 md:px-6 md:pt-32"
    >
      <Reveal>
        <SectionHeading
          id="contact-title"
          label={t("label")}
          title={t("title")}
          aside={<p className="max-w-[22.5rem] text-muted">{t("subtitle")}</p>}
        />
      </Reveal>

      <Reveal className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:gap-6 lg:grid-cols-12">
        <ul className="card flex flex-col gap-2.5 p-2.5 md:p-3 lg:col-span-5">
          {channels.map(({ key, href, text, Icon, external }) => (
            <li key={key}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex min-h-18 items-center gap-4 rounded-[1.125rem] border border-line bg-inset p-3 pr-4 transition-colors hover:border-border-strong"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-border-strong bg-raised">
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="label text-[0.6875rem]">{t(`channels.${key}`)}</span>
                  <span className="truncate font-medium">{text}</span>
                </span>
                <ArrowUpRight
                  className="size-4.5 shrink-0 text-subtle transition-colors group-hover:text-accent"
                />
              </a>
            </li>
          ))}
        </ul>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
