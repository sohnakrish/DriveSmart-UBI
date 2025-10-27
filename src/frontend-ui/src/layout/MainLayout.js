import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import DriverManagement from "../components/DriverManagement";
import FeedbackAnalysis from "../components/FeedbackAnalysis";
import "../styles/dashboard.css";

export default function MainLayout() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/driver-management" element={<DriverManagement />} />
           <Route path="/feedback-analysis" element={<FeedbackAnalysis />} />
        </Routes>
      </div>
    </div>
  );
}
