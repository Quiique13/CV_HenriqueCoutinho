import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Wordmark from "./Wordmark";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer page-width">
      <Wordmark label={t("home")} />
      <span>© {new Date().getFullYear()} HENRIQUE COUTINHO</span>
      <a href="#home">
        {t("backToTop")} <ArrowUpRight size={14} />
      </a>
    </footer>
  );
}
