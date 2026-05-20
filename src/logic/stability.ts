import type { BodyState, ParameterDefinition, SystemState, Threshold } from "../types/game";

export const optimalRanges: Record<Exclude<keyof BodyState, "stability">, Threshold> = {
  temperature: { min: 45, max: 65 },
  glucose: { min: 45, max: 70 },
  oxygen: { min: 50, max: 80 },
  hydration: { min: 50, max: 80 },
  energy: { min: 45, max: 80 },
  stress: { min: 15, max: 45 },
  fatigue: { min: 10, max: 45 },
};

export const organismParameters: ParameterDefinition[] = [
  { id: "temperature", label: "Ciepłota ciała", optimalMin: 45, optimalMax: 65, tone: "temp" },
  { id: "glucose", label: "Glukoza", optimalMin: 45, optimalMax: 70, tone: "glucose" },
  { id: "oxygen", label: "Dostęp tlenu", optimalMin: 50, optimalMax: 80, tone: "oxygen" },
  { id: "hydration", label: "Płyny", optimalMin: 50, optimalMax: 80, tone: "hydration" },
  { id: "energy", label: "Paliwo komórkowe", optimalMin: 45, optimalMax: 80, tone: "energy" },
  { id: "stress", label: "Pobudzenie", optimalMin: 15, optimalMax: 45, tone: "stress" },
  { id: "fatigue", label: "Zmęczenie", optimalMin: 10, optimalMax: 45, tone: "fatigue" },
  { id: "stability", label: "Stabilność", optimalMin: 70, optimalMax: 100, tone: "stability" },
];

export const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

const deviationFromRange = (value: number, range: Threshold) => {
  if (range.min !== undefined && value < range.min) return range.min - value;
  if (range.max !== undefined && value > range.max) return value - range.max;
  return 0;
};

export const rangesFromParameters = (parameters: ParameterDefinition[]): Record<string, Threshold> =>
  Object.fromEntries(
    parameters
      .filter((parameter) => parameter.id !== "stability")
      .map((parameter) => [
        parameter.id,
        { min: parameter.optimalMin, max: parameter.optimalMax },
      ]),
  );

export const calculateStability = (
  state: SystemState,
  ranges: Record<string, Threshold> = optimalRanges,
): number => {
  const totalDeviation = Object.entries(ranges).reduce((sum, [key, range]) => {
    return sum + deviationFromRange(state[key] ?? 0, range);
  }, 0);

  return clamp(100 - totalDeviation * 1.8);
};

export const withStability = (
  state: SystemState,
  ranges: Record<string, Threshold> = optimalRanges,
): SystemState => ({
  ...state,
  stability: calculateStability(state, ranges),
});

export const stabilityLabel = (stability: number) => {
  if (stability >= 80) return "równowaga bardzo dobra";
  if (stability >= 60) return "stabilnie";
  if (stability >= 40) return "ostrzeżenie";
  if (stability >= 20) return "poważne zakłócenie";
  return "kryzys systemu";
};

export const criteriaMet = (
  state: SystemState,
  criteria: Partial<Record<string, Threshold>>,
) =>
  Object.entries(criteria).every(([key, threshold]) => {
    if (!threshold) return true;
    const value = state[key];
    const aboveMin = threshold.min === undefined || value >= threshold.min;
    const belowMax = threshold.max === undefined || value <= threshold.max;
    return aboveMin && belowMax;
  });
