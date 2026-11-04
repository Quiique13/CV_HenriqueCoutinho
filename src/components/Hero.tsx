import { useState } from "react";
import { ArrowDown, Smile } from "lucide-react";
import { heroCaptions as captions } from "../data/portfolio";
import { profilePortrait, galleryImages } from "../assets/images";

export default function Hero() {
  const [caption, setCaption] = useState(0);
  return (
    <section className="hero page-width" id="home" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span>
          <span className="status-dot" /> HENRIQUE COUTINHO — MULTIDISCIPLINARY
          CREATIVE
        </span>
        <span className="edition">A WORK IN PROGRESS. LIKE ME.</span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">
            Serious about
            <br />
            the work.
            <br />
            <span>Playful</span> about
            <br />
            everything else<span className="orange-period">.</span>
          </h1>
          <p>
            I’m Henrique. Frontend developer, designer, and the person who
            always brings a camera. I turn curious ideas into things you can
            click, feel, and remember.
          </p>
          <a className="primary-button" href="#work">
            Explore my work <ArrowDown size={18} />
          </a>
          <span className="hero-annotation">
            A few different hats. One very curious head.
          </span>
        </div>
        <div
          className="hero-art"
          aria-label="My profile portrait alongside my photography"
        >
          <div className="art-grid" aria-hidden="true" />
          <div className="art-orbit" aria-hidden="true" />
          <div className="art-photo photo-main profile-card">
            <img
              src={profilePortrait}
              alt="Henrique Coutinho wearing black glasses and a navy shirt"
              width={1402}
              height={1402}
              fetchPriority="high"
            />
            <span>HENRIQUE / A.K.A. QUIIQUE</span>
          </div>
          <div className="art-photo photo-secondary">
            <img
              src={galleryImages[104276991]}
              alt="Carina, photographed in a botanic garden"
            />
            <span>A DIFFERENT PERSPECTIVE.</span>
          </div>
          <button
            className="smile-sticker"
            onClick={() => setCaption((caption + 1) % captions.length)}
            aria-label="A little personality: show another thought"
          >
            <Smile strokeWidth={1.1} aria-hidden="true" />
            <span>HUMAN, AFTER ALL</span>
          </button>
          <span className="code-sticker" aria-hidden="true">
            &lt;creative /&gt;
          </span>
          <span className="art-star" aria-hidden="true">
            ✳
          </span>
          <div className="art-caption" aria-live="polite">
            {captions[caption]}
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <span>DESIGN THINKING. DEVELOPER HANDS. PHOTOGRAPHER EYES.</span>
        <a href="#about">
          Meet the person <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
