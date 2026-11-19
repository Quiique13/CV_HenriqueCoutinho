import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { useLanguage } from "../context/LanguageContext";
import { ArrowDown, Smile } from "lucide-react";
import { profilePortrait } from "../assets/images";

const maxPortraitTilt = 10;
const titleLetterDelay = 25;

function HeroTitle() {
  const { t } = useLanguage();
  const heroTitleLines = [
    t("heroLine1"),
    t("heroLine2"),
    `${t("heroAccent")} ${t("heroLine3Tail")}`,
    t("heroLine4"),
  ];
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setRevealed(true);
      observer.disconnect();
    });
    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  let letterIndex = 0;
  return (
    <h1
      id="hero-title"
      ref={titleRef}
      aria-label={heroTitleLines.join(" ")}
      data-revealed={revealed || undefined}
    >
      <span aria-hidden="true">
        {heroTitleLines.map((line, lineIndex) => (
          <Fragment key={line}>
            {lineIndex > 0 && <br />}
            {line.split(" ").map((word, wordIndex) => (
              <Fragment key={word}>
                {wordIndex > 0 && " "}
                <span
                  className={
                    lineIndex === 2 && wordIndex === 0
                      ? "hero-title-word hero-title-accent"
                      : "hero-title-word"
                  }
                >
                  {Array.from(word, (letter, index) => (
                    <span
                      key={index}
                      className={
                        letter === "." &&
                        lineIndex === 3 &&
                        index === word.length - 1
                          ? "hero-title-letter orange-period"
                          : "hero-title-letter"
                      }
                    >
                      <span
                        style={{
                          animationDelay: `${letterIndex++ * titleLetterDelay}ms`,
                        }}
                      >
                        {letter}
                      </span>
                    </span>
                  ))}
                </span>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </span>
    </h1>
  );
}

function tiltPortrait(event: PointerEvent<HTMLDivElement>) {
  if (
    event.pointerType === "touch" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const frame = event.currentTarget;
  const bounds = frame.getBoundingClientRect();
  const width = frame.offsetWidth;
  const height = frame.offsetHeight;
  // Undo the frame's resting rotation to track the pointer in photo coordinates.
  const rotation = new DOMMatrixReadOnly(getComputedStyle(frame).transform);
  const pointer = rotation.inverse().transformPoint({
    x: event.clientX - bounds.left - bounds.width / 2,
    y: event.clientY - bounds.top - bounds.height / 2,
  });
  const x = Math.max(-1, Math.min(1, (2 * pointer.x) / width));
  const y = Math.max(-1, Math.min(1, (2 * pointer.y) / height));

  frame.style.setProperty("--portrait-rotate-x", `${-y * maxPortraitTilt}deg`);
  frame.style.setProperty("--portrait-rotate-y", `${x * maxPortraitTilt}deg`);
  frame.style.setProperty("--portrait-glare-x", `${(x + 1) * 50}%`);
  frame.style.setProperty("--portrait-glare-y", `${(y + 1) * 50}%`);
  frame.dataset.tilting = "true";
}

function resetPortraitTilt(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType === "touch") return;

  const frame = event.currentTarget;
  frame.style.removeProperty("--portrait-rotate-x");
  frame.style.removeProperty("--portrait-rotate-y");
  delete frame.dataset.tilting;
}

function trackStickerPeel(event: PointerEvent<HTMLButtonElement>) {
  if (
    (event.pointerType === "touch" && event.type !== "pointerdown") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const sticker = event.currentTarget;
  if (event.pointerType === "touch") sticker.dataset.peelPressed = "true";

  const bounds = sticker.getBoundingClientRect();
  const radius = sticker.offsetWidth / 2;
  const style = getComputedStyle(sticker);
  const rotation = new DOMMatrixReadOnly(style.transform);
  const { x, y } = rotation.inverse().transformPoint({
    x: event.clientX - (bounds.left + bounds.width / 2),
    y: event.clientY - (bounds.top + bounds.height / 2),
  });
  sticker.style.setProperty("--smile-light-x", `${50 + (x / radius) * 50}%`);
  sticker.style.setProperty("--smile-light-y", `${50 + (y / radius) * 50}%`);

  if (Math.hypot(x, y) < radius * 0.24) return;

  const angle = (Math.atan2(x, -y) * 180) / Math.PI;
  const previous = parseFloat(style.getPropertyValue("--smile-peel-angle"));
  const turn = ((((angle - previous + 180) % 360) + 360) % 360) - 180;
  sticker.style.setProperty("--smile-peel-angle", `${previous + turn}deg`);
}

function releaseStickerPeel(event: PointerEvent<HTMLButtonElement>) {
  if (event.pointerType === "touch")
    delete event.currentTarget.dataset.peelPressed;
}

export default function Hero() {
  const { t } = useLanguage();
  const captions = [t("caption1"), t("caption2"), t("caption3")];
  const [caption, setCaption] = useState(0);
  return (
    <section className="hero page-width" id="home" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span>
          <span className="status-dot" /> {t("heroTop")}
        </span>
        <span className="edition">{t("heroEdition")}</span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <HeroTitle />
          <p data-animated-content>{t("heroIntro")}</p>
          <a className="primary-button" href="#work" data-animated-content>
            {t("exploreWork")} <ArrowDown size={18} />
          </a>
          <span className="hero-annotation" data-animated-content>
            {t("heroNote")}
          </span>
        </div>
        <div
          className="hero-art"
          aria-label={t("portrait")}
          data-animated-content
        >
          <div className="art-grid" aria-hidden="true" />
          <div className="art-orbit" aria-hidden="true" />
          <div
            className="photo-main"
            onPointerEnter={tiltPortrait}
            onPointerMove={tiltPortrait}
            onPointerLeave={resetPortraitTilt}
            onPointerCancel={resetPortraitTilt}
          >
            <div className="art-photo">
              <img
                src={profilePortrait}
                alt={t("portraitAlt")}
                width={1402}
                height={1402}
                fetchPriority="high"
              />
              <span>{t("portraitLabel")}</span>
            </div>
          </div>

          <button
            className="smile-sticker"
            type="button"
            onClick={() =>
              setCaption((current) => (current + 1) % captions.length)
            }
            onPointerEnter={trackStickerPeel}
            onPointerMove={trackStickerPeel}
            onPointerDown={trackStickerPeel}
            onPointerUp={releaseStickerPeel}
            onPointerCancel={releaseStickerPeel}
            onLostPointerCapture={releaseStickerPeel}
            aria-label={t("anotherThought")}
          >
            <span className="smile-sticker-peel" aria-hidden="true">
              <span className="smile-sticker-front">
                <span className="smile-sticker-face">
                  <Smile strokeWidth={1.1} />
                  <span>{t("sticker")}</span>
                </span>
              </span>
              <span className="smile-sticker-fold" />
            </span>
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
        <span>{t("heroBottom")}</span>
        <a href="#about">
          {t("meetPerson")} <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
