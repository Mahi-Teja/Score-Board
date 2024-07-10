import { atom, atomFamily } from "recoil";

export const wicketsAtom = atomFamily({
    key:'wicketsAtom',
    default:(innings)=> 0
})