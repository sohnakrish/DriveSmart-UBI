import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import DriverManagement from "./components/DriverManagement";
import FeedbackAnalysis from "./components/FeedbackAnalysis";
import { SimulationProvider } from "./context/SimulatorContext";

import MainLayout from "./layout/MainLayout";
import "./styles/auth.css";

function App() {
  const isAuthenticated = localStorage.getItem("userLoggedIn");

  return (
    <BrowserRouter>
    <SimulationProvider>
      <Routes>
        {/* Redirect root → login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes wrapped inside MainLayout */}
        {isAuthenticated ? (
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/driver-management" element={<DriverManagement />} />
           <Route path="/feedback-analysis" element={<FeedbackAnalysis />} />

          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
      </SimulationProvider>
    </BrowserRouter>
  );
}

export default App;
