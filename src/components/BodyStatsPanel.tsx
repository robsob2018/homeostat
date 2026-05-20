import {
  Activity,
  Battery,
  Bus,
  Droplets,
  Flame,
  Gauge,
  HeartPulse,
  ShieldCheck,
  Signal,
  Waves,
  Zap,
} from "lucide-react";
import type { ComponentType } from "react";
import type { ParameterDefinition, SystemState } from "../types/game";
import { stabilityLabel } from "../logic/stability";

const iconByParameter: Record<string, ComponentType<{ size?: number }>> = {
  temperature: Flame,
  glucose: Zap,
  oxygen: Waves,
  hydration: Droplets,
  water: Droplets,
  energy: Battery,
  stress: HeartPulse,
  fatigue: Activity,
  stability: Gauge,
  transport: Bus,
  trust: HeartPulse,
  informationQuality: Signal,
  publicOrder: ShieldCheck,
  resourceReserve: Battery,
};

type BodyStatsPanelProps = {
  state: SystemState;
  parameters: ParameterDefinition[];
  title: string;
};

export function BodyStatsPanel({ state, parameters, title }: BodyStatsPanelProps) {
  return (
    <section className="panel stats-panel">
      <div className="panel-heading compact">
        <span className="eyebrow">Homeostat</span>
        <h2>{title}</h2>
      </div>
      <div className="stats-grid">
        {parameters.map((parameter) => {
          const Icon = iconByParameter[parameter.id] ?? Gauge;
          const value = Math.round(state[parameter.id] ?? 0);
          const tone = parameter.tone ?? "stability";
          return (
            <div className="stat-row" key={parameter.id}>
              <div className="stat-top">
                <span className={`stat-icon ${tone}`}>
                  <Icon size={16} />
                </span>
                <span>{parameter.label}</span>
                <strong>{value}</strong>
              </div>
              <div className="meter">
                <span
                  className="optimal-zone"
                  style={{
                    left: `${parameter.optimalMin}%`,
                    width: `${parameter.optimalMax - parameter.optimalMin}%`,
                  }}
                />
                <span className={`meter-fill ${tone}`} style={{ width: `${value}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <p className="stability-note">
        Stan: <strong>{stabilityLabel(state.stability)}</strong>. Skala 0-100 jest modelem dydaktycznym,
        nie pomiarem diagnostycznym. Cel gry to dynamiczna korekta, nie maksymalna kontrola.
      </p>
    </section>
  );
}
