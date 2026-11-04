import { createContext } from "react";
import type { GalleryPhoto, Project } from "../data/portfolio";

export type PortfolioOverlay =
  | { type: "photo"; photos: GalleryPhoto[]; index: number }
  | { type: "project"; project: Project }
  | null;

export interface PortfolioContextValue {
  overlay: PortfolioOverlay;
  openPhoto: (photos: GalleryPhoto[], index: number) => void;
  openProject: (project: Project) => void;
  closeOverlay: () => void;
  movePhoto: (direction: number) => void;
}

export const PortfolioContext = createContext<PortfolioContextValue | null>(
  null,
);
