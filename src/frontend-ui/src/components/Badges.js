import React from "react";

export default function Badges({ confidence }) {
  let badge = "Bronze";
  if (confidence > 0.9) badge = "Gold";
  else if (confidence > 0.85) badge = "Silver";

  const badgeImg = {
    Gold: "/images/gold.png",
    Silver: "/images/silver.png",
    Bronze: "/images/bronze.png",
  };

  return (
    <div className="badges">
      <div className="badge">
        <img src={badgeImg[badge]} alt={badge} />
        <p>{badge} Driver</p>
      </div>
    </div>
  );
}
