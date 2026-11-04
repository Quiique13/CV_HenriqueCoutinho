import { ArrowUpRight } from "lucide-react";
import type { GalleryVideo } from "../data/portfolio";

interface ProjectVideoProps {
  video: GalleryVideo;
  projectUrl: string;
}

export default function ProjectVideo({ video, projectUrl }: ProjectVideoProps) {
  return (
    <figure className="gallery-video">
      <div
        className="gallery-video-frame"
        style={{ aspectRatio: `${video.width} / ${video.height}` }}
      >
        <iframe
          src={video.embedUrl}
          title={video.title}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption>
        <span>
          {video.label} / {video.provider}
        </span>
        <a href={projectUrl} target="_blank" rel="noreferrer">
          Watch on Behance <ArrowUpRight size={14} />
        </a>
      </figcaption>
    </figure>
  );
}
