import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import type { Lang } from "../data/profile";

const LANGS: Lang[] = ["en", "ru"];

export default function Header() {
  const { lang, setLang, c } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container site-header__inner">
        <a href="#top" className="brand" aria-label={`${c.profile.name} — home`}>
          <span className="brand__mark">SB</span>
          <span className="brand__name">{c.profile.name}</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <ul className={`site-nav__list${menuOpen ? " is-open" : ""}`}>
            {c.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <div className="lang-toggle" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button
                key={l}
                className={`lang-toggle__btn${lang === l ? " is-active" : ""}`}
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "close" : "menu"}
          </button>
        </div>
      </div>
    </header>
  );
}
