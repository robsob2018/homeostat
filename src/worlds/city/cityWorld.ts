import type { CyberneticPart, ParameterDefinition, WorldDefinition } from "../../types/game";
import { cityActions } from "./cityActions";
import { cityFailures } from "./cityFailures";
import { cityGlossary } from "./cityGlossary";
import { cityMissions } from "./cityMissions";

export const cityParameters: ParameterDefinition[] = [
  { id: "energy", label: "Energia", optimalMin: 55, optimalMax: 85, tone: "energy" },
  { id: "water", label: "Woda", optimalMin: 55, optimalMax: 85, tone: "hydration" },
  { id: "transport", label: "Transport", optimalMin: 50, optimalMax: 80, tone: "transport" },
  { id: "trust", label: "Zaufanie społeczne", optimalMin: 55, optimalMax: 85, tone: "trust" },
  { id: "informationQuality", label: "Jakość informacji", optimalMin: 60, optimalMax: 90, tone: "info" },
  { id: "publicOrder", label: "Porządek publiczny", optimalMin: 50, optimalMax: 85, tone: "order" },
  { id: "resourceReserve", label: "Rezerwy", optimalMin: 45, optimalMax: 80, tone: "reserve" },
  { id: "stress", label: "Napięcie społeczne", optimalMin: 10, optimalMax: 45, tone: "stress" },
  { id: "stability", label: "Stabilność miasta", optimalMin: 70, optimalMax: 100, tone: "stability" },
];

export const cityPartFeedback: Record<CyberneticPart, string> = {
  receptor: "Receptory miasta to czujniki, media i mieszkańcy. Bez nich system nie ma danych.",
  correlator: "Korelator miasta łączy dane w ratuszu, centrum danych albo sztabie kryzysowym.",
  homeostat: "Homeostat miasta to normy, procedury, progi alarmowe i korekty stabilizujące.",
  alimentator: "Alimentator dostarcza energię, wodę, transport, żywność, personel i infrastrukturę.",
  accumulator: "Akumulator przechowuje rezerwy: magazyny, budżet, baterie, zapasy i zaufanie.",
  effector: "Efektory wykonują reakcje: służby, pojazdy, ekipy techniczne, komunikaty i instytucje.",
};

export const cityWorld: WorldDefinition = {
  id: "city",
  title: "CyberMiasto",
  subtitle: "Układ Samosterowny",
  description:
    "Zarządzaj miastem jako systemem sterowania: odbieraj sygnały, analizuj dane, utrzymuj stabilność i działaj przez instytucje oraz zasoby.",
  theme: {
    primary: "#22d3ee",
    accent: "#f97316",
    mapKind: "city",
  },
  parameters: cityParameters,
  parts: [
    { id: "receptor", label: "Receptory", description: "Czujniki, media, mieszkańcy i stacje pomiarowe." },
    { id: "correlator", label: "Korelator", description: "Ratusz, centrum danych i sztab kryzysowy." },
    { id: "homeostat", label: "Homeostat", description: "Normy, procedury, progi alarmowe i regulacje." },
    { id: "alimentator", label: "Alimentator", description: "Elektrownie, wodociągi, transport i dostawy." },
    { id: "accumulator", label: "Akumulator", description: "Magazyny, budżet, baterie i rezerwy." },
    { id: "effector", label: "Efektory", description: "Służby, pojazdy, komunikaty i instytucje." },
  ],
  missions: cityMissions,
  actions: cityActions,
  glossary: cityGlossary,
  failures: cityFailures,
  scoreResourceKey: "resourceReserve",
  scoreResourceLabel: "Zużycie rezerw",
  partFeedback: cityPartFeedback,
};
