import { Fragment, type CSSProperties } from "react";

type ScrollRevealHeadingProps = {
  id: string;
  lines: readonly [string, ...string[]];
  accent: string;
};

const wordStagger = 0.1;

export default function ScrollRevealHeading({
  id,
  lines,
  accent,
}: ScrollRevealHeadingProps) {
  const heading = [...lines, accent].join(" ");
  const duration = 1 + (heading.split(" ").length - 1) * wordStagger;
  let wordIndex = 0;

  return (
    <h2
      id={id}
      className="scroll-reveal-heading"
      aria-label={heading}
      style={{ "--reveal-duration": duration } as CSSProperties}
    >
      <span className="scroll-reveal-heading-text" aria-hidden="true">
        {[...lines, accent].map((line, lineIndex) => (
          <Fragment key={line}>
            {lineIndex > 0 && <br />}
            <span className={lineIndex === lines.length ? "serif" : undefined}>
              {line.split(" ").map((word, index) => (
                <Fragment key={index}>
                  {index > 0 && " "}
                  <span
                    className="scroll-reveal-word"
                    style={
                      {
                        "--reveal-start": wordIndex++ * wordStagger,
                      } as CSSProperties
                    }
                  >
                    {word}
                  </span>
                </Fragment>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </h2>
  );
}
