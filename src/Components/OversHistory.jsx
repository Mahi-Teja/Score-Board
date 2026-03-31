import { useRecoilValue } from "recoil";
import { overHistory } from "../atoms/oversHistory";
import { inningsTabAtom } from "../atoms/inningsAtom";
import { useEffect, useRef } from "react";

/**
 * Main History Component
 * Renders the list of completed overs for the selected innings.
 */
export const OversHistory = () => {
  const inningsTab = useRecoilValue(inningsTabAtom);
  const overLog = useRecoilValue(overHistory(inningsTab));
  const scrollContainerRef = useRef();

  // Auto-scroll the entire list to the bottom when a new over is added
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [overLog.length]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 px-3 pt-2 overflow-y-auto scroll-smooth no-scrollbar"
    >
      {/* Header Label */}
      <div className="flex items-center justify-between px-1 mb-4">
        <h2 className="text-xs font-black tracking-widest uppercase text-neutral-400">
          Innings Timeline
        </h2>
        <span className="text-[10px] bg-neutral-100 px-2 py-0.5 rounded-full text-neutral-500 font-bold">
          {overLog.length > 1
            ? `${overLog.length - 1} Overs Completed`
            : "0 Overs"}
        </span>
      </div>

      {/* Empty State */}
      {overLog.length <= 1 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-30">
          <i className="mb-2 text-4xl fa-solid fa-circle-nodes" />
          <p className="text-sm font-medium text-center">
            No history recorded yet.
            <br />
            Finish an over to see it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {overLog.map((over, idx) =>
            // Index 0 is usually an empty placeholder in the atom; skip it
            idx !== 0 ? <OverRow key={idx} over={over} /> : null,
          )}
        </div>
      )}

      {/* Safe Bottom Spacing: 
          Adjust h-52 or h-64 based on the height of your fixed ScoreControls 
      */}
      <div className="h-64 shrink-0" />
    </div>
  );
};

/* ---------------- Over Row ---------------- */

const OverRow = ({ over }) => {
  const ballScrollRef = useRef();

  // Auto-scroll the ball sequence to the right if it overflows (many extras)
  useEffect(() => {
    if (ballScrollRef.current) {
      ballScrollRef.current.scrollLeft = ballScrollRef.current.scrollWidth;
    }
  }, [over.log]);

  return (
    <div className="group flex items-center gap-3 p-3 bg-white rounded-[24px] border border-neutral-100 shadow-sm transition-all hover:border-dominant/20">
      {/* Over Number Badge */}
      <div className="flex flex-col items-center justify-center min-w-[46px] h-[46px] bg-neutral-50 rounded-2xl border border-neutral-100">
        <span className="text-[9px] font-bold text-neutral-400 uppercase leading-none mb-1">
          Over
        </span>
        <span className="text-sm font-black leading-none text-neutral-800">
          {over.over}
        </span>
      </div>

      {/* Horizontal Ball Sequence */}
      <div
        ref={ballScrollRef}
        className="flex-1 py-1 overflow-x-auto no-scrollbar scroll-smooth"
      >
        <div className="flex gap-1.5">
          {over.log.map((ballValue, i) => (
            <Ball key={i} value={ballValue} />
          ))}
        </div>
      </div>

      {/* Over Summary Stats */}
      <div className="pl-3 text-right border-l border-neutral-100">
        <div className="text-base font-black leading-none text-neutral-800">
          {over.runs}
          <span className="text-neutral-300 font-medium mx-0.5">/</span>
          {over.wickets}
        </div>
        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-tighter">
          Runs
        </span>
      </div>
    </div>
  );
};

/* ---------------- Ball Component ---------------- */

export function Ball({ value, children }) {
  // Logic for dynamic ball styling
  const isBoundary = value === "4" || value === "6";
  const isWicket = value === "W" || value === "WKT";
  const isExtra =
    value?.includes("Wd") ||
    value?.includes("Nb") ||
    value?.includes("WD") ||
    value?.includes("NB");

  // Determine classes based on ball type
  let colorClasses = "bg-neutral-100 text-neutral-600"; // Default (Dot ball or 1,2,3)

  if (isBoundary) {
    colorClasses = "bg-green-500 text-white shadow-sm scale-110 mx-0.5";
  } else if (isWicket) {
    colorClasses = "bg-red-500 text-white shadow-sm scale-110 mx-0.5";
  } else if (isExtra) {
    colorClasses = "bg-amber-100 text-amber-700 border border-amber-200";
  }

  return (
    <div
      className={`
      min-w-[30px] h-[30px] flex items-center justify-center
      text-[11px] font-black rounded-full transition-all duration-300
      ${colorClasses}
    `}
    >
      {value || children}
    </div>
  );
}
