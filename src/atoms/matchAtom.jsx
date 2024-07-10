import { atom } from "recoil";

export const matchStatusAtom = atom({
  key: "matchStatusAtom",
  default: false,
});
export const overEndStatusAtom = atom({
  key: "overEndStatusAtom",
  default: false,
});
export const controlsAccessAtom = atom({
  key: "controlsAccessAtom",
  default: true,
});
export const winnerAtom = atom({
  key:'winnerAtom',
  default:null
})
export const teamANameAtom = atom({
    key:'teamANameAtom',
    default:'Team A'
})
export const teamBNameAtom = atom({
    key:'teamBNameAtom',
    default:'Team B'
})