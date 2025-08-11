import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./JasmineRain.css";

export default function JasmineRain() {
  const [jasmines, setJasmines] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  const dropJasmine = () => {
    const newJasmines = Array.from({ length: 15 }, () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      delay: Math.random() * 2,
    }));

    setJasmines((prev) => [...prev, ...newJasmines]);

    setTimeout(() => {
      setJasmines((prev) =>
        prev.filter((j) => !newJasmines.find((nj) => nj.id === j.id))
      );
    }, 12000);

    // ✅ เพิ่มนับจำนวนครั้ง
    setClickCount((prev) => {
      const newCount = prev + 1;

      // 🎆 ยิง confetti ทุก 5 ครั้ง
      if (newCount % 5 === 0) {
        confetti({
          particleCount: 120,
          spread: 90,
          angle: 90,
          origin: { y: 0.6 },
          colors: ["#ffffff", "#A1E3F9", "#FFC0CB", "#ADD8E6"],
          shapes: ["circle"],
        });
      }

      return newCount;
    });
  };

  return (
    <>
      {jasmines.map((j) => (
        <img
          key={j.id}
          src="images/jasmine1.png"
          className="jasmine"
          style={{ left: `${j.x}px`, animationDelay: `${j.delay}s` }}
        />
      ))}

      <button className="mother-button" onClick={dropJasmine}>
        <span className="button-text">🩵 Happy Mother's Day 🩵</span>
        <span className="tap-hint">✨ Try Pressing ✨</span>
      </button>
    </>
  );
}
