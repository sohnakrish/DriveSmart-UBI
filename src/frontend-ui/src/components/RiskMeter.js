import React from "react";

function RiskMeter({ prediction, confidence }) {
  const getRiskScore = () => {
    if (!prediction) return 0;
    if (prediction === "Sharp Turn") return 70 + confidence * 30;
    if (prediction === "Aggressive Turn") return 85 + confidence * 15;
    return 30 - confidence * 10;
  };

  const score = Math.min(100, getRiskScore());
  const color = score > 80 ? "#ff4d4d" : score > 50 ? "#ffcc00" : "#66ff99";

  return (
    <div className="risk-meter">
      <h2>Driver Risk Score</h2>
      <div className="risk-circle" style={{ borderColor: color }}>
        <h3>{score.toFixed(0)}</h3>
        <p>{score > 80 ? "High Risk" : score > 50 ? "Moderate" : "Safe"}</p>
      </div>
    </div>
  );
}

export default RiskMeter;
