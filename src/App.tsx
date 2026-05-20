import { useEffect, useMemo, useState } from "react";
import { Building2, HeartPulse, Sparkles } from "lucide-react";
import { ActionPanel } from "./components/ActionPanel";
import { BodyMap } from "./components/BodyMap";
import { BodyStatsPanel } from "./components/BodyStatsPanel";
import { FailureDiagnosisPanel } from "./components/FailureDiagnosisPanel";
import { FeedbackPanel } from "./components/FeedbackPanel";
import { GlossaryPanel } from "./components/GlossaryPanel";
import { MissionPanel } from "./components/MissionPanel";
import { SystemPathDiagram } from "./components/SystemPathDiagram";
import { WorldSelector } from "./components/WorldSelector";
import { applyAction, buildScore, explainPart } from "./logic/gameEngine";
import { criteriaMet, rangesFromParameters, withStability } from "./logic/stability";
import type {
  CyberneticPart,
  FailureType,
  FeedbackItem,
  GameAction,
  GameMode,
  Mission,
  ScoreSummary,
  SystemState,
  WorldDefinition,
  WorldId,
} from "./types/game";
import { CityMap } from "./worlds/city/CityMap";
import { worlds } from "./worlds/worlds";

const STORAGE_KEY = "cyber-system-progress";

const getWorld = (worldId: WorldId): WorldDefinition =>
  worlds.find((world) => world.id === worldId) ?? worlds[0];

const normalizeInitialState = (mission: Mission, world: WorldDefinition): SystemState => {
  const ranges = rangesFromParameters(world.parameters);
  const state = Object.fromEntries(
    world.parameters
      .filter((parameter) => parameter.id !== "stability")
      .map((parameter) => [parameter.id, mission.initialState[parameter.id] ?? 50]),
  );

  return withStability(state, ranges);
};

