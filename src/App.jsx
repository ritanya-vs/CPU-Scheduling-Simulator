import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from "./Components/Background/Background";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Docs from "./Components/Docs/Docs";
import Cpu_scheduler from "./Components/backend/Cpu_scheduler";

const App = () => {
  let heroData = [
    {text1 :"CPU Scheduling Simulator"}
  ];
  const [heroCount,setHeroCount] = useState(0);
  const [playStatus,setPlayStatus] = useState(true);
  return (
    <Router> 
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/backend/Cpu_scheduler" element={<Cpu_scheduler />} />
        </Routes>
      </div>
  </Router>
  );
  function Home() {
    return (
      <>
        <HomeBackground />
        <Hero />
      </>
    );
  }
  function HomeBackground() {
    return (
      <Background playStatus={playStatus} heroCount={heroCount} />
    );
  }
}

export default App