// import {useRecoilVlaue} from 'recoil'
import { useRecoilValue } from 'recoil'
import { RunsScored } from './Runs'
import { WicketsFallen } from './wickets'
import { oversSelector } from '../atoms/overs'
import { ScoreLogAtom } from '../atoms/OverLog'


export default function ScoreBoard(){
    const overs = useRecoilValue(oversSelector)
    const overLog = useRecoilValue(ScoreLogAtom)

    // console.log('overLog')
    // console.log(overLog)
    
    return (
        <div className="flex justify-center sticky bg-white top-0 text-center items-center mb-2 pb-2 ">
            <div className="">
                <p className="text-lg ">SCORE:</p>
                <h3 className="p-4 mx-2  text-5xl bg-[#2B2C28] text-[#339989] rounded-lg font-semibold">
                    <RunsScored/>/<WicketsFallen/></h3>
            </div>
            <div className="">
                <p className="text-xl">OVERS</p>
                <h3 className="p-4 mx-2  text-5xl bg-[#2B2C28] text-[#339989] rounded-lg font-semibold">{overs}</h3>
            </div>
        </div>
    )
}