import { useRecoilState } from "recoil";
import { runsOnExtra } from "../atoms/settingsAtom";

const Toggle = () => {
  const [extras, setExtras] = useRecoilState(runsOnExtra);

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-neutral-100 rounded-[24px] shadow-sm transition-all active:bg-neutral-50/50">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-black tracking-tight text-neutral-800">
          Runs on Extras
        </p>
        <p className="text-[11px] font-medium text-neutral-400 leading-tight">
          Automatically add 1 run for Wide/No-Balls
        </p>
      </div>

      <button
        onClick={() => setExtras(!extras)}
        aria-checked={extras}
        role="switch"
        className={`
          relative
          w-11 h-6 
          rounded-full 
          transition-colors duration-300 ease-in-out
          outline-none
          ${extras ? "bg-dominant" : "bg-neutral-200"}
        `}
      >
        {/* Switch Thumb */}
        <div
          className={`
            absolute
            top-1
            left-1
            w-4 h-4 
            bg-white 
            rounded-full 
            shadow-sm
            transition-transform duration-300 ease-in-out
            ${extras ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
};

export default Toggle;
