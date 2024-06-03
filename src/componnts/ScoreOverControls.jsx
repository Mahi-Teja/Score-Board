import { currentOverRuns, runsAtom } from "../atoms/runs"
import { wicketsAtom } from "../atoms/wickets"
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import { AddRuns } from "./Runs"
import { ballsAtom, currentOverAtom, overLength, oversSelector } from "../atoms/overs"
import { isExtra } from "../atoms/setting"
import {  ScoreLogAtom, ScoreLogCurrentOverAtom } from "../atoms/OverLog"
import { useEffect } from "react"
import { CurrentOverRunsAtom, CurrentOverWicketsAtom } from "../atoms/currentOver"



export default function ScoreOverControls(){
    const [wicketsValue,setWickets] = useRecoilState(wicketsAtom)
    const [currentOverWickets,setCurrentOverWickets] = useRecoilState(CurrentOverWicketsAtom)
    const [currentOverRuns,setCurrentOverRuns] = useRecoilState(CurrentOverRunsAtom)
    const [runsValue , setRuns] = useRecoilState(runsAtom)

    const setBalls = useSetRecoilState(ballsAtom)
    const overValue = useRecoilValue(oversSelector)
    const [currentOver,setCurrentOver] = useRecoilState(currentOverAtom)

    const setCurrentOverStatus = useSetRecoilState(ScoreLogCurrentOverAtom)
    const currentOverStatusValue = useRecoilValue(ScoreLogCurrentOverAtom)

    const setScoreLog = useSetRecoilState(ScoreLogAtom)
    const currentOverLog = useRecoilValue(ScoreLogCurrentOverAtom)
    // const overs = useRecoilValue(oversSelector)
    const [overLengthValue,setOverLength] = useRecoilState(overLength)

    // over completed, actions performed
    const updateOverStatus = () => {
       
      };
      useEffect(()=>{
        setScoreLog((prev)=>[...prev,currentOverLog])
      },[setScoreLog,currentOverLog])
      useEffect(()=>{
        if(overLengthValue == 6){
            console.log(currentOverLog)
            
            setCurrentOverStatus((prevStatus) => ({
                currentOverValue: overValue.toFixed(1),
                currentOverRunsValue: currentOverRuns,
                currentOverWicketsValue: currentOverWickets,
                currentOverLog: [ currentOver],
                // currentOverLog: [...prevStatus.currentOverLog, currentOver],
            }));
            // currently wicketsValue is taking whole wickets value
            // should add currentOverWicket atom and 
            // add wicket whenever wicket is fallen in over
            //empty it when over.length == 6
            // do the same with currentoverRuns

            
            // setCurrentOverStatus
            // setScoreLog((prev)=>[...prev,currentOverLog])
            setCurrentOver([]);
            setCurrentOverRuns(0)
            setOverLength(0)
            setCurrentOverWickets(0)
            // console.log("re-render")
            
        }
    },[currentOver,wicketsValue,currentOverRuns,setCurrentOverRuns,currentOverWickets,setCurrentOverWickets,currentOverLog,runsValue,overValue,overLengthValue,setCurrentOver,setCurrentOverStatus,setOverLength,setScoreLog])
    
    // console.log(currentOverLog)
    return (
        <div className="bg-[#131515] rounded-xl m-2 p-2">
            <button onClick={()=> {
                setWickets(w=>w+1);
                setBalls(b=>b+1);
                setCurrentOverWickets(cW => cW + 1)
                setCurrentOver(b=>[...b,'W'])
                // setCurrentOverRunsValue()
                setOverLength(l=>l+1);
                // setCurrentOverStatus(v=>)
            }}
            className="p-2 m-2 bg-[#AF4319] rounded-lg">W</button>
            <button onClick={()=> {
                setRuns(r=>r+6);
                setCurrentOverRuns(cR => cR+6)
                setBalls(b=>b+1);
                setCurrentOver(b=>[...b,6]);
                setOverLength(l=>l+1);
            }}
            className="p-2 m-2 bg-[#AF4319] rounded-lg">6</button> 
            <button onClick={()=> {
                setRuns(r=>r+4);
                setCurrentOverRuns(cR => cR+4)
                setBalls(b=>b+1);
                setCurrentOver(b=>[...b,4]);
                setOverLength(l=>l+1);
                
            }}
            className="p-2 m-2 bg-[#AF4319] rounded-lg">4</button>
            <button onClick={()=> {
                setRuns(r=>r+0);
                setCurrentOverRuns(cR => cR+0)
                setBalls(b=>b+1);
                setCurrentOver(b=>[...b,0]);
                setOverLength(l=>l+1);
                
            }}
            className="p-2 m-2 bg-[#AF4319] rounded-lg">0</button>
            <button onClick={()=> {
                setRuns(r=>r+1);
                setCurrentOverRuns(cR => cR+1)
                setCurrentOverRuns(cR => cR+1)
                setBalls(b=>b+1);
                setCurrentOver(b=>[...b,1])
                setOverLength(l=>l+1);

            }}
                 className="p-2 m-2 bg-[#AF4319] rounded-lg">1</button>
            <button onClick={()=> {
                setRuns(r=>r+2);
                setCurrentOverRuns(cR => cR+2)
                setBalls(b=>b+1);
                setCurrentOver(b=>[...b,2])
                setOverLength(l=>l+1);
                
            }}
            className="p-2 m-2 bg-[#AF4319] rounded-lg">2</button>
            <button onClick={()=> {
                isExtra?(setRuns(r=>r+1)):null;
                isExtra?setCurrentOverRuns(cR => cR+1):null;
                
                setCurrentOver(b=>[...b,'ex']);
            }} className="p-2 m-2 bg-[#AF4319] rounded-lg">Extra</button>

            <button onClick={()=>{
                
             }} className="p-2 m-2 bg-[#AF4319] rounded-lg">Next Over</button>
             {/* <ButtonControl value={'N'} handleClick={addRun(6)}/> */}
            {/* 
            <button onClick={handleCustom} className="p-2 m-2 bg-[#AF4319] rounded-lg">Custom</button>
            <button onClick={handleEdit} className="p-2 m-2 bg-[#AF4319] rounded-lg">Edit</button> 
            */}
            
        </div>
    )
   
    
}
function ButtonControl({value,handleClick}){
    const setRun = useSetRecoilState(runsAtom)
    const [currentOver,setCurentOver] = useRecoilState(currentOverAtom)
    const setCurrentOverRuns = useSetRecoilState(currentOverRuns)
    const setBalls = useSetRecoilState(ballsAtom)
    function addRun(v){
        setRun(r => r + v)
    }
    return <>
        <button
        className="p-2 m-2 bg-[#AF4319] rounded-lg"
        onClick={handleClick} 
        
        >{value}</button>
    </>
}
// one button click does::
// - add run/wicket             (if extra = run => add run)
// - add balls                  (if extra = do not add ball)
// - add overLength             (if extra = do not add length)
// - add currentOverLog []
// - add currentOverRuns 
// - add currentOverWickts

