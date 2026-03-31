import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { matchStatusAtom } from "./atoms/matchAtom";

// Components
import { Navbar } from "./Components/Nav";
import ScoreCard from "./Components/Score-Card";
import { Target } from "./Components/Target";
import { IninngsCompleted } from "./Components/InningsCompleted";
import { Innings } from "./Innings";
import { ControlsAndOver } from "./Components/ControlsAndOver";

const App = () => {
  const navigate = useNavigate();
  const matchStatus = useRecoilValue(matchStatusAtom);

  /* 1. Redirect Security */
  useEffect(() => {
    if (!matchStatus) {
      navigate("/cricket/config");
    }
  }, [matchStatus, navigate]);

  /* 2. Prevention of Accidental Data Loss */
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // Standard browser warning message
      event.returnValue = "Match progress will be lost. Continue?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="flex justify-center w-full min-h-screen bg-neutral-900">
      {/* Main App Container 
          - md:max-w-[460px] simulates a mobile device on desktop 
          - overflow-hidden prevents the body from scrolling, 
            allowing the internal 'Innings' component to handle its own scrolling.
      */}
      <main
        className="
          relative
          w-full 
          max-w-[460px] 
          h-screen 
          flex flex-col 
          bg-neutral-50
          shadow-[0_0_50px_rgba(0,0,0,0.3)]
          overflow-hidden
        "
      >
        {/* Top Navigation & Status Bar Space */}
        <Navbar />

        {/* Global Overlays & Modals */}
        <IninngsCompleted />

        {/* Dynamic Match Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <ScoreCard />
          <Target show={"small"} />

          <Innings />
        </div>

        <ControlsAndOver />

        {/* <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-neutral-200/50 rounded-full pointer-events-none" /> */}
      </main>
    </div>
  );
};

export default App;
