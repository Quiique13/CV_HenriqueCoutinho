import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  galleryCategoryMessage,
  galleryDescription,
  galleryPhotoAlt,
} from "../data/localizedPortfolio";
import { ArrowLeft, ArrowUpRight, Camera, Play, Plus } from "lucide-react";
import {
  gallery,
  galleryCategories,
  type GalleryCategory,
  type GalleryProject,
} from "../data/portfolio";
import { usePortfolio } from "../hooks/usePortfolio";
import { formatCount, formatMediaCount } from "../utils/format";
import GalleryCarousel from "./GalleryCarousel";
import ProjectVideo from "./ProjectVideo";
import ScrollRevealHeading from "./ScrollRevealHeading";

export default function Gallery() {
  const { language, t } = useLanguage();
  const { openPhoto } = usePortfolio();
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(
    null,
  );
  const projectHeading = useRef<HTMLHeadingElement>(null);
  const projectView = useRef<HTMLDivElement>(null);
  const carouselOpenButton = useRef<HTMLButtonElement>(null);
  const projectButtons = useRef(new Map<number, HTMLButtonElement>());
  const [lastProjectId, setLastProjectId] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [carouselUnavailable, setCarouselUnavailable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const visibleProjects = useMemo(
    () =>
      gallery.filter(
        (project) => category === "All" || project.category === category,
      ),
    [category],
  );
  const showCarousel =
    !reducedMotion && !carouselUnavailable && visibleProjects.length > 1;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    preference.addEventListener("change", onChange);
    return () => preference.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      projectHeading.current?.focus({ preventScroll: true });
      projectView.current?.scrollIntoView({ block: "start" });
    } else if (lastProjectId !== null) {
      const button =
        carouselOpenButton.current ?? projectButtons.current.get(lastProjectId);
      button?.focus();
    }
  }, [lastProjectId, selectedProject]);

  const description = selectedProject
    ? galleryDescription(selectedProject, language)
    : [];
  const openProject = (project: GalleryProject) => {
    setLastProjectId(project.id);
    setSelectedProject(project);
  };

  return (
    <section
      className="photo-section section-space"
      id="photography"
      aria-labelledby="photography-title"
    >
      <div className="page-width">
        <div className="section-eyebrow">
          <span>{t("galleryEyebrow")}</span>
          <Camera size={18} />
        </div>
        <div className="section-heading">
          <ScrollRevealHeading
            id="photography-title"
            lines={[t("galleryLine")]}
            accent={t("galleryAccent")}
          />
          <div data-animated-content>
            <p>
              {t("galleryCopy")}
              <br />
              {t("galleryCount", { count: gallery.length })}
            </p>
            <a
              className="text-link"
              href="https://www.behance.net/henriqueCosta"
              target="_blank"
              rel="noreferrer"
            >
              {t("allBehance")} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        {selectedProject ? (
          <div
            className="gallery-project"
            ref={projectView}
            aria-labelledby="gallery-project-title"
          >
            <div className="gallery-toolbar">
              <button
                className="gallery-back text-link"
                onClick={() => setSelectedProject(null)}
              >
                <ArrowLeft size={16} /> {t("allProjects")}
              </button>
              <span className="gallery-count">
                {formatMediaCount(
                  t,
                  selectedProject.photos.length,
                  selectedProject.videos.length,
                )}
              </span>
            </div>
            <div className="gallery-project-heading">
              <div>
                <span className="gallery-project-category">
                  {t(galleryCategoryMessage[selectedProject.category])}
                </span>
                <h3
                  id="gallery-project-title"
                  ref={projectHeading}
                  tabIndex={-1}
                >
                  {selectedProject.title}
                </h3>
              </div>
              <a
                className="text-link"
                href={selectedProject.url}
                target="_blank"
                rel="noreferrer"
              >
                {t("viewBehance")} <ArrowUpRight size={16} />
              </a>
            </div>
            {description.length > 0 && (
              <div
                className="gallery-project-description"
                data-animated-content
              >
                {description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
            {selectedProject.videos.length > 0 && (
              <div
                className="gallery-videos"
                data-animated-content
                aria-label={t("projectVideos", {
                  title: selectedProject.title,
                })}
              >
                {selectedProject.videos.map((video) => (
                  <ProjectVideo
                    key={video.id}
                    video={video}
                    projectUrl={selectedProject.url}
                  />
                ))}
              </div>
            )}
            {selectedProject.photos.length > 0 && (
              <div className="gallery-photo-grid">
                {selectedProject.photos.map((photo, index) => (
                  <figure
                    className="gallery-project-photo"
                    key={photo.id}
                    data-animated-content
                  >
                    <button
                      className="gallery-photo-button"
                      onClick={() => openPhoto(selectedProject.photos, index)}
                      aria-label={t("viewImage", {
                        title: photo.title,
                        number: photo.number,
                        total: selectedProject.photos.length,
                      })}
                    >
                      <img
                        src={photo.src}
                        alt={galleryPhotoAlt(photo, language, t)}
                        loading="lazy"
                        width={photo.width}
                        height={photo.height}
                      />
                      <span className="gallery-photo-zoom" aria-hidden="true">
                        <Plus size={20} />
                      </span>
                    </button>
                    <figcaption>
                      {formatCount(photo.number)} /{" "}
                      {formatCount(selectedProject.photos.length)}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="gallery-toolbar" data-animated-content>
              <div
                className="gallery-filters"
                role="group"
                aria-label={t("filterProjects")}
              >
                {galleryCategories.map((filter) => (
                  <button
                    key={t(galleryCategoryMessage[filter])}
                    aria-pressed={category === filter}
                    onClick={() => {
                      if (filter === category) return;
                      setLastProjectId(null);
                      setCategory(filter);
                    }}
                  >
                    {t(galleryCategoryMessage[filter])}
                    {category === filter && <span className="filter-dot" />}
                  </button>
                ))}
              </div>
              <span className="gallery-count" aria-live="polite">
                {t("projectCount", {
                  count: formatCount(visibleProjects.length),
                })}
              </span>
            </div>
            {showCarousel ? (
              <GalleryCarousel
                key={category}
                projects={visibleProjects}
                returningProjectId={lastProjectId}
                paused={paused}
                onTogglePlayback={() => setPaused((current) => !current)}
                onOpen={openProject}
                onUnavailable={() => setCarouselUnavailable(true)}
                openButtonRef={carouselOpenButton}
              />
            ) : (
              <div className="gallery-grid">
                {visibleProjects.map((project) => (
                  <figure
                    className="gallery-item"
                    key={project.id}
                    data-animated-content
                  >
                    <button
                      className="gallery-image"
                      ref={(node) => {
                        if (node) projectButtons.current.set(project.id, node);
                        else projectButtons.current.delete(project.id);
                      }}
                      onClick={() => openProject(project)}
                      aria-label={`${t("explore", { title: project.title })}, ${formatMediaCount(t, project.photos.length, project.videos.length).toLocaleLowerCase(language)}`}
                    >
                      <img
                        src={project.src}
                        alt={t("galleryCover", { title: project.title })}
                        loading="lazy"
                        width={808}
                        height={632}
                      />
                      <span
                        className="gallery-image-overlay"
                        aria-hidden="true"
                      >
                        <span>
                          {project.videos.length > 0 ? (
                            <Play size={22} />
                          ) : (
                            <ArrowUpRight size={22} />
                          )}
                        </span>
                        <span>{t("exploreProject")}</span>
                      </span>
                    </button>
                    <figcaption>
                      <h3>{project.title}</h3>
                      <span>
                        {formatMediaCount(
                          t,
                          project.photos.length,
                          project.videos.length,
                        )}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </>
        )}
        <div className="photo-footer" data-animated-content>
          <span>{t("galleryCredit")}</span>
          <span>{t("gallerySlogan")}</span>
        </div>
      </div>
    </section>
  );
}
