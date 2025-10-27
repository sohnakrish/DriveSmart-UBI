import React, { createContext, useState, useContext } from "react";

const SimulationContext = createContext();

export const useSimulation = () => useContext(SimulationContext);

export const SimulationProvider = ({ children }) => {
  const [simulationData, setSimulationData] = useState({
    speed: 0,
    acceleration: 0,
    brake: 0,
    premium: 0,
    badge: "None",
  });

  return (
    <SimulationContext.Provider value={{ simulationData, setSimulationData }}>
      {children}
    </SimulationContext.Provider>
  );
};
