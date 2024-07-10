
import { useRecoilValue } from "recoil";
import {
  currentOverHistory,
  currentOverRunsFam,
  currentOverWicketsFam,
} from "../atoms/oversHistory";
import { inningsAtom } from "../atoms/inningsAtom";
import { Ball } from "./OversHistory";
import { oversSelector } from "../atoms/ballsOversAtom";

export const CurrentOver = () => {
  const innings = useRecoilValue(inningsAtom);
  const currentOver = useRecoilValue(currentOverHistory(innings));
  const currentOverRuns = useRecoilValue(currentOverRunsFam(innings));
  const currentOverWickets = useRecoilValue(currentOverWicketsFam(innings));
  const overs = useRecoilValue(oversSelector(innings));

  return (
    <div className="  md:w-[35%] grid gap-2 grid-cols-12 p-2 m-2 bg-white justify-around rounded-xl">
      <div className="col-span-2 flex flex-col items-center rounded-lg bg-neutral-2">
        <div className="">over</div>
        <div className="">{overs}</div>
      </div>
      <div className="flex justify-start md:justify-evenly col-span-8 p-1 m-1 items-center text-center  overflow-x-auto ">
        {currentOver.map((ball, index) => (
          <Ball key={index} bgBall={'bg-neutral-3'}>{ball}</Ball>
        ))}
      </div>
      <div className="col-span-2 flex flex-col items-center rounded-lg bg-neutral-2">
        <div className="">score</div>
        <div className="">{`${currentOverRuns}/${currentOverWickets}`}</div>
      </div>
    </div>
  );
};
