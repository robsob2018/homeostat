import type { BodyState, Threshold } from "../types/game";

export const optimalRanges: Record<Exclude<keyof BodyState, "stability">, Threshold> = {
  temperature: { min: 45, max: 65 },
  glucose: { min: 45, max: 70 },
  oxygen: { min: 50, max: 80 },
  hydration: { min: 50, max: 80 },
  energy: { min: 45, max: 80 },
  stress: { min: 15, max: 45 },
  fatigue: { min: 10, max: 45 },
};

export const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

const deviationFromRange = (value: number, range: Threshold) => {
  if (range.min !== undefined && value < range.min) return range.min - value;
  if (range.max !== undefined && value > range.max) return value - range.max;
  return 0;
};

export const calculateStability = (state: Omit<BodyState, "stability">): number => {
  const totalDeviation = Object.entries(optimalRanges).reduce((sum, [key, range]) => {
    return sum + deviationFromRange(state[key as keyof typeof state], range);
  }, 0);

  return clamp(100 - totalDeviation * 1.8);
};

export const withStability = (state: Omit<BodyState, "stability">): BodyState => ({
  ...state,
  stability: calculateStability(state),
});

export const stabilityLabel = (stability: number) => {
  if (stability >= 80) return "równowaga bardzo dobra";
  if (stability >= 60) return "stabilnie";
  if (stability >= 40) return "ostrzeżenie";
  if (stability >= 20) return "poważne zakłócenie";
  return "kryzys systemu";
};

export const criteriaMet = (
  state: BodyState,
  criteria: Partial<Record<keyof BodyState, Threshold>>,
) =>
  Object.entries(criteria).every(([key, threshold]) => {
    const value = state[key as keyof BodyState];
    const aboveMin = threshold.min === undefined || value >= threshold.min;
    const belowMax = threshold.max === undefined || value <= threshold.max;
    return aboveMin && belowMax;
  });
