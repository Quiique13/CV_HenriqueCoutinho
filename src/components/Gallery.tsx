import { useState } from "react";
import { ArrowUpRight, Camera, Play, Plus } from "lucide-react";
import { gallery, type GalleryCategory } from "../data/portfolio";
import { usePortfolio } from "../hooks/usePortfolio";
import { formatCount } from "../utils/format";

export default function Gallery() {
  const { openPhoto } = usePortfolio();
  const [category, setCategory] = useState<GalleryCategory>("All");
  const visiblePhotos = gallery.filter(
    (photo) => category === "All" || photo.category === category,
  );
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
              People, moods, and the moments in between.
              <br />
              Selected frames from my creative archive.
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
        <div className="gallery-toolbar">
          <div
            className="gallery-filters"
            role="group"
            aria-label="Filter photography"
          >
            {(
              ["All", "Portraits", "Experiments", "Design & film"] as const
            ).map((filter) => (
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
            {formatCount(visiblePhotos.length)} SELECTED COLLECTIONS
          </span>
        </div>
        <div className="gallery-grid">
          {visiblePhotos.map((photo, index) => (
            <figure className="gallery-item" key={photo.id}>
              <button
                className="gallery-image"
                onClick={() => openPhoto(visiblePhotos, index)}
                aria-label={`View ${photo.title}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  width={808}
                  height={632}
                />
                <span className="gallery-image-overlay">
                  <span>
                    {photo.category === "Design & film" ? (
                      <Play size={20} />
                    ) : (
                      <Plus size={22} />
                    )}
                  </span>
                  <span>TAKE A CLOSER LOOK</span>
                </span>
              </button>
              <figcaption>
                <h3>{photo.title}</h3>
                <span>{photo.category}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="photo-footer">
          <span>ALL PHOTOGRAPHY & CREATIVE WORK BY HENRIQUE COUTINHO.</span>
          <span>A DIFFERENT LENS. THE SAME CURIOSITY.</span>
        </div>
      </div>
    </section>
  );
}
