import {atom, atomFamily} from 'recoil'

export const runsAtom = atom({
    key:'runsAtom',
    default:0
})

export const currentOverRuns = atom({
    key:'currentOverRuns',
    default:0
})