import { useRecoilCallback } from "recoil";
import { runsAtom, targetAtom } from "../atoms/runsAtom";
import { ballsAtom } from "../atoms/ballsOversAtom";
import { wicketsAtom } from "../atoms/wicketsAtom";
import { inningsAtom, inningsTabAtom } from "../atoms/inningsAtom";
import { controlsAccessAtom, matchStatusAtom } from "../atoms/matchAtom";
import { overHistory } from "../atoms/oversHistory";

// Todo:
// reset matchStatus,overEndStatus,InningsStatus
// runs,overs,wickets,tartget
// oversHistory
export const useResetMatch = () => {
  const resetAll = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(overHistory(1));
        reset(runsAtom(1));
        reset(ballsAtom(1));
        reset(wicketsAtom(1));
        reset(targetAtom);
        reset(inningsAtom);
        reset(inningsTabAtom);
        // reset(matchStatusAtom);
        reset(controlsAccessAtom);

        reset(overHistory(2));
        reset(runsAtom(2));
        reset(ballsAtom(2));
        reset(wicketsAtom(2));
      },
    []
  );

  return resetAll;
};
