import { useLanguage } from "../context/LanguageContext";

export default function DisciplineStrip() {
  const { t } = useLanguage();
  return (
    <div className="discipline-strip" aria-label={t("disciplines")}>
      <div>
        <span>{t("frontend")}</span>
        <span aria-hidden="true">✳</span>
        <span>{t("design")}</span>
        <span aria-hidden="true">✳</span>
        <span>{t("photography")}</span>
        <span aria-hidden="true">✳</span>
        <span>{t("curiosity")}</span>
        <span aria-hidden="true">✳</span>
      </div>
    </div>
  );
}
