# Quiique — Henrique Coutinho

A personal portfolio built with React, TypeScript, and Vite. The visual direction combines warm paper, ink, orange, editorial typography, and a framed profile portrait.

## Download a release

Download the production web app from [GitHub Releases](https://github.com/Quiique13/CV_HenriqueCoutinho/releases/latest). The `Quiique-1.0.0-web.zip` archive contains the compiled portfolio, bundled images and fonts, app installation icons, and instructions. `SHA256SUMS.txt` lets you verify the download.

Extract the archive and serve its `dist/` folder with a static web server. For example, with Node.js installed, run `npx --yes serve dist` from the extracted folder and open the address it prints. The release uses relative asset URLs so it can also be uploaded to a static host at its root or a subdirectory. Opening `index.html` directly from the filesystem is not supported. Embedded videos need an internet connection.

A release provides downloadable files. The live web app is published separately through GitHub Pages.

## Open the web app

The deployment address is [Quiique](https://quiique13.github.io/CV_HenriqueCoutinho/). It becomes available after GitHub Pages is enabled and the [Quiique web app workflow](https://github.com/Quiique13/CV_HenriqueCoutinho/actions/workflows/webapp-pages.yml) completes successfully.

Use **Install app** in Chrome or Edge, or **Share → Add to Home Screen** in Safari on iPhone, to open the portfolio in its own window. Internet is required to load the portfolio and its embedded videos.

## GitHub Pages deployment

The workflow builds changes to `main` and publishes only `dist/`. Pull requests build for verification without deploying. In the repository's **Settings → Pages**, select **GitHub Actions** as the source. GitHub Pages requires a public repository on the free plan, or a plan that supports Pages for private repositories. Changing a repository to public exposes its source and commit history.

The GitHub build uses the Pages base path for scripts, styles, images, fonts, icons, and the web app manifest. The manifest uses relative URLs so installation stays inside this portfolio, alongside SavingsOS and PetStay. There is no service worker or offline cache.

To check the hosted edition locally:

```sh
npm run build:web
npm run preview:web
```

Open `/CV_HenriqueCoutinho/` at the preview server's address. `npm run build` still produces the edition for a domain root. If the repository is renamed or moved to another host, set `VITE_BASE_PATH` when running `build:web`; the workflow derives it from GitHub Pages settings automatically.

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

The build checks TypeScript and generates `dist/`. Preview serves that production build locally. This is a static portfolio: it needs no database, account system, or API credentials. Configure a host to serve `dist/` at its domain root, or use the GitHub Pages build above for the repository subdirectory. Photos are imported from src/assets and processed by Vite; public fonts, icons, and the manifest follow the configured base path.

## What is included

- Responsive navigation and a hero featuring Henrique's framed profile portrait with playful accents.
- An introduction and seven education/career milestones.
- savingsOS, PetStay, and BattleCraft coding project details, with links to their repositories.
- All 33 publicly listed Behance projects, with locally stored covers and 137 images, grouped into separate project galleries.
- 18 embedded videos across 13 projects, including Adobe-hosted films and the YouTube-hosted 25FJ project.
- Photography, Design, and Film & sound filters, media counts, a return-to-projects action, and a modal image viewer with navigation within each project, arrow keys, Escape dismissal, and native dialog focus management.
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

Local state stays with its section: navigation in Header, the playful caption in Hero, gallery filters in Gallery, and copy feedback in Contact. PortfolioProvider shares only the active photo/project overlay with the sections and PortfolioDialogs. The services folder currently wraps the browser clipboard; the portfolio has no backend API. `.github/workflows/webapp-pages.yml` builds and publishes the web app. `public/manifest.webmanifest` and `public/icons/` provide its installation metadata and home-screen icons.

## Edit the content

| File                        | Purpose                                                                                   |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `src/data/portfolio.ts`     | Typed gallery content, coding projects, timeline, email, and captions.                    |
| `src/data/photography.json` | Full Behance project manifest, descriptions, categories, image sources, and video embeds. |
| `src/assets/images/`        | Profile portrait and gallery images.                                                      |
| `src/assets/images.ts`      | Image imports processed by Vite.                                                          |
| `src/components/`           | Individual page sections and reusable UI.                                                 |
| `src/hooks/`                | Reusable state and browser lifecycle logic.                                               |
| `src/context/`              | Shared photo/project overlay state and provider.                                          |
| `src/services/`             | Browser integration calls.                                                                |
| `src/utils/`                | Pure formatting and collection helpers.                                                   |
| `src/App.tsx`               | Top-level provider and section ordering.                                                  |
| `src/App.css`               | Component appearance and responsive layouts.                                              |
| `src/index.css`             | Fonts, palette, and base styles.                                                          |
| `index.html`                | Browser title, description, and social metadata.                                          |

The timeline contains sourced education and work milestones. Add personal life events to `timeline` when you decide which ones belong on the public website. Update the current role when it changes.

The gallery includes all 33 public projects listed on [Henrique's Behance profile](https://www.behance.net/henriqueCosta), checked through the final pagination page on 4 November 2026. This is a local snapshot; new Behance projects must be added to the manifest and their image assets imported. Selecting a cover opens that project's images, videos, and original project notes, including concept disclaimers and creative credits. Selecting an image opens the viewer, whose arrows stay within the same project. Returning to the overview preserves the category filter and restores focus to the selected cover. Each project and viewer links to its original Behance page. Project images are stored in `src/assets/images/photography/<project-id>/` and covers in `src/assets/images/behance/` as WebP files, loaded lazily, and displayed at their original aspect ratios. Their Behance source URLs, local filenames, and dimensions are retained in `src/data/photography.json`. The savingsOS project cover and details use the logo supplied by Henrique. The PetStay cover is a decorative illustration for this portfolio. The contact link opens the visitor's email client.

Videos use the existing Adobe players and a privacy-enhanced YouTube embed, so no manual video import is needed for the current portfolio. Players are only mounted inside the selected project, load lazily, support fullscreen, and are removed when leaving the project. The two versions of Disconnected retain their Portuguese and English labels. A visible "Watch on Behance" link accompanies each player. Adobe streaming URLs expire, so the app stores the stable player embed URLs rather than direct MP4 or HLS URLs. If videos should be hosted independently of Adobe and YouTube, their original video files would be needed; they are not included in this repository.

## Content sources

- Career and education: privately supplied CV, updated 9 October 2026. Personal phone numbers, third-party references, and the original document link are omitted from the public repository.
- Photography and creative collections: [Henrique Costa on Behance](https://www.behance.net/henriqueCosta). Exact collection and image source URLs are retained in `src/data/photography.json`.
- Profile portrait: the original image supplied by Henrique, stored at `src/assets/images/henrique-profile.png` and featured in the hero section.
- savingsOS logo: the supplied vector file, stored at `src/assets/images/savingsOS.svg`.
- Project descriptions: [savingsOS README](https://github.com/Quiique13/SavingsOS#readme), [PetStay README](https://github.com/Quiique13/PetStay#readme), and [BattleCraft README](https://github.com/wlfz/BattleCraft#readme). BattleCraft's stack is based on its Gemfile and package.json; its repository is private and the project dialog labels the link accordingly. The trading-card cover is a decorative illustration created for this portfolio.
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

The production build includes TypeScript checking. Build and ESLint checks pass. DOM integration checks verified that the gallery matches the complete 33-project public listing, all 137 images open, all 18 video iframes have stable source URLs and fallback links, video players are removed when leaving a project, and category filters and keyboard focus persist when returning to the overview. Image navigation, wraparound, arrow keys, counts, and local image dimensions also passed. Availability checks confirmed that all 17 Adobe video streams respond and YouTube provides an embed for 25FJ. The DOM checks used a simulated dialog API and do not test actual video playback, native browser dialog behavior, or visual layout. The GitHub Pages workflow publishes the hosted edition from main; check its latest deployment for the current status.
