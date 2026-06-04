import { useLang } from "../i18n/LanguageContext";
import SectionHead from "./SectionHead";

export default function Projects() {
  const { c } = useLang();
  return (
    <section id="projects" className="section container">
      <SectionHead
        index="05"
        title={c.ui.sections.projects}
        aside={c.ui.sections.projectsAside}
      />

      <div className="projects">
        {c.projects.map((project) => (
          <article key={project.title} className="project">
            <header className="project__head">
              <span className={`project__kind kind--${project.kind.toLowerCase()}`}>
                {c.ui.projectKinds[project.kind]}
              </span>
              <h3 className="project__title">{project.title}</h3>
            </header>

            <p className="project__desc">{project.description}</p>

            <ul className="bullets project__bullets">
              {project.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            <ul className="tag-list project__stack">
              {project.stack.map((s) => (
                <li key={s}>
                  <span className="tag">{s}</span>
                </li>
              ))}
            </ul>

            {project.link ? (
              <a
                className="link project__link"
                href={project.link.href}
                target="_blank"
                rel="noreferrer"
              >
                {project.link.label} ↗
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
