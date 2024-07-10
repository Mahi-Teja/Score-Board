import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { FirstInningsSCore, SecondInningsSCore } from "../atoms/inningsAtom";
import { runsAtom, targetAtom } from "../atoms/runsAtom";
import { oversLimitedTo, wicketsLimitedTo } from "../atoms/settingsAtom";
import { controlsAccessAtom, matchStatusAtom, overEndStatusAtom, winnerAtom } from "../atoms/matchAtom";
import { wicketsAtom } from "../atoms/wicketsAtom";
import { useEffect, useState } from "react";
import { oversLenthAtom, oversSelector } from "../atoms/ballsOversAtom";
import { inningsAtom } from "../atoms/inningsAtom";

export const IninngsCompleted = () => {
  const [innings, setInnings] = useRecoilState(inningsAtom);
  const [inningsStatus, setInningsStatus] = useState(false);

  const setOverLength = useSetRecoilState(oversLenthAtom);
  const oversLimit = useRecoilValue(oversLimitedTo);
  const setOverEndStatus = useSetRecoilState(overEndStatusAtom);

  const wicketsLimit = useRecoilValue(wicketsLimitedTo);
  const wickets = useRecoilValue(wicketsAtom(innings));
  const firstInningsScore = useRecoilValue(FirstInningsSCore);
  const secondInningsScore = useRecoilValue(SecondInningsSCore);
  const setTarget = useSetRecoilState(targetAtom);
  const target = useRecoilValue(targetAtom);
  const setControlAccess = useSetRecoilState(controlsAccessAtom);

  // responsible for rendering popup
  const changeInningsStatus = () => {
    setInningsStatus((p) => !p);
  };
  const firstInningsCompleted =
    innings == 1 &&
    (oversLimit <= firstInningsScore.overs ||
      wicketsLimit <= firstInningsScore.wickets);
  const secondInningsCompleted =
    innings == 2 &&
    (oversLimit <= secondInningsScore.overs ||
      wicketsLimit <= secondInningsScore.wickets ||
      target <= secondInningsScore.runs);

  useEffect(() => {
    if (firstInningsCompleted) {
      setTarget(firstInningsScore.runs + 1);
    }
  }, [firstInningsCompleted, firstInningsScore, setTarget]);
  useEffect(() => {
    if (secondInningsCompleted) {
      setControlAccess(false);
    }
  }, [firstInningsCompleted, secondInningsCompleted, setControlAccess]);

  useEffect(() => {
    if (firstInningsCompleted || secondInningsCompleted) {
      setOverEndStatus(true);
      changeInningsStatus();
      setOverLength(0);
    }
  }, [
    firstInningsCompleted,
    secondInningsCompleted,
    setOverEndStatus,
    setOverLength,
  ]);

  const changeInnings = () => {
    setInningsStatus((p) => !p);
    setInnings(2);
  };

  return (
    <div className="relative">
      {inningsStatus ? <InningsPopUp handleClick={changeInnings} /> : null}
    </div>
  );
};

export const InningsPopUp = ({ handleClick }) => {
  const innings = useRecoilValue(inningsAtom);
  const overs = useRecoilValue(oversSelector(innings));
  const runs = useRecoilValue(runsAtom(innings));
  const wickets = useRecoilValue(wicketsAtom(innings));
  const oversLimit = useRecoilValue(oversLimitedTo);
  const target = useRecoilValue(targetAtom);
  const SetWinner = useSetRecoilState(winnerAtom)

  const winnerIs =
    runs > target
      ? SetWinner(2)
      : runs == target - 1
      ? SetWinner(0)
      : SetWinner(1)
  const completedComment =
    runs > target
      ? "Team B Won"
      : runs == target - 1
      ? "It is a TIE"
      : "Team A Won";
  const comment = innings == 1 ? `Target: ${target}` : completedComment;
  return (
    <div className="relative flex justify-center ">
      <div className="h-full w-full bg-neutral-2-blur backdrop:blur-[50px] fixed top-0 opacity-50 bottom-0 left-0 right-0 overflow-hidden z-10"></div>
      <div className="absolute flex flex-col justify-center  items-center  rounded-[36px]  p-8 bg-accent z-20">
        <p className="text-2xl p-1">Innings Completed!!</p>
        <p className="text-lg  p-1">
          Score: {runs} / {wickets}
        </p>
        <p className="text-lg  p-1">
          Overs: {overs} ({oversLimit.toFixed(1)})
        </p>
        <p className="text-lg  p-1">{comment}</p>

        <button
          className="p-4 mt-5 rounded-lg border bg-dominant text-text-1"
          onClick={handleClick}
        >
          {innings == 1 ? "Start SecondInnings" : "view Details"}
        </button>
      </div>
    </div>
  );
};
