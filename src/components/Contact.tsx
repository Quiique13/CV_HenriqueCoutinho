import { ArrowUpRight, Check, Plus, Smile } from "lucide-react";
import { contactEmail as email } from "../data/portfolio";
import { useClipboard } from "../hooks/useClipboard";

export default function Contact() {
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
          <span>05 / GOOD THINGS START WITH A HELLO</span>
          <Smile size={22} />
        </div>
        <div className="contact-heading">
          <h2 id="contact-title">
            Have a good idea?
            <br />
            <span className="serif">Let’s make it real.</span>
          </h2>
          <a
            className="contact-arrow"
            href={`mailto:${email}`}
            aria-label="Email Henrique"
          >
            <ArrowUpRight strokeWidth={1} />
          </a>
        </div>
        <div className="contact-bottom">
          <div>
            <span className="small-label">
              PROJECTS, COLLABORATIONS, OR A REALLY GOOD JOKE.
            </span>
            <div className="email-row">
              <a href={`mailto:${email}`}>{email}</a>
              <button
                className="icon-button"
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : "Copy email address"}
              >
                {copied ? <Check size={17} /> : <Plus size={17} />}
              </button>
            </div>
            <span className="copy-status" role="status">
              {copied
                ? "Copied. Now say something nice."
                : copyError
                  ? "Please select the email above to copy it."
                  : ""}
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
