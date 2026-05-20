import { ExternalLink, Rotate3D, ScanSearch } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { CyberneticPart } from "../types/game";

type BodyMapProps = {
  activePart?: CyberneticPart;
  onPartSelect: (part: CyberneticPart) => void;
};

type ZAnatomyModelId = "neurology" | "splanchnology" | "angiology" | "myology";

const partLabels: Record<CyberneticPart, string> = {
  receptor: "Receptory",
  correlator: "Korelator",
  homeostat: "Homeostat",
  alimentator: "Alimentator",
  accumulator: "Akumulator",
  effector: "Efektory",
};

const zAnatomyModels: Record<
  ZAnatomyModelId,
  {
    label: string;
    uid: string;
    url: string;
    note: string;
    systems: CyberneticPart[];
  }
> = {
  neurology: {
    label: "Neurology",
    uid: "3bfe9ac6efd84555a311f8ea50dd174d",
    url: "https://sketchfab.com/3d-models/neurology-3bfe9ac6efd84555a311f8ea50dd174d",
    note: "Układ nerwowy: mózg, rdzeń i nerwy jako korelator sygnałów.",
    systems: ["correlator", "receptor", "homeostat"],
  },
  splanchnology: {
    label: "Splanchnology",
    uid: "5cfafb312f504815aa3fec55735607a6",
    url: "https://sketchfab.com/3d-models/splanchnology-5cfafb312f504815aa3fec55735607a6",
    note: "Narządy trzewne: płuca i przewód pokarmowy jako alimentator oraz narządy zasobów.",
    systems: ["alimentator", "accumulator", "homeostat"],
  },
  angiology: {
    label: "Angiology",
    uid: "0caae8f894cc40b69f3f78adf14b9665",
    url: "https://sketchfab.com/3d-models/angiology-0caae8f894cc40b69f3f78adf14b9665",
    note: "Układ krążenia: serce i naczynia jako transport, efektory i element regulacji.",
    systems: ["homeostat", "effector", "alimentator"],
  },
  myology: {
    label: "Myology",
    uid: "31b40fd809b14665b93773936d67c52c",
    url: "https://sketchfab.com/3d-models/myology-31b40fd809b14665b93773936d67c52c",
    note: "Mięśnie: efektory ruchu, drżenia i znaczący magazyn glikogenu.",
    systems: ["effector", "accumulator"],
  },
};

const modelForPart: Record<CyberneticPart, ZAnatomyModelId> = {
  receptor: "neurology",
  correlator: "neurology",
  homeostat: "angiology",
  alimentator: "splanchnology",
  accumulator: "myology",
  effector: "myology",
};

export function BodyMap({ activePart, onPartSelect }: BodyMapProps) {
  const [selectedModel, setSelectedModel] = useState<ZAnatomyModelId>("splanchnology");
  const model = zAnatomyModels[selectedModel];

  useEffect(() => {
    if (activePart) setSelectedModel(modelForPart[activePart]);
  }, [activePart]);

  const embedUrl = useMemo(() => {
    const params = new URLSearchParams({
      autostart: "1",
      preload: "1",
      ui_theme: "dark",
      ui_infos: "0",
      ui_watermark: "0",
      ui_stop: "0",
    });

    return `https://sketchfab.com/models/${model.uid}/embed?${params.toString()}`;
  }, [model.uid]);

  return (
    <section className="panel body-panel z-anatomy-panel">
      <div className="panel-heading">
        <span className="eyebrow">Mapa organizmu</span>
        <h2>
          <Rotate3D size={20} />
          Z-Anatomy 3D
        </h2>
      </div>

      <div className="z-anatomy-layout">
        <div className="z-anatomy-viewer">
          <iframe
            key={model.uid}
            title={`Z-Anatomy ${model.label}`}
            src={embedUrl}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
          />
          <div className="z-anatomy-overlay">
            <span>
              <ScanSearch size={15} />
              obracaj, przybliżaj i wybieraj struktury w viewerze
            </span>
          </div>
        </div>

        <aside className="z-anatomy-controls">
          <div className="model-picker">
            <span className="control-label">Modele Z-Anatomy</span>
            {(Object.keys(zAnatomyModels) as ZAnatomyModelId[]).map((id) => (
              <button
                key={id}
                className={selectedModel === id ? "active" : ""}
                type="button"
                onClick={() => setSelectedModel(id)}
              >
                {zAnatomyModels[id].label}
              </button>
            ))}
          </div>

          <div className="cybernetic-picker">
            <span className="control-label">Połącz z mechaniką gry</span>
            {(Object.keys(partLabels) as CyberneticPart[]).map((part) => (
              <button
                key={part}
                className={`${part} ${activePart === part ? "active" : ""}`}
                type="button"
                onClick={() => onPartSelect(part)}
              >
                <strong>{partLabels[part]}</strong>
                <small>{zAnatomyModels[modelForPart[part]].label}</small>
              </button>
            ))}
          </div>

          <div className="z-anatomy-note">
            <strong>{model.label}</strong>
            <p>{model.note}</p>
            <p>
              Źródło: Z-Anatomy / BodyParts3D. Licencja modeli: CC BY-SA. W prototypie viewer
              jest osadzany z publicznego Sketchfab; docelowo warto wyeksportować uproszczone GLB
              z Blendera.
            </p>
            <a href={model.url} target="_blank" rel="noreferrer">
              Otwórz model
              <ExternalLink size={14} />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
