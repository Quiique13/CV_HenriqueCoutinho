import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import type { GalleryProject } from "../data/portfolio";
import { formatMediaCount } from "../utils/format";
import FlexCarousel, {
  type FlexCarouselHandle,
} from "../vendor/react-bits/flex-carousel/FlexCarousel";

type GalleryCarouselProps = {
  projects: GalleryProject[];
  returningProjectId: number | null;
  paused: boolean;
  onTogglePlayback: () => void;
  onOpen: (project: GalleryProject) => void;
  onUnavailable: () => void;
  openButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function GalleryCarousel({
  projects,
  returningProjectId,
  paused,
  onTogglePlayback,
  onOpen,
  onUnavailable,
  openButtonRef,
}: GalleryCarouselProps) {
  const { t } = useLanguage();
  const returningIndex = projects.findIndex(
    (project) => project.id === returningProjectId,
  );
  const initialIndex = Math.max(0, returningIndex);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [focused, setFocused] = useState(false);
  const [loadCarousel, setLoadCarousel] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  const stage = useRef<HTMLDivElement>(null);
  const carousel = useRef<FlexCarouselHandle>(null);
  const activeProject = projects[activeIndex] ?? projects[0];
  const items = useMemo(
    () =>
      projects.map((project) => ({
        src: project.src,
        alt: t("galleryCover", { title: project.title }),
        title: project.title,
        subtitle: formatMediaCount(
          t,
          project.photos.length,
          project.videos.length,
        ),
      })),
    [projects, t],
  );

  useEffect(() => {
    if (loadCarousel || !stage.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoadCarousel(true);
        observer.disconnect();
      },
      { rootMargin: "650px 0px" },
    );
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, [loadCarousel]);

  return (
    <div
      className="gallery-carousel"
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="gallery-carousel-stage" ref={stage}>
        {loadCarousel && (
          <FlexCarousel
            ref={carousel}
            labels={{
              region: t("galleryRegion"),
              role: t("carousel"),
              image: (number) => t("imageNumber", { number }),
              status: (title, number, total) =>
                t("slideStatus", { title, number, total }),
            }}
            items={items}
            initialIndex={initialIndex}
            intro={returningIndex >= 0 ? "none" : "deal"}
            fit="square"
            radius={10}
            lensHeight={1.06}
            tilt={60}
            roundness={0.7}
            reach={0.5}
            liquid={0.38}
            squeeze={0.17}
            cardHeight={0.65}
            autoplay={!paused && !focused}
            captions={false}
            captureWheel={false}
            focusOnClick={false}
            onChange={setActiveIndex}
            onSelect={(index) => onOpen(projects[index])}
            onUnavailable={onUnavailable}
          />
        )}
      </div>
      <div className="gallery-carousel-caption" aria-hidden="true">
        <strong>{activeProject.title}</strong>
        <span>
          {items[activeIndex]?.subtitle} · {activeIndex + 1} / {projects.length}
        </span>
      </div>
      <div
        className="gallery-carousel-controls"
        role="group"
        aria-label={t("galleryControls")}
      >
        <button
          type="button"
          className="icon-button"
          onClick={() => carousel.current?.step(-1)}
          aria-label={t("previousProject")}
        >
          <ArrowLeft size={17} aria-hidden="true" />
        </button>
        <button
          ref={openButtonRef}
          type="button"
          className="gallery-carousel-open"
          onClick={() => onOpen(activeProject)}
          aria-label={t("openNamedProject", { title: activeProject.title })}
        >
          {t("openProject")} <ArrowUpRight size={15} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-button"
          onClick={() => carousel.current?.step(1)}
          aria-label={t("nextProject")}
        >
          <ArrowRight size={17} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="icon-button"
          onClick={onTogglePlayback}
          aria-label={t(paused ? "playAutoplay" : "pauseAutoplay")}
        >
          {paused ? (
            <Play size={15} aria-hidden="true" />
          ) : (
            <Pause size={15} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
