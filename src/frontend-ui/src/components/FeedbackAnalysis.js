import React, { useEffect, useState } from "react";
import { FaTachometerAlt, FaBolt, FaCarCrash } from "react-icons/fa";

const FeedbackAnalysis = () => {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setTimestamp(formatted);
  }, []);

  const containerStyle = {
    marginLeft: "10px",
     marginRight: "100px",
    padding: "2rem",
    minHeight: "100vh",
    color: "#e6f1ff",
    background:
      "radial-gradient(circle at center, rgba(0, 20, 40, 0.9) 0%, rgba(0, 0, 0, 1) 100%)",
    fontFamily: "Poppins, sans-serif",
    transition: "0.4s ease",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#00e0ff",
    textShadow: "0 0 15px rgba(0, 224, 255, 0.8)",
    marginBottom: "0.5rem",
    animation: "glowPulse 2s infinite alternate",
  };

  const subtitleStyle = {
    color: "#b5c9e0",
    marginBottom: "2rem",
    fontSize: "1rem",
    lineHeight: "1.6",
    opacity: 0.9,
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1.8rem",
    marginBottom: "2rem",
  };

  const cardStyle = {
    background:
      "linear-gradient(180deg, rgba(10, 20, 30, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)",
    border: "1px solid rgba(0, 224, 255, 0.25)",
    boxShadow: "0 0 15px rgba(0, 224, 255, 0.1), inset 0 0 10px rgba(0, 224, 255, 0.05)",
    borderRadius: "16px",
    padding: "1.5rem",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    backdropFilter: "blur(8px)",
  };

  const cardHover = {
    transform: "translateY(-5px)",
    boxShadow: "0 0 25px rgba(0, 224, 255, 0.3)",
  };

  const iconStyle = {
    fontSize: "1.8rem",
    color: "#00e0ff",
    filter: "drop-shadow(0 0 10px rgba(0, 224, 255, 0.6))",
    marginBottom: "0.5rem",
  };

  const metricTitle = {
    fontSize: "1.1rem",
    color: "#b8d8f0",
    marginBottom: "0.4rem",
  };

  const metricValue = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#00e0ff",
    margin: "0.5rem 0",
  };

  const greenMetric = {
    ...metricValue,
    color: "#40ff88",
    textShadow: "0 0 8px rgba(0,255,157,0.6)",
  };

  const timestampStyle = {
    color: "#7fa7c8",
    fontSize: "0.9rem",
    opacity: 0.9,
  };

  const snapshotContainer = {
    marginTop: "2rem",
    background: "rgba(0, 10, 20, 0.8)",
    borderRadius: "16px",
    border: "1px solid rgba(0, 224, 255, 0.25)",
    padding: "1.5rem",
    boxShadow: "0 0 20px rgba(0,224,255,0.05)",
  };

  const snapshotTitle = {
    color: "#00e0ff",
    textShadow: "0 0 10px rgba(0, 224, 255, 0.6)",
    marginBottom: "1rem",
    fontSize: "1.3rem",
    fontWeight: "600",
  };

  const jsonBox = {
    backgroundColor: "#02111d",
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid rgba(0, 224, 255, 0.2)",
    color: "#00ffcc",
    fontFamily: "monospace",
    fontSize: "0.95rem",
    whiteSpace: "pre-wrap",
    boxShadow: "inset 0 0 15px rgba(0, 224, 255, 0.1)",
  };

  const apiStatus = {
    marginTop: "2rem",
    textAlign: "center",
    color: "#7fa7c8",
    fontSize: "0.9rem",
  };

  const dot = {
    height: "10px",
    width: "10px",
    backgroundColor: "#00e0ff",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "6px",
    boxShadow: "0 0 10px #00e0ff",
    animation: "blink 1.5s infinite alternate",
  };

  // inline keyframes for glow animation
  const globalAnimations = `
    @keyframes glowPulse {
      from { text-shadow: 0 0 8px #00e0ff; }
      to { text-shadow: 0 0 25px #00e0ff, 0 0 45px #00e0ff; }
    }
    @keyframes blink {
      from { opacity: 0.3; }
      to { opacity: 1; }
    }
  `;

  return (
    <>
      <style>{globalAnimations}</style>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Feedback Analysis</h1>
        <p style={subtitleStyle}>
          This view breaks down the telemetry points used in the prediction model (Brakes, Acceleration, etc.) 
          with real-time timestamps and visual indicators.
        </p>

        {/* Metric Grid */}
        <div style={gridStyle}>
          {/* Speed */}
          <div
            style={cardStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, cardHover)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, cardStyle)
            }
          >
            <FaTachometerAlt style={iconStyle} />
            <h3 style={metricTitle}>GPS Speed</h3>
            <p style={metricValue}>
              60 <span style={{ fontSize: "1rem" }}>km/h</span>
            </p>
            <p style={timestampStyle}>🕒 Last Update: {timestamp}</p>
          </div>

          {/* Acceleration */}
          <div
            style={cardStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, cardHover)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, cardStyle)
            }
          >
            <FaBolt style={iconStyle} />
            <h3 style={metricTitle}>Total Acceleration</h3>
            <p style={metricValue}>
              2.5 <span style={{ fontSize: "1rem" }}>m/s²</span>
            </p>
            <p style={timestampStyle}>🕒 Last Update: {timestamp}</p>
          </div>

          {/* Braking */}
          <div
            style={cardStyle}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, cardHover)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, cardStyle)
            }
          >
            <FaCarCrash style={iconStyle} />
            <h3 style={metricTitle}>Braking System</h3>
            <p style={greenMetric}>Functional</p>
            <p style={timestampStyle}>🕒 Last Update: {timestamp}</p>
          </div>
        </div>

        {/* Model Snapshot */}
        {/* <div style={snapshotContainer}>
          <h2 style={snapshotTitle}>Model Input Snapshot</h2>
          <pre style={jsonBox}>
{`{
  "gps_speed": 60,
  "total_acceleration": 2.5,
  "hard_brake_event": 1
}`}
          </pre>
        </div> */}

        {/* API Status */}
        {/* <div style={apiStatus}>
          <span style={dot}></span> API Connection Disabled (UI Preview Mode)
        </div> */}
      </div>
    </>
  );
};

export default FeedbackAnalysis;
