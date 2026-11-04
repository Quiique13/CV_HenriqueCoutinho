import behanceProjects from "./photography.json";
import {
  galleryImages,
  galleryPhotoImages,
  savingsOSLogo,
} from "../assets/images";

export const galleryCategories = [
  "All",
  "Photography",
  "Design",
  "Film & sound",
] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryPhoto {
  id: number;
  projectId: number;
  title: string;
  src: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  number: number;
}

export interface GalleryVideo {
  id: number;
  title: string;
  label: string;
  provider: "Adobe" | "YouTube";
  embedUrl: string;
  width: number;
  height: number;
}

export interface GalleryProject {
  id: number;
  title: string;
  src: string;
  url: string;
  alt: string;
  category: Exclude<GalleryCategory, "All">;
  description: string[];
  photos: GalleryPhoto[];
  videos: GalleryVideo[];
}

export const gallery: GalleryProject[] = behanceProjects.map(
  ({ id, title, url, file, alt, category, description, photos, videos }) => ({
    id,
    title,
    src: galleryImages[file],
    url,
    alt,
    category: category as GalleryProject["category"],
    description,
    photos: photos.map(({ id: photoId, file, alt, width, height }, index) => ({
      id: photoId,
      projectId: id,
      title,
      src: galleryPhotoImages[file],
      url,
      alt,
      width,
      height,
      number: index + 1,
    })),
    videos: videos.map((video) => ({
      ...video,
      provider: video.provider as GalleryVideo["provider"],
    })),
  }),
);

export interface Project {
  title: string;
  logo?: string;
  theme: string;
  discipline: string;
  summary: string;
  description: string;
  features: string[];
  stack: string[];
  url: string;
  privateRepository?: boolean;
}
export const projects: Project[] = [
  {
    title: "savingsOS",
    logo: savingsOSLogo,
    theme: "savings",
    discipline: "PERSONAL FINANCE",
    summary: "Making everyday finances a little easier to understand.",
    description:
      "A personal finance planner that brings everyday purchases, monthly bills, and annual expenses into one considered interface.",
    features: [
      "Track expenses, income, accounts, and transfers.",
      "Explore finances through charts and a responsive interface.",
      "Manage separate local profiles and export backups.",
    ],
    stack: ["React", "TypeScript", "Vite", "Recharts"],
    url: "https://github.com/Quiique13/SavingsOS",
  },
  {
    title: "PetStay",
    theme: "petstay",
    discipline: "PET HOTEL MANAGEMENT",
    summary: "A more organised stay for our four-legged friends.",
    description:
      "A management application for pet hotel owners, designed in European Portuguese to keep bookings, guests, and the day-to-day details together.",
    features: [
      "Manage guests, owners, bookings, and payment status.",
      "Set age-based and seasonal pricing.",
      "Plan capacity and occupancy with a monthly revenue simulator.",
    ],
    stack: ["React", "TypeScript", "Vite"],
    url: "https://github.com/Quiique13/PetStay",
  },
  {
    title: "BattleCraft",
    theme: "battlecraft",
    discipline: "ESPORTS PLATFORM",
    summary: "Bringing esports communities into the game.",
    description:
      "An esports platform built around digital card collections, team building, and league engagement, with live broadcast tools and Twitch integrations.",
    features: [
      "Collect player cards, build teams, and compete in rankings.",
      "Explore match statistics, collection boosts, rewards, and battle passes.",
      "Connect Twitch integrations with live broadcast overlays and donation updates.",
    ],
    stack: ["Ruby on Rails", "Hotwire", "PostgreSQL", "Redis", "Tailwind CSS"],
    url: "https://github.com/wlfz/BattleCraft",
    privateRepository: true,
  },
];

// Professional and education milestones from the CV updated 9 October 2026.
// Personal life milestones can be added here without changing the timeline UI.
export const timeline = [
  {
    date: "2025 — PRESENT",
    kind: "WORK",
    title: "Frontend Developer",
    place: "Elisk",
    description:
      "Responsive applications, API integrations, live broadcast overlays, and real-time monitoring interfaces.",
  },
  {
    date: "2021 — 2024",
    kind: "WORK",
    title: "Creative Lead",
    place: "Inygon",
    description:
      "Broadcast graphics, event branding, social content, and video production.",
  },
  {
    date: "2021",
    kind: "WORK",
    title: "Graphic Designer Intern",
    place: "myface",
    description:
      "Editorial layouts, product photography, and visual assets for print and digital.",
  },
  {
    date: "2021",
    kind: "INDEPENDENT",
    title: "Designer, Photographer & Videographer",
    place: "Freelance",
    description:
      "Photography, video, and creative campaigns for a range of clients.",
  },
  {
    date: "2021",
    kind: "EDUCATION",
    title: "Creative Media",
    place: "DkIT · Ireland",
    description: "A chapter in Ireland, exploring creative media.",
  },
  {
    date: "2018 — 2021",
    kind: "EDUCATION",
    title: "Communication Technologies",
    place: "ISMAI",
    description:
      "Developing a foundation in communication and creative technology.",
  },
  {
    date: "2016 — 2018",
    kind: "EDUCATION",
    title: "Electrical Engineering",
    place: "ISEP",
    description: "The technical beginning of a creative journey.",
  },
];

export const contactEmail = "henrique.costa.coutinho@gmail.com";

export const heroCaptions = [
  "A little curious. A lot of ideas.",
  "Good work. Occasionally bad jokes.",
  "Pixel perfection. Human imperfection.",
];
