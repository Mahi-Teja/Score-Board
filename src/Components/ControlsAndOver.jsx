import { CurrentOver } from "./CurrentOver";
import { ScoreControls } from "./Score-Controls";

export const ControlsAndOver = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center px-2 pb-1 md:pb-3">
      <div
        className="
        w-full max-w-[460px] 
        bg-white/90 backdrop-blur-xl 
        border border-white/20
        shadow-[0_-12px_40px_-10px_rgba(0,0,0,0.15)]
        rounded-[32px] 
        overflow-hidden
      "
      >
        {/* Decorative Handle */}
        <div className="w-12 h-1 mx-auto mt-3 rounded-full bg-neutral-200" />

        <div className="p-2 space-y-2">
          <CurrentOver />
          <ScoreControls />
        </div>
      </div>
    </div>
  );
};
