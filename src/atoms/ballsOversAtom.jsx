import { atom, atomFamily, selectorFamily } from "recoil";

export const ballsAtom = atomFamily({
    key:'ballsAtom',
    default:(innings)=> 0
})
export const oversSelector = selectorFamily({
    key:"oversSelector",
    get:(innings)=>({get})=>{
        const balls = get(ballsAtom(innings))
        const overs = ( Math.floor(balls/6) + ((balls%6)/10)).toFixed(1)
        return overs
    }
})
export const oversLenthAtom = atom({
    key:'oversLengthAtom',
    default:0
})

