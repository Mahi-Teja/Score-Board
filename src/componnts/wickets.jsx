import { useRecoilValue } from "recoil"
import { wicketsAtom } from "../atoms/wickets"


export function WicketsFallen(){
    const wickets = useRecoilValue(wicketsAtom)
    return(
        <>{wickets}</>
    )
}