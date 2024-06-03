
import {RecoilRoot} from 'recoil'
import './App.css'
import ScoreBoard from './componnts/ScoreBoard';
import { ScorePerOver } from './componnts/ScorePerOver';
import OverViewer from './componnts/OverViewer';
import ScoreLog from './componnts/ScoreLog';
// import Target from './componnts/Target';
// import InningsSlider from './componnts/inningsSlider';




function App() {
  return (
    < main className='m-auto  relative w-[430px]'>
    <nav className='h-16 w-full bg-[#131515]'></nav>
      <RecoilRoot>
        <ScoreBoard />
        {/* <Target></Target> */}
        {/* <InningsSlider></InningsSlider> */}
        
        <ScoreLog>      
          <ScorePerOver></ScorePerOver>
        </ScoreLog>
        <OverViewer/>
      </RecoilRoot>
    </main>
  )
 
}
export default App

