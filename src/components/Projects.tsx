import { usePortfolio } from "../hooks/usePortfolio";
import {
  ArrowUpRight,
  Code2,
  PawPrint,
  Shield,
  Swords,
  Trophy,
} from "lucide-react";
import { projects } from "../data/portfolio";
import { formatCount } from "../utils/format";

export default function Projects() {
  const { openProject } = usePortfolio();
  return (
    <section
      className="work-section page-width section-space"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-eyebrow">
        <span>02 / BUILT WITH INTENTION</span>
        <Code2 size={18} />
      </div>
      <div className="section-heading">
        <h2 id="work-title">
          Less talk.
          <br />
          <span className="serif">More making.</span>
        </h2>
        <p>
          A selection of coding projects.
          <br />
          Real problems, thoughtful interfaces.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((item, index) => (
          <article className="project-card" key={item.title}>
            <button
              className={`project-visual ${item.theme}`}
              onClick={() => openProject(item)}
              aria-label={`Explore ${item.title}`}
            >
              <div className="project-visual-top">
                <span>CODING PROJECT / {formatCount(index + 1)}</span>
                <span className="round-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              {item.theme === "savings" ? (
                <div className="savings-art" aria-hidden="true">
                  <img
                    className="savings-logo"
                    src={item.logo}
                    alt=""
                    width={2560}
                    height={2560}
                    loading="lazy"
                  />
                  <strong>
                    savings<span>OS</span>
                  </strong>
                  <span className="project-art-caption">
                    A little clarity. A lot less guesswork.
                  </span>
                  <div className="chart-bars">
                    {[22, 36, 30, 48, 42, 65, 57, 80, 72, 95, 85, 110].map(
                      (height, i) => (
                        <i key={i} style={{ height: `${height}px` }} />
                      ),
                    )}
                  </div>
                </div>
              ) : item.theme === "battlecraft" ? (
                <div className="battlecraft-art" aria-hidden="true">
                  <div className="battlecraft-deck">
                    <span className="battlecraft-trading-card">
                      <Shield strokeWidth={1.3} />
                    </span>
                    <span className="battlecraft-trading-card">
                      <Swords strokeWidth={1.3} />
                    </span>
                    <span className="battlecraft-trading-card">
                      <Trophy strokeWidth={1.3} />
                    </span>
                  </div>
                  <strong>BattleCraft</strong>
                  <span className="project-art-caption">
                    Collect. Compete. Connect.
                  </span>
                </div>
              ) : (
                <div className="petstay-art" aria-hidden="true">
                  <div className="pet-orbit orbit-one" />
                  <div className="pet-orbit orbit-two" />
                  <PawPrint strokeWidth={1.3} />
                  <strong>PetStay</strong>
                  <span className="project-art-caption">
                    Less admin. More happy tails.
                  </span>
                </div>
              )}
              <div className="project-visual-bottom">
                <span>{item.discipline}</span>
                <span>{item.stack.slice(0, 2).join(" + ").toUpperCase()}</span>
              </div>
            </button>
            <div className="project-info">
              <div>
                <h3>
                  <button
                    className="text-button"
                    onClick={() => openProject(item)}
                  >
                    {item.title} <ArrowUpRight size={20} />
                  </button>
                </h3>
                <p>{item.summary}</p>
              </div>
              <span className="project-index">{formatCount(index + 1)}</span>
            </div>
          </article>
        ))}
      </div>
      <a
        className="text-link work-github"
        href="https://github.com/Quiique13"
        target="_blank"
        rel="noreferrer"
      >
        More on GitHub <Code2 size={16} />
        <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
