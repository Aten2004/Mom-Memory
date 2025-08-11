import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./JasmineRain.css";
import jasmineUrl from "../assets/jasmine1.png"; 

export default function JasmineRain({ spawnOffset = -60 }) {
  const [jasmines, setJasmines] = useState([]);

  const dropJasmine = () => {
    const batch = Array.from({ length: 15 }, () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      delay: Math.random() * 2,
    }));
    setJasmines((p) => [...p, ...batch]);
    setTimeout(() => setJasmines((p) => p.filter(j => !batch.find(b => b.id===j.id))), 12000);
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
            ["--spawnTop"]: `${spawnOffset}px`,
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
