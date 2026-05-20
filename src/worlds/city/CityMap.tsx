import { Building2, Bus, Factory, RadioTower, ShieldCheck, Warehouse } from "lucide-react";
import type { ComponentType } from "react";
import type { CyberneticPart } from "../../types/game";
import { cityNodes, type CityNode } from "./cityAssets";

type CityMapProps = {
  activePart?: CyberneticPart;
  onPartSelect: (part: CyberneticPart) => void;
};

const partLabels: Record<CyberneticPart, string> = {
  receptor: "Receptory",
  correlator: "Korelator",
  homeostat: "Homeostat",
  alimentator: "Alimentator",
  accumulator: "Akumulator",
  effector: "Efektory",
};

const nodeIcons: Record<CityNode["fallbackShape"], ComponentType<{ size?: number }>> = {
  tower: RadioTower,
  building: Building2,
  panel: ShieldCheck,
  factory: Factory,
  warehouse: Warehouse,
  vehicle: Bus,
  water: Factory,
};

function CityShape({ node, active }: { node: CityNode; active: boolean }) {
  const Icon = nodeIcons[node.fallbackShape];

  return (
    <>
      <polygon
        className={`city-shadow ${active ? "active" : ""}`}
        points={`${node.x - 34},${node.y + 28} ${node.x},${node.y + 46} ${node.x + 44},${node.y + 25} ${node.x + 8},${node.y + 8}`}
      />
      <rect
        className={`city-block ${node.cyberneticPart} ${active ? "active" : ""}`}
        x={node.x - 28}
        y={node.y - 38}
        width={56}
        height={64}
        rx={7}
      />
      <polygon
        className={`city-roof ${node.cyberneticPart}`}
        points={`${node.x - 28},${node.y - 38} ${node.x},${node.y - 55} ${node.x + 28},${node.y - 38} ${node.x},${node.y - 22}`}
      />
      <foreignObject x={node.x - 17} y={node.y - 32} width={34} height={34}>
        <span className="city-node-icon">
          <Icon size={24} />
        </span>
      </foreignObject>
    </>
  );
}

export function CityMap({ activePart, onPartSelect }: CityMapProps) {
  return (
    <section className="panel city-map-panel">
      <div className="panel-heading">
        <span className="eyebrow">Mapa miasta</span>
        <h2>
          <Building2 size={20} />
          CyberMiasto low-poly
        </h2>
      </div>

      <div className="city-map-wrap">
        <svg className="city-map" viewBox="0 0 540 500" role="img" aria-label="Izometryczna mapa CyberMiasta">
          <defs>
            <filter id="cityGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="cityBase" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#113f67" />
              <stop offset="55%" stopColor="#102744" />
              <stop offset="100%" stopColor="#091629" />
            </linearGradient>
          </defs>

          <polygon className="city-base" points="270,36 510,182 270,470 30,182" />
          <path className="city-road main" d="M72 190 L270 305 L472 180" />
          <path className="city-road" d="M145 120 L398 395" />
          <path className="city-road" d="M395 116 L142 397" />
          <path className="city-road ring" d="M130 190 C170 112 370 112 412 190 C468 293 342 408 270 420 C190 406 74 296 130 190Z" />

          {activePart && (
            <g className={`city-flow ${activePart}`}>
              <path d="M120 160 C180 82 242 94 265 180 S342 294 410 392" />
              <circle cx="120" cy="160" r="5" />
              <circle cx="265" cy="180" r="5" />
              <circle cx="410" cy="392" r="5" />
            </g>
          )}

          {cityNodes.map((node) => {
            const active = activePart === node.cyberneticPart;

            return (
              <g
                key={node.id}
                className={`city-node ${node.cyberneticPart} ${active ? "active" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={node.label}
                onClick={() => onPartSelect(node.cyberneticPart)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") onPartSelect(node.cyberneticPart);
                }}
              >
                <CityShape node={node} active={active} />
                <text className="city-label" x={node.x} y={node.y + 58} textAnchor="middle">
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        <aside className="body-legend">
          {(Object.keys(partLabels) as CyberneticPart[]).map((part) => (
            <button
              key={part}
              type="button"
              className={`legend-chip ${part} ${activePart === part ? "active" : ""}`}
              onClick={() => onPartSelect(part)}
            >
              {partLabels[part]}
            </button>
          ))}
        </aside>
      </div>

      <p className="city-map-note">
        To izometryczny fallback z prostych brył. Katalogi assetów są przygotowane pod Kenney i KayKit,
        więc każdy węzeł można później podmienić na lekki model GLB.
      </p>
    </section>
  );
}
