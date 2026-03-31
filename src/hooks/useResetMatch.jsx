import { useRecoilCallback } from "recoil";

import { runsAtom, targetAtom } from "../atoms/runsAtom";
import { ballsAtom, oversLenthAtom } from "../atoms/ballsOversAtom";

import { wicketsAtom } from "../atoms/wicketsAtom";

import { inningsAtom, inningsTabAtom } from "../atoms/inningsAtom";

import {
  controlsAccessAtom,
  matchStatusAtom,
  overEndStatusAtom,
  winnerAtom,
} from "../atoms/matchAtom";

import {
  AllBallLogAtom,
  currentOverHistory,
  currentOverRunsFam,
  currentOverWicketsFam,
  overHistory,
} from "../atoms/oversHistory";

export const useResetMatch = () => {
  const resetAll = useRecoilCallback(
    ({ reset }) =>
      () => {
        /* Reset innings based atoms */

        [1, 2].forEach((innings) => {
          reset(overHistory(innings));
          reset(runsAtom(innings));
          reset(ballsAtom(innings));
          reset(wicketsAtom(innings));

          reset(currentOverHistory(innings));
          reset(currentOverRunsFam(innings));
          reset(currentOverWicketsFam(innings));

          reset(AllBallLogAtom(innings));
        });

        /* Global Reset */

        reset(targetAtom);
        reset(inningsAtom);
        reset(inningsTabAtom);
        reset(controlsAccessAtom);
        reset(oversLenthAtom);

        /* Optional but recommended */

        reset(overEndStatusAtom);
        reset(winnerAtom);
        reset(matchStatusAtom);
      },
    [],
  );

  return resetAll;
};
