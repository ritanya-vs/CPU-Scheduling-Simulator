import React, { useEffect, useState } from "react";
import 'bootstrap-slider/dist/css/bootstrap-slider.min.css';

const CpuScheduler = () => {
    const [num, s_num] = useState(5); //no. of processes
    const [switchTime, s_switchtime] = useState(0.0); //context switch time
    const [algo, s_algo] = useState("FCFS"); // algorithm
    const [chart, s_chart] = useState([]); //ghantt chart
    const [out, s_output] = useState({pid: [],arrive: [],burst: [],complete: [],turnA: [],wait: []}); //output data
    const [arrival, s_arrival] = useState(Array.from({ length: num }, () => 0)); //arrival time
    const [burst, s_burst] = useState(Array.from({ length: num }, () => 5)); //burst time
    const [process_1, s_process] = useState(Array.from({ length: num }, (_, i) => i + 1)); //process id
    const [priority, s_priority] = useState(Array.from({ length: num }, () => 1));  //priority
    
    const changeNum = (num) => {                   //updates the variables
        s_num(num);
        s_arrival(Array.from({ length: num }, () => 0));
        s_burst(Array.from({ length: num }, () => 5));
        s_process(Array.from({ length: num }, (_, i) => i + 1));
    };

    const increment = () => {                         //process increment
        s_num(prev_no => prev_no + 1);
    };

    const decrement = () => {                        //process decrement
        if (num > 0) {
            s_num(prev_no => prev_no - 1);
        }
    };

    const update_switchtime = (value) => {           //updates cst
        s_switchtime(value);
    };

    const change_alg = (event) => {                  //changes the algorithm - event handler
        s_algo(event.target.value);
    };

    const reset = () => {                           //resets
        window.location.reload(); 
    };

    const run_alg = () => {                         //runs the algorithms
        switch (algo) {
            case "FCFS":
                FCFS();
                break;
            case "SJF":
                sjf();
                break;
            case "Priority":
                priorityfun();
                break;
            case "HRRN":
                hrrn();
                break;
            default:
                break;
        }
    };

    const FCFS = () => {
        let arr_1 = [];
        for (let x = 0; x < num; x++) {
            arr_1.push({ A: arrival[x], B: burst[x], C: process_1[x] });
        }
        arr_1.sort((a, b) => a.A - b.A); //sort based on arrival time

        let calc_output = {
            pid: [],
            arrive: [],
            burst: [],
            complete: [],
            turnA: [],
            wait: []
        };

        let total_waiting_time = 0;
        let total_turn_time = 0;
        let curr_time = 0;

        for (let x = 0; x < arr_1.length; x++) {
            calc_output.arrive.push(arr_1[x].A);
            calc_output.burst.push(arr_1[x].B);
            calc_output.pid.push(arr_1[x].C);

            let completion_t = curr_time + arr_1[x].B;
            if (x > 0) {
                completion_t += switchTime;
            }
            calc_output.complete.push(completion_t);
            curr_time = completion_t;

            let turn_around = completion_t - arr_1[x].A;
            calc_output.turnA.push(turn_around);
            total_turn_time += turn_around;

            let wait = turn_around - arr_1[x].B;
            calc_output.wait.push(wait);
            total_waiting_time += wait;
        }
        let order = [];
        let currTime = 0;

        for (let x = 0; x < arr_1.length; x++) {
            const pid = arr_1[x].C;
            const startTime = currTime;
            let endTime = startTime + arr_1[x].B;

            order.push({ pid, startTime, endTime });
            
            if (x > 0) {
                endTime += switchTime;
            }

            currTime = endTime;
        }

        s_chart(order);
        s_output(calc_output);
    };

    const sjf = () => {
        let arr_2 = [];
        let n = arrival.length;

        for (let x = 0; x < n; x++) {
            arr_2.push({ A: arrival[x], B: burst[x], C: process_1[x] });
        }

        let calc_output = {
            pid: [],
            arrive: [],
            burst: [],
            complete: [],
            turnA: [],
            wait: []
        };

        let total_waiting_time = 0;
        let total_turn_time = 0;
        let curr_time = 0;

        while (arr_2.length > 0) {
            arr_2.sort((a, b) => {
                if (a.A === b.A) {
                    return a.B - b.B;
                } else {
                    return a.A - b.A;
                }
            });

            let p1 = arr_2.shift();
            calc_output.arrive.push(p1.A);
            calc_output.burst.push(p1.B);
            calc_output.pid.push(p1.C);

            let completion_t = curr_time + p1.B;
            calc_output.complete.push(completion_t);
            curr_time = completion_t;

            let turn_around = completion_t - p1.A;
            calc_output.turnA.push(turn_around);
            total_turn_time += turn_around;

            let wait = turn_around - p1.B;
            calc_output.wait.push(wait);
            total_waiting_time += wait;

            let remaining_p = arr_2.filter(process => process.A <= completion_t); 

            if (remaining_p.length > 0) {
                let next = remaining_p.reduce((minp, curr_p) => {
                    return minp.B < curr_p.B ? minp : curr_p;
                });
                calc_output.arrive.push(next.A);
                calc_output.burst.push(next.B);
                calc_output.pid.push(next.C);

                completion_t = curr_time + next.B;
                if (x > 0) {
                    completion_t += switchTime;
                }
                calc_output.complete.push(completion_t);
                curr_time = completion_t;

                turn_around = completion_t - next.A;
                calc_output.turnA.push(turn_around);
                total_turn_time += turn_around;

                wait = turn_around - next.B;
                calc_output.wait.push(wait);
                total_waiting_time += wait;

                arr_2 = arr_2.filter(process => process !== next);
            } else {
                break;
            }
        }
        let order = [];
        let currTime = 0;

        for (let x = 0; x < calc_output.pid.length; x++) {
            const pid = calc_output.pid[x];
            const startTime = currTime;
            let endTime = startTime + calc_output.burst[x];

            order.push({ pid, startTime, endTime });

            if (x > 0) {
                endTime += switchTime;
            }

            currTime = endTime;
        }

        s_chart(order);
        s_output(calc_output);
        
    };

    
    const priorityfun = () => {
        let n = arrival.length;
        let arr_3 = [];

        for (let x = 0; x < n; x++) {
            arr_3.push({ A: arrival[x], B: burst[x], C: process_1[x], D: priority[x] });
        }

        arr_3.sort((a, b) => {
            if (a.D === b.D) {
                return a.A - b.A;
            } else {
                return a.D - b.D;
            }
        });

        let calc_output = {
            pid: [],
            arrive: [],
            burst: [],
            complete: [],
            turnA: [],
            wait: [],
            avg_waiting: 0,
            avg_turnaround: 0
        };

        let total_waiting_time = 0;
        let total_turn_time = 0;
        let curr_time = 0;

        for (let x = 0; x < n; x++) {
            calc_output.arrive.push(arr_3[x].A);
            calc_output.burst.push(arr_3[x].B);
            calc_output.pid.push(arr_3[x].C);

            let completion_t = curr_time + arr_3[x].B;
            if (x > 0) {
                completion_t += switchTime;
            }
            calc_output.complete.push(completion_t);
            curr_time = completion_t;

            let turn_around = completion_t - arr_3[x].A;
            calc_output.turnA.push(turn_around);
            total_turn_time += turn_around;

            let wait = turn_around - arr_3[x].B;
            calc_output.wait.push(wait);
            total_waiting_time += wait;
        }
        

        s_output(calc_output);
        let ganttData = [];
        let currentTime = 0;
        for (let i = 0; i < calc_output.pid.length; i++) {
            const pid = calc_output.pid[i];
            const startTime = currentTime;
            const endTime = startTime + calc_output.burst[i];
            ganttData.push({ pid, startTime, endTime });
            currentTime = endTime;
    }
    s_chart(ganttData);
    };

    const hrrn = () => {
        let n = arrival.length;
        let arr_4 = [];

        for (let x = 0; x < n; x++) {
            arr_4.push({ A: arrival[x], B: burst[x], C: process_1[x] });
        }

        let calc_output = {
            pid: [],
            arrive: [],
            burst: [],
            complete: [],
            turnA: [],
            wait: [],
            avg_waiting: 0,
            avg_turnaround: 0
        };

        let total_waiting_time = 0;
        let total_turn_time = 0;
        let curr_time = 0;

        while (arr_4.length > 0) {
            arr_4.forEach((process, index) => {
                const waiting_time = Math.max(0, curr_time - process.A);
                const response_ratio = (waiting_time + process.B) / process.B;
                arr_4[index].response_ratio = response_ratio;
            });

            arr_4.sort((a, b) => b.response_ratio - a.response_ratio);

            const proc = arr_4.shift();

            completion_t = curr_time + proc.B;
            if (x > 0) {
                completion_t += switchTime;
            }
            calc_output.complete.push(completion_t);
            curr_time = completion_t;

            const turn_around = completion_t - proc.A;
            calc_output.turnA.push(turn_around);
            total_turn_time += turn_around;

            const wait = turn_around - proc.B;
            calc_output.wait.push(wait);
            total_waiting_time += wait;

            curr_time = completion_t;

            calc_output.arrive.push(proc.A);
            calc_output.burst.push(proc.B);
            calc_output.pid.push(proc.C);
        }

        calc_output.avg_waiting = total_waiting_time / n;
        calc_output.avg_turnaround = total_turn_time / n;

        s_output(calc_output);
        let gantt_data = [];
        let currentTime = 0;
        for (let i = 0; i < calc_output.pid.length; i++) {
            const pid = calc_output.pid[i];
            const startTime = currentTime;
            const endTime = startTime + calc_output.burst[i];
            gantt_data.push({ pid, startTime, endTime });
            currentTime = endTime;
        }
        s_chart(gantt_data);
    };

    const run_button = () => {
        run_alg();
    };

    const reset_button = () => {
        reset();
    };

    const change_arrivaltime = (event, p_index) => {
        const new_val = parseInt(event.target.value);
        s_arrival(prev_arrival => {
            const updated_arrival = [...prev_arrival];
            updated_arrival[p_index - 1] = new_val;
            return updated_arrival;
        });
    };

    const change_bursttime = (event, p_index) => {
        const new_val = parseInt(event.target.value);
        s_burst(prev_burst => {
            const updated_burst = [...prev_burst];
            updated_burst[p_index - 1] = new_val;
            return updated_burst;
        });
    };

    const change_priority = (event, p_index) => {
        const new_val = parseInt(event.target.value);
        s_priority(prev_priority => {
            const updated_priority = [...prev_priority];
            updated_priority[p_index - 1] = new_val;
            return updated_priority;
        });
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'bootstrap-slider/dist/bootstrap-slider.min.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const input_table = () => {
        let rows = [];
        for (let i = 1; i <= num; i++) {
            rows.push(
                <tr key={`row_${i}`} className="collapse in">
                    <th> P{i}</th>
                    <td>
                        <input
                            id={`arrive_${i}`}
                            type="number"
                            className="form-control"
                            min="0"
                            defaultValue="0"
                            onChange={(event) => change_arrivaltime(event, i)}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            id={`burst_${i}`}
                            className="form-control"
                            min="1"
                            defaultValue="5"
                            onChange={(event) => change_bursttime(event, i)}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            id={`priority_${i}`}
                            className="form-control"
                            min="1"
                            defaultValue="1"
                            onChange={(event) => change_priority(event, i)}
                        />
                    </td>
                </tr>
            );
        }
        return rows;
    };

    const output_table = () => {
        return out.pid.map((pid, index) => (
            <tr key={pid}>
                <td>{pid}</td>
                <td>{out.arrive[index]}</td>
                <td>{out.burst[index]}</td>
                <td>{out.complete[index] % 1 !== 0 ? out.complete[index].toFixed(1) : out.complete[index]}</td>
                <td>{out.turnA[index] % 1 !== 0 ? out.turnA[index].toFixed(1) : out.turnA[index]}</td>
                <td>{out.wait[index] % 1 !== 0 ? out.wait[index].toFixed(1) : out.wait[index]}</td>
            </tr>
        ));
    };

    return (
        <div style={{ backgroundColor: "#f7f7f7", minHeight: "100vh", padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>CPU SCHEDULING SIMULATOR</h1>
            
            <table 
                className="table table-bordered table-condensed" 
                id="inputTable" 
                style={{ margin: "auto", backgroundColor: "#ffffff" }}
            >
                <thead>
                    <tr>
                        <th>Process:</th>
                        <th>Arrival Time:</th>
                        <th>Burst Time:</th>
                        <th>Priority</th>
                    </tr>
                </thead>
                <tbody id="processTable">
                    {input_table()}
                </tbody>
            </table>
            
            <div className="well" style={{ backgroundColor: "#e9ecef", padding: "20px", borderRadius: "8px", margin: "20px auto" }}>
                <div className="row">
                    <div className="col-md-4" style={{ textAlign: "center" }}>
                        <label>Algorithm:</label>
                        <select id="algorithm_dropdown" value={algo} onChange={change_alg}>
                            <option value="FCFS">First Come First Served</option>
                            <option value="SJF">Shortest Job First (non-preemptive)</option>
                            <option value="HRRN">Highest Response Ratio Next</option>
                            <option value="Priority">Priority</option>
                        </select>
                        <p style={{ marginTop: "15px" }} id="algorithm_explanation"></p>
                    </div>
                    <div className="col-md-4" style={{ textAlign: "center" }}>
                        <label>Number of process:</label>
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button type="button" onClick={decrement}>-</button>
                            </span>
                            <input type="text" className="form-control" value={num} readOnly />
                            <span className="input-group-btn">
                                <button type="button" onClick={increment}>+</button>
                            </span>
                        </div>

                        <label style={{ marginTop: "20px" }}>Context Switch Time:</label>
                        <div className="input-group" style={{ textAlign: "center" }}>
                            <span className="input-group-btn">
                                <button type="button" onClick={() => update_switchtime(switchTime - 0.1)}>-</button>
                            </span>
                            <input type="text" className="form-control" value={switchTime.toFixed(1)} readOnly />
                            <span className="input-group-btn">
                                <button type="button" onClick={() => update_switchtime(switchTime + 0.1)}>+</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style={{ display: "block", textAlign: "center" }}>
                <p>Click on the run button to show the Output Table</p>
                <button id="runBtn" onClick={run_button}>Run</button>
            </div>
            
            <div style={{ display: "block", textAlign: "center", marginTop: "20px" }}>
                <p>Click on the Reset button to run another program</p>
                <button id="resetBtn" onClick={reset_button}>Reset</button>
            </div>
            
            <hr />
            <h1 style={{ textAlign: "center" }}>Output Table</h1>
            <hr />
            
            <table 
                className="table table-bordered table-condensed" 
                id="outputTable" 
                style={{ marginBottom: "50px", backgroundColor: "#ffffff" }}
            >
                <thead>
                    <tr>
                        <th style={{ backgroundColor: "#9adcff" }}>Process:</th>
                        <th style={{ backgroundColor: "#9ADCFF" }}>Arrival Time:</th>
                        <th style={{ backgroundColor: "#9ADCFF" }}>Burst Time:</th>
                        <th style={{ backgroundColor: "#9ADCFF" }}>Completion Time: </th>
                        <th style={{ backgroundColor: "#9ADCFF" }}>Turn around Time: </th>
                        <th style={{ backgroundColor: "#9ADCFF" }}>Waiting Time: </th>
                    </tr>
                </thead>
                <tbody>
                    {output_table()}
                </tbody>
            </table>
            
            <div>
                <h1 style={{ textAlign: "center" }}>Gantt Chart</h1>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {chart.map((item, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                border: "1px solid black", 
                                flex: `${item.endTime - item.startTime}`, 
                                textAlign: "center", 
                                backgroundColor: "#f8d7da" 
                            }}
                        >
                            {`P${item.pid}`}
                            <br />
                            {`${item.startTime} - ${item.endTime}`}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CpuScheduler;