function sortActionsForMission(
  actionList: GameAction[],
  mission: Mission,
  mode: GameMode,
  tutorialSequence: string[],
) {
  if (mode === "tutorial" && tutorialSequence.length > 0) {
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
  const [worldId, setWorldId] = useState<WorldId>("organism");
  const world = useMemo(() => getWorld(worldId), [worldId]);
  const tutorialSequence = world.tutorialSequence ?? [];
  const tutorialEnabled = tutorialSequence.length > 0;
  const optimalRanges = useMemo(() => rangesFromParameters(world.parameters), [world]);

  const [mode, setMode] = useState<GameMode>("tutorial");
  const [missionIndex, setMissionIndex] = useState(0);
  const [systemState, setSystemState] = useState<SystemState>(() =>
    normalizeInitialState(world.missions[0], world),
  );
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

  const currentMission = world.missions[missionIndex] ?? world.missions[0];
  const failure = world.failures[failureIndex] ?? world.failures[0];

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setCompletedMissionIds(JSON.parse(stored));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedMissionIds));
  }, [completedMissionIds]);

  useEffect(() => {
    if (!tutorialEnabled && mode === "tutorial") setMode("missions");
  }, [mode, tutorialEnabled]);

  const visibleActions = useMemo(
    () => sortActionsForMission(world.actions, currentMission, mode, tutorialSequence),
    [currentMission, mode, tutorialSequence, world.actions],
  );

  const resetMission = (nextMission = currentMission, nextWorld = world) => {
    setSystemState(normalizeInitialState(nextMission, nextWorld));
    setUsedActionIds([]);
    setUsedParts([]);
    setActivePart("homeostat");
    setFeedback([]);
    setCompleted(false);
    setScore(undefined);
    setTutorialStep(0);
    setDiagnosis(undefined);
  };

  const changeWorld = (nextWorldId: WorldId) => {
    const nextWorld = getWorld(nextWorldId);
    const nextMode: GameMode = nextWorld.tutorialSequence?.length ? "tutorial" : "missions";
    setWorldId(nextWorldId);
    setMode(nextMode);
    setMissionIndex(0);
    setFailureIndex(0);
    resetMission(nextWorld.missions[0], nextWorld);
  };

  const changeMode = (nextMode: GameMode) => {
    const resolvedMode = nextMode === "tutorial" && !tutorialEnabled ? "missions" : nextMode;
    setMode(resolvedMode);
    if (resolvedMode === "tutorial") {
      setMissionIndex(0);
      resetMission(world.missions[0]);
    } else {
      resetMission(currentMission);
    }
  };

  const changeMission = (missionId: string) => {
    const index = world.missions.findIndex((mission) => mission.id === missionId);
    if (index === -1) return;
    setMissionIndex(index);
    resetMission(world.missions[index]);
  };

  const nextMission = () => {
    const nextIndex = (missionIndex + 1) % world.missions.length;
    setMissionIndex(nextIndex);
    resetMission(world.missions[nextIndex]);
  };

  const addFeedback = (item: FeedbackItem) => {
    setFeedback((items) => [item, ...items].slice(0, 8));
  };

  const completeMission = (state: SystemState, usedIds: string[]) => {
    const summary = buildScore(
      normalizeInitialState(currentMission, world),
      state,
      currentMission,
      usedIds,
      world.scoreResourceKey,
      world.title,
    );
    setCompleted(true);
    setScore(summary);
    setCompletedMissionIds((ids) => Array.from(new Set([...ids, `${world.id}:${currentMission.id}`])));
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

    const result = applyAction(systemState, action, currentMission, usedActionIds, optimalRanges);
    setSystemState(result.nextState);

    if (mode === "tutorial" && expectedId && action.id !== expectedId) {
      addFeedback({
        id: `${Date.now()}-tutorial-miss`,
        actionLabel: action.label,
        text: `To nie jest kolejny etap drogi bodźca. Teraz system oczekuje: ${world.actions.find((item) => item.id === expectedId)?.label}. Reakcja została wykonana, więc obserwuj koszt.`,
        tone: "bad",
      });
      return;
    }

    if (mode === "tutorial") {
      setTutorialStep((step) => Math.min(step + 1, tutorialSequence.length));
    }

    addFeedback(result.feedback);

    const tutorialDone =
      mode === "tutorial" &&
      tutorialSequence.length > 0 &&
      action.id === tutorialSequence[tutorialSequence.length - 1];
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
      text: world.partFeedback[part],
      tone: "neutral",
    });
  };

  const handleNewFailure = () => {
    setFailureIndex((index) => (index + 1) % world.failures.length);
    setDiagnosis(undefined);
  };

  const HeaderIcon = world.id === "city" ? Building2 : HeartPulse;

  return (
    <main className={`app-shell world-${world.id}`}>
      <header className="app-header">
        <div>
          <span className="eyebrow">Gra edukacyjna</span>
          <h1>
            {world.title}: {world.subtitle}
          </h1>
          <p>
            {world.description} Wspólny silnik pokazuje, że organizm i miasto można opisać jako
            układy cybernetyczne z receptorami, korelatorem, homeostatem, zasobami, efektorami
            i sprzężeniem zwrotnym.
          </p>
        </div>
        <div className="guide-strip" aria-label="Przewodnicy">
          <span>
            <HeaderIcon size={17} /> {world.id === "city" ? "Ratusz" : "Kora"}
          </span>
          <span>
            <Sparkles size={17} /> Homeo
          </span>
          <span>Receptor</span>
          <span>Akku</span>
          <span>Efektor</span>
        </div>
      </header>

      <WorldSelector worlds={worlds} activeWorldId={world.id} onSelect={changeWorld} />

      <div className="top-layout">
        {world.theme.mapKind === "city" ? (
          <CityMap activePart={activePart} onPartSelect={handlePartSelect} />
        ) : (
          <BodyMap activePart={activePart} onPartSelect={handlePartSelect} />
        )}
        <div className="side-stack">
          <MissionPanel
            mode={mode}
            missions={world.missions}
            currentMission={currentMission}
            completed={completed}
            score={score}
            onModeChange={changeMode}
            onMissionChange={changeMission}
            onReset={() => resetMission()}
            onNext={nextMission}
            onTogglePath={() => setShowPath((value) => !value)}
            tutorialEnabled={tutorialEnabled}
            missionLabel={world.id === "city" ? "Misja miasta" : "Misja organizmu"}
            scoreResourceLabel={world.scoreResourceLabel}
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
        <BodyStatsPanel
          state={systemState}
          parameters={world.parameters}
          title={world.id === "city" ? "Parametry miasta" : "Parametry organizmu"}
        />
        {mode !== "failure" && (
          <ActionPanel
            actions={visibleActions}
            usedActionIds={usedActionIds}
            tutorialExpectedId={mode === "tutorial" ? tutorialSequence[tutorialStep] : undefined}
            onAction={handleAction}
          />
        )}
        <FeedbackPanel feedback={feedback} />
        <GlossaryPanel entries={world.glossary} />
      </div>
    </main>
  );
}

export default App;
