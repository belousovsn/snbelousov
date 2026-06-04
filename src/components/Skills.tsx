import { useLang } from "../i18n/LanguageContext";
import SectionHead from "./SectionHead";

export default function Skills() {
  const { c } = useLang();
  return (
    <section id="skills" className="section container">
      <SectionHead index="04" title={c.ui.sections.skills} />

      <div className="skills">
        {c.skillGroups.map((group) => (
          <div key={group.title} className="skill-group">
            <div className="skill-group__head">
              <h3 className="skill-group__title">{group.title}</h3>
              {group.note ? (
                <p className="skill-group__note">{group.note}</p>
              ) : null}
            </div>
            <ul className="tag-list">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <span className="tag">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
