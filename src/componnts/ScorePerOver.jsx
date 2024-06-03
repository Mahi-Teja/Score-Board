
import {useRecoilValue} from 'recoil'
import { ScoreLogAtom } from "../atoms/OverLog"
import { OverHistory } from "../over-log/OverHistory"

export function ScorePerOver(){
  const overObject = useRecoilValue(ScoreLogAtom)
  
//   {currentOverLogObject.currentOverLogObject.map((b,i)=>{
//     return 
//   })}
    //wickets , overNumber , runs , overLog

    return <RenderOverCard overObject={overObject}/>

}
function RenderOverCard({overObject}){
    return <div className=" flex flex-col   one ">
            {overObject.map((over,index)=>{
                // console.log(index)
               if(index>0){

                // console.log(index)
                   return(
                    <div className="flex justify-around two" key={index}>
                        <RenderOver  
                        over={over.currentOverValue} 
                        runs={over.currentOverRunsValue}
                        wickets={over.currentOverWicketsValue}
                        log={over.currentOverLog}
                        ></RenderOver>
                    </div>
                    )
               }
            })}
            
        </div>
}
function RenderOver({over,log,runs,wickets}){
    return <div className="grid grid-cols-12 items-center justify-around  three">
        <OverStatus status={over}></OverStatus>
        <OverHistory log={log[0]} over={over}/>
        <OverRunsStatus runs={runs} wickets={wickets}></OverRunsStatus>
    </div>
}
function OverStatus({status}){
    return(
        <div className="border rounded-xl m-1 p-2 items-center flex flex-col col-span-2 four">
            <div className=" border-b text-sm m-auto">Over</div>
            <div className="w-8 text-center  font-semibold">{status}</div>
        </div>
    )
}

function OverRunsStatus({name,runs,wickets}){
    return(
        <div className="border rounded-xl m-1  p-2 justify-center items-center flex flex-col col-span-2 five">
            <div className=" border-b text-sm m-auto">Score</div>
            <div className="w-8 text-center  font-semibold">{runs}/{wickets}</div>
        </div>
    )
}

