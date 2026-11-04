export function formatCount(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatMediaCount(images: number, videos: number): string {
  return [
    images > 0
      ? `${formatCount(images)} ${images === 1 ? "IMAGE" : "IMAGES"}`
      : "",
    videos > 0
      ? `${formatCount(videos)} ${videos === 1 ? "VIDEO" : "VIDEOS"}`
      : "",
  ]
    .filter(Boolean)
    .join(" · ");
}
