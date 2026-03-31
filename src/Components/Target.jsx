import { useRecoilValue } from "recoil";
import { runsAtom } from "../atoms/runsAtom";
import { ballsAtom } from "../atoms/ballsOversAtom";
import { oversLimitedTo } from "../atoms/settingsAtom";
import { inningsAtom, FirstInningsSCore } from "../atoms/inningsAtom";
import { teamBNameAtom, winnerAtom } from "../atoms/matchAtom";

export const Target = ({ show = "small" | "big" }) => {
  const innings = useRecoilValue(inningsAtom);
  const winner = useRecoilValue(winnerAtom);
  const teamB = useRecoilValue(teamBNameAtom);

  // --- Robust Data Extraction ---
  const raw1stScore = useRecoilValue(FirstInningsSCore);
  const raw2ndRuns = useRecoilValue(runsAtom(innings));
  const rawOvers = useRecoilValue(oversLimitedTo);
  const currBallsArray = useRecoilValue(ballsAtom(innings));

  // Helper to extract number from potential objects/strings
  const toNum = (val) => {
    if (typeof val === "object" && val !== null)
      return Number(val.runs || val.total || 0);
    return Number(val) || 0;
  };

  const firstInningsTotal = toNum(raw1stScore);
  const currentRuns = toNum(raw2ndRuns);
  const totalOvers = toNum(rawOvers);

  // --- Logic ---
  const target = firstInningsTotal + 1;
  const totalBallsPossible = totalOvers * 6;
  const ballsBowledCount = Array.isArray(currBallsArray)
    ? currBallsArray.length
    : 0;

  const leftBalls = Math.max(totalBallsPossible - ballsBowledCount, 0);
  const runsNeeded = Math.max(target - currentRuns, 0);

  // Display calculations
  const oversLeft = Math.floor(leftBalls / 6);
  const ballsInOver = leftBalls % 6;
  const timeStr =
    leftBalls >= 6 ? `${oversLeft}.${ballsInOver} overs` : `${leftBalls} balls`;

  // --- Visibility Guard ---
  if (Number(innings) !== 2 || (winner != 0 && winner != null)) return null;

  if (show == "small") {
    return (
      <div className="px-4 py-2.5 mx-3 mt-2 bg-white border border-neutral-100 rounded-[20px] shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="flex items-center justify-between">
          {/* Left Side: Static Target */}
          <div className="flex flex-col">
            <span className="text-[8px] font-black uppercase text-neutral-400 tracking-wider leading-none mb-1">
              To Win
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-black leading-none tracking-tighter text-neutral-900">
                {target}
              </span>
              <span className="text-[8px] font-bold text-neutral-300 uppercase">
                Runs
              </span>
            </div>
          </div>

          {/* Vertical Divider / Progress Bar Hybrid */}
          <div className="relative w-[2px] h-7 bg-neutral-50 mx-3 overflow-hidden rounded-full">
            <div
              className="absolute bottom-0 left-0 w-full transition-all duration-700 bg-dominant/30"
              style={{
                height: `${Math.min((currentRuns / target) * 100, 100)}%`,
              }}
            />
          </div>

          {/* Right Side: Live Calculation */}
          <div className="flex flex-col items-end flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-black text-neutral-500 truncate max-w-[80px]">
                {teamB || "Team B"}
              </span>
              <span className="text-[7px] font-black uppercase bg-neutral-900 text-white px-1.5 py-0.5 rounded-md">
                Chasing
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-lg font-black leading-none tracking-tighter text-neutral-900">
                {runsNeeded}
              </span>
              <span className="text-[8px] font-black text-neutral-300 uppercase italic">
                in
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-black rounded-md text-dominant bg-dominant/5 leading-none">
                {timeStr}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-3 mt-3 overflow-hidden bg-white border border-neutral-100 rounded-[24px] shadow-sm animate-in fade-in zoom-in-95 duration-500">
      {/* Top Section: The Goal */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-50/50">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-neutral-900">
            <i className="text-[10px] text-white fa-solid fa-bullseye"></i>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Target to Win
          </span>
        </div>
        <span className="text-lg font-black tracking-tighter text-neutral-900">
          {target}{" "}
          <span className="text-[10px] text-neutral-300 italic">runs</span>
        </span>
      </div>

      {/* Bottom Section: The Live Chase */}
      <div className="px-4 py-4 border-t border-neutral-100">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black text-neutral-800 truncate max-w-[120px]">
                {teamB || "Team B"}
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-dominant text-white text-[7px] font-black uppercase">
                Needs
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-black leading-none tracking-tighter text-neutral-900">
                {runsNeeded}
              </h2>
              <span className="text-xs font-bold tracking-tighter uppercase text-neutral-300">
                Remaining
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black uppercase text-neutral-300 tracking-widest mb-1">
              From
            </span>
            <div className="px-3 py-1.5 rounded-2xl bg-dominant/5 border border-dominant/10">
              <span className="text-sm font-black text-dominant">
                {timeStr}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="relative w-full h-1.5 mt-4 overflow-hidden rounded-full bg-neutral-100">
          <div
            className="absolute top-0 left-0 h-full transition-all duration-1000 ease-out rounded-full bg-dominant"
            style={{ width: `${Math.min((currentRuns / target) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
