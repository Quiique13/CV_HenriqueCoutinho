import { ArrowUpRight, Check, Plus, Smile } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { contactEmail as email } from "../data/portfolio";
import { useClipboard } from "../hooks/useClipboard";
import ScrollRevealHeading from "./ScrollRevealHeading";
import StarBorderLink from "./StarBorderLink";

export default function Contact() {
  const { t } = useLanguage();
  const { copied, copyError, copy } = useClipboard();
  const copyEmail = () => copy(email);
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="page-width">
        <div className="section-eyebrow">
          <span>{t("contactEyebrow")}</span>
          <Smile size={22} />
        </div>
        <div className="contact-heading">
          <ScrollRevealHeading
            id="contact-title"
            lines={[t("contactLine")]}
            accent={t("contactAccent")}
          />
          <StarBorderLink
            className="contact-arrow"
            data-animated-content
            href={`mailto:${email}`}
            aria-label={t("emailHenrique")}
          >
            <ArrowUpRight strokeWidth={1} />
          </StarBorderLink>
        </div>
        <div className="contact-bottom" data-animated-content>
          <div>
            <span className="small-label">{t("contactCopy")}</span>
            <div className="email-row">
              <StarBorderLink
                className="contact-email"
                href={`mailto:${email}`}
              >
                {email}
              </StarBorderLink>
              <button
                className="icon-button"
                onClick={copyEmail}
                aria-label={t(copied ? "emailCopied" : "copyEmail")}
              >
                {copied ? <Check size={17} /> : <Plus size={17} />}
              </button>
            </div>
            <span className="copy-status" role="status">
              {copied ? t("copySuccess") : copyError ? t("copyError") : ""}
            </span>
          </div>
          <div className="contact-socials">
            <a
              href="https://github.com/Quiique13"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={16} />
            </a>
            <a
              href="https://www.behance.net/henriqueCosta"
              target="_blank"
              rel="noreferrer"
            >
              Behance <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
