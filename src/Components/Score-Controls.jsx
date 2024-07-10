import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { inningsAtom, inningsTabAtom } from "../atoms/inningsAtom";
import { runsAtom } from "../atoms/runsAtom";
import { wicketsAtom } from "../atoms/wicketsAtom";
import {
  ballsAtom,
  oversLenthAtom,
  oversSelector,
} from "../atoms/ballsOversAtom";
import { runsOnExtra } from "../atoms/settingsAtom";
import {
  AllBallLogAtom,
  currentOverDetailsAtom,
  currentOverHistory,
  currentOverRunsFam,
  currentOverWicketsFam,
  overHistory,
} from "../atoms/oversHistory";
import { useEffect } from "react";
import { controlsAccessAtom, overEndStatusAtom } from "../atoms/matchAtom";
import icons from "../icons";
import { BallIcons } from "./BallIcons";
export const ScoreControls = () => {
  const innings = useRecoilValue(inningsAtom);
  const [inningsTab, setInningsTab] = useRecoilState(inningsTabAtom);
  const controlsAccess = useRecoilValue(controlsAccessAtom);
  const overs = useRecoilValue(oversSelector(innings));
  const [isextra, ] = useRecoilState(runsOnExtra);
  const currentOverRuns = useRecoilValue(currentOverRunsFam(innings));
  const currentOverWickets = useRecoilValue(currentOverWicketsFam(innings));
  const [overLength, setOversLength] = useRecoilState(oversLenthAtom);

  //getting  set states
  const setRuns = useSetRecoilState(runsAtom(innings));
  const setWickets = useSetRecoilState(wicketsAtom(innings));
  const setBalls = useSetRecoilState(ballsAtom(innings));
  const [OversLOg, setOversLog] = useRecoilState(overHistory(innings));
  const [overEndStatus, setOverEndStatus] = useRecoilState(overEndStatusAtom);

  const setCurrentOver = useSetRecoilState(currentOverHistory(innings));
  const currentOver = useRecoilValue(currentOverHistory(innings));
  const [currentOverDetails, setCurrentOverDetails] = useRecoilState(currentOverDetailsAtom(innings));
  const resetCurrentOverDetails = useResetRecoilState(currentOverDetailsAtom(innings));
  const setCurrentOverRuns = useSetRecoilState(currentOverRunsFam(innings));
  const setCurrentOverWickets = useSetRecoilState(currentOverWicketsFam(innings));
  const [allBallsLog, setAllBallsLog] = useRecoilState(AllBallLogAtom(innings));


  //click handles---
  const clearCurrentOver = () => {
    setCurrentOverRuns(0);
    setCurrentOverWickets(0);
    setCurrentOver([]);
  };

  const addCurrentOverRuns = (run) => {
    setCurrentOverDetails((prev) => ({
      ...prev,
      thisRuns: prev.thisRuns + run,
    }));
    setCurrentOverRuns((pre) => pre + run);
  };
  const addCurrentOverWicket = (wicket) => {
    setCurrentOverDetails((prev) => ({
      ...prev,
      thisWickets: prev.thisWickets + wicket,
    }));
    setCurrentOverWickets((pre) => pre + wicket);
  };
  const addRuns = (lable, isextra, run) => {
    isextra ? (setRuns((r) => r + run), addCurrentOverRuns(run)) : null;
    addToHistory(lable);
    focusInningsTab();
  };
  const addWickets = (lable) => {
    setWickets((w) => w + 1);
    addCurrentOverWicket(1);
    addToHistory(lable);
    focusInningsTab();
  };
  const addBalls = (lable, balls) => {
    setBalls((b) => b + balls);
    addToHistory(lable);
    setOversLength((o) => o + 1);
    focusInningsTab();
  };
  const addRunsAndBalls = (lable, balls, runs) => {
    setRuns((r) => r + runs);
    addCurrentOverRuns(runs);
    addBalls(lable, balls);
  };
  const addWicketsAndBalls = (lable, balls, wickets) => {
    addCurrentOverWicket(wickets);

    setWickets((w) => w + wickets);
    addBalls(lable, balls);
  };
  const addToHistory = (current) => {
    setAllBallsLog((pre) => [...pre, current]);
    setCurrentOverDetails(() => ({
      thisOvers: 2.0,
      thisRuns: 21,
      thisWickets: 2,
      thisLog: [currentOver],
    }));
    setCurrentOver((pre) => [...pre, current]);
  };
  useEffect(() => {
    if (overLength >= 6 || (overEndStatus && currentOver[0])) {
      setOversLength(0);
      setOversLog((pre) => [
        ...pre,
        {
          runs: currentOverRuns,
          wickets: currentOverWickets,
          over: overs,
          log: currentOver,
        },
      ]);
      setCurrentOver([]);
      clearCurrentOver();
    }
    return () => setOverEndStatus(false);
  }, [
    overLength,
    currentOverRuns,
    currentOverWickets,
    overs,
    OversLOg,
    allBallsLog,
    overEndStatus,
    currentOver,
    clearCurrentOver,
    setOversLength,
    setCurrentOver,
    setOversLog,
    setCurrentOverDetails,
    setOverEndStatus,
    resetCurrentOverDetails,
  ]);
  // Edit Feature
  // const EditCurrentOver = ()=>{
  //   if(currentOver[0]){
  //   const options = {
  //     'W':'w'
      
  //   }
  //     const lastBall = currentOver[currentOver.length-1]
  //     // if(lastBall==)
  //     setBalls(b=>b-1)
  //     setRuns(r=>r-Number(lastBall))
  //     setOversLength(pre=>pre-1)
  //     const editedOver = currentOver.slice(0,-1)
  //     setCurrentOver(editedOver)
  //   }
  // }

  function focusInningsTab() {
    inningsTab != innings ? setInningsTab(innings) : null;
  }
  return controlsAccess ? (
    <div className="flex flex-wrap m-2 bg-accent rounded-2xl">
      <ControlButton
        lable={"1"}
        params={[1, 1]}
        imgCode={icons.single}
        handleClick={addRunsAndBalls}
      />
      <ControlButton
        lable={"2"}
        params={[1, 2]}
        imgCode={icons.double}
        handleClick={addRunsAndBalls}
      />
      <ControlButton
        lable={"4"}
        params={[1, 4]}
        imgCode={icons.four}
        handleClick={addRunsAndBalls}
      />
      <ControlButton
        lable={"6"}
        params={[1, 6]}
        imgCode={icons.six}
        handleClick={addRunsAndBalls}
      />
      <ControlButton
        lable={"0"}
        params={[1, 0]}
        imgCode={icons.dot}
        handleClick={addRunsAndBalls}
      />
      <ControlButton
        lable={"W"}
        params={[1, 1]}
        imgCode={icons.wicket}
        handleClick={addWicketsAndBalls}
      />
      <ControlButton
        lable={"Wd"}
        params={[isextra, 1]}
        imgCode={icons.wicket}
        handleClick={addRuns}
      />
      {/* Edit Over Button */}
      {/* <button 
      className={`p-2 border bg-dominant w-[50px] h-[50px]  text-text-1 rounded-xl text-xl  m-2`}
      onClick={EditCurrentOver}
      >
        <i className="fa-thin fa-pen-to-square" style={{color:'#ffffff'}}></i>
        </button> */}
    </div>
  ) : (
    <div className="flex w-screen pointer-events-none opacity-60">
      <ControlButton
        lable={"1"}
        imgCode={icons.single}
        params={[1, 1]}
        handleClick={addRunsAndBalls}
      />
      <ControlButton
        lable={"2"}
        imgCode={icons.double}
        params={[1, 2]}
        handleClick={addRunsAndBalls}
      />
      <ControlButton
        lable={"4"}
        imgCode={icons.four}
        params={[1, 4]}
        handleClick={addRunsAndBalls}
      />
      <ControlButton
        lable={"6"}
        imgCode={icons.six}
        params={[1, 6]}
        handleClick={addRunsAndBalls}
      />
      <ControlButton
        lable={"0"}
        imgCode={icons.dot}
        params={[1, 0]}
        handleClick={addRunsAndBalls}
      />
      <ControlButton
        lable={"W"}
        imgCode={icons.wicket}
        params={[1, 1]}
        handleClick={addWicketsAndBalls}
      />
      <ControlButton
        lable={"Wide"}
        imgCode={icons.wicket}
        params={[isextra, 1]}
        handleClick={addRuns}
      />
    {/* this is else case */}
    </div>
  );
};

export const ControlButton = ({ lable, handleClick, params, imgCode }) => {
  return (
    <button
      className="p-2 border bg-dominant w-[50px] h-[50px]  text-text-1 rounded-xl text-xl  m-2"
      onClick={() => handleClick(lable, ...params)}
      // onClick={()=>handleClick(imgCode,...params)}
    >
        {/* this renders icons instead of characters */}
      {/* <BallIcons src={imgCode}/> */}
      {lable}
    </button>
  );
};
