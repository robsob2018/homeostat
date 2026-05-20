import { AlertCircle, Stethoscope } from "lucide-react";
import type { FailureCase, FailureType } from "../types/game";

type FailureDiagnosisPanelProps = {
  failure: FailureCase;
  diagnosis?: FailureType;
  onDiagnose: (part: FailureType) => void;
  onNewFailure: () => void;
};

const options: { part: FailureType; label: string }[] = [
  { part: "receptor", label: "receptory" },
  { part: "correlator", label: "korelator" },
  { part: "homeostat", label: "homeostat" },
  { part: "alimentator", label: "alimentator" },
  { part: "accumulator", label: "akumulator" },
  { part: "effector", label: "efektory" },
];

export function FailureDiagnosisPanel({
  failure,
  diagnosis,
  onDiagnose,
  onNewFailure,
}: FailureDiagnosisPanelProps) {
  const solved = diagnosis === failure.damagedPart;

  return (
    <section className="panel failure-panel">
      <div className="panel-heading">
        <span className="eyebrow">Awaria systemu</span>
        <h2>
          <AlertCircle size={20} />
          {failure.title}
        </h2>
      </div>
      <p className="mission-description">{failure.scenario}</p>
      <div className="symptom-box">
        <Stethoscope size={18} />
        <span>{failure.symptom}</span>
      </div>

      <div className="diagnosis-grid">
        {options.map((option) => (
          <button
            key={option.part}
            className={`${diagnosis === option.part ? "selected" : ""} ${
              diagnosis && option.part === failure.damagedPart ? "correct" : ""
            }`}
            onClick={() => onDiagnose(option.part)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {diagnosis && (
        <div className={`diagnosis-result ${solved ? "good" : "bad"}`}>
          <strong>{solved ? "Diagnoza trafna" : "Diagnoza nietrafna"}</strong>
          <p>{solved ? failure.explanation : "Objawy wskazują na inny element. Porównaj: czy problem jest w odbiorze, kojarzeniu, korekcji, zasobach czy wykonaniu?"}</p>
        </div>
      )}

      <button className="primary-button" onClick={onNewFailure}>
        Nowa awaria
      </button>
    </section>
  );
}
