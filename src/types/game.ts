export type CyberneticPart =
  | "receptor"
  | "correlator"
  | "homeostat"
  | "alimentator"
  | "accumulator"
  | "effector";

export type BodyState = {
  temperature: number;
  glucose: number;
  oxygen: number;
  hydration: number;
  energy: number;
  stress: number;
  fatigue: number;
  stability: number;
};

export type GameAction = {
  id: string;
  label: string;
  cyberneticPart: CyberneticPart;
  description: string;
  effects: Partial<BodyState>;
  goodForMissionIds?: string[];
  badForMissionIds?: string[];
  feedbackGood?: string;
  feedbackBad?: string;
};

export type Threshold = {
  min?: number;
  max?: number;
};

export type Mission = {
  id: string;
  title: string;
  description: string;
  initialState: BodyState;
  targetExplanation: string;
  recommendedActionIds: string[];
  dangerousActionIds: string[];
  successCriteria: Partial<Record<keyof BodyState, Threshold>>;
};

export type GlossaryEntry = {
  term: string;
  cyberneticPart?: CyberneticPart;
  definition: string;
  example: string;
};

export type FailureType =
  | "receptor"
  | "correlator"
  | "homeostat"
  | "alimentator"
  | "accumulator"
  | "effector";

export type FailureCase = {
  id: string;
  title: string;
  damagedPart: FailureType;
  symptom: string;
  scenario: string;
  explanation: string;
};

export type GameMode = "tutorial" | "missions" | "failure";

export type FeedbackTone = "good" | "bad" | "neutral" | "complete";

export type FeedbackItem = {
  id: string;
  actionLabel: string;
  text: string;
  tone: FeedbackTone;
};

export type ScoreSummary = {
  stability: number;
  correct: number;
  mistakes: number;
  energyUsed: number;
  comment: string;
};
