import React, { useRef, useMemo } from "react";
import MuteButton from "./components/MuteButton";
import JasmineRain from "./components/JasmineRain";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import { DoubleSide } from "three";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function FloatingImage({ url, position }) {
  const texture = useTexture(url);
  const meshRef = useRef();
  useFrame(() => { if (meshRef.current) meshRef.current.rotation.y += 0.002; });
  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[2.5, 1.8]} />
      <meshBasicMaterial map={texture} transparent side={DoubleSide} />
    </mesh>
  );
}

function ParticleBackground() {
  const particlesInit = async (main) => { await loadFull(main); };
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
const asset = (p) => `${import.meta.env.BASE_URL}${p}`;

const sources = useMemo(() => ([
  "images/M1.jpg","images/M2.jpg","images/M3.jpg","images/M4.jpg",
  "images/M5.jpg","images/M6.jpg","images/M7.jpg","images/M8.JPG",
  "images/M9.JPG","images/M10.JPG","images/M11.JPG","images/M12.jpg",
  "images/M13.jpg","images/M14.jpg","images/M15.jpg",

  "images/M1.jpg","images/M2.jpg","images/M3.jpg","images/M4.jpg",
  "images/M5.jpg","images/M6.jpg","images/M7.jpg","images/M8.JPG",
  "images/M9.JPG","images/M10.JPG","images/M11.JPG","images/M12.jpg",
  "images/M13.jpg","images/M14.jpg","images/M15.jpg",

  "images/M1.jpg","images/M2.jpg","images/M3.jpg","images/M4.jpg",
  "images/M5.jpg","images/M6.jpg","images/M7.jpg","images/M8.JPG",
  "images/M9.JPG","images/M10.JPG","images/M11.JPG","images/M12.jpg",
  "images/M13.jpg","images/M14.jpg","images/M15.jpg",
].map(asset)), []);

  const positions = useMemo(
    () => sources.map(() => [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
    ]),
    [sources]
  );

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <MuteButton src={asset("images/motherday.mp3")} />
      <ParticleBackground />

      <Canvas camera={{ position: [0, 0, 10], fov: 75 }} dpr={[1, 1.5]}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom enablePan enableRotate />

        {sources.map((url, i) => (
          <FloatingImage key={i} url={url} position={positions[i]} />
        ))}

        <Html fullscreen>
          <JasmineRain />
        </Html>
      </Canvas>
    </div>
  );
}
