"use client";
import { useEffect, useState } from "react";
export function MotionControl() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return (
    <button
      className="motion-control"
      type="button"
      disabled={reduced}
      aria-pressed={paused}
      onClick={() => {
        const value = !paused;
        setPaused(value);
        window.dispatchEvent(
          new CustomEvent("heal:motion-control", { detail: { paused: value } }),
        );
      }}
    >
      <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{" "}
      {reduced
        ? "Movimento reduzido"
        : paused
          ? "Retomar animação"
          : "Pausar animação"}
    </button>
  );
}
