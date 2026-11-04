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
import "./App.css";

export default function App() {
  return (
    <PortfolioProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
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
