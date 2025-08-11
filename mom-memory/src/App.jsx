import React, { useRef } from "react";
import MuteButton from "./components/MuteButton";
import JasmineRain from "./components/JasmineRain";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import { DoubleSide } from "three";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// === Floating image ===
function FloatingImage({ url, position }) {
  const texture = useTexture(url);
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.002;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2.5, 1.8]} />
      <meshBasicMaterial map={texture} transparent side={DoubleSide} />
    </mesh>
  );
}

function ParticleBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: "#00000000" },
        particles: {
          number: { value: 80 },
          color: { value: "#aee2ff" },
          size: { value: { min: 0.5, max: 1.8 } },
          move: { enable: true, speed: 0.2, direction: "none", outModes: { default: "out" } },
          opacity: { value: 0.4 },
        },
      }}
      style={{ position: "absolute", zIndex: -1, top: 0, left: 0, width: "100%", height: "100%" }}
    />
  );
}

export default function App() {
  // รูป: ใช้พาธจาก public/
  const images = [
    "/public/images/M1.jpg",
    "/public/images/M2.jpg",
    "/public/images/M3.jpg",
    "/public/images/M4.jpg",
    "/public/images/M5.jpg",
    "/public/images/M6.jpg",
    "/public/images/M7.jpg",
    "/public/images/M8.jpg",
    "/public/images/M9.jpg",
    "/public/images/M10.jpg",
    "/public/images/M11.jpg",
    "/public/images/M12.jpg",
    "/public/images/M13.jpg",
    "/public/images/M14.jpg",
    "/public/images/M15.jpg",

    "/public/images/M1.jpg",
    "/public/images/M2.jpg",
    "/public/images/M3.jpg",
    "/public/images/M4.jpg",
    "/public/images/M5.jpg",
    "/public/images/M6.jpg",
    "/public/images/M7.jpg",
    "/public/images/M8.jpg",
    "/public/images/M9.jpg",
    "/public/images/M10.jpg",
    "/public/images/M11.jpg",
    "/public/images/M12.jpg",
    "/public/images/M13.jpg",
    "/public/images/M14.jpg",
    "/public/images/M15.jpg",

    "/public/images/M1.jpg",
    "/public/images/M2.jpg",
    "/public/images/M3.jpg",
    "/public/images/M4.jpg",
    "/public/images/M5.jpg",
    "/public/images/M6.jpg",
    "/public/images/M7.jpg",
    "/public/images/M8.jpg",
    "/public/images/M9.jpg",
    "/public/images/M10.jpg",
    "/public/images/M11.jpg",
    "/public/images/M12.jpg",
    "/public/images/M13.jpg",
    "/public/images/M14.jpg",
    "/public/images/M15.jpg",
  ];

  const positions = images.map(() => [
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
  ]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* เพลงเริ่มเล่นแบบ mute+loop และมีปุ่มเปิด/ปิดเสียงมุมขวาบน */}
      <MuteButton src="/public/images/motherday.mp3" />

      <ParticleBackground />

      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom enablePan enableRotate />

        {images.map((url, i) => (
          <FloatingImage key={i} url={url} position={positions[i]} />
        ))}

        <Html fullscreen>
          <JasmineRain />
        </Html>
      </Canvas>
    </div>
  );
}