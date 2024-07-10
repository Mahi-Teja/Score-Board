import { atom, selector } from "recoil";
import { runsAtom } from "./runsAtom";
import { wicketsAtom } from "./wicketsAtom";
import { ballsAtom } from "./ballsOversAtom";

export const inningsAtom = atom({
    key:'inningsAtom',
    default:1
})
export const inningsTabAtom = atom({
    key:'inningsTabAtom',
    default:1
})
export const FirstInningsSCore = selector({
    key:'FirstInningsScore',
    get:({get})=>{
        const runs = get(runsAtom(1))
        const wickets = get(wicketsAtom(1))
        const balls = get(ballsAtom(1))
        return{
        runs: runs,
        target: 0,
        overs: (Math.floor(balls/6) + ((balls%6)/10)).toFixed(1),
        wickets: wickets,
        scoreLog: [], }
    }
})
export const SecondInningsSCore = selector({
    key:'SecondInningsScore',
    get:({get})=>{
        const runs = get(runsAtom(2))
        const wickets = get(wicketsAtom(2))
        const balls = get(ballsAtom(2))
        return{
        runs: runs,
        target: 0,
        overs: (Math.floor(balls/6) + ((balls%6)/10)).toFixed(1),
        wickets: wickets,
        scoreLog: [], }
    }
})