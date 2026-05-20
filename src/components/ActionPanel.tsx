import { Cpu, Droplet, Eye, Flame, HeartPulse, Package, Zap } from "lucide-react";
import type { ComponentType } from "react";
import type { CyberneticPart, GameAction } from "../types/game";

type ActionPanelProps = {
  actions: GameAction[];
  usedActionIds: string[];
  tutorialExpectedId?: string;
  onAction: (action: GameAction) => void;
};

const icons: Record<CyberneticPart, ComponentType<{ size?: number }>> = {
  receptor: Eye,
  correlator: Cpu,
  homeostat: HeartPulse,
  alimentator: Droplet,
  accumulator: Package,
  effector: Zap,
};

const partName: Record<CyberneticPart, string> = {
  receptor: "receptor",
  correlator: "korelator",
  homeostat: "homeostat",
  alimentator: "alimentator",
  accumulator: "akumulator",
  effector: "efektor",
};

export function ActionPanel({ actions, usedActionIds, tutorialExpectedId, onAction }: ActionPanelProps) {
  return (
    <section className="panel action-panel">
      <div className="panel-heading compact">
        <span className="eyebrow">Decyzje</span>
        <h2>Panel sterowania</h2>
      </div>
      <div className="action-list">
        {actions.map((action) => {
          const Icon = icons[action.cyberneticPart] ?? Flame;
          const used = usedActionIds.includes(action.id);
          const expected = tutorialExpectedId === action.id;
          return (
            <button
              key={action.id}
              className={`action-card ${action.cyberneticPart} ${used ? "used" : ""} ${expected ? "expected" : ""}`}
              onClick={() => onAction(action)}
            >
              <span className="action-icon">
                <Icon size={18} />
              </span>
              <span className="action-copy">
                <strong>{action.label}</strong>
                <small>{partName[action.cyberneticPart]} · {action.description}</small>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
