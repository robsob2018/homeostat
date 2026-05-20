import type {
  BodyState,
  FeedbackItem,
  GameAction,
  Mission,
  ScoreSummary,
} from "../types/game";
import { clamp, criteriaMet, stabilityLabel, withStability } from "./stability";

export const applyAction = (
  state: BodyState,
  action: GameAction,
  mission: Mission,
  usedActionIds: string[],
): { nextState: BodyState; feedback: FeedbackItem; completed: boolean } => {
  const nextWithoutStability = {
    temperature: clamp(state.temperature + (action.effects.temperature ?? 0)),
    glucose: clamp(state.glucose + (action.effects.glucose ?? 0)),
    oxygen: clamp(state.oxygen + (action.effects.oxygen ?? 0)),
    hydration: clamp(state.hydration + (action.effects.hydration ?? 0)),
    energy: clamp(state.energy + (action.effects.energy ?? 0)),
    stress: clamp(state.stress + (action.effects.stress ?? 0)),
    fatigue: clamp(state.fatigue + (action.effects.fatigue ?? 0)),
  };

  const calculatedState = withStability(nextWithoutStability);
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
  initialState: BodyState,
  currentState: BodyState,
  mission: Mission,
  usedActionIds: string[],
): ScoreSummary => {
  const unique = Array.from(new Set(usedActionIds));
  const correct = unique.filter((id) => mission.recommendedActionIds.includes(id)).length;
  const mistakes = usedActionIds.filter((id) => mission.dangerousActionIds.includes(id)).length;
  const energyUsed = Math.max(0, initialState.energy - currentState.energy);
  const efficient = currentState.stability >= 70 && energyUsed <= 35 && mistakes === 0;
  const comment = efficient
    ? "Bardzo dobra równowaga dynamiczna: reakcje były trafne i nie zużyły nadmiernie zasobów."
    : currentState.stability >= 60
      ? "System wrócił do stabilności, ale warto ograniczyć koszt energetyczny albo liczbę nietrafnych reakcji."
      : "Organizm nadal jest rozregulowany. Spróbuj przejść pełną drogę: receptor, korelator, homeostat, zasoby, efektor i feedback.";

  return {
    stability: currentState.stability,
    correct,
    mistakes,
    energyUsed,
    comment,
  };
};
