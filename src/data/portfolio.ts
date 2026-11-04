import photographs from "./photography.json";
import { galleryImages } from "../assets/images";

export type GalleryCategory =
  | "All"
  | "Portraits"
  | "Experiments"
  | "Design & film";
const photoDetails: Record<
  number,
  { title: string; category: Exclude<GalleryCategory, "All">; alt: string }
> = {
  104276991: {
    title: "Carina — Botanic Garden",
    category: "Portraits",
    alt: "Carina surrounded by foliage and flowers in a botanic garden",
  },
  99042381: {
    title: "Miguel — B&W",
    category: "Portraits",
    alt: "Black and white portrait from the Miguel series",
  },
  99042317: {
    title: "Marta",
    category: "Portraits",
    alt: "Portrait from the Marta photography series",
  },
  92371285: {
    title: "Neon Halos",
    category: "Experiments",
    alt: "Nighttime portrait framed by a bright cyan neon triangle",
  },
  92371029: {
    title: "Moody Winter",
    category: "Experiments",
    alt: "Atmospheric photograph from the Moody Winter series",
  },
  92342225: {
    title: "Winter Lights",
    category: "Experiments",
    alt: "Low light photograph from the Winter Lights series",
  },
  211075901: {
    title: "Myface",
    category: "Design & film",
    alt: "Selected creative work from the Myface project",
  },
  147865647: {
    title: "Showreel",
    category: "Design & film",
    alt: "Cover frame from Henrique Coutinho’s showreel",
  },
};
export const gallery = photographs.map(({ id, url }) => ({
  id,
  src: galleryImages[id],
  url,
  ...photoDetails[id],
}));

export interface Project {
  title: string;
  theme: string;
  discipline: string;
  summary: string;
  description: string;
  features: string[];
  stack: string[];
  url: string;
}
export const projects: Project[] = [
  {
    title: "savingsOS",
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

export type GalleryPhoto = (typeof gallery)[number];
export const contactEmail = "henrique.costa.coutinho@gmail.com";
export const heroCaptions = [
  "A little curious. A lot of ideas.",
  "Good work. Occasionally bad jokes.",
  "Pixel perfection. Human imperfection.",
];
