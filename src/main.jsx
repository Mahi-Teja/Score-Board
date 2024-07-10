import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RecoilRoot } from 'recoil'
import Home from './Components/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'

export default function Main() {
  return (
    <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/match" element={<App/>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
