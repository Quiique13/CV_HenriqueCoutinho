import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { galleryVideoLabel } from "../data/localizedPortfolio";
import type { GalleryVideo } from "../data/portfolio";

interface ProjectVideoProps {
  video: GalleryVideo;
  projectUrl: string;
}

export default function ProjectVideo({ video, projectUrl }: ProjectVideoProps) {
  const { t } = useLanguage();
  const label = galleryVideoLabel(video, t);
  return (
    <figure className="gallery-video">
      <div
        className="gallery-video-frame"
        style={{ aspectRatio: `${video.width} / ${video.height}` }}
      >
        <iframe
          src={video.embedUrl}
          title={video.title.replace(/ — .*$/, ` — ${label}`)}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption>
        <span>
          {label} / {video.provider}
        </span>
        <a href={projectUrl} target="_blank" rel="noreferrer">
          {t("watchBehance")} <ArrowUpRight size={14} />
        </a>
      </figcaption>
    </figure>
  );
}
