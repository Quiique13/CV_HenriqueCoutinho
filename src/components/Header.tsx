import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Wordmark from "./Wordmark";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="site-header page-width"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <Wordmark label="Quiique home" />
      <nav
        className={menuOpen ? "navigation is-open" : "navigation"}
        id="main-navigation"
        aria-label="Main navigation"
      >
        {[
          ["The work", "#work"],
          ["Through my lens", "#photography"],
          ["My story", "#story"],
        ].map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <a
          className="nav-contact"
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          Say hello <ArrowUpRight size={16} />
        </a>
      </nav>
      <button
        className="menu-button icon-button"
        ref={menuButton}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}
