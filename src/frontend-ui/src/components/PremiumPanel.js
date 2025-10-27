import React from "react";

export default function PremiumPanel({ confidence }) {
  const premium = (1000 * (1.2 - confidence)).toFixed(2);

  return (
    <div className="premium-display">
      <h3>Estimated Premium</h3>
      <p>${premium}</p>
    </div>
  );
}
