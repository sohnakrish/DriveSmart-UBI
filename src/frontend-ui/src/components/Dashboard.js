import React, { useState } from "react";
import "../styles/dashboard.css";
import goldBadge from "../components/assets/gold.png";
import silverBadge from "../components/assets/silver.png";
import bronzeBadge from "../components/assets/bronze.png";

const Dashboard = () => {
  const [speed, setSpeed] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [hardBrake, setHardBrake] = useState("");
  const [premium, setPremium] = useState(null);
  const [badge, setBadge] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Input validation
  const validateInputs = () => {
    if (speed === "" || speed < 0) return "Please enter a valid speed.";
    if (acceleration === "" || acceleration < 0)
      return "Please enter a valid acceleration.";
    if (hardBrake === "" || hardBrake < 0)
      return "Hard Brake intensity must be 0 or higher.";
    return "";
  };

  // ✅ Main simulator handler
  const handleSimulation = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setErrorMsg(validationError);
      setPremium(null);
      return;
    }

    setErrorMsg("");

    try {
      // Connect to backend if available
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          speed: parseFloat(speed),
          acceleration: parseFloat(acceleration),
          hard_brake: parseFloat(hardBrake),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPremium(data.premium.toFixed(2));
        setBadge(data.badge);

        // ✅ Store prediction results for Driver Management
        localStorage.setItem("userPremium", data.premium.toFixed(2));
        localStorage.setItem("userBadge", data.badge);
        localStorage.setItem("userStatus", "Active");
      } else {
        // ✅ Local fallback calculation
        const basePremium = 500;
        const riskFactor =
          parseFloat(speed) * 0.2 +
          parseFloat(acceleration) * 1.5 +
          parseFloat(hardBrake) * 50;
        const totalPremium = Math.max(100, basePremium + riskFactor);
        setPremium(totalPremium.toFixed(2));

        let badgeLevel = "";
        if (totalPremium < 600) badgeLevel = "Gold";
        else if (totalPremium < 800) badgeLevel = "Silver";
        else badgeLevel = "Bronze";
        setBadge(badgeLevel);

        // ✅ Store locally for Driver Management
        localStorage.setItem("userPremium", totalPremium.toFixed(2));
        localStorage.setItem("userBadge", badgeLevel);
        localStorage.setItem("userStatus", "Active");
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      // fallback logic
      const basePremium = 500;
      const riskFactor =
        parseFloat(speed) * 0.2 +
        parseFloat(acceleration) * 1.5 +
        parseFloat(hardBrake) * 50;
      const totalPremium = Math.max(100, basePremium + riskFactor);
      setPremium(totalPremium.toFixed(2));

      let badgeLevel = "";
      if (totalPremium < 600) badgeLevel = "Gold";
      else if (totalPremium < 800) badgeLevel = "Silver";
      else badgeLevel = "Bronze";
      setBadge(badgeLevel);

      // ✅ Save to localStorage for Driver Management
      localStorage.setItem("userPremium", totalPremium.toFixed(2));
      localStorage.setItem("userBadge", badgeLevel);
      localStorage.setItem("userStatus", "Active");
    }
  };

  // ✅ Badge image helper
  const getBadgeImage = () => {
    switch (badge) {
      case "Gold":
        return goldBadge;
      case "Silver":
        return silverBadge;
      case "Bronze":
        return bronzeBadge;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="animated-bg"></div>

      <div className="dashboard-header">
        <h1>AI-driven behavior & premium visualization</h1>
        {/* <p>AI-driven behavior & premium visualization</p> */}
      </div>

      <div className="simulator-section">
        {/* === Left Side Form === */}
        <div className="simulator-form">
          <h2>Drive Simulator</h2>

          <label>Speed (km/h)</label>
          <input
            type="number"
            placeholder="Enter speed (e.g. 40)"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />

          <label>Acceleration (m/s²)</label>
          <input
            type="number"
            placeholder="Enter acceleration (e.g. 1.2)"
            value={acceleration}
            onChange={(e) => setAcceleration(e.target.value)}
          />

          <label>Hard Brake Intensity</label>
          <input
            type="number"
            placeholder="Enter braking intensity (e.g. 0–10)"
            value={hardBrake}
            onChange={(e) => setHardBrake(e.target.value)}
          />
          <small className="hint-text">
            {/* Higher values = stronger braking (0 = none, 10 = very hard) */}
          </small>

          {errorMsg && <p className="error-text">{errorMsg}</p>}

          <button onClick={handleSimulation}>Run Simulation</button>
        </div>

        {/* === Right Side Result === */}
        <div className={`results-panel ${premium ? "show" : ""}`}>
          {premium && (
            <>
              <h2>Estimated Premium</h2>
              <p className="premium-amount">${premium}</p>
              {badge && (
                <div className="badge-display">
                  <img src={getBadgeImage()} alt={badge} />
                  <p className="badge-text">{badge} Driver</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
