
import { useRecoilValue } from "recoil";
import { runsAtom, targetAtom } from "../atoms/runsAtom";
import { ballsAtom } from "../atoms/ballsOversAtom";
import { oversLimitedTo } from "../atoms/settingsAtom";
import { inningsAtom } from "../atoms/inningsAtom";
import { teamBNameAtom } from "../atoms/matchAtom";

export const Target = () => {
  const innings = useRecoilValue(inningsAtom);
  const target = useRecoilValue(targetAtom);
  const currBalls = useRecoilValue(ballsAtom(innings));
  const runs = useRecoilValue(runsAtom(innings));
  const totalOvers = useRecoilValue(oversLimitedTo);
  const team_B = useRecoilValue(teamBNameAtom)

  let overs = currBalls;
  let need = target - runs;
  let limit = totalOvers * 6;
  let leftBalls = limit - overs;
  let leftOvers = Math.floor(leftBalls / 6) + (leftBalls % 6) / 10;

  return (
    <div className=" bg-accent ">
      {innings == 2 ? (
        <div className="flex p-2 justify-evenly items-center align-middle">
          <p className="">Target : {target}</p>
          
          <p className="px-3">
            {`${team_B} Need ${need < 0 ? 0 : need} Runs in  ${leftBalls > 30 ? `${leftOvers} overs` : `${leftBalls} balls`}`}
            
          </p>
        </div>
      ) : null}
    </div>
  );
};
