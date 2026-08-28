"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./EmberSmokeScene.module.css";

type SceneState = "fallback" | "loading" | "ready";
type QualityTier = "low" | "medium" | "high";

type SceneRuntime = {
  dispose: (loseContext?: boolean) => void;
  setActive: (active: boolean) => void;
};

type NetworkInformationLike = EventTarget & {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithCapabilities = Navigator & {
  connection?: NetworkInformationLike;
  deviceMemory?: number;
};

export type EmberSmokeSceneProps = {
  className?: string;
};

const WEBGL_ATTRIBUTES: WebGLContextAttributes = {
  alpha: true,
  antialias: false,
  depth: false,
  failIfMajorPerformanceCaveat: true,
  powerPreference: "default",
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  stencil: false,
};

function chooseQualityTier(): QualityTier {
  const capabilities = navigator as NavigatorWithCapabilities;
  const connection = capabilities.connection;
  const constrainedNetwork =
    connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";
  const constrainedDevice =
    (capabilities.deviceMemory !== undefined && capabilities.deviceMemory <= 4) ||
    navigator.hardwareConcurrency <= 4;
  const mobileViewport = window.innerWidth < 768 || navigator.maxTouchPoints > 0;

  if (mobileViewport || constrainedDevice || constrainedNetwork) {
    return "low";
  }

  if (
    window.innerWidth < 1280 ||
    (capabilities.deviceMemory !== undefined && capabilities.deviceMemory <= 8)
  ) {
    return "medium";
  }

  return "high";
}

function EmberSmokeFallback() {
  return (
    <svg
      className={styles.fallback}
      focusable="false"
      viewBox="0 0 480 620"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        className={styles.smokePath}
        d="M241 355 C198 306 281 258 236 209 C194 164 249 111 228 55"
        opacity="0.42"
        strokeWidth="15"
      />
      <path
        className={styles.smokePath}
        d="M249 358 C290 311 214 273 261 220 C303 172 251 125 278 73"
        opacity="0.23"
        strokeWidth="10"
      />
      <path
        className={styles.smokePath}
        d="M238 349 C226 310 260 287 242 253 C218 208 246 177 238 145"
        opacity="0.54"
        strokeWidth="5"
      />

      <g transform="rotate(-3 240 446)">
        <rect className={styles.stick} x="235" y="405" width="10" height="178" rx="4" />
        <circle className={styles.emberHalo} cx="240" cy="405" r="48" />
        <circle className={styles.emberCore} cx="240" cy="405" r="8" />
      </g>
    </svg>
  );
}

/**
 * Assinatura atmosférica da HEAL. O SVG é renderizado no HTML e continua sendo
 * a experiência completa quando movimento, dados reduzidos ou WebGL2 impedem 3D.
 * O módulo Three.js só é baixado depois que a cena entra na viewport.
 */
export function EmberSmokeScene({ className }: EmberSmokeSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sceneState, setSceneState] = useState<SceneState>("fallback");
  const [qualityTier, setQualityTier] = useState<QualityTier | undefined>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dataPreference = window.matchMedia("(prefers-reduced-data: reduce)");
    const capabilities = navigator as NavigatorWithCapabilities;
    const connection = capabilities.connection;

    let activeInViewport = false;
    let disposed = false;
    let loading = false;
    let runtime: SceneRuntime | undefined;

    const shouldUseFallback = () =>
      motionPreference.matches || dataPreference.matches || connection?.saveData === true;

    const updateRuntimeActivity = () => {
      runtime?.setActive(activeInViewport && !document.hidden && !shouldUseFallback());
    };

    const disposeRuntime = (loseContext = true) => {
      runtime?.dispose(loseContext);
      runtime = undefined;
      loading = false;
      if (!disposed) {
        setSceneState("fallback");
        setQualityTier(undefined);
      }
    };

    const startRuntime = async () => {
      if (
        disposed ||
        loading ||
        runtime ||
        !activeInViewport ||
        document.hidden ||
        shouldUseFallback()
      ) {
        updateRuntimeActivity();
        return;
      }

      const context = canvas.getContext("webgl2", WEBGL_ATTRIBUTES);
      if (!context) {
        setSceneState("fallback");
        return;
      }

      loading = true;
      setSceneState("loading");
      const tier = chooseQualityTier();

      try {
        const { createEmberSmokeRuntime } = await import("./createEmberSmokeRuntime");
        if (disposed || shouldUseFallback()) {
          context.getExtension("WEBGL_lose_context")?.loseContext();
          return;
        }

        runtime = createEmberSmokeRuntime({ canvas, context, qualityTier: tier });
        setQualityTier(tier);
        setSceneState("ready");
        updateRuntimeActivity();
      } catch {
        context.getExtension("WEBGL_lose_context")?.loseContext();
        if (!disposed) {
          setSceneState("fallback");
        }
      } finally {
        loading = false;
      }
    };

    const onPreferenceChange = () => {
      if (shouldUseFallback()) {
        disposeRuntime();
      } else {
        void startRuntime();
      }
    };

    const onVisibilityChange = () => {
      updateRuntimeActivity();
      if (!document.hidden) {
        void startRuntime();
      }
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      disposeRuntime(false);
    };

    const onContextRestored = () => {
      void startRuntime();
    };

    const intersectionObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              activeInViewport = entry?.isIntersecting === true;
              updateRuntimeActivity();
              if (activeInViewport) {
                void startRuntime();
              }
            },
            { rootMargin: "120px 0px", threshold: 0.01 },
          )
        : undefined;

    if (intersectionObserver) {
      intersectionObserver.observe(canvas);
    } else {
      activeInViewport = true;
      void startRuntime();
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    motionPreference.addEventListener("change", onPreferenceChange);
    dataPreference.addEventListener("change", onPreferenceChange);
    connection?.addEventListener("change", onPreferenceChange);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    return () => {
      disposed = true;
      intersectionObserver?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionPreference.removeEventListener("change", onPreferenceChange);
      dataPreference.removeEventListener("change", onPreferenceChange);
      connection?.removeEventListener("change", onPreferenceChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      runtime?.dispose();
      runtime = undefined;
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-quality={qualityTier}
      data-state={sceneState}
    >
      <EmberSmokeFallback />
      <canvas className={styles.canvas} ref={canvasRef} tabIndex={-1} />
    </div>
  );
}
