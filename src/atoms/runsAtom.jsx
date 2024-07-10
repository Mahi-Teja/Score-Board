import { atom, atomFamily } from "recoil";

export const runsAtom = atomFamily({
    key:'runsAtom',
    default:(innings)=> 0
})
export const targetAtom = atom({
    key:'targetAtom',
    default:1
})