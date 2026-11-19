import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  languages,
  translate,
  type Language,
  type Translate,
} from "../data/messages";
import { LanguageContext } from "./LanguageContext";

const storageKey = "quiique-language";

function initialLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved && Object.hasOwn(languages, saved)) return saved as Language;
  } catch {
    // The language still works if the browser blocks storage.
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState(initialLanguage);
  const t = useMemo<Translate>(
    () => (message, values) => translate(language, message, values),
    [language],
  );

  useEffect(() => {
    document.documentElement.lang = languages[language].lang;
    document.title = t("pageTitle");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("pageDescription"));
    try {
      window.localStorage.setItem(storageKey, language);
    } catch {
      // A blocked storage write does not affect the current selection.
    }
  }, [language, t]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
