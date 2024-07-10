import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  oversLimitedTo,
  runsOnExtra,
  wicketsLimitedTo,
} from "../atoms/settingsAtom";
import { NewMatch } from "./NewMatch";
import Toggle from "./Toggle";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import App from "../App";
import { matchStatusAtom } from "../atoms/matchAtom";
import { EditCount } from "./Settings";

const Home = () => {
  const [oversLimit, setOversLimit] = useRecoilState(oversLimitedTo);
  const [wicketsLimit, setWicketsLimit] = useRecoilState(wicketsLimitedTo);
  const setMatchStatus = useSetRecoilState(matchStatusAtom);
  const navigate = useNavigate();
  const startMatch = () => {
    setMatchStatus(true);
    navigate("/match");
  };
  return (
    <div className={`md:w-[460px] h-screen flex flex-col overflow-hidden md:m-auto w-screen
    bg-gradient-to-b from-gradiant-start from-10%  via-gradiant-2 via-30% to-90% to-gradiant-end  `}>
      <div className="text-center p-7 text-4xl">Score-Card</div>
      <p className=" text-center p-4">Set up your preferences below.</p>
      {/* <EditCount /> */}
      <Toggle/>
      <EditCount
            state={wicketsLimit}
            setState={setWicketsLimit}
            lable={"wickets Limit"}
            def={wicketsLimit}
            max={10}
            b1={<i className="fa-solid fa-plus"></i>}
            b2={<i className="fa-solid fa-minus"></i>}
          ></EditCount>
      <EditCount
            state={oversLimit}
            setState={setOversLimit}
            lable={"Overs Limit"}
            def={oversLimit}
            max={10}
            b1={<i className="fa-solid fa-plus"></i>}
            b2={<i className="fa-solid fa-minus"></i>}
          ></EditCount>
          <button className="bg-dominant text-text-1 rounded-md p-2 m-5"
          onClick={startMatch}>Lets Start the Match</button>
      
    </div>
  );
};

export default Home;
