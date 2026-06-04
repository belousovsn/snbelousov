import { caseStudies } from "../data/profile";
import SectionHead from "./SectionHead";

export default function CaseStudies() {
  return (
    <section id="case-studies" className="section container">
      <SectionHead
        index="06"
        title="Case studies"
        aside="how I think about risk"
      />

      <div className="cases">
        {caseStudies.map((cs) => (
          <article key={cs.id} className="case">
            <header className="case__head">
              <span className="tag case__tag">{cs.tag}</span>
              <h3 className="case__title">{cs.title}</h3>
            </header>

            <div className="case__grid">
              <div className="case__block">
                <p className="case__label">Problem</p>
                <p>{cs.problem}</p>
              </div>

              <div className="case__block">
                <p className="case__label">What I tested</p>
                <ul className="bullets">
                  {cs.approach.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>

              <div className="case__block case__block--value">
                <p className="case__label">Why it matters</p>
                <p>{cs.value}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
