import {atom} from 'recoil'

// Score Log element
export const ScoreLogCurrentOverAtom = atom({
    key:"ScoreLogCurrentOverAtom",
    default:{
        currentOverValue:0,
        currnetOverRunsValue:0,
        currentOverWicketsValue:0,
        currentOverLog:[]
    }
})
// Score Log
export const ScoreLogAtom = atom({
    key:'ScoreLogAtom',
    default:[]
})