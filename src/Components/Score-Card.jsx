import { useRecoilValue } from "recoil";
import { FirstInningsSCore, SecondInningsSCore } from "../atoms/inningsAtom";
import { oversLimitedTo } from "../atoms/settingsAtom";
import { teamANameAtom, teamBNameAtom, winnerAtom } from "../atoms/matchAtom";

const ScoreCard = () => {
  const firstInningsScore = useRecoilValue(FirstInningsSCore);
  const secondInningsScore = useRecoilValue(SecondInningsSCore);
  const teamA = useRecoilValue(teamANameAtom);
  const teamB = useRecoilValue(teamBNameAtom);
  const winner = useRecoilValue(winnerAtom);

  return (
    <div className="relative mx-2 mt-2 group">
      <div
        className={`
        relative flex items-center justify-between px-4 py-5
        bg-white border rounded-[32px] overflow-hidden transition-all duration-700
        ${winner !== 0 ? "border-amber-300 shadow-xl shadow-amber-500/10" : "border-neutral-100 shadow-sm"}
      `}
      >
        {/* --- Left Side Gradient (Team A) --- */}
        <div
          className={`absolute inset-y-0 left-0 w-1/2 transition-opacity duration-1000 ${
            winner === 1
              ? "bg-gradient-to-r from-amber-100/50 to-transparent opacity-100"
              : "bg-gradient-to-r from-neutral-50 to-transparent opacity-100"
          }`}
        />

        {/* --- Right Side Gradient (Team B) --- */}
        <div
          className={`absolute inset-y-0 right-0 w-1/2 transition-opacity duration-1000 ${
            winner === 2
              ? "bg-gradient-to-l from-amber-100/50 to-transparent opacity-100"
              : "bg-gradient-to-l from-neutral-50 to-transparent opacity-100"
          }`}
        />

        {/* Content Container */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <TeamScores
            name={teamA || "Team A"}
            score={firstInningsScore}
            align="start"
            isWinner={winner === 1}
            isLoser={winner === 2}
          />

          {/* Center Bridge */}
          <div className="flex flex-col items-center px-3">
            <div
              className={`w-[1px] h-6 transition-colors ${winner !== 0 ? "bg-amber-200" : "bg-neutral-100"}`}
            />
            <div
              className={`
              px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest border transition-all duration-500
              ${winner !== 0 ? "bg-amber-500 border-amber-400 text-white shadow-lg shadow-amber-200" : "bg-white border-neutral-100 text-neutral-400"}
            `}
            >
              {"VS"}
            </div>
            <div
              className={`w-[1px] h-6 transition-colors ${winner !== 0 ? "bg-amber-200" : "bg-neutral-100"}`}
            />
          </div>

          <TeamScores
            name={teamB || "Team B"}
            score={secondInningsScore}
            align="end"
            isWinner={winner === 2}
            isLoser={winner === 1}
          />
        </div>
      </div>
    </div>
  );
};

const TeamScores = ({ name, score, align, isWinner, isLoser }) => {
  const oversLimit = useRecoilValue(oversLimitedTo);
  const isStart = align === "start";

  return (
    <div
      className={`
      flex flex-col flex-1 min-w-0 transition-all duration-700
      ${isStart ? "items-start text-left" : "items-end text-right"} 
      ${isLoser ? "opacity-100 grayscale blur-[0.5px] scale-[0.98]" : "opacity-100"}
    `}
    >
      {/* Status Label Area - Fixed height to prevent jumpy layout */}
      <div className="flex items-center h-2 mb-1">
        {isWinner ? (
          <div className="flex items-center gap-1.5 bg-neutral-900 text-amber-400 px-2 py-0.5 rounded-full border border-neutral-800 shadow-lg shadow-amber-900/20 animate-bounce-subtle">
            <i className="fa-solid fa-crown text-[7px]" />
            <span className="text-[7px] font-black uppercase tracking-widest">
              Champions
            </span>
          </div>
        ) : (
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-300">
            {isStart ? "1st Inn" : "2nd Inn"}
          </span>
        )}
      </div>

      {/* Team Name */}
      <h3
        className={`
        text-[10px] font-black uppercase tracking-widest truncate w-full mb-0.5 transition-colors
        ${isWinner ? "text-neutral-900" : "text-neutral-500"}
      `}
      >
        {name}
      </h3>

      {/* Score Area - Fixed Scaling Origin */}
      <div
        className={`
        flex items-baseline leading-none gap-0.5 transition-transform duration-500
        ${isWinner ? (isStart ? "scale-110 origin-left" : "scale-110 origin-right") : "scale-100"}
      `}
      >
        <span
          className={`text-3xl font-black tracking-tighter ${isWinner ? "text-neutral-900" : "text-neutral-800"}`}
        >
          {score.runs}
        </span>
        <span
          className={`text-sm font-bold ${isWinner ? "text-amber-600" : "text-neutral-300"}`}
        >
          /{score.wickets}
        </span>
      </div>

      {/* Overs Display - More compact */}
      <div className="flex items-center gap-1 mt-1.5">
        <div
          className={`px-1.5 py-0.5 rounded-md text-[9px] font-black border transition-colors ${
            isWinner
              ? "bg-amber-400/20 border-amber-400/30 text-amber-900"
              : "bg-neutral-50 border-neutral-100 text-neutral-500"
          }`}
        >
          {score.overs}
        </div>
        <span className="text-[8px] font-bold text-neutral-300 uppercase tracking-tighter">
          ov / {oversLimit}
        </span>
      </div>
    </div>
  );
};
export default ScoreCard;
