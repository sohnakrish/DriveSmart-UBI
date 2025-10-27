import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

function Car({ speed, accel, brake, prediction }) {
  const carRef = useRef();

  // Animate rotation with speed
  useFrame(() => {
    carRef.current.rotation.y += 0.01 + speed / 1000;
  });

  // Animate scale based on acceleration
  const { scale } = useSpring({
    scale: [1 + accel / 10, 1 + accel / 10, 1 + accel / 10],
    config: { tension: 100, friction: 30 },
  });

  // Color based on prediction
  const color =
    prediction === "Aggressive Turn"
      ? "#ff0000"
      : prediction === "Sharp Turn"
      ? "#ff9900"
      : "#00ffcc";

  return (
    <animated.mesh ref={carRef} scale={scale}>
      <boxGeometry args={[2, 1, 4]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={brake ? 2 : 0.4} />
    </animated.mesh>
  );
}

function CarSimulator3D({ speed, accel, brake, prediction }) {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <PerspectiveCamera makeDefault position={[5, 3, 8]} />
        <OrbitControls enableZoom={false} autoRotate />
        <Car speed={speed} accel={accel} brake={brake} prediction={prediction} />
      </Canvas>
    </div>
  );
}

export default CarSimulator3D;
