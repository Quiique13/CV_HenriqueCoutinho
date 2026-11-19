import { useLayoutEffect, type RefObject } from "react";

export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    const headings = Array.from(
      container.querySelectorAll<HTMLHeadingElement>(".scroll-reveal-heading"),
    );
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let frame: number | null = null;

    const update = () => {
      frame = null;
      if (!motion.matches) return;

      const { innerHeight, scrollY } = window;
      const scrollEnd = document.documentElement.scrollHeight - innerHeight;
      const distance = innerHeight * 0.25;
      const positions = headings.map(
        (heading) => heading.getBoundingClientRect().top + scrollY,
      );
      headings.forEach((heading, index) => {
        const entry = positions[index] - innerHeight * 0.98;
        const end = Math.min(entry + distance, scrollEnd);
        const start = Math.min(entry, end - distance * 0.25);
        const progress = Math.min(
          1,
          Math.max(0, (scrollY - start) / (end - start)),
        );
        const value = progress.toFixed(3);
        if (heading.style.getPropertyValue("--reveal-progress") !== value) {
          heading.style.setProperty("--reveal-progress", value);
          heading.toggleAttribute("data-revealing", value !== "1.000");
        }
      });
    };

    const schedule = () => {
      if (frame === null && motion.matches)
        frame = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    update();

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, [ref]);
}
