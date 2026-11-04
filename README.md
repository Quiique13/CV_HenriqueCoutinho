# Quiique — Henrique Coutinho

A personal portfolio built with React, TypeScript, and Vite. The visual direction combines warm paper, ink, orange, editorial typography, and an abstract photography collage.

## Run locally

```sh
npm install
npm run dev
```

Open the local address printed by Vite. On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`.

```sh
npm run build
npm run preview
```

The build checks TypeScript and generates `dist/`. Preview serves that production build locally. This is a static portfolio: it needs no database, account system, or API credentials. Configure a host to serve `dist/` at its domain root. Photos are imported from src/assets and processed by Vite. Fonts and the favicon currently use root-relative public URLs; hosting under a subdirectory needs corresponding base/URL changes.

## What is included

- Responsive navigation, a photography collage, and a small interactive smile sticker.
- An introduction and seven education/career milestones.
- savingsOS and PetStay project details, with links to their repositories.
- Eight locally stored collection covers from Henrique's Behance portfolio.
- Gallery filters and a modal image viewer with previous/next buttons, arrow-key navigation, Escape dismissal, and native dialog focus management.
- Email contact and copy-to-clipboard, with a fallback message if clipboard permission is unavailable.
- Locally bundled fonts, reduced-motion support, skip navigation, and page metadata.

## Project structure

The app follows the supplied Vite + React structure, using TypeScript's `.tsx` and `.ts` extensions.

```text
quique.v1/
|-- index.html
|-- public/
|   |-- favicon.svg
|   `-- fonts/                  # Directly served fonts and licenses
|-- src/
|   |-- assets/
|   |   |-- images/             # Profile portrait and gallery photos
|   |   `-- images.ts           # Vite-managed image imports
|   |-- components/             # Header, Footer, Hero, page sections, Dialog
|   |-- hooks/                  # Clipboard, dialog, scroll lock, context access
|   |-- context/                # Shared photo/project overlay state
|   |-- services/               # Browser clipboard integration
|   |-- utils/                  # Count formatting and index wrapping
|   |-- data/                   # Portfolio content and photo source metadata
|   |-- App.tsx                 # Provider and page composition
|   |-- main.tsx                # React entry point
|   |-- index.css               # Fonts, palette, and global styles
|   `-- App.css                 # Component styles and responsive layouts
|-- package.json
|-- vite.config.ts
`-- README.md
```

Local state stays with its section: navigation in Header, the playful caption in Hero, gallery filters in Gallery, and copy feedback in Contact. PortfolioProvider shares only the active photo/project overlay with the sections and PortfolioDialogs. The services folder currently wraps the browser clipboard; the portfolio has no backend API.

## Edit the content

| File                        | Purpose                                                      |
| --------------------------- | ------------------------------------------------------------ |
| `src/data/portfolio.ts`     | Projects, timeline, email, captions, and photo descriptions. |
| `src/data/photography.json` | Behance source URLs and image filenames.                     |
| `src/assets/images/`        | Profile portrait and gallery images.                         |
| `src/assets/images.ts`      | Image imports processed by Vite.                             |
| `src/components/`           | Individual page sections and reusable UI.                    |
| `src/hooks/`                | Reusable state and browser lifecycle logic.                  |
| `src/context/`              | Shared photo/project overlay state and provider.             |
| `src/services/`             | Browser integration calls.                                   |
| `src/utils/`                | Pure formatting and collection helpers.                      |
| `src/App.tsx`               | Top-level provider and section ordering.                     |
| `src/App.css`               | Component appearance and responsive layouts.                 |
| `src/index.css`             | Fonts, palette, and base styles.                             |
| `index.html`                | Browser title, description, and social metadata.             |

The timeline contains sourced education and work milestones. Add personal life events to `timeline` when you decide which ones belong on the public website. Update the current role when it changes.

The gallery uses downloaded Behance collection-cover images; each viewer links to the full original collection. The showreel opens its project on Behance, where the video can be watched. Project covers are original decorative illustrations for this portfolio, rather than application screenshots or original project logos. The contact link opens the visitor's email client.

## Content sources

- Career and education: privately supplied CV, updated 9 October 2026. Personal phone numbers, third-party references, and the original document link are omitted from the public repository.
- Photography and creative collections: [Henrique Costa on Behance](https://www.behance.net/henriqueCosta). Exact collection and image source URLs are retained in `src/data/photography.json`.
- Profile portrait: the original image supplied by Henrique, stored at `src/assets/images/henrique-profile.png` and featured in the hero collage.
- Project descriptions: [savingsOS README](https://github.com/Quiique13/SavingsOS#readme) and [PetStay README](https://github.com/Quiique13/PetStay#readme).
- DM Sans and Space Mono are bundled under the SIL Open Font License; license files are in `public/fonts/`.

## Technology options considered

These options can all present a timeline and photo gallery. The choice changes the development and editing workflow, rather than the visual possibilities.

| Option                                   | Good fit                                                                                           | Tradeoff for this portfolio                                                                               |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **React + TypeScript + Vite — selected** | Interactive galleries, reusable project details, and growing a frontend portfolio.                 | A build step and JavaScript dependencies. Already matches this project and both featured coding projects. |
| Jekyll                                   | A content-led portfolio with Markdown posts and collections.                                       | Ruby-based build tooling; sophisticated interactions still need JavaScript.                               |
| Plain HTML + CSS + JavaScript            | A small portfolio with minimal tooling.                                                            | Repeated layouts and filtering/modal behavior need manual organisation as it grows.                       |
| Ruby on Rails                            | A portfolio that also needs a server application, database, accounts, or a custom content manager. | More hosting and maintenance than the current presentation-focused site needs.                            |

TypeScript is the application language, React is the UI library, and Vite is the development/build tool. HTML supplies structure and CSS supplies appearance in every browser-based option.

Official references: [React](https://react.dev/learn), [Jekyll](https://jekyllrb.com/docs/), [Rails](https://guides.rubyonrails.org/getting_started.html), and [MDN web foundations](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website).

## Verification

The production build includes TypeScript checking. A before/after server-render comparison verified identical page markup apart from image asset locations. Server-rendered checks also verified both project dialogs, filtered gallery details, image availability, and wraparound navigation. Browser automation was unavailable during this session, so visual layout and interactive behavior still need manual browser verification. This local project has not been deployed.
