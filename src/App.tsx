import { useEffect, useMemo, useState } from "react";
import { BrainCircuit, Sparkles } from "lucide-react";
import { ActionPanel } from "./components/ActionPanel";
import { BodyMap } from "./components/BodyMap";
import { BodyStatsPanel } from "./components/BodyStatsPanel";
import { FailureDiagnosisPanel } from "./components/FailureDiagnosisPanel";
import { FeedbackPanel } from "./components/FeedbackPanel";
import { GlossaryPanel } from "./components/GlossaryPanel";
import { MissionPanel } from "./components/MissionPanel";
import { SystemPathDiagram } from "./components/SystemPathDiagram";
import { actions } from "./data/actions";
import { failures } from "./data/failures";
import { missions, tutorialSequence } from "./data/missions";
import { applyAction, buildScore, explainPart } from "./logic/gameEngine";
import { criteriaMet, withStability } from "./logic/stability";
import type {
  BodyState,
  CyberneticPart,
  FailureType,
  FeedbackItem,
  GameAction,
  GameMode,
  Mission,
  ScoreSummary,
} from "./types/game";

const STORAGE_KEY = "cyberorganizm-progress";

const normalizeInitialState = (mission: Mission): BodyState =>
  withStability({
    temperature: mission.initialState.temperature,
    glucose: mission.initialState.glucose,
    oxygen: mission.initialState.oxygen,
    hydration: mission.initialState.hydration,
    energy: mission.initialState.energy,
    stress: mission.initialState.stress,
    fatigue: mission.initialState.fatigue,
  });

const partFeedback: Record<CyberneticPart, string> = {
  receptor: "Receptory są wejściem systemu. Bez nich organizm nie wie, jaki bodziec działa.",
  correlator: "Korelator łączy sygnały z możliwymi reakcjami. To etap rozpoznania sensu informacji.",
  homeostat: "Homeostat porównuje stan z zakresem równowagi i uruchamia korektę odchylenia.",
  alimentator: "Alimentator dostarcza zasoby: tlen, wodę, jedzenie, sen i wsparcie psychofizyczne.",
  accumulator: "Akumulator przechowuje rezerwy. Pomaga szybko, ale zasoby mogą się wyczerpać.",
  effector: "Efektory wykonują reakcję. Dopiero feedback mówi, czy działanie pomogło.",
};

function sortActionsForMission(actionList: GameAction[], mission: Mission, mode: GameMode) {
  if (mode === "tutorial") {
    const tutorialSet = new Set(tutorialSequence);
    return actionList
      .filter((action) => tutorialSet.has(action.id) || mission.dangerousActionIds.includes(action.id))
      .sort((a, b) => {
        const aIndex = tutorialSequence.indexOf(a.id);
        const bIndex = tutorialSequence.indexOf(b.id);
        return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
      });
  }

  return [...actionList].sort((a, b) => {
    const score = (action: GameAction) => {
      if (mission.recommendedActionIds.includes(action.id)) return 0;
      if (mission.dangerousActionIds.includes(action.id)) return 2;
      return 1;
    };
    return score(a) - score(b);
  });
}

