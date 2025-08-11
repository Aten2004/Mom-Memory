import React, { useRef, useState, useEffect } from "react";
import "./MuteButton.css";

export default function MuteButton({ src }) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);

  // ปลดล็อกเสียงบนมือถือด้วย “แตะครั้งแรกที่หน้า”
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.muted = true;     // เริ่มแบบเงียบ เพื่อให้ autoplay ผ่าน
    el.loop = true;

    const tryPlay = () => el.play().catch(() => {});
    tryPlay();

    const unlock = () => {
      // แตะครั้งแรกให้พยายามเล่น (เพื่อให้ session อนุญาตเสียง)
      tryPlay();
      // ปลดล็อกครั้งเดียวพอ
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    // ถ้ากลับเข้าหน้าอีก ให้พยายามเล่นต่อ
    const onVis = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;

    // เผื่อบางเครื่องต้องการ gesture ให้เรียก play() ทุกครั้ง
    el.play().catch(() => {});
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
      />
      <button className="mute-toggle" onClick={toggleMute} aria-label="Toggle sound">
        {muted ? "🔇" : "🔊"}
      </button>
    </>
  );
}
