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
  const runs = useRecoilValue(currentOverRunsFam(innings));
  const wickets = useRecoilValue(currentOverWicketsFam(innings));
  const overs = useRecoilValue(oversSelector(innings));

  return (
    <div className="flex items-center gap-3 p-3 border bg-neutral-50 rounded-2xl border-neutral-100">
      {/* Over Label */}
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">
          Over
        </span>
        <span className="text-base font-black leading-none text-neutral-800">
          {overs}
        </span>
      </div>

      {/* Balls Tracker */}
      <div className="relative flex-1 px-2 border-x border-neutral-200">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {currentOver?.length === 0 ? (
            <span className="flex gap-4 py-1 italic text-neutral-400">
              {Array(6)
                .fill("")
                .map((v, i) => (
                  <div key={i} className="transition-all animate-in zoom-in-50">
                    <Ball value={v} />
                  </div>
                ))}
            </span>
          ) : (
            currentOver?.map((ball, i) => (
              <div key={i} className="transition-all animate-in zoom-in-50">
                <Ball value={ball} />
              </div>
            ))
          )}
        </div>
        {/* Elegant Fade */}
        <div className="absolute top-0 bottom-0 right-0 w-8 pointer-events-none bg-gradient-to-l from-neutral-50 to-transparent" />
      </div>

      {/* Live Total */}
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">
          Total
        </span>
        <div className="text-base font-black leading-none text-dominant">
          {runs}
          <span className="font-medium text-neutral-300">/</span>
          {wickets}
        </div>
      </div>
    </div>
  );
};