function App() {
  const [mode, setMode] = useState<GameMode>("tutorial");
  const [missionIndex, setMissionIndex] = useState(0);
  const [bodyState, setBodyState] = useState(() => normalizeInitialState(missions[0]));
  const [usedActionIds, setUsedActionIds] = useState<string[]>([]);
  const [usedParts, setUsedParts] = useState<CyberneticPart[]>([]);
  const [activePart, setActivePart] = useState<CyberneticPart | undefined>("homeostat");
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState<ScoreSummary | undefined>();
  const [showPath, setShowPath] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);
  const [failureIndex, setFailureIndex] = useState(0);
  const [diagnosis, setDiagnosis] = useState<FailureType | undefined>();

  const currentMission = missions[missionIndex];
  const failure = failures[failureIndex];

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setCompletedMissionIds(JSON.parse(stored));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedMissionIds));
  }, [completedMissionIds]);

  const visibleActions = useMemo(
    () => sortActionsForMission(actions, currentMission, mode),
    [currentMission, mode],
  );

  const resetMission = (nextMission = currentMission) => {
    setBodyState(normalizeInitialState(nextMission));
    setUsedActionIds([]);
    setUsedParts([]);
    setActivePart("homeostat");
    setFeedback([]);
    setCompleted(false);
    setScore(undefined);
    setTutorialStep(0);
    setDiagnosis(undefined);
  };

  const changeMode = (nextMode: GameMode) => {
    setMode(nextMode);
    if (nextMode === "tutorial") {
      setMissionIndex(0);
      resetMission(missions[0]);
    } else {
      resetMission(currentMission);
    }
  };

  const changeMission = (missionId: string) => {
    const index = missions.findIndex((mission) => mission.id === missionId);
    if (index === -1) return;
    setMissionIndex(index);
    resetMission(missions[index]);
  };

  const nextMission = () => {
    const nextIndex = (missionIndex + 1) % missions.length;
    setMissionIndex(nextIndex);
    resetMission(missions[nextIndex]);
  };

  const addFeedback = (item: FeedbackItem) => {
    setFeedback((items) => [item, ...items].slice(0, 8));
  };

  const completeMission = (state: BodyState, usedIds: string[]) => {
    const summary = buildScore(normalizeInitialState(currentMission), state, currentMission, usedIds);
    setCompleted(true);
    setScore(summary);
    setCompletedMissionIds((ids) => Array.from(new Set([...ids, currentMission.id])));
    addFeedback({
      id: `${Date.now()}-complete`,
      actionLabel: "Misja zakończona",
      text: summary.comment,
      tone: "complete",
    });
  };

  const handleAction = (action: GameAction) => {
    if (mode === "failure") return;

    const expectedId = mode === "tutorial" ? tutorialSequence[tutorialStep] : undefined;
    const nextUsedIds = [...usedActionIds, action.id];
    setUsedActionIds(nextUsedIds);
    setUsedParts((parts) => Array.from(new Set([...parts, action.cyberneticPart])));
    setActivePart(action.cyberneticPart);

    const result = applyAction(bodyState, action, currentMission, usedActionIds);
    setBodyState(result.nextState);

    if (mode === "tutorial" && expectedId && action.id !== expectedId) {
      addFeedback({
        id: `${Date.now()}-tutorial-miss`,
        actionLabel: action.label,
        text: `To nie jest kolejny etap drogi bodźca. Teraz system oczekuje: ${actions.find((item) => item.id === expectedId)?.label}. Reakcja została wykonana, więc obserwuj koszt.`,
        tone: "bad",
      });
      return;
    }

    if (mode === "tutorial") {
      setTutorialStep((step) => Math.min(step + 1, tutorialSequence.length));
    }

    addFeedback(result.feedback);

    const tutorialDone = mode === "tutorial" && action.id === tutorialSequence[tutorialSequence.length - 1];
    const missionDone = mode === "missions" && criteriaMet(result.nextState, currentMission.successCriteria);
    if (!completed && (tutorialDone || missionDone || result.completed)) {
      completeMission(result.nextState, nextUsedIds);
    }
  };

  const handlePartSelect = (part: CyberneticPart) => {
    setActivePart(part);
    addFeedback({
      id: `${Date.now()}-${part}`,
      actionLabel: explainPart(part),
      text: partFeedback[part],
      tone: "neutral",
    });
  };

  const handleNewFailure = () => {
    setFailureIndex((index) => (index + 1) % failures.length);
    setDiagnosis(undefined);
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <span className="eyebrow">Gra edukacyjna</span>
          <h1>CyberOrganizm: Misja Homeostat</h1>
          <p>
            Zarządzaj organizmem jako układem autonomicznym: odbieraj bodźce, kojarz sygnały,
            koryguj odchylenia i ucz się przez sprzężenie zwrotne.
            To uproszczony model edukacyjny, a nie symulator diagnostyczny.
          </p>
        </div>
        <div className="guide-strip" aria-label="Przewodnicy">
          <span><BrainCircuit size={17} /> Kora</span>
          <span><Sparkles size={17} /> Homeo</span>
          <span>Akku</span>
          <span>Alima</span>
          <span>Efekto</span>
        </div>
      </header>

      <div className="top-layout">
        <BodyMap activePart={activePart} onPartSelect={handlePartSelect} />
        <div className="side-stack">
          <MissionPanel
            mode={mode}
            missions={missions}
            currentMission={currentMission}
            completed={completed}
            score={score}
            onModeChange={changeMode}
            onMissionChange={changeMission}
            onReset={() => resetMission()}
            onNext={nextMission}
            onTogglePath={() => setShowPath((value) => !value)}
          />
          {mode === "failure" ? (
            <FailureDiagnosisPanel
              failure={failure}
              diagnosis={diagnosis}
              onDiagnose={setDiagnosis}
              onNewFailure={handleNewFailure}
            />
          ) : (
            <SystemPathDiagram usedParts={usedParts} visible={showPath} />
          )}
        </div>
      </div>

      <div className="dashboard-grid">
        <BodyStatsPanel state={bodyState} />
        {mode !== "failure" && (
          <ActionPanel
            actions={visibleActions}
            usedActionIds={usedActionIds}
            tutorialExpectedId={mode === "tutorial" ? tutorialSequence[tutorialStep] : undefined}
            onAction={handleAction}
          />
        )}
        <FeedbackPanel feedback={feedback} />
        <GlossaryPanel />
      </div>
    </main>
  );
}

export default App;
