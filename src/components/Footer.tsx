import { useTranslations } from "next-intl";
import { site } from "@/config/site";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mx-auto mt-24 w-full max-w-[75rem] px-5 md:mt-32 md:px-8">
      <div className="flex flex-col gap-3 border-t border-line py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>{t("rights", { year: new Date().getFullYear(), name: site.name })}</p>
        <p className="label text-[0.6875rem]">{t("meta")}</p>
      </div>
    </footer>
  );
}
