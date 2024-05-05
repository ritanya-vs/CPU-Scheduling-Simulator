import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'


const Hero = () => {
    const navigate = useNavigate();
    return(
        <div className='hero'>
            <h1>
                CPU Scheduling Simulator
            </h1>
            <button onClick={() =>navigate("/docs") } className='hero-btn'>Start</button>
        </div>
    )
}

export default Hero