import React from "react";

function ScoreMeter({ prediction, confidence }) {
  return (
    <div className="score-meter">
      <h2>Behavior Prediction</h2>
      {prediction ? (
        <div className="result">
          <h3>{prediction}</h3>
          <p>Confidence: {(confidence * 100).toFixed(1)}%</p>
        </div>
      ) : (
        <p>Run the simulation to view prediction...</p>
      )}
    </div>
  );
}

export default ScoreMeter;
