import { InningsSlider } from "./Components/InningsSlider";
import { OversHistory } from "./Components/OversHistory";

export const Innings = () => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <InningsSlider />
      <OversHistory />
    </div>
  );
};
