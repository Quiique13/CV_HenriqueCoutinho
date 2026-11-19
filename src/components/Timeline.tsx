import { Plus } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { timelineCopy } from "../data/localizedPortfolio";
import { timeline } from "../data/portfolio";
import ScrollRevealHeading from "./ScrollRevealHeading";

export default function Timeline() {
  const { language, t } = useLanguage();
  return (
    <section
      className="story-section page-width section-space"
      id="story"
      aria-labelledby="story-title"
    >
      <div className="section-eyebrow">
        <span>{t("storyEyebrow")}</span>
        <Plus size={18} />
      </div>
      <div className="story-layout">
        <div className="story-intro">
          <ScrollRevealHeading
            id="story-title"
            lines={[t("storyLine")]}
            accent={t("storyAccent")}
          />
          <p data-animated-content>{t("storyCopy")}</p>
          <span className="story-doodle" aria-hidden="true">
            ↝
          </span>
          <span className="handwritten" data-animated-content>
            {t("storyNote1")}
            <br />
            {t("storyNote2")}
          </span>
        </div>
        <ol className="timeline">
          {timeline.map((entry, index) => {
            const [title, description, place = entry.place] =
              language === "en"
                ? [entry.title, entry.description]
                : (timelineCopy[entry.title]?.[language] ?? [
                    entry.title,
                    entry.description,
                  ]);
            return (
              <li
                key={entry.title}
                data-animated-content
                className={
                  index === 0 ? "timeline-entry current" : "timeline-entry"
                }
              >
                <span className="timeline-dot" />
                <div className="timeline-meta">
                  <span>{index === 0 ? t("timelinePresent") : entry.date}</span>
                  <span>
                    {t(
                      entry.kind === "WORK"
                        ? "timelineWork"
                        : entry.kind === "EDUCATION"
                          ? "timelineEducation"
                          : "timelineIndependent",
                    )}
                  </span>
                </div>
                <h3>{title}</h3>
                <span className="timeline-place">{place}</span>
                <p>{description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
