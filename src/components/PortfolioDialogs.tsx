import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  LockKeyhole,
  X,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { galleryPhotoAlt, localizeProject } from "../data/localizedPortfolio";
import { usePortfolio } from "../hooks/usePortfolio";
import { useScrollLock } from "../hooks/useScrollLock";
import { formatCount } from "../utils/format";
import Dialog from "./Dialog";

export default function PortfolioDialogs() {
  const { language, t } = useLanguage();
  const { overlay, closeOverlay, movePhoto } = usePortfolio();
  useScrollLock(overlay !== null);
  const photos = overlay?.type === "photo" ? overlay.photos : [];
  const photoIndex = overlay?.type === "photo" ? overlay.index : null;
  const selectedPhoto = photoIndex === null ? null : photos[photoIndex];
  const project =
    overlay?.type === "project"
      ? localizeProject(overlay.project, language)
      : null;
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
                {selectedPhoto.title} /{" "}
                {t("countOf", {
                  number: formatCount((photoIndex ?? 0) + 1),
                  total: formatCount(photos.length),
                })}
              </span>
              <button
                className="icon-button"
                onClick={() => closeOverlay()}
                aria-label={t("closeImage")}
                autoFocus
              >
                <X />
              </button>
            </div>
            <img
              className="lightbox-photo"
              src={selectedPhoto.src}
              alt={galleryPhotoAlt(selectedPhoto, language, t)}
              width={selectedPhoto.width}
              height={selectedPhoto.height}
            />
            <div className="lightbox-bottom">
              <div>
                <h2 id="lightbox-title">{selectedPhoto.title}</h2>
                <a href={selectedPhoto.url} target="_blank" rel="noreferrer">
                  {t("viewBehance")} <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="lightbox-arrows">
                <button
                  className="icon-button"
                  onClick={() => movePhoto(-1)}
                  aria-label={t("previousImage")}
                >
                  <ArrowLeft />
                </button>
                <button
                  className="icon-button"
                  onClick={() => movePhoto(1)}
                  aria-label={t("nextImage")}
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
              <span>
                {t("codingProject")} / {project.discipline}
              </span>
              <button
                className="icon-button"
                onClick={() => closeOverlay()}
                aria-label={t("closeProject")}
                autoFocus
              >
                <X />
              </button>
            </div>
            {project.logo && (
              <img
                className="project-dialog-logo"
                src={project.logo}
                alt={t("logo", { title: project.title })}
                width={2560}
                height={2560}
              />
            )}
            <h2 id="project-dialog-title">
              {project.title}
              <span className="orange-period">.</span>
            </h2>
            <p className="project-detail-intro">{project.description}</p>
            <h3>{t("details")}</h3>
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
              {project.privateRepository ? (
                <>
                  {t("privateRepo")} <LockKeyhole size={18} />
                </>
              ) : (
                <>
                  {t("exploreCode")} <Code2 size={18} />
                </>
              )}
              <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </Dialog>
    </>
  );
}
