import { useRecoilValue } from "recoil";
import { overHistory } from "../atoms/oversHistory";
import { inningsTabAtom } from "../atoms/inningsAtom";

export const OversHistory = () => {
  const inningsTab = useRecoilValue(inningsTabAtom);
  const overLog = useRecoilValue(overHistory(inningsTab));

  return (
    <div className="flex flex-col bg-neutral-2  h-60 m-2 overflow-y-auto pb-[50px] md:pb-[250px] rounded-lg shadow-[0_0_20x] transition-all duration-300">
      {/* overLog : [{},{}] */}
      {overLog.map((over, overIndex) =>
        overIndex != 0 ? (
          <div
            className="grid gap-2 grid-cols-12 p-2 m-2 bg-white justify-around rounded-xl"
            key={overIndex}
          >
            <div className="col-span-2  flex justify-center items-center bg-neutral-2 rounded-full">
              {/* <div className="">over</div> */}
              <div className="text-lg px-3 p-1">{over.over}</div>
            </div>
            <div className="col-span-8 bg-neutral-3 p-2 rounded-full flex justify-evenly items-center text-center overflow-x-auto ">
              {/* Render the over here */}
              {over.log.map((ball, ballIndex) => (
                <div className="" key={ballIndex}>
                  <Ball bgBall={'bg-accent'}>{ball}</Ball>
                </div>
              ))}
            </div>
            <div className=" col-span-2  flex justify-center items-center rounded-full bg-neutral-2">
              {/* <div className="">Score</div> */}
              <div className="text-lg px-3 p-1">
                {over.runs}/{over.wickets}
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};
export function Ball({ children, bgBall  }) {
  return (
    <div className={` w-8 m-[2px] rounded-full text-[23px] ${bgBall}  list-none`}>
      {children}
    </div>
  );
}
