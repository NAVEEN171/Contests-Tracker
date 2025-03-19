import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Solutions from './pages/Solutions/Solutions';
import SavedContests from './pages/SavedContests/SavedContests';


import Home from './pages/Home/Home'

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Solutions/:id" element={<Solutions />} />
        <Route path="/SavedContests" element={<SavedContests />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
