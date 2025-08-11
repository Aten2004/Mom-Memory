import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./JasmineRain.css";
import jasmineUrl from "../assets/jasmine1.png"; // ← สำคัญ: ให้ Vite จัดการพาธ

export default function JasmineRain({ spawnOffset = -60 }) {
  const [jasmines, setJasmines] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  const dropJasmine = () => {
    const batch = Array.from({ length: 15 }, () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      delay: Math.random() * 2,
    }));
    setJasmines((p) => [...p, ...batch]);

    setTimeout(() => {
      setJasmines((p) => p.filter((j) => !batch.find((b) => b.id === j.id)));
    }, 12000);

    setClickCount((n) => {
      const next = n + 1;
      if (next % 5 === 0) {
        confetti({ particleCount: 120, spread: 90, angle: 90, origin: { y: 0.6 } });
      }
      return next;
    });
  };

  return (
    <>
      {jasmines.map((j) => (
        <img
          key={j.id}
          src={jasmineUrl}
          className="jasmine"
          style={{
            left: `${j.x}px`,
            animationDelay: `${j.delay}s`,
            ["--spawnTop"]: `${spawnOffset}px`, // คุมความสูงเกิดบนมือถือ/PC
          }}
          alt=""
        />
      ))}

      <button className="mother-button" onClick={dropJasmine}>
        <span className="button-text">🩵 Happy Mother's Day 🩵</span>
        <span className="tap-hint">✨ Try Pressing ✨</span>
      </button>
    </>
  );
}
