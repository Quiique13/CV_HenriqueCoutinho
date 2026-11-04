export { default as profilePortrait } from "./images/henrique-profile.png";
export { default as savingsOSLogo } from "./images/savingsOS.svg";

const coverImports = import.meta.glob<string>("./images/behance/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

export const galleryImages: Record<string, string> = Object.fromEntries(
  Object.entries(coverImports).map(([path, src]) => [
    path.replace("./images/", ""),
    src,
  ]),
);

const photoImports = import.meta.glob<string>(
  "./images/photography/**/*.{jpg,jpeg,png,webp,gif}",
  { eager: true, query: "?url", import: "default" },
);

export const galleryPhotoImages: Record<string, string> = Object.fromEntries(
  Object.entries(photoImports).map(([path, src]) => [
    path.replace("./images/photography/", ""),
    src,
  ]),
);
