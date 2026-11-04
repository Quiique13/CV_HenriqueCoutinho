import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Camera, Play, Plus } from "lucide-react";
import {
  gallery,
  galleryCategories,
  type GalleryCategory,
  type GalleryProject,
} from "../data/portfolio";
import { usePortfolio } from "../hooks/usePortfolio";
import { formatCount, formatMediaCount } from "../utils/format";
import ProjectVideo from "./ProjectVideo";

export default function Gallery() {
  const { openPhoto } = usePortfolio();
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(
    null,
  );
  const projectHeading = useRef<HTMLHeadingElement>(null);
  const projectView = useRef<HTMLDivElement>(null);
  const projectButtons = useRef(new Map<number, HTMLButtonElement>());
  const lastProjectId = useRef<number | null>(null);
  const visibleProjects = gallery.filter(
    (project) => category === "All" || project.category === category,
  );

  useEffect(() => {
    if (selectedProject) {
      projectHeading.current?.focus({ preventScroll: true });
      projectView.current?.scrollIntoView({ block: "start" });
    } else if (lastProjectId.current !== null) {
      projectButtons.current.get(lastProjectId.current)?.focus();
    }
  }, [selectedProject]);
  return (
    <section
      className="photo-section section-space"
      id="photography"
      aria-labelledby="photography-title"
    >
      <div className="page-width">
        <div className="section-eyebrow">
          <span>03 / A DIFFERENT KIND OF CAPTURE</span>
          <Camera size={18} />
        </div>
        <div className="section-heading">
          <h2 id="photography-title">
            Sometimes, I let
            <br />
            <span className="serif">the light talk.</span>
          </h2>
          <div>
            <p>
              Photography, design, film, and sound.
              <br />
              {gallery.length} projects, each with a story of its own.
            </p>
            <a
              className="text-link"
              href="https://www.behance.net/henriqueCosta"
              target="_blank"
              rel="noreferrer"
            >
              The full picture on Behance <ArrowUpRight size={16} />
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
                <ArrowLeft size={16} /> All projects
              </button>
              <span className="gallery-count">
                {formatMediaCount(
                  selectedProject.photos.length,
                  selectedProject.videos.length,
                )}
              </span>
            </div>
            <div className="gallery-project-heading">
              <div>
                <span className="gallery-project-category">
                  {selectedProject.category}
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
                View project on Behance <ArrowUpRight size={16} />
              </a>
            </div>
            {selectedProject.description.length > 0 && (
              <div className="gallery-project-description">
                {selectedProject.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
            {selectedProject.videos.length > 0 && (
              <div
                className="gallery-videos"
                aria-label={`${selectedProject.title} videos`}
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
                  <figure className="gallery-project-photo" key={photo.id}>
                    <button
                      className="gallery-photo-button"
                      onClick={() => openPhoto(selectedProject.photos, index)}
                      aria-label={`View ${photo.title}, image ${photo.number} of ${selectedProject.photos.length}`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
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
            <div className="gallery-toolbar">
              <div
                className="gallery-filters"
                role="group"
                aria-label="Filter creative projects"
              >
                {galleryCategories.map((filter) => (
                  <button
                    key={filter}
                    aria-pressed={category === filter}
                    onClick={() => setCategory(filter)}
                  >
                    {filter}
                    {category === filter && <span className="filter-dot" />}
                  </button>
                ))}
              </div>
              <span className="gallery-count" aria-live="polite">
                {formatCount(visibleProjects.length)} PROJECTS
              </span>
            </div>
            <div className="gallery-grid">
              {visibleProjects.map((project) => (
                <figure className="gallery-item" key={project.id}>
                  <button
                    className="gallery-image"
                    ref={(node) => {
                      if (node) projectButtons.current.set(project.id, node);
                      else projectButtons.current.delete(project.id);
                    }}
                    onClick={() => {
                      lastProjectId.current = project.id;
                      setSelectedProject(project);
                    }}
                    aria-label={`Explore ${project.title}, ${formatMediaCount(project.photos.length, project.videos.length).toLowerCase()}`}
                  >
                    <img
                      src={project.src}
                      alt={project.alt}
                      loading="lazy"
                      width={808}
                      height={632}
                    />
                    <span className="gallery-image-overlay" aria-hidden="true">
                      <span>
                        {project.videos.length > 0 ? (
                          <Play size={22} />
                        ) : (
                          <ArrowUpRight size={22} />
                        )}
                      </span>
                      <span>EXPLORE PROJECT</span>
                    </span>
                  </button>
                  <figcaption>
                    <h3>{project.title}</h3>
                    <span>
                      {formatMediaCount(
                        project.photos.length,
                        project.videos.length,
                      )}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        )}
        <div className="photo-footer">
          <span>ALL PHOTOGRAPHY & CREATIVE WORK BY HENRIQUE COUTINHO.</span>
          <span>A DIFFERENT LENS. THE SAME CURIOSITY.</span>
        </div>
      </div>
    </section>
  );
}
