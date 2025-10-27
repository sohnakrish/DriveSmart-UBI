import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function CarModel() {
  const { scene } = useGLTF("/models/car.glb");
  const carRef = useRef();

  useFrame(() => {
    if (carRef.current) {
      carRef.current.rotation.y += 0.0025; // Smooth, slow rotation
    }
  });

  return <primitive ref={carRef} object={scene} scale={1.8} position={[0, -1, 0]} />;
}

export default function BackgroundCar() {
  return (
    <div className="car-background">
      <Canvas camera={{ position: [0, 1, 4], fov: 40 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 5, 2]} intensity={2} />
        <CarModel />
        <OrbitControls enableZoom={false} autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
