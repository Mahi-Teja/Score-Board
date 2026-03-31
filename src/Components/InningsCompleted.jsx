/* ---------------- Popup ---------------- */

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  FirstInningsSCore,
  SecondInningsSCore,
  inningsAtom,
} from "../atoms/inningsAtom";

import { runsAtom, targetAtom } from "../atoms/runsAtom";

import { oversLimitedTo, wicketsLimitedTo } from "../atoms/settingsAtom";

import {
  controlsAccessAtom,
  overEndStatusAtom,
  teamANameAtom,
  teamBNameAtom,
  winnerAtom,
} from "../atoms/matchAtom";

import { wicketsAtom } from "../atoms/wicketsAtom";

import { useEffect, useState } from "react";

import { oversLenthAtom, oversSelector } from "../atoms/ballsOversAtom";

/* ---------------- Innings Completed ---------------- */

export const IninngsCompleted = () => {
  const [currentInnings, setCurrentInnings] = useRecoilState(inningsAtom);

  const [isInningsCompletedPopupOpen, setIsInningsCompletedPopupOpen] =
    useState(false);

  const resetCurrentOverLength = useSetRecoilState(oversLenthAtom);

  const maxOvers = useRecoilValue(oversLimitedTo);

  const maxWickets = useRecoilValue(wicketsLimitedTo);

  const setOverCompletedStatus = useSetRecoilState(overEndStatusAtom);

  const firstInningsSummary = useRecoilValue(FirstInningsSCore);

  const secondInningsSummary = useRecoilValue(SecondInningsSCore);

  const setTargetRuns = useSetRecoilState(targetAtom);

  const targetRuns = useRecoilValue(targetAtom);

  const disableControls = useSetRecoilState(controlsAccessAtom);

  /* ---------------- First Innings Completed ---------------- */

  const isFirstInningsCompleted =
    currentInnings === 1 &&
    (firstInningsSummary.overs >= maxOvers ||
      firstInningsSummary.wickets >= maxWickets);

  /* ---------------- Second Innings Completed ---------------- */

  const isSecondInningsCompleted =
    currentInnings === 2 &&
    (secondInningsSummary.overs >= maxOvers ||
      secondInningsSummary.wickets >= maxWickets ||
      secondInningsSummary.runs >= targetRuns);

  /* ---------------- Set Target ---------------- */

  useEffect(() => {
    if (isFirstInningsCompleted) {
      setTargetRuns(firstInningsSummary.runs + 1);
    }
  }, [isFirstInningsCompleted]);

  /* ---------------- Disable Controls ---------------- */

  useEffect(() => {
    if (isSecondInningsCompleted) {
      disableControls(false);
    }
  }, [isSecondInningsCompleted]);

  /* ---------------- Show Popup ---------------- */

  useEffect(() => {
    if (isFirstInningsCompleted || isSecondInningsCompleted) {
      setOverCompletedStatus(true);
      setIsInningsCompletedPopupOpen(true);
      resetCurrentOverLength(0);
    }
  }, [isFirstInningsCompleted, isSecondInningsCompleted]);

  /* ---------------- Switch Innings ---------------- */

  const startSecondInnings = () => {
    setIsInningsCompletedPopupOpen(false);
    setCurrentInnings(2);
  };

  return (
    <>
      {isInningsCompletedPopupOpen && (
        <InningsPopUp onAction={startSecondInnings} />
      )}
    </>
  );
};

/* ---------------- Popup ---------------- */

import confetti from "canvas-confetti"; // Make sure to npm install canvas-confetti

