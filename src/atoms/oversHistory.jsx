import { atom, atomFamily } from "recoil";

export const overHistory = atomFamily({
    key:'overHistory',
    default:(innings)=> ([{
        runs:0,
        wickets:0,
        over:'0.0',
        log:[],

    }])
})
export const currentOverHistory = atomFamily({
    key:'currentOverHistory',
    default:(innings)=> []
})
export const currentOverRunsFam = atomFamily({
    key:'currentOverRuns',
    default:(innings)=> 0
})
export const currentOverWicketsFam = atomFamily({
    key:'currentOverWickets',
    default:(innings)=> 0
})
export const currentOverDetailsAtom = atomFamily({
    key:'currentOverDetailsAtom',
    default:(innings)=>({
        thisOvers:0,
        thisRuns:0,
        thisWickets:0,
    })
})

export const AllBallLogAtom = atomFamily({
    key:'AllBallLogAtom',
    default:(innings)=> []
})