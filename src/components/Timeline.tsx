import { Plus } from "lucide-react";
import { timeline } from "../data/portfolio";

export default function Timeline() {
  return (
    <section
      className="story-section page-width section-space"
      id="story"
      aria-labelledby="story-title"
    >
      <div className="section-eyebrow">
        <span>04 / CONNECTING THE DOTS</span>
        <Plus size={18} />
      </div>
      <div className="story-layout">
        <div className="story-intro">
          <h2 id="story-title">
            The route was
            <br />
            <span className="serif">never a straight line.</span>
          </h2>
          <p>
            Engineering, creative media, visual storytelling, and code. Every
            chapter left something useful for the next.
          </p>
          <span className="story-doodle" aria-hidden="true">
            ↝
          </span>
          <span className="handwritten">
            Still figuring things out.
            <br />
            Still making things happen.
          </span>
        </div>
        <ol className="timeline">
          {timeline.map((entry, index) => (
            <li
              key={entry.title}
              className={
                index === 0 ? "timeline-entry current" : "timeline-entry"
              }
            >
              <span className="timeline-dot" />
              <div className="timeline-meta">
                <span>{entry.date}</span>
                <span>{entry.kind}</span>
              </div>
              <h3>{entry.title}</h3>
              <span className="timeline-place">{entry.place}</span>
              <p>{entry.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
