import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { inningsAtom, inningsTabAtom } from "../atoms/inningsAtom";

import { runsAtom, targetAtom } from "../atoms/runsAtom";

import { wicketsAtom } from "../atoms/wicketsAtom";

import {
  ballsAtom,
  oversLenthAtom,
  oversSelector,
} from "../atoms/ballsOversAtom";

import { oversLimitedTo, runsOnExtra } from "../atoms/settingsAtom";

import {
  currentOverHistory,
  currentOverRunsFam,
  currentOverWicketsFam,
  overHistory,
} from "../atoms/oversHistory";

import { useEffect } from "react";

import {
  controlsAccessAtom,
  overEndStatusAtom,
  teamANameAtom,
  teamBNameAtom,
  winnerAtom,
} from "../atoms/matchAtom";
import { useResetMatch } from "../hooks/useResetMatch";
import { useNavigate } from "react-router-dom";

/* ================= Score Controls ================= */

export const ScoreControls = () => {
  const innings = useRecoilValue(inningsAtom);
  const [inningsTab, setInningsTab] = useRecoilState(inningsTabAtom);
  const controlsAccess = useRecoilValue(controlsAccessAtom);
  const overs = useRecoilValue(oversSelector(innings));
  const isExtra = useRecoilValue(runsOnExtra);
  const [overLength, setOversLength] = useRecoilState(oversLenthAtom);

  const teamA = useRecoilValue(teamANameAtom);
  const teamB = useRecoilValue(teamBNameAtom);
  const winner = useRecoilValue(winnerAtom);

  const runs = useRecoilValue(runsAtom(innings));

  const totalOvers = useRecoilValue(oversLimitedTo);

  const target = useRecoilValue(targetAtom);

  const currBalls = useRecoilValue(ballsAtom(innings));
  // Logic for the chase/result
  const navigate = useNavigate();
  const totalBalls = totalOvers * 6;
  const ballsBowled = Array.isArray(currBalls) ? currBalls.length : currBalls;
  const leftBalls = Math.max(totalBalls - ballsBowled, 0);
  const runsNeeded = Math.max(target - runs, 0);
  const runsMargin = target - 1 - runs;
  const clearAll = useResetMatch();
  const resetMatch = () => {
    clearAll();
    navigate("/cricket/config");
  };

  /* ---------------- Setters ---------------- */
  const setRuns = useSetRecoilState(runsAtom(innings));
  const setWickets = useSetRecoilState(wicketsAtom(innings));
  const setBalls = useSetRecoilState(ballsAtom(innings));
  const setOversLog = useSetRecoilState(overHistory(innings));
  const setCurrentOver = useSetRecoilState(currentOverHistory(innings));
  const currentOver = useRecoilValue(currentOverHistory(innings));
  const [currentOverRuns, setCurrentOverRuns] = useRecoilState(
    currentOverRunsFam(innings),
  );
  const [currentOverWickets, setCurrentOverWickets] = useRecoilState(
    currentOverWicketsFam(innings),
  );

  /* ---------------- Helpers ---------------- */
  const focusInningsTab = () => {
    if (inningsTab !== innings) setInningsTab(innings);
  };

  const addRunsAndBalls = (val) => {
    const runs = Number(val);
    setRuns((r) => r + runs);
    setCurrentOverRuns((r) => r + runs);
    setBalls((b) => b + 1);
    setOversLength((o) => o + 1);
    setCurrentOver((prev) => [...prev, val.toString()]);
    focusInningsTab();
  };

  const handleWicket = () => {
    setWickets((w) => w + 1);
    setCurrentOverWickets((w) => w + 1);
    setBalls((b) => b + 1);
    setOversLength((o) => o + 1);
    setCurrentOver((prev) => [...prev, "W"]);
    focusInningsTab();
  };

  const handleExtra = (type) => {
    // Standard cricket: WD and NB add 1 run to total even if no runs taken
    if (isExtra) {
      setRuns((r) => r + 1);
      setCurrentOverRuns((r) => r + 1);
    }
    setCurrentOver((prev) => [...prev, type]);
    focusInningsTab();
  };

  /* ---------------- Over Complete Logic ---------------- */
  useEffect(() => {
    if (overLength >= 6) {
      setOversLog((prev) => [
        ...prev,
        {
          runs: currentOverRuns,
          wickets: currentOverWickets,
          over: overs,
          log: currentOver,
        },
      ]);
      // Reset for next over
      setCurrentOver([]);
      setCurrentOverRuns(0);
      setCurrentOverWickets(0);
      setOversLength(0);
    }
  }, [overLength]);

  /* ---------------- UI ---------------- */

  // If match is finished, show the "New Match" Action Panel
  if (!controlsAccess && winner !== 0) {
    const isTeamBWinner = winner === 2;
    const winnerName = isTeamBWinner ? teamB : teamA;
    const resultText = isTeamBWinner
      ? `by ${leftBalls} ${leftBalls === 1 ? "ball" : "balls"}`
      : `by ${runsMargin} ${runsMargin === 1 ? "run" : "runs"}`;

    return (
      <div className="px-4 py-3 mx-2 mt-2 bg-neutral-900 border border-neutral-800 rounded-[24px] shadow-xl animate-in slide-in-from-top-2 duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 shadow-lg bg-amber-400 rounded-xl shadow-amber-500/20">
              <i className="text-lg fa-solid fa-trophy text-neutral-900" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-[0.2em] leading-none mb-1">
                Match Result
              </span>
              <p className="text-sm font-black tracking-tight text-white">
                {winnerName || (isTeamBWinner ? "Team B" : "Team A")}{" "}
                <span className="font-medium text-white/60">
                  won {resultText}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => resetMatch()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 border border-white/10"
          >
            Start New
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`p-1 space-y-3 transition-opacity ${!controlsAccess ? "hidden" : ""}`}
      // className={`p-1 space-y-3 transition-opacity ${!controlsAccess ? "opacity-50 pointer-events-none" : ""}`}
    >
      {/* Primary Score Grid */}
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((num) => (
          <RunButton
            key={num}
            value={num}
            onClick={() => addRunsAndBalls(num)}
          />
        ))}
        <div className="col-span-2">
          <RunButton value={4} highlight onClick={() => addRunsAndBalls(4)} />
        </div>
        <div className="col-span-2">
          <RunButton value={6} highlight onClick={() => addRunsAndBalls(6)} />
        </div>
      </div>

      {/* Extras Bar */}
      <div className="flex gap-2">
        {["WD", "NB", "BYE", "LB"].map((type) => (
          <ExtraButton
            key={type}
            type={type}
            onClick={() => handleExtra(type)}
          />
        ))}
        <ExtraButton type="WKT" onClick={handleWicket} />
      </div>
    </div>
  );
};

/* ---------------- Sub-Components ---------------- */

const RunButton = ({ value, highlight, onClick }) => (
  <button
    onClick={onClick}
    className={`
    h-12 w-full rounded-xl font-black text-lg transition-all active:scale-90
    ${
      highlight
        ? "bg-dominant text-white shadow-lg shadow-dominant/20"
        : "bg-white text-neutral-800 border border-neutral-200 shadow-sm"
    }
  `}
  >
    {value}
  </button>
);

const ExtraButton = ({ type, onClick }) => (
  <button
    onClick={onClick}
    className={`
    flex-1 py-2 rounded-lg text-[11px] font-black transition-all active:scale-95
    ${
      type === "WKT"
        ? "bg-red-50 text-red-600 border border-red-100"
        : "bg-neutral-100 text-neutral-600 border border-transparent"
    }
  `}
  >
    {type}
  </button>
);

/* ================= Control Button ================= */

export const ControlButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-12 font-semibold text-white transition shadow-sm rounded-xl bg-dominant active:scale-95"
    >
      {label}
    </button>
  );
};
