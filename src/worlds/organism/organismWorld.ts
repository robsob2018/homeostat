import { actions } from "../../data/actions";
import { failures } from "../../data/failures";
import { glossary } from "../../data/glossary";
import { missions, tutorialSequence } from "../../data/missions";
import { organismParameters } from "../../logic/stability";
import type { CyberneticPart, WorldDefinition } from "../../types/game";

export const organismPartFeedback: Record<CyberneticPart, string> = {
  receptor: "Receptory są wejściem systemu. Bez nich organizm nie wie, jaki bodziec działa.",
  correlator: "Korelator łączy sygnały z możliwymi reakcjami. To etap rozpoznania sensu informacji.",
  homeostat: "Homeostat porównuje stan z zakresem równowagi i uruchamia korektę odchylenia.",
  alimentator: "Alimentator dostarcza zasoby: tlen, wodę, jedzenie, sen i wsparcie psychofizyczne.",
  accumulator: "Akumulator przechowuje rezerwy. Pomaga szybko, ale zasoby mogą się wyczerpać.",
  effector: "Efektory wykonują reakcję. Dopiero feedback mówi, czy działanie pomogło.",
};

export const organismWorld: WorldDefinition = {
  id: "organism",
  title: "CyberOrganizm",
  subtitle: "Misja Homeostat",
  description:
    "Zarządzaj organizmem jako układem autonomicznym: odbieraj bodźce, kojarz sygnały, koryguj odchylenia i ucz się przez sprzężenie zwrotne.",
  theme: {
    primary: "#20d7f7",
    accent: "#ff4fa3",
    mapKind: "organism",
  },
  parameters: organismParameters,
  parts: [
    { id: "receptor", label: "Receptory", description: "Zmysły i receptory ciała odbierające bodźce." },
    { id: "correlator", label: "Korelator", description: "Mózg i układ nerwowy kojarzące sygnały." },
    { id: "homeostat", label: "Homeostat", description: "Mechanizmy utrzymujące równowagę organizmu." },
    { id: "alimentator", label: "Alimentator", description: "Dopływ tlenu, wody, jedzenia i snu." },
    { id: "accumulator", label: "Akumulator", description: "Zapasy energii i rezerwa psychofizyczna." },
    { id: "effector", label: "Efektory", description: "Mięśnie, gruczoły, serce, płuca i zachowania." },
  ],
  missions,
  actions,
  glossary,
  failures,
  tutorialSequence,
  scoreResourceKey: "energy",
  scoreResourceLabel: "Zużycie energii",
  partFeedback: organismPartFeedback,
};
