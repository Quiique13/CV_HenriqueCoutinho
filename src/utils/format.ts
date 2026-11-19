import type { Translate } from "../data/messages";

export function formatCount(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatMediaCount(
  t: Translate,
  images: number,
  videos: number,
): string {
  return [
    images > 0
      ? `${formatCount(images)} ${t(images === 1 ? "image" : "images")}`
      : "",
    videos > 0
      ? `${formatCount(videos)} ${t(videos === 1 ? "video" : "videos")}`
      : "",
  ]
    .filter(Boolean)
    .join(" · ");
}
