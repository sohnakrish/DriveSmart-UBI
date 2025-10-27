import React from "react";

function TripSummary({ prediction, confidence }) {
  const trips = [
    { id: 1, route: "Dallas → Arlington", behavior: "Smooth Drive", risk: "Low" },
    { id: 2, route: "Arlington → Irving", behavior: "Sharp Turn", risk: "Medium" },
    { id: 3, route: "Irving → Plano", behavior: "Aggressive Turn", risk: "High" },
  ];

  return (
    <div className="panel">
      <h2>Trip Summary</h2>
      <ul>
        {trips.map((t) => (
          <li key={t.id}>
            <strong>{t.route}</strong> — {t.behavior} ({t.risk})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TripSummary;
