import React from 'react';
import { useNavigate } from 'react-router-dom'

const Docs = () => {
    const navigate = useNavigate();
    const gotoSimulator = ()=>{
        navigate('/backend/Cpu_scheduler');
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <section className="container_docs" data-aos="zoom-in-up" style={{ textAlign: 'center' }}>
            <h1>Types of CPU scheduling Algorithm</h1>
            <ul>
                <li>First Come First Serve (FCFS)</li>
                <li>Shortest-Job-First (SJF) Scheduling</li>
                <li>Highest Response Ratio Next</li>
                <li>Priority Scheduling</li>
            </ul>
            <button className="btn_1" onClick={gotoSimulator}>Go to Simulator</button>
        </section>
    </div>
    );
}

export default Docs;
