import { useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DisciplineStrip from "./components/DisciplineStrip";
import About from "./components/About";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PortfolioDialogs from "./components/PortfolioDialogs";
import { PortfolioProvider } from "./context/PortfolioProvider";
import { useLanguage } from "./context/LanguageContext";
import { useAnimatedContent } from "./hooks/useAnimatedContent";
import { useScrollReveal } from "./hooks/useScrollReveal";
import "./App.css";

export default function App() {
  const { t } = useLanguage();
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal(mainRef);
  useAnimatedContent(mainRef);

  return (
    <PortfolioProvider>
      <a className="skip-link" href="#main">
        {t("skip")}
      </a>
      <Header />
      <main id="main" ref={mainRef}>
        <Hero />
        <DisciplineStrip />
        <About />
        <Projects />
        <Gallery />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <PortfolioDialogs />
    </PortfolioProvider>
  );
}
