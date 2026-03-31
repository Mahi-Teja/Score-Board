import { atom } from "recoil";

export const runsOnExtra = atom({
  key: "runsOnExtra",
  default: false,
});
export const oversLimitedTo = atom({
  key: "oversLimitedTo",
  default: 1,
});
export const wicketsLimitedTo = atom({
  key: "wicketsLimiTo",
  default: 10,
});
