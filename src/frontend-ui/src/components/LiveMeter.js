import React from "react";
import { RadialBarChart, RadialBar, Legend } from "recharts";

function LiveMeter({ speed, accel }) {
  const data = [
    {
      name: "Speed",
      value: speed,
      fill: "#00e0ff",
    },
    {
      name: "Acceleration",
      value: accel * 50,
      fill: "#ff6600",
    },
  ];

  return (
    <div style={{ textAlign: "center", color: "#00e0ff" }}>
      <h2>Live Vehicle Metrics</h2>
      <RadialBarChart
        width={300}
        height={300}
        cx={150}
        cy={150}
        innerRadius={50}
        outerRadius={130}
        barSize={15}
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar minAngle={15} background clockWise dataKey="value" />
        <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </RadialBarChart>
    </div>
  );
}

export default LiveMeter;
