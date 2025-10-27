import React, { useState } from "react";

export default function SimulatorPanel({ setPrediction, setConfidence }) {
  const [speed, setSpeed] = useState(0);
  const [accel, setAccel] = useState(0);
  const [brake, setBrake] = useState(0);

  const simulateDrive = () => {
    let pred = "Normal Drive";
    if (speed > 100 || accel > 3) pred = "Sharp Turn";
    if (accel > 6) pred = "Aggressive Drive";
    if (brake >= 1) pred = "Hard Brake";

    const conf = Math.random() * 0.2 + 0.8; // between 0.8 and 1.0
    setPrediction(pred);
    setConfidence(conf);
  };

  return (
    <div className="simulator">
      <h2>Drive Simulator</h2>

      <div className="input-group">
        <label>Speed (km/h)</label>
        <input
          type="number"
          onChange={(e) => setSpeed(Number(e.target.value))}
          placeholder="Enter driving speed"
        />
      </div>

      <div className="input-group">
        <label>Acceleration (m/s²)</label>
        <input
          type="number"
          onChange={(e) => setAccel(Number(e.target.value))}
          placeholder="Enter acceleration"
        />
      </div>

      <div className="input-group">
        <label>Hard Brake (0/1)</label>
        <input
          type="number"
          onChange={(e) => setBrake(Number(e.target.value))}
          placeholder="1 for hard brake"
        />
      </div>

      <button onClick={simulateDrive}>Run Simulation</button>
    </div>
  );
}
