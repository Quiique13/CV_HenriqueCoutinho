import { useState, type ReactNode } from "react";
import type { GalleryPhoto, Project } from "../data/portfolio";
import { wrapIndex } from "../utils/collection";
import { PortfolioContext, type PortfolioOverlay } from "./PortfolioContext";

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState<PortfolioOverlay>(null);

  function openPhoto(photos: GalleryPhoto[], index: number) {
    if (photos.length === 0) return;
    setOverlay({
      type: "photo",
      photos,
      index: wrapIndex(index, photos.length),
    });
  }

  function openProject(project: Project) {
    setOverlay({ type: "project", project });
  }

  function closeOverlay() {
    setOverlay(null);
  }

  function movePhoto(direction: number) {
    setOverlay((current) =>
      current?.type === "photo"
        ? {
            ...current,
            index: wrapIndex(current.index + direction, current.photos.length),
          }
        : current,
    );
  }

  return (
    <PortfolioContext.Provider
      value={{ overlay, openPhoto, openProject, closeOverlay, movePhoto }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
