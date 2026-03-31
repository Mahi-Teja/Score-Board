import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { oversLimitedTo, wicketsLimitedTo } from "../atoms/settingsAtom";
import {
  teamANameAtom,
  teamBNameAtom,
  matchStatusAtom,
} from "../atoms/matchAtom";
import Toggle from "./Toggle";

export const Settings = () => {
  const matchStarted = useRecoilValue(matchStatusAtom);
  const [teamA, setTeamA] = useRecoilState(teamANameAtom);
  const [teamB, setTeamB] = useRecoilState(teamBNameAtom);
  const [oversLimit, setOversLimit] = useRecoilState(oversLimitedTo);
  const [wicketsLimit, setWicketsLimit] = useRecoilState(wicketsLimitedTo);

  return (
    <div className="space-y-6">
      {/* Team Names Group */}
      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase opacity-40 tracking-[0.2em] ml-1">
          Team Identification
        </p>
        <div className="grid grid-cols-1 gap-3">
          <TeamInput label="Team A" value={teamA} setValue={setTeamA} />
          <TeamInput label="Team B" value={teamB} setValue={setTeamB} />
        </div>
      </div>

      <hr className="border-neutral-100" />

      {/* Match Rules Group */}
      <div className="space-y-3">
        <div className="flex items-center justify-between ml-1">
          <p className="text-[10px] font-black uppercase opacity-40 tracking-[0.2em]">
            Match Configuration
          </p>
          {matchStarted && (
            <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase">
              Locked
            </span>
          )}
        </div>

        <EditCount
          label="Total Overs"
          state={oversLimit}
          setState={setOversLimit}
          max={50}
          disabled={matchStarted}
        />

        <EditCount
          label="Wickets"
          state={wicketsLimit}
          setState={setWicketsLimit}
          max={10}
          disabled={matchStarted}
        />

        <div className="pt-2">
          <Toggle />
        </div>
      </div>
    </div>
  );
};

/* --- Sub-Components --- */

const TeamInput = ({ label, value, setValue }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-black text-neutral-400 uppercase tracking-tighter ml-1">
        {label}
      </label>
      <input
        value={value}
        placeholder={`Enter ${label}...`}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 text-sm font-bold transition-all border outline-none rounded-xl bg-neutral-50 border-neutral-100 focus:border-dominant focus:ring-4 focus:ring-dominant/5 text-neutral-800 placeholder:text-neutral-300"
      />
    </div>
  );
};

export const EditCount = ({
  label,
  max,
  state,
  setState,
  disabled = false,
}) => {
  const [value, setValue] = useState(state);

  useEffect(() => {
    setValue(state);
  }, [state]);

  const handleBlur = () => {
    let newVal = Math.max(1, Math.min(max, Number(value) || 1));
    setValue(newVal);
    setState(newVal);
  };

  const adjust = (amount) => {
    const newVal = Math.max(1, Math.min(max, Number(value) + amount));
    setValue(newVal);
    setState(newVal);
  };

  return (
    <div
      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${disabled ? "bg-neutral-50 border-neutral-100 opacity-60" : "bg-white border-neutral-200"}`}
    >
      <span className="text-sm font-black text-neutral-700">{label}</span>

      <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl">
        <button
          disabled={disabled}
          onClick={() => adjust(-1)}
          className="flex items-center justify-center w-8 h-8 transition-all bg-white rounded-lg shadow-sm text-neutral-800 active:scale-90 disabled:opacity-0"
        >
          <i className="fa-solid fa-minus text-[10px]" />
        </button>

        <input
          type="number"
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleBlur}
          className="w-10 text-sm font-black text-center bg-transparent outline-none text-neutral-800"
        />

        <button
          disabled={disabled}
          onClick={() => adjust(1)}
          className="flex items-center justify-center w-8 h-8 text-white transition-all rounded-lg shadow-sm bg-dominant active:scale-90 disabled:opacity-0"
        >
          <i className="fa-solid fa-plus text-[10px]" />
        </button>
      </div>
    </div>
  );
};