export const InningsPopUp = ({ onAction }) => {
  const currentInnings = useRecoilValue(inningsAtom);
  const inningsRuns = useRecoilValue(runsAtom(currentInnings));
  const inningsWickets = useRecoilValue(wicketsAtom(currentInnings));
  const maxOvers = useRecoilValue(oversLimitedTo);
  const targetRuns = useRecoilValue(targetAtom);
  const teamA = useRecoilValue(teamANameAtom);
  const teamB = useRecoilValue(teamBNameAtom);

  const setMatchWinner = useSetRecoilState(winnerAtom);
  const isMatchCompleted = currentInnings === 2;

  /* ---------------- Winner & Confetti Logic ---------------- */
  useEffect(() => {
    if (!isMatchCompleted) return;

    let winState = 0;
    if (inningsRuns >= targetRuns) winState = 2;
    else if (inningsRuns === targetRuns - 1) winState = 0;
    else winState = 1;

    setMatchWinner(winState);

    // Trigger Confetti if there's a winner
    if (winState !== 0) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#fbbf24", "#f59e0b", "#000000"], // Gold and Black theme
      });
    }
  }, [isMatchCompleted]);

  /* ---------------- Result Message Component ---------------- */
  const ResultMessage = () => {
    const runsMargin = targetRuns - 1 - inningsRuns;
    // Note: Assuming you have a way to calculate ballsLeft accurately here
    // For now using a placeholder or calculating based on your state
    const ballsLeft = 0;

    const WinnerBadge = ({ name }) => (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 mx-1 font-black bg-neutral-900 text-amber-400 rounded-full shadow-lg border border-neutral-800 animate-in zoom-in duration-500">
        <i className="fa-solid fa-crown text-[10px]" />
        {name}
      </span>
    );

    if (inningsRuns === targetRuns - 1) {
      return (
        <p className="text-sm font-black tracking-widest uppercase text-neutral-400">
          Match Tied
        </p>
      );
    }

    if (inningsRuns >= targetRuns) {
      return (
        <div className="flex flex-col items-center gap-2">
          <WinnerBadge name={teamB || "Team B"} />
          <p className="text-xs italic font-bold text-neutral-500">
            Winners by wickets/balls
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-2">
        <WinnerBadge name={teamA || "Team A"} />
        <p className="text-xs italic font-bold text-neutral-500">
          Winners by {runsMargin} runs
        </p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 duration-500 bg-neutral-900/40 backdrop-blur-md animate-in fade-in" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[340px] p-8 text-center bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[40px] animate-in zoom-in slide-in-from-bottom-10 duration-500">
        {/* Top Icon / Status */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 border rounded-full shadow-inner bg-neutral-50 border-neutral-100">
            {isMatchCompleted ? (
              <i className="text-2xl fa-solid fa-trophy text-amber-500" />
            ) : (
              <i className="text-2xl fa-solid fa-flag-checkered text-neutral-400" />
            )}
          </div>
        </div>

        <h2 className="text-xl font-black tracking-tight text-neutral-900">
          {isMatchCompleted ? "Match Finished" : "Innings Over"}
        </h2>

        {/* Score Display Card */}
        <div className="py-3 my-6 bg-neutral-50 border border-neutral-100 rounded-[32px]">
          <p className=" text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
            {teamA}
          </p>
          <div className="text-5xl font-black tracking-tighter text-neutral-800">
            {inningsRuns}
            <span className="mx-1 text-neutral-200">/</span>
            {inningsWickets}
          </div>
          <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
            Total Score
          </p>
        </div>

        {/* Dynamic Content Area */}
        <div className="min-h-[80px] flex flex-col justify-center">
          {isMatchCompleted ? (
            <div className="space-y-4">
              <ResultMessage />
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                Target for {teamB}
              </p>
              <p className="text-5xl font-black tracking-tighter text-dominant">
                {targetRuns}
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                runs in {maxOvers.toFixed(1)} overs.
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          className="w-full py-4 mt-8 text-xs font-black tracking-[0.2em] text-white uppercase transition-all bg-neutral-900 rounded-[22px] active:scale-95 shadow-xl shadow-neutral-200"
          onClick={onAction}
        >
          {isMatchCompleted ? "View Dashboard" : "Start Next Innings"}
        </button>
      </div>
    </div>
  );
};
