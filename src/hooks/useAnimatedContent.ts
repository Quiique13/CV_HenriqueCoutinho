import { useLayoutEffect, type RefObject } from "react";

const selector = "[data-animated-content]";

export function useAnimatedContent(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container || !("IntersectionObserver" in window)) return;

    const pending = new Set<HTMLElement>();
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");

    const reveal = (element: HTMLElement, animate: boolean) => {
      observer.unobserve(element);
      pending.delete(element);
      element.dataset.contentState = animate ? "entering" : "visible";
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting, intersectionRatio } of entries) {
          const element = target as HTMLElement;
          if (
            isIntersecting &&
            intersectionRatio >= 0.1 &&
            pending.has(element)
          ) {
            reveal(element, motion.matches);
          }
        }
      },
      { threshold: 0.1 },
    );

    const sync = () => {
      for (const element of pending) {
        if (container.contains(element)) continue;
        observer.unobserve(element);
        pending.delete(element);
        delete element.dataset.contentState;
      }

      for (const element of container.querySelectorAll<HTMLElement>(selector)) {
        if (element.dataset.contentState) continue;
        if (element.contains(document.activeElement)) {
          reveal(element, false);
          continue;
        }
        element.dataset.contentState = "pending";
        pending.add(element);
        observer.observe(element);
      }
    };

    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>(selector);
      if (element && element.dataset.contentState !== "visible")
        reveal(element, false);
    };

    const settle = (event: AnimationEvent) => {
      const element = event.target;
      if (
        event.animationName === "content-enter" &&
        element instanceof HTMLElement &&
        element.dataset.contentState === "entering"
      ) {
        element.dataset.contentState = "visible";
      }
    };

    sync();
    const mutations = new MutationObserver(sync);
    mutations.observe(container, { childList: true, subtree: true });
    container.addEventListener("focusin", onFocus);
    container.addEventListener("animationend", settle);
    container.addEventListener("animationcancel", settle);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      container.removeEventListener("focusin", onFocus);
      container.removeEventListener("animationend", settle);
      container.removeEventListener("animationcancel", settle);
      for (const element of container.querySelectorAll<HTMLElement>(selector)) {
        delete element.dataset.contentState;
      }
    };
  }, [ref]);
}
