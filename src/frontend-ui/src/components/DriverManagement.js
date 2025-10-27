import React from "react";
import { FaUserCircle } from "react-icons/fa";

const DriverManagement = () => {
  const drivers = [
    { name: "Sohna", score: 25, badge: "Gold", premium: "$210", status: "Active" },
    { name: "Bob Johnson", score: 55, badge: "Silver", premium: "$185", status: "Idle" },
    { name: "Alice Brown", score: 85, badge: "Bronze", premium: "$150", status: "Active" },
  ];

const containerStyle = {
  marginLeft: "-10px",  // ⬅ reduced from 260px to bring it left
  marginRight: "100px",
  padding: "2rem 1.5rem",
  width: "calc(100% - 260px)", // keeps layout flexible
  minHeight: "100vh",
  color: "#e6f1ff",
  background:
    "radial-gradient(circle at 55% 40%, rgba(0,20,40,0.9), rgba(0,0,0,1))",
  fontFamily: "Poppins, sans-serif",
  transition: "0.4s ease",
};
  const headerStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#00e0ff",
    textShadow: "0 0 15px #00e0ff",
    marginBottom: "0.5rem",
    animation: "glowPulse 2s infinite alternate",
  };

  const subStyle = {
    color: "#9db4d4",
    marginBottom: "2rem",
    fontSize: "1rem",
  };

  const tableWrapper = {
    background: "rgba(0, 10, 20, 0.9)",
    border: "1px solid rgba(0, 224, 255, 0.25)",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 0 25px rgba(0, 224, 255, 0.1)",
    backdropFilter: "blur(8px)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    color: "#e6f1ff",
    textAlign: "center",
  };

  const thStyle = {
    padding: "1rem",
    borderBottom: "1px solid rgba(0, 224, 255, 0.25)",
    color: "#00e0ff",
    fontWeight: "600",
    fontSize: "1rem",
    textShadow: "0 0 8px rgba(0,224,255,0.4)",
  };

  const trStyle = {
    transition: "all 0.3s ease",
  };

  const tdStyle = {
    padding: "1rem",
    fontSize: "0.95rem",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  };

  const badgeStyle = (type) => {
    let color, glow;
    switch (type) {
      case "Gold":
        color = "#FFD700";
        glow = "0 0 15px rgba(255, 215, 0, 0.6)";
        break;
      case "Silver":
        color = "#C0C0C0";
        glow = "0 0 15px rgba(192, 192, 192, 0.5)";
        break;
      case "Bronze":
        color = "#CD7F32";
        glow = "0 0 15px rgba(205, 127, 50, 0.5)";
        break;
      default:
        color = "#00e0ff";
        glow = "0 0 10px rgba(0, 224, 255, 0.5)";
    }
    return {
      color,
      fontWeight: "600",
      textShadow: glow,
    };
  };

  const statusStyle = (status) => ({
    color: status === "Active" ? "#00ff9d" : "#ffaa33",
    textShadow:
      status === "Active"
        ? "0 0 12px rgba(0,255,157,0.5)"
        : "0 0 12px rgba(255,165,0,0.4)",
    fontWeight: "600",
  });

  const hoverGlow = {
    background: "rgba(0, 224, 255, 0.05)",
    boxShadow: "0 0 15px rgba(0,224,255,0.1)",
    transform: "scale(1.01)",
  };

  const globalAnimations = `
    @keyframes glowPulse {
      from { text-shadow: 0 0 8px #00e0ff; }
      to { text-shadow: 0 0 25px #00e0ff, 0 0 45px #00e0ff; }
    }
  `;

  return (
    <>
      <style>{globalAnimations}</style>

      <div style={containerStyle}>
        <h1 style={headerStyle}>Driver Management</h1>
        <p style={subStyle}>Manage driver accounts and view assigned safety scores here.</p>

        <div style={tableWrapper}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Driver</th>
                <th style={thStyle}>Safety Score</th>
                <th style={thStyle}>Badge</th>
                <th style={thStyle}>Premium</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d, i) => (
                <tr
                  key={i}
                  style={trStyle}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverGlow)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, trStyle)}
                >
                  <td style={tdStyle}>
                    <FaUserCircle style={{ color: "#00e0ff", marginRight: "8px" }} />
                    {d.name}
                  </td>
                  <td style={tdStyle}>{d.score}</td>
                  <td style={{ ...tdStyle, ...badgeStyle(d.badge) }}>{d.badge}</td>
                  <td style={tdStyle}>{d.premium}</td>
                  <td style={{ ...tdStyle, ...statusStyle(d.status) }}>{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DriverManagement;
