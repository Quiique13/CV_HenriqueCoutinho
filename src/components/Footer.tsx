import { ArrowUpRight } from "lucide-react";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="site-footer page-width">
      <Wordmark />
      <span>© {new Date().getFullYear()} HENRIQUE COUTINHO</span>
      <a href="#home">
        BACK TO TOP <ArrowUpRight size={14} />
      </a>
    </footer>
  );
}
