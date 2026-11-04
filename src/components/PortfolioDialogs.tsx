import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, X } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";
import { useScrollLock } from "../hooks/useScrollLock";
import { formatCount } from "../utils/format";
import Dialog from "./Dialog";

export default function PortfolioDialogs() {
  const { overlay, closeOverlay, movePhoto } = usePortfolio();
  useScrollLock(overlay !== null);
  const photos = overlay?.type === "photo" ? overlay.photos : [];
  const photoIndex = overlay?.type === "photo" ? overlay.index : null;
  const visiblePhotos = photos;
  const selectedPhoto = photoIndex === null ? null : photos[photoIndex];
  const project = overlay?.type === "project" ? overlay.project : null;
  return (
    <>
      <Dialog
        className="lightbox"
        open={Boolean(selectedPhoto)}
        onClose={closeOverlay}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            movePhoto(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            movePhoto(-1);
          }
        }}
        aria-labelledby="lightbox-title"
      >
        {selectedPhoto && (
          <div className="lightbox-content">
            <div className="modal-top">
              <span>
                {selectedPhoto.category} / {formatCount((photoIndex ?? 0) + 1)}{" "}
                OF {visiblePhotos.length}
              </span>
              <button
                className="icon-button"
                onClick={() => closeOverlay()}
                aria-label="Close image viewer"
                autoFocus
              >
                <X />
              </button>
            </div>
            <img
              className="lightbox-photo"
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
            />
            <div className="lightbox-bottom">
              <div>
                <h2 id="lightbox-title">{selectedPhoto.title}</h2>
                <a href={selectedPhoto.url} target="_blank" rel="noreferrer">
                  {selectedPhoto.category === "Design & film"
                    ? "Explore the full project"
                    : "View the full photo collection"}{" "}
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="lightbox-arrows">
                <button
                  className="icon-button"
                  onClick={() => movePhoto(-1)}
                  aria-label="Previous collection"
                >
                  <ArrowLeft />
                </button>
                <button
                  className="icon-button"
                  onClick={() => movePhoto(1)}
                  aria-label="Next collection"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
      <Dialog
        className="project-dialog"
        open={Boolean(project)}
        onClose={closeOverlay}
        aria-labelledby="project-dialog-title"
      >
        {project && (
          <div className="project-dialog-content">
            <div className="modal-top">
              <span>PERSONAL PROJECT / {project.discipline}</span>
              <button
                className="icon-button"
                onClick={() => closeOverlay()}
                aria-label="Close project"
                autoFocus
              >
                <X />
              </button>
            </div>
            <h2 id="project-dialog-title">
              {project.title}
              <span className="orange-period">.</span>
            </h2>
            <p className="project-detail-intro">{project.description}</p>
            <h3>The details</h3>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>
                  <ArrowUpRight size={17} />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="skill-tags">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <a
              className="primary-button"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              Explore the code <Code2 size={18} />
              <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </Dialog>
    </>
  );
}
