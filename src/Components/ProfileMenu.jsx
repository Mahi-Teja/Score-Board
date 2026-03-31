import { useState } from "react";
import { useRecoilValue } from "recoil";
import { teamANameAtom, teamBNameAtom } from "../atoms/matchAtom";
import { Settings } from "./Settings";
import { NewMatch } from "./NewMatch";

export const ProfileMenu = ({ closeMenu }) => {
  const teamA = useRecoilValue(teamANameAtom);
  const teamB = useRecoilValue(teamBNameAtom);

  const [openSettings, setOpenSettings] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  return (
    <div className="bg-neutral-50 h-[calc(100vh-64px)]  overflow-hidden border-t border-neutral-100 shadow-2xl">
      <div className="h-full max-w-md p-4 pb-32 mx-auto space-y-4 overflow-y-auto no-scrollbar">
        {/* Match Overview Header */}
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
            Quick Menu
          </h2>
          <span className="text-[10px] font-bold text-dominant bg-dominant/10 px-2 py-0.5 rounded-full">
            Live Match
          </span>
        </div>

        {/* Current Match Card */}
        <SectionCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter mb-1">
                Current Match
              </p>
              <p className="text-xl font-black tracking-tight text-neutral-800">
                {teamA || "Team A"}{" "}
                <span className="mx-1 text-neutral-300">vs</span>{" "}
                {teamB || "Team B"}
              </p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-50 text-neutral-300">
              <i className="text-lg fa-solid fa-cricket-bat-ball" />
            </div>
          </div>
        </SectionCard>

        {/* Match Settings Accordion */}
        <SectionCard noPadding>
          <button
            className="flex items-center justify-between w-full p-5 font-black transition text-neutral-700 hover:bg-neutral-50 rounded-2xl"
            onClick={() => setOpenSettings((p) => !p)}
          >
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-sliders text-dominant opacity-70" />
              <span>Match Settings</span>
            </div>
            <i
              className={`fa-solid fa-chevron-${openSettings ? "up" : "down"} text-xs transition-transform duration-300`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${openSettings ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="p-5 pt-0 border-t border-neutral-50">
              <Settings />
            </div>
          </div>
        </SectionCard>

        {/* Start New Match Accordion */}
        <SectionCard noPadding>
          <button
            className="flex items-center justify-between w-full p-5 font-black transition text-neutral-700 hover:bg-neutral-50 rounded-2xl"
            onClick={() => setShowWarning((p) => !p)}
          >
            <div className="flex items-center gap-3">
              <i className="text-red-500 fa-solid fa-rotate opacity-70" />
              <span>Start New Match</span>
            </div>
            <i
              className={`fa-solid fa-chevron-${showWarning ? "up" : "down"} text-xs transition-transform duration-300`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${showWarning ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="p-5 space-y-4 border-t border-red-50 bg-red-50/30">
              <div className="flex items-center gap-3 text-red-600">
                <i className="fa-solid fa-triangle-exclamation" />
                <p className="text-xs font-bold leading-tight">
                  This will permanently reset all scores and match progress.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 py-3 text-xs font-black tracking-widest uppercase transition-transform bg-white border shadow-sm border-neutral-200 rounded-xl active:scale-95"
                  onClick={() => setShowWarning(false)}
                >
                  Cancel
                </button>
                <NewMatch closeMenu={closeMenu} />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* About Card */}
        <SectionCard>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-neutral-50 rounded-xl">
              <i className="fa-solid fa-circle-info text-neutral-400" />
            </div>
            <div>
              <p className="font-black text-neutral-800">About ScoreCard</p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-neutral-500">
                A simple, lightning-fast cricket scoring app built for street
                and club matches.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* App Version Tag */}
        <div className="py-4 text-center">
          <p className="text-[10px] font-black text-neutral-300 uppercase tracking-[0.3em]">
            Version 2.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

/* --- Refined Section Card Component --- */
const SectionCard = ({ children, noPadding = false }) => {
  return (
    <div
      className={`bg-white rounded-[28px] border border-neutral-100 shadow-sm overflow-hidden ${!noPadding ? "p-6" : ""}`}
    >
      {children}
    </div>
  );
};
