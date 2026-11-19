import { useRef, useState } from "react";
import { ArrowUpRight, Globe, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { languages, type Language } from "../data/messages";
import StarBorderLink from "./StarBorderLink";
import Wordmark from "./Wordmark";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="site-header page-width"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <Wordmark label={t("home")} />
      <nav
        className={menuOpen ? "navigation is-open" : "navigation"}
        id="main-navigation"
        aria-label={t("navigation")}
      >
        {[
          [t("navWork"), "#work"],
          [t("navGallery"), "#photography"],
          [t("navStory"), "#story"],
        ].map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <StarBorderLink
          className="nav-contact"
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          {t("sayHello")} <ArrowUpRight size={16} />
        </StarBorderLink>
      </nav>
      <div className="header-actions">
        <label className="language-picker">
          <span aria-hidden="true">
            <Globe size={15} /> {language.toUpperCase()}
          </span>
          <select
            aria-label={t("language")}
            value={language}
            onChange={(event) => {
              const next = event.currentTarget.value;
              if (Object.hasOwn(languages, next)) setLanguage(next as Language);
            }}
          >
            {Object.entries(languages).map(([value, option]) => (
              <option value={value} key={value} lang={option.lang}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        <button
          className="menu-button icon-button"
          ref={menuButton}
          aria-label={t(menuOpen ? "closeNav" : "openNav")}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
