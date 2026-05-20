import { CheckCircle2, Info, RadioTower, TriangleAlert } from "lucide-react";
import type { FeedbackItem } from "../types/game";

const iconByTone = {
  good: CheckCircle2,
  bad: TriangleAlert,
  neutral: Info,
  complete: RadioTower,
};

export function FeedbackPanel({ feedback }: { feedback: FeedbackItem[] }) {
  const latest = feedback[0];

  return (
    <section className="panel feedback-panel">
      <div className="panel-heading compact">
        <span className="eyebrow">Sprzężenie zwrotne</span>
        <h2>Co się stało?</h2>
      </div>

      {latest ? (
        <div className={`latest-feedback ${latest.tone}`}>
          {(() => {
            const Icon = iconByTone[latest.tone];
            return <Icon size={22} />;
          })()}
          <div>
            <strong>{latest.actionLabel}</strong>
            <p>{latest.text}</p>
          </div>
        </div>
      ) : (
        <div className="latest-feedback neutral">
          <Info size={22} />
          <div>
            <strong>Gotowość systemu</strong>
            <p>Wybierz działanie. Gra pokaże, czy decyzja poprawia równowagę i jaki element cybernetyczny uruchamiasz.</p>
          </div>
        </div>
      )}

      <div className="feedback-history">
        {feedback.slice(1, 5).map((item) => (
          <div key={item.id} className={`history-item ${item.tone}`}>
            <strong>{item.actionLabel}</strong>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
