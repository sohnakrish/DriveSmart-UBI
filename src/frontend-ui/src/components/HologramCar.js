import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "../styles/dashboard.css";

function CarModel() {
  const { scene } = useGLTF("/models/car.glb"); // public path
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
}

const HologramCar = () => {
  return (
    <div className="car-canvas-container">
      <Canvas
        camera={{ position: [3, 1.5, 5], fov: 45 }}
        style={{ height: "400px", width: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#00ffff" />
        <Suspense fallback={null}>
          <CarModel />
        </Suspense>
        <OrbitControls autoRotate enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default HologramCar;
