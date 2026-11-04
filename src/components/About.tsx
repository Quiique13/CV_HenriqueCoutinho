import { Plus } from "lucide-react";

export default function About() {
  return (
    <section
      className="about-section page-width section-space"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="section-eyebrow">
        <span>01 / THE PERSON BEHIND THE PIXELS</span>
        <Plus size={18} />
      </div>
      <div className="about-layout">
        <h2 id="about-title">
          A creative brain.
          <br />A technical side.
          <br />
          <span className="serif">Same person.</span>
        </h2>
        <div className="about-copy">
          <p>
            I’ve moved between design, photography, live broadcasts, and
            frontend development. Different mediums. The same instinct to make
            something worth paying attention to.
          </p>
          <p>
            Today, I build responsive interfaces at Elisk, bringing a designer’s
            eye to code. Away from the screen, I’m usually looking through a
            viewfinder. The curiosity tends to come with me.
          </p>
          <div className="skill-tags">
            {[
              "React",
              "TypeScript",
              "Ruby on Rails",
              "Figma",
              "Adobe Suite",
              "JavaScript",
              "Tailwind CSS",
            ].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
