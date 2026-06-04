import { useLang } from "../i18n/LanguageContext";

export default function Footer() {
  const { c } = useLang();
  const { profile, ui } = c;
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__name">{profile.name}</p>
        <p className="site-footer__note">
          {profile.role} · {profile.location}
        </p>
        <p className="site-footer__meta">
          <span>© {year}</span>
          <span aria-hidden="true">·</span>
          <span>{ui.footer.builtWith}</span>
          <a href="#top" className="link">
            {ui.footer.backToTop}
          </a>
        </p>
      </div>
    </footer>
  );
}
