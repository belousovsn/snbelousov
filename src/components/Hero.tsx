import { cvPath } from "../data/profile";
import { useLang } from "../i18n/LanguageContext";

export default function Hero() {
  const { c } = useLang();
  const { profile, ui } = c;

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__main">
          <p className="kicker hero__kicker">{profile.role} · {profile.location}</p>

          <h1 className="hero__title">{profile.headline}</h1>

          <p className="hero__subtitle">{profile.subheadline}</p>

          <div className="hero__actions">
            <a href="#qa-lab" className="btn btn-primary">
              {ui.hero.tryTests}
            </a>
            <a href="#projects" className="btn btn-ghost">
              {ui.hero.viewProjects}
            </a>
            <a href="#contact" className="btn btn-ghost">
              {ui.hero.contact}
            </a>
          </div>

          <dl className="hero__facts">
            <div>
              <dt>{ui.hero.experienceLabel}</dt>
              <dd>{profile.yearsInIt} · {profile.yearsInQa}</dd>
            </div>
            <div>
              <dt>{ui.hero.automationLabel}</dt>
              <dd>{ui.hero.automationValue}</dd>
            </div>
            <div>
              <dt>{ui.hero.statusLabel}</dt>
              <dd>{profile.availability}</dd>
            </div>
          </dl>
        </div>

        <aside className="hero__aside" aria-label="Portrait">
          <figure className="portrait">
            <img
              className="portrait__img"
              src="/portrait.jpg"
              alt={`Portrait of ${profile.name}`}
              width={560}
              height={560}
              loading="eager"
            />
            <figcaption>{profile.name}</figcaption>
          </figure>

          {cvPath ? (
            <a className="portrait__cv" href={cvPath} download>
              ↓ {ui.hero.downloadCv}
            </a>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
