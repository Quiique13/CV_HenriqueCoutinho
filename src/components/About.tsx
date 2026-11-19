import { Plus } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import ScrollRevealHeading from "./ScrollRevealHeading";

export default function About() {
  const { t } = useLanguage();
  return (
    <section
      className="about-section page-width section-space"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="section-eyebrow">
        <span>{t("aboutEyebrow")}</span>
        <Plus size={18} />
      </div>
      <div className="about-layout">
        <ScrollRevealHeading
          id="about-title"
          lines={[t("aboutLine1"), t("aboutLine2")]}
          accent={t("aboutAccent")}
        />
        <div className="about-copy" data-animated-content>
          <p>{t("aboutCopy1")}</p>
          <p>{t("aboutCopy2")}</p>
          <div className="skill-tags">
            {[
              "React",
              "TypeScript",
              "Ruby on Rails",
              "Figma",
              "Adobe Suite",
              "JavaScript",
              "Tailwind CSS",
            ].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
