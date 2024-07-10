import { useRecoilValue } from "recoil";
import {
  FirstInningsSCore,
  SecondInningsSCore,
} from "../atoms/inningsAtom";
import { oversLimitedTo } from "../atoms/settingsAtom";
import { teamANameAtom, teamBNameAtom } from "../atoms/matchAtom";

const ScoreCard = () => {

  const firstInningsScore = useRecoilValue(FirstInningsSCore);
  const secondInningsScore = useRecoilValue(SecondInningsSCore);
  const team_A = useRecoilValue(teamANameAtom);
  const team_B = useRecoilValue(teamBNameAtom);

  return (
    <div className="flex w-full bg-accent justify-around z-0 mt-1   top-0 text-center items-center   backdrop-blur-sm ">
        {/* Team A */}
      <TeamScores teamName={team_A} innings={firstInningsScore} />
        {/* vs */}
      <div className="">v/s</div>
        {/* Team B */}
      <TeamScores teamName={team_B} innings={secondInningsScore} />
    </div>
  );
};

export default ScoreCard;

export const TeamScores = ({ teamName, innings }) => {
  const oversLimit = useRecoilValue(oversLimitedTo);

  return (
    // Team Details
    <div className={` bg-neutral-2-light py-2 px-4 m-1 rounded-3xl backdrop:blur-sm`}>
      <p className="text-xl font-semibold  ">{teamName}</p>
      <div className="flex flex-col">
        {/* Score: runs/wickets */}
        <div className="">
          {innings.runs}/{innings.wickets}
        </div>
        {/* Overs (Max overs) */}
        <div className="">
          {innings.overs} ({oversLimit.toFixed(1)})
        </div>
      </div>
    </div>
  );
};
