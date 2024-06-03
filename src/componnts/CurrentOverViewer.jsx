import {  useRecoilValue } from "recoil"
import { Ball } from "./Ball"
import { currentOverAtom, oversSelector } from "../atoms/overs"
import { currentOverRuns } from "../atoms/runs"
import { CurrentOverRunsAtom, CurrentOverWicketsAtom } from "../atoms/currentOver"


// overNumber
// overRuns
// overWicket
// overLog
export default function CurrentOver(){
    const currentOver = useRecoilValue(currentOverAtom)
    const currentRuns = useRecoilValue(CurrentOverRunsAtom)
    const currentWicket = useRecoilValue(CurrentOverWicketsAtom)
    // console.log(currentOver)
    const currentOverNumber = useRecoilValue(oversSelector)

    // currentOvernumber (including balls), CurrentOverRuns , currentOverWickets
    return (
        <div className="flex items-center justify-between mx-2 bg-[#FFFAFB] rounded-xl  p-2">
            <div className="">
                <p>over</p>
                <p className="text-2xl">{currentOverNumber}</p>
            </div>
            <div className="p-1 m-1 flex overflow-x-auto ">
                {currentOver.map((ball,index)=>{
                    // console.log('ball')
                    // console.log(ball)
                    return <Ball key={index} status={ball}></Ball>
                })}
                
            </div>
            <div className="">
                <p>runs</p>
                <p className="text-2xl">{currentRuns}/{currentWicket}</p>
            </div>
        </div>
    )
}
