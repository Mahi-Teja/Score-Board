import ScoreCard from "./Components/Score-Card";
import { useEffect } from "react";
import { IninngsCompleted, InningsPopUp } from "./Components/InningsCompleted";
import { Navbar } from "./Components/Nav";
import { Target } from "./Components/Target";
// import { TEST } from "./Components/TEST";

import { Innings } from "./Innings";
import { ControlsAndOver } from "./Components/ControlsAndOver";
import { useRecoilValue } from "recoil";
import { matchStatusAtom } from "./atoms/matchAtom";
import { Link, redirect, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const matchStatus = useRecoilValue(matchStatusAtom);
  useEffect(() => {
    // Got this From chatGPT
    const reload = ()=>{
      navigate('/')
    }
    const handleBeforeUnload = (event) => {
      event.preventDefault();

      // Modern browsers require returnValue to be set
      event.returnValue = "Are you sure you want to leave? Changes you made may not be saved.";
      return "Are you sure you want to leave? Changes you made may not be saved.";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener('onReload',reload)
    // Cleanup the event listener on component unmount
    redirect('/')
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener('onReload',reload)
    };
  }, [navigate]);
  !matchStatus?redirect('/'):null
  return  (
    // <TEST></TEST>
    <div className="md:w-[460px]  md:flex md:flex-col md:text-sm h-screen  overflow-hidden md:m-auto w-screen  bg-gradient-to-b from-gradiant-start from-10%  via-gradiant-2 via-30% to-90% to-gradiant-end ">
      
      <Navbar></Navbar>
      <ScoreCard />
      <Target />
      <IninngsCompleted />
      <Innings />
      <ControlsAndOver />
    </div>
  ) 
};

export default App;
