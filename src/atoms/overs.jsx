import {atom, selector} from 'recoil'


export const ballsAtom = atom({
    key:'ballsAtom',
    default:0
})
export const oversSelector = selector({
    key:'oversSelector',
    get:({get})=>{
        const balls = get(ballsAtom)
        let overStart = Math.floor(balls/6)
        let overEnd = (balls%6)/10;
        return ( overStart + overEnd)
    }
})

export const currentOverAtom = atom({
    key:'currentOverAtom',
    default:[]
    // add over balls as array
})
// both are same.
export const currentOverLogAtom = atom({
    key:'currentOverLogAtom',
    default:[]
    // add over balls as array
})

export const overLength = atom({
    key:'overLength',
    default:0
})



// length = 0
// ball added length +1
// extra length = same
// if lenfth = 6 , length = 0 .. empty array
// length == 6 push the array to overLog 

// default:overId => {
    //     return []
// }