import { CurrentOver } from "./CurrentOver";
import { ScoreControls } from "./Score-Controls";

export const ControlsAndOver = () => {
  return (
    <div className=" pt-1 w-screen md:sticky bottom-0  fixed rounded-lg shadow-[0_0_20px_controls-color] bg-neutral-2-light">
      <CurrentOver />
      <ScoreControls />
    </div>
  );
};
