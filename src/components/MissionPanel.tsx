import { RotateCcw, Route, Trophy } from "lucide-react";
import type { GameMode, Mission, ScoreSummary } from "../types/game";

type MissionPanelProps = {
  mode: GameMode;
  missions: Mission[];
  currentMission: Mission;
  completed: boolean;
  score?: ScoreSummary;
  onModeChange: (mode: GameMode) => void;
  onMissionChange: (missionId: string) => void;
  onReset: () => void;
  onNext: () => void;
  onTogglePath: () => void;
  tutorialEnabled?: boolean;
  missionLabel?: string;
  scoreResourceLabel?: string;
};

export function MissionPanel({
  mode,
  missions,
  currentMission,
  completed,
  score,
  onModeChange,
  onMissionChange,
  onReset,
  onNext,
  onTogglePath,
  tutorialEnabled = true,
  missionLabel = "Misja organizmu",
  scoreResourceLabel = "Zużycie energii",
}: MissionPanelProps) {
  return (
    <section className="panel mission-panel">
      <div className={`mode-tabs ${tutorialEnabled ? "" : "compact-tabs"}`} aria-label="Tryby gry">
        {tutorialEnabled && (
          <button className={mode === "tutorial" ? "active" : ""} onClick={() => onModeChange("tutorial")}>
            Samouczek
          </button>
        )}
        <button className={mode === "missions" ? "active" : ""} onClick={() => onModeChange("missions")}>
          Misje
        </button>
        <button className={mode === "failure" ? "active" : ""} onClick={() => onModeChange("failure")}>
          Awaria
        </button>
      </div>

      <div className="panel-heading">
        <span className="eyebrow">{mode === "tutorial" ? "Droga bodźca" : mode === "failure" ? "Diagnostyka" : missionLabel}</span>
        <h2>{mode === "failure" ? "Znajdź uszkodzony element" : currentMission.title}</h2>
      </div>

      {mode !== "failure" && (
        <>
          <label className="select-label" htmlFor="mission-select">
            Wybierz misję
          </label>
          <select
            id="mission-select"
            value={currentMission.id}
            disabled={mode === "tutorial"}
            onChange={(event) => onMissionChange(event.target.value)}
          >
            {missions.map((mission) => (
              <option key={mission.id} value={mission.id}>
                {mission.title}
              </option>
            ))}
          </select>
          <p className="mission-description">{currentMission.description}</p>
          <div className="target-box">
            <Route size={17} />
            <span>{currentMission.targetExplanation}</span>
          </div>
        </>
      )}

      {completed && score && (
        <div className="score-box">
          <div className="score-title">
            <Trophy size={18} />
            Wynik misji
          </div>
          <dl>
            <div>
              <dt>Stabilność</dt>
              <dd>{score.stability}</dd>
            </div>
            <div>
              <dt>Trafne decyzje</dt>
              <dd>{score.correct}</dd>
            </div>
            <div>
              <dt>Błędy</dt>
              <dd>{score.mistakes}</dd>
            </div>
            <div>
              <dt>{scoreResourceLabel}</dt>
              <dd>{score.energyUsed}</dd>
            </div>
          </dl>
          <p>{score.comment}</p>
        </div>
      )}

      <div className="mission-actions">
        <button className="secondary-button" onClick={onTogglePath}>
          <Route size={16} />
          Pokaż drogę bodźca
        </button>
        <button className="secondary-button" onClick={onReset}>
          <RotateCcw size={16} />
          Reset misji
        </button>
        {mode === "missions" && (
          <button className="primary-button" onClick={onNext}>
            Następna misja
          </button>
        )}
      </div>
    </section>
  );
}
