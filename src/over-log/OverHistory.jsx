import { Ball } from "../componnts/Ball"


export function OverHistory({log,over}){
    const i = log[0];
    // console.log(i)
        return <div className="flex col-span-8 overflow-x-auto six">
            {log.map((ball,index)=>{
            return <Ball key={over+''+index} status={ball}></Ball>
        })}
        </div>
    }
