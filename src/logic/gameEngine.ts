import type {
  FeedbackItem,
  GameAction,
  Mission,
  ScoreSummary,
  SystemState,
  Threshold,
} from "../types/game";
import { clamp, criteriaMet, stabilityLabel, withStability } from "./stability";

export const applyAction = (
  state: SystemState,
  action: GameAction,
  mission: Mission,
  usedActionIds: string[],
  optimalRanges: Record<string, Threshold>,
): { nextState: SystemState; feedback: FeedbackItem; completed: boolean } => {
  const nextWithoutStability = { ...state };
  Object.entries(action.effects).forEach(([key, delta]) => {
    if (key === "stability") return;
    nextWithoutStability[key] = clamp((state[key] ?? 0) + (delta ?? 0));
  });

  const calculatedState = withStability(nextWithoutStability, optimalRanges);
  const nextState = {
    ...calculatedState,
    stability: clamp(calculatedState.stability + (action.effects.stability ?? 0)),
  };
  const isGood = mission.recommendedActionIds.includes(action.id);
  const isBad = mission.dangerousActionIds.includes(action.id);
  const completed = criteriaMet(nextState, mission.successCriteria);
  const stageText = explainPart(action.cyberneticPart);
  const defaultText = isGood
    ? `${stageText} Sprzężenie zwrotne pokazuje poprawę: ${stabilityLabel(nextState.stability)}.`
    : isBad
      ? `Uwaga: reakcja nie pasuje do zakłócenia. Parametry przesuwają się poza równowagę dynamiczną.`
      : `${stageText} To może pomóc jako działanie wspierające, ale obserwuj sprzężenie zwrotne.`;

  const feedback: FeedbackItem = {
    id: `${Date.now()}-${action.id}-${usedActionIds.length}`,
    actionLabel: action.label,
    text: isGood
      ? action.feedbackGood ?? defaultText
      : isBad
        ? action.feedbackBad ?? defaultText
        : defaultText,
    tone: completed ? "complete" : isGood ? "good" : isBad ? "bad" : "neutral",
  };

  return { nextState, feedback, completed };
};

export const explainPart = (part: GameAction["cyberneticPart"]) => {
  switch (part) {
    case "receptor":
      return "Receptor odebrał bodziec. System ma dane wejściowe.";
    case "correlator":
      return "Korelator skojarzył sygnał z możliwą reakcją.";
    case "homeostat":
      return "Homeostat ocenił odchylenie od zakresu równowagi.";
    case "alimentator":
      return "Alimentator dostarczył zasoby potrzebne do regulacji.";
    case "accumulator":
      return "Akumulator oddaje rezerwy, ale ich użycie ma koszt.";
    case "effector":
      return "Efektor wykonał reakcję, a system czeka na feedback.";
  }
};

export const buildScore = (
  initialState: SystemState,
  currentState: SystemState,
  mission: Mission,
  usedActionIds: string[],
  resourceKey = "energy",
  systemName = "System",
): ScoreSummary => {
  const unique = Array.from(new Set(usedActionIds));
  const correct = unique.filter((id) => mission.recommendedActionIds.includes(id)).length;
  const mistakes = usedActionIds.filter((id) => mission.dangerousActionIds.includes(id)).length;
  const energyUsed = Math.max(0, (initialState[resourceKey] ?? 0) - (currentState[resourceKey] ?? 0));
  const efficient = currentState.stability >= 70 && energyUsed <= 35 && mistakes === 0;
  const comment = efficient
    ? "Bardzo dobra równowaga dynamiczna: reakcje były trafne i nie zużyły nadmiernie zasobów."
    : currentState.stability >= 60
      ? "System wrócił do stabilności, ale warto ograniczyć koszt zasobów albo liczbę nietrafnych reakcji."
      : `${systemName} nadal jest rozregulowany. Spróbuj przejść pełną drogę: receptor, korelator, homeostat, zasoby, efektor i feedback.`;

  return {
    stability: currentState.stability,
    correct,
    mistakes,
    energyUsed,
    comment,
  };
};
