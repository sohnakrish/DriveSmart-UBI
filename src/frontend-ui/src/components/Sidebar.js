import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../styles/dashboard.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">DriveSmart UBI</h2>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Premium Calculator
        </NavLink>

        <NavLink
          to="/driver-management"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Driver Management
        </NavLink>

        <NavLink
          to="/feedback-analysis"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Feedback Analysis
        </NavLink>
      </nav>

      <div className="sidebar-profile">
        <FaUserCircle className="profile-icon" />
        <div>
          <p className="profile-name">Sohna</p>
          <p className="profile-role">Profile</p>
        </div>
      </div>
    </div>
  );
}
