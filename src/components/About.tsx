import { useLang } from "../i18n/LanguageContext";
import SectionHead from "./SectionHead";

export default function About() {
  const { c } = useLang();
  const { profile, ui } = c;
  return (
    <section id="about" className="section container">
      <SectionHead index="01" title={ui.sections.about} aside={ui.sections.aboutAside} />

      <div className="about">
        <div className="about__body">
          {profile.about.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
