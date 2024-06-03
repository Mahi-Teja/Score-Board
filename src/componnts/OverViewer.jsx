import ScoreOverControls from "./ScoreOverControls"
import CurrentOver from "./CurrentOverViewer"


export default function OverViewer(){
    
    // current over
    //over controls
    return(
        <div className=" bottom-0 h-[30%] py-5 w-full md:w-[430px] bg-[#f7ede2] sticky">
            <CurrentOver></CurrentOver>
            <ScoreOverControls></ScoreOverControls>

        </div>

    )
}
