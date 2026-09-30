import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="mx-auto flex max-w-[75rem] flex-col items-start px-5 pt-40 pb-20 md:px-8">
      <p className="label text-accent">{t("code")}</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-[-0.03em]">{t("title")}</h1>
      <Link
        href="/"
        className="mt-8 flex h-13 items-center bg-accent px-6 font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
      >
        {t("back")}
      </Link>
    </div>
  );
}
