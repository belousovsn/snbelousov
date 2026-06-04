import { useLang } from "../i18n/LanguageContext";
import SectionHead from "./SectionHead";

export default function Contact() {
  const { c } = useLang();
  return (
    <section id="contact" className="section container">
      <SectionHead index="06" title={c.ui.sections.contact} aside={c.profile.location} />

      <div className="contact">
        <p className="contact__lead">{c.ui.contactLead}</p>

        <ul className="contact__list">
          {c.contacts.map((item) => (
            <li key={item.value} className="contact__item">
              <span className="contact__label">{item.label}</span>
              <a
                className="contact__value link"
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                {item.value}
              </a>
              {item.handle ? (
                <span className="contact__handle">{item.handle}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
