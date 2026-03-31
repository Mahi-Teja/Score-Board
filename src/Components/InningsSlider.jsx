import { useRecoilState, useRecoilValue } from "recoil";
import { inningsAtom, inningsTabAtom } from "../atoms/inningsAtom";

export const InningsSlider = () => {
  const [inningsTab, setInningsTab] = useRecoilState(inningsTabAtom);
  const liveInnings = useRecoilValue(inningsAtom); // The actual innings in progress

  return (
    <div className="px-3 mt-4 mb-2">
      <div className="relative flex p-1.5 bg-neutral-100 rounded-[20px] border border-neutral-200/50 shadow-inner">
        {/* Sliding Indicator */}
        <div
          className={`
            absolute
            top-1.5
            bottom-1.5
            left-1.5
            w-[calc(50%-6px)]
            bg-dominant
            rounded-[14px]
            shadow-lg shadow-dominant/20
            transition-all
            duration-500
            cubic-bezier(0.4, 0, 0.2, 1)
            ${inningsTab === 2 ? "translate-x-full" : "translate-x-0"}
          `}
        />

        {/* Buttons */}
        <InningsButton
          tab={1}
          label="1st Innings"
          isLive={liveInnings === 1}
          active={inningsTab === 1}
          onClick={() => setInningsTab(1)}
        />

        <InningsButton
          tab={2}
          label="2nd Innings"
          isLive={liveInnings === 2}
          active={inningsTab === 2}
          onClick={() => setInningsTab(2)}
        />
      </div>
    </div>
  );
};

const InningsButton = ({ onClick, label, active, isLive }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        z-10
        flex-1
        py-2.5
        flex
        items-center
        justify-center
        gap-2
        text-sm
        font-black
        transition-colors
        duration-300
        ${active ? "text-white" : "text-neutral-400"}
      `}
    >
      {label}

      {/* Live Pulse Dot */}
      {isLive && (
        <span className="relative flex w-2 h-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${active ? "bg-white" : "bg-dominant"}`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${active ? "bg-white" : "bg-dominant"}`}
          ></span>
        </span>
      )}
    </button>
  );
};
