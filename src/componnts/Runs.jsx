import { useRecoilState,useRecoilValue} from 'recoil'
import { runsAtom } from '../atoms/runs'

export default function Runs(){
    const [runs , setRuns] = useRecoilState(runsAtom);

}
export function AddRuns({runValue}){
    const Runs = useRecoilValue(runsAtom)
    let totRuns = Runs + Number(runValue)
    return <>{totRuns}</>

}
export function RunsScored(){
    const Runs = useRecoilValue(runsAtom)
    return <>{Runs}</>
}