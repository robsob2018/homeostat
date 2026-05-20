import { BookOpen } from "lucide-react";
import { glossary } from "../data/glossary";

export function GlossaryPanel() {
  return (
    <section className="panel glossary-panel">
      <div className="panel-heading compact">
        <span className="eyebrow">Słownik</span>
        <h2>
          <BookOpen size={18} />
          Pojęcia cybernetyczne
        </h2>
      </div>
      <div className="glossary-list">
        {glossary.map((entry) => (
          <details key={entry.term} className={entry.cyberneticPart ?? ""}>
            <summary>{entry.term}</summary>
            <p>{entry.definition}</p>
            <small>Przykład: {entry.example}</small>
          </details>
        ))}
      </div>
    </section>
  );
}
