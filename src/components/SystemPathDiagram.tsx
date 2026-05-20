import type { CyberneticPart } from "../types/game";

const path: { part: CyberneticPart | "feedback"; label: string }[] = [
  { part: "receptor", label: "receptor" },
  { part: "correlator", label: "korelator" },
  { part: "homeostat", label: "homeostat" },
  { part: "alimentator", label: "alimentator" },
  { part: "accumulator", label: "akumulator" },
  { part: "effector", label: "efektor" },
  { part: "feedback", label: "feedback" },
];

export function SystemPathDiagram({ usedParts, visible }: { usedParts: CyberneticPart[]; visible: boolean }) {
  if (!visible) return null;

  const usedSet = new Set(usedParts);
  const feedbackActive = usedParts.includes("effector");

  return (
    <section className="panel path-panel">
      <div className="panel-heading compact">
        <span className="eyebrow">Mini-mapa przepływu</span>
        <h2>Droga bodźca i energii</h2>
      </div>
      <div className="path-diagram">
        {path.map((node, index) => {
          const active = node.part === "feedback" ? feedbackActive : usedSet.has(node.part);
          return (
            <div className={`path-node ${node.part} ${active ? "active" : ""}`} key={node.label}>
              <span>{index + 1}</span>
              <strong>{node.label}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}
