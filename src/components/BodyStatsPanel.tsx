import { Activity, Battery, Droplets, Flame, Gauge, HeartPulse, Waves, Zap } from "lucide-react";
import type { ComponentType } from "react";
import type { BodyState } from "../types/game";
import { optimalRanges, stabilityLabel } from "../logic/stability";

type StatConfig = {
  key: keyof BodyState;
  label: string;
  icon: ComponentType<{ size?: number }>;
  tone: string;
};

const stats: StatConfig[] = [
  { key: "temperature", label: "Ciepłota ciała", icon: Flame, tone: "temp" },
  { key: "glucose", label: "Glukoza", icon: Zap, tone: "glucose" },
  { key: "oxygen", label: "Dostęp tlenu", icon: Waves, tone: "oxygen" },
  { key: "hydration", label: "Płyny", icon: Droplets, tone: "hydration" },
  { key: "energy", label: "Paliwo komórkowe", icon: Battery, tone: "energy" },
  { key: "stress", label: "Pobudzenie", icon: HeartPulse, tone: "stress" },
  { key: "fatigue", label: "Zmęczenie", icon: Activity, tone: "fatigue" },
  { key: "stability", label: "Stabilność", icon: Gauge, tone: "stability" },
];

export function BodyStatsPanel({ state }: { state: BodyState }) {
  return (
    <section className="panel stats-panel">
      <div className="panel-heading compact">
        <span className="eyebrow">Homeostat</span>
        <h2>Parametry organizmu</h2>
      </div>
      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const value = state[stat.key];
          const range = stat.key === "stability" ? undefined : optimalRanges[stat.key];
          return (
            <div className="stat-row" key={stat.key}>
              <div className="stat-top">
                <span className={`stat-icon ${stat.tone}`}>
                  <Icon size={16} />
                </span>
                <span>{stat.label}</span>
                <strong>{value}</strong>
              </div>
              <div className="meter">
                {range && (
                  <span
                    className="optimal-zone"
                    style={{
                      left: `${range.min ?? 0}%`,
                      width: `${(range.max ?? 100) - (range.min ?? 0)}%`,
                    }}
                  />
                )}
                <span className={`meter-fill ${stat.tone}`} style={{ width: `${value}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <p className="stability-note">
        Stan: <strong>{stabilityLabel(state.stability)}</strong>. Skala 0-100 jest modelem dydaktycznym,
        nie pomiarem medycznym. Ziel gry to dynamiczna korekta, nie maksymalna kontrola.
      </p>
    </section>
  );
}
