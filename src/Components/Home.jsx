import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { oversLimitedTo, wicketsLimitedTo } from "../atoms/settingsAtom";
import {
  teamANameAtom,
  teamBNameAtom,
  matchStatusAtom,
} from "../atoms/matchAtom";
import Toggle from "./Toggle";
import { useNavigate } from "react-router-dom";
import { EditCount } from "./Settings";

const Home = () => {
  const [oversLimit, setOversLimit] = useRecoilState(oversLimitedTo);
  const [wicketsLimit, setWicketsLimit] = useRecoilState(wicketsLimitedTo);
  const [teamA, setTeamA] = useRecoilState(teamANameAtom);
  const [teamB, setTeamB] = useRecoilState(teamBNameAtom);
  const setMatchStatus = useSetRecoilState(matchStatusAtom);
  const navigate = useNavigate();

  const startMatch = () => {
    if (!teamA.trim() || !teamB.trim()) {
      // Small UX tip: trim whitespace to prevent empty-name matches
      alert("Please enter both Team Names to continue.");
      return;
    }
    setMatchStatus(true);
    navigate("/cricket/match");
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-neutral-900">
      {/* Container simulating a mobile device */}
      <main className="relative w-full max-w-[460px] h-screen flex flex-col bg-neutral-50 overflow-hidden shadow-2xl">
        {/* Animated Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-64 bg-dominant rounded-b-[60px] opacity-10" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-dominant rounded-full blur-[100px] opacity-20" />

        {/* Header Section */}
        <header className="relative z-10 px-6 pt-12 pb-6 text-center">
          <div className="inline-block px-3 py-1 mb-3 border rounded-full bg-dominant/10 border-dominant/20">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-dominant">
              Cricket Engine v2
            </p>
          </div>
          <h1 className="text-4xl font-black leading-none tracking-tighter text-neutral-900">
            Score<span className="text-dominant">Card</span>
          </h1>
          <p className="mt-3 text-sm font-bold tracking-widest uppercase text-neutral-400">
            Match Configuration
          </p>
        </header>

        {/* Scrollable Setup Area */}
        <div className="relative z-10 flex-1 px-5 pb-32 overflow-y-auto no-scrollbar">
          <div className="p-6 space-y-6 bg-white border border-neutral-100 shadow-xl rounded-[40px]">
            {/* Team Names Input Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 ml-1">
                <i className="text-xs fa-solid fa-users text-dominant" />
                <span className="text-[11px] font-black uppercase text-neutral-400 tracking-widest">
                  Team Rosters
                </span>
              </div>
              <div className="space-y-3">
                <TeamInput
                  label="Home Team"
                  value={teamA}
                  setValue={setTeamA}
                />
                <TeamInput
                  label="Away Team"
                  value={teamB}
                  setValue={setTeamB}
                />
              </div>
            </div>

            <hr className="border-neutral-50" />

            {/* Rules Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 ml-1">
                <i className="text-xs fa-solid fa-gavel text-dominant" />
                <span className="text-[11px] font-black uppercase text-neutral-400 tracking-widest">
                  Match Rules
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <EditCount
                  state={wicketsLimit}
                  setState={setWicketsLimit}
                  label="Wickets"
                  max={10}
                />
                <EditCount
                  state={oversLimit}
                  setState={setOversLimit}
                  label="Overs"
                  max={99}
                />
                <Toggle />
              </div>
            </div>
          </div>

          {/* Subtle Tip */}
          <p className="mt-6 text-[11px] text-center text-neutral-400 font-medium px-10 leading-relaxed">
            Settings can be adjusted later via the Match Menu once the game
            begins.
          </p>
        </div>

        {/* Sticky Action Footer */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-white border-t border-neutral-100 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          {/* Top Fade: This creates a smooth transition so text 'disappears' as it scrolls under the button */}
          <div className="absolute left-0 right-0 h-10 pointer-events-none -top-10 bg-gradient-to-t from-white to-transparent" />

          <button
            className="w-full py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all shadow-xl shadow-dominant/25 bg-dominant rounded-[24px] active:scale-[0.97] hover:brightness-110"
            onClick={startMatch}
          >
            Go to Arena
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;

/* ---------------- Team Input ---------------- */

const TeamInput = ({ label, value, setValue }) => {
  return (
    <div className="group flex flex-col gap-1.5">
      <input
        type="text"
        value={value}
        placeholder={`${label} Name...`}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-4 text-sm font-black transition-all border outline-none rounded-2xl bg-neutral-50 border-neutral-100 focus:border-dominant focus:ring-4 focus:ring-dominant/5 placeholder:text-neutral-300 text-neutral-800"
      />
    </div>
  );
};
