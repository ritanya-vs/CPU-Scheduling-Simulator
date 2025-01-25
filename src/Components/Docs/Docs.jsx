import React from 'react';
import { useNavigate } from 'react-router-dom';

const Docs = () => {
    const navigate = useNavigate();
    const gotoSimulator = () => {
        navigate('/backend/Cpu_scheduler');
    }
    return (
        <div 
            style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                background: 'linear-gradient(to bottom right, #6a11cb, #2575fc)', 
                fontFamily: 'Arial, sans-serif',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }}
        >
            <section 
                className="container_docs" 
                data-aos="zoom-in-up" 
                style={{ 
                    textAlign: 'center', 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    padding: '30px 40px', 
                    borderRadius: '10px', 
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', 
                    width: '80%',
                    maxWidth: '600px'
                }}
            >
                <h1 
                    style={{ 
                        fontSize: '2rem', 
                        fontWeight: '600', 
                        color: '#333', 
                        marginBottom: '20px' 
                    }}
                >
                    Types of CPU Scheduling Algorithms
                </h1>
                <ul 
                    style={{ 
                        listStyleType: 'none', 
                        padding: '0', 
                        fontSize: '1.2rem', 
                        color: '#555',
                        lineHeight: '1.8' 
                    }}
                >
                    <li>First Come First Serve (FCFS)</li>
                    <li>Shortest-Job-First (SJF) Scheduling</li>
                    <li>Highest Response Ratio Next</li>
                    <li>Priority Scheduling</li>
                </ul>
                <button 
                    className="btn_1" 
                    onClick={gotoSimulator} 
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#2575fc',
                        color: '#fff',
                        padding: '12px 25px',
                        fontSize: '1.1rem',
                        border: 'none',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                    }} 
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#6a11cb';
                    }} 
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#2575fc';
                    }}
                >
                    Go to Simulator
                </button>
            </section>
        </div>
    );
}

export default Docs;
