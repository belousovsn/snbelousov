import { useLang } from "../i18n/LanguageContext";
import SectionHead from "./SectionHead";

export default function Experience() {
  const { c } = useLang();
  return (
    <section id="experience" className="section container">
      <SectionHead index="03" title={c.ui.sections.experience} />

      <div className="experience">
        {c.experience.map((job) => (
          <article key={job.company} className="job">
            <div className="job__meta">
              <p className="job__period kicker">{job.period}</p>
              <h3 className="job__role">{job.role}</h3>
              <p className="job__company">{job.company}</p>
              <p className="job__domain">{job.domain}</p>
            </div>

            <div className="job__detail">
              <p className="job__summary">{job.summary}</p>
              <ul className="bullets">
                {job.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
