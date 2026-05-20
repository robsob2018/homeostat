export type CyberneticPart =
  | "receptor"
  | "correlator"
  | "homeostat"
  | "alimentator"
  | "accumulator"
  | "effector";

export type WorldId = "organism" | "city";

export type SystemState = Record<string, number>;

export type BodyState = SystemState & {
  temperature: number;
  glucose: number;
  oxygen: number;
  hydration: number;
  energy: number;
  stress: number;
  fatigue: number;
  stability: number;
};

export type ParameterDefinition = {
  id: string;
  label: string;
  optimalMin: number;
  optimalMax: number;
  tone?: string;
};

export type CyberneticPartDefinition = {
  id: CyberneticPart;
  label: string;
  description: string;
};

export type WorldTheme = {
  primary: string;
  accent: string;
  mapKind: "organism" | "city";
};

export type GameAction = {
  id: string;
  label: string;
  cyberneticPart: CyberneticPart;
  description: string;
  effects: Partial<SystemState>;
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
  initialState: SystemState;
  targetExplanation: string;
  recommendedActionIds: string[];
  dangerousActionIds: string[];
  successCriteria: Partial<Record<string, Threshold>>;
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

export type WorldDefinition = {
  id: WorldId;
  title: string;
  subtitle: string;
  description: string;
  theme: WorldTheme;
  parameters: ParameterDefinition[];
  parts: CyberneticPartDefinition[];
  missions: Mission[];
  actions: GameAction[];
  glossary: GlossaryEntry[];
  failures: FailureCase[];
  tutorialSequence?: string[];
  scoreResourceKey?: string;
  scoreResourceLabel?: string;
  partFeedback: Record<CyberneticPart, string>;
};
