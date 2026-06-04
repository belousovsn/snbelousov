interface SectionHeadProps {
  index: string;
  title: string;
  aside?: string;
}

/** Editorial section header: "01 — Title ............ aside". */
export default function SectionHead({ index, title, aside }: SectionHeadProps) {
  return (
    <div className="section-head">
      <span className="section-index">{index}</span>
      <h2 className="section-title">{title}</h2>
      {aside ? <span className="section-aside">{aside}</span> : null}
    </div>
  );
}
