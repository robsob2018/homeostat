import { Building2, HeartPulse } from "lucide-react";
import type { WorldDefinition, WorldId } from "../types/game";

type WorldSelectorProps = {
  worlds: WorldDefinition[];
  activeWorldId: WorldId;
  onSelect: (worldId: WorldId) => void;
};

export function WorldSelector({ worlds, activeWorldId, onSelect }: WorldSelectorProps) {
  return (
    <section className="world-selector" aria-label="Wybór świata gry">
      {worlds.map((world) => {
        const active = world.id === activeWorldId;
        const Icon = world.id === "city" ? Building2 : HeartPulse;

        return (
          <button
            key={world.id}
            type="button"
            className={active ? "active" : ""}
            onClick={() => onSelect(world.id)}
            style={{
              borderColor: active ? world.theme.primary : undefined,
              boxShadow: active ? `0 0 0 2px ${world.theme.primary}33` : undefined,
            }}
          >
            <Icon size={18} />
            <span>
              <strong>{world.title}</strong>
              <small>{world.subtitle}</small>
            </span>
          </button>
        );
      })}
    </section>
  );
}
