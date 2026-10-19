"use client";

import { useEffect, useRef, useState } from "react";
import { AirGlyph } from "@/components/brand";
import { HEAL_VARIANTS, type HealVariantId } from "@/lib/brand/air-variants";

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
  variantId?: HealVariantId;
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

function EmberSmokeFallback({ variantId }: { variantId: HealVariantId }) {
  return <AirGlyph className={styles.fallback} variantId={variantId} decorative />;
}

/**
 * Assinatura atmosférica da HEAL. O SVG é renderizado no HTML e continua sendo
 * a experiência completa quando movimento, dados reduzidos ou WebGL2 impedem 3D.
 * O módulo Three.js só é baixado depois que a cena entra na viewport.
 */
export function EmberSmokeScene({ className, variantId = "canela" }: EmberSmokeSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<SceneRuntime | undefined>(undefined);
  const startRuntimeRef = useRef<() => void>(() => undefined);
  const syncRuntimeRef = useRef<() => void>(() => undefined);
  const generationRef = useRef(0);
  const contextLossCountRef = useRef(0);
  const permanentFallbackRef = useRef(false);
  const pausedRef = useRef(false);
  const [sceneState, setSceneState] = useState<SceneState>("fallback");
  const [qualityTier, setQualityTier] = useState<QualityTier | undefined>();
  const [selectedVariantId, setSelectedVariantId] = useState<HealVariantId | null>(null);
  const [userReduced, setUserReduced] = useState(false);
  const activeVariantId = selectedVariantId ?? variantId;

  useEffect(() => {
    const onVariantChange = (event: Event) => {
      const nextId = (event as CustomEvent<{ variantId?: string }>).detail?.variantId;
      if (HEAL_VARIANTS.some((variant) => variant.id === nextId)) {
        setSelectedVariantId(nextId as HealVariantId);
      }
    };
    const onMotionControl = (event: Event) => {
      const detail = (event as CustomEvent<{ paused?: boolean; reduced?: boolean }>).detail;
      if (typeof detail?.paused === "boolean") {
        pausedRef.current = detail.paused;
        if (detail.paused) runtimeRef.current?.setActive(false);
        else syncRuntimeRef.current();
      }
      if (typeof detail?.reduced === "boolean") {
        if (detail.reduced) {
          runtimeRef.current?.dispose();
          runtimeRef.current = undefined;
          setSceneState("fallback");
          setQualityTier(undefined);
        }
        setUserReduced(detail.reduced);
      }
    };

    window.addEventListener("heal:variant-change", onVariantChange);
    window.addEventListener("heal:motion-control", onMotionControl);
    return () => {
      window.removeEventListener("heal:variant-change", onVariantChange);
      window.removeEventListener("heal:motion-control", onMotionControl);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || userReduced) {
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
    let pendingContext: WebGL2RenderingContext | undefined;

    const shouldUseFallback = () =>
      motionPreference.matches || dataPreference.matches || connection?.saveData === true;

    const updateRuntimeActivity = () => {
      runtime?.setActive(activeInViewport && !document.hidden && !pausedRef.current && !shouldUseFallback());
    };

    const disposeRuntime = (loseContext = true) => {
      generationRef.current += 1;
      runtime?.dispose(loseContext);
      if (!runtime && pendingContext && loseContext) {
        pendingContext.getExtension("WEBGL_lose_context")?.loseContext();
      }
      runtime = undefined;
      pendingContext = undefined;
      runtimeRef.current = undefined;
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
        permanentFallbackRef.current ||
        !activeInViewport ||
        document.hidden ||
        pausedRef.current ||
        shouldUseFallback()
      ) {
        updateRuntimeActivity();
        return;
      }

      const token = ++generationRef.current;
      const context = canvas.getContext("webgl2", WEBGL_ATTRIBUTES);
      if (!context) {
        setSceneState("fallback");
        return;
      }
      pendingContext = context;

      loading = true;
      setSceneState("loading");
      const tier = chooseQualityTier();

      try {
        const { createEmberSmokeRuntime } = await import("./createEmberSmokeRuntime");
        if (
          disposed ||
          token !== generationRef.current ||
          permanentFallbackRef.current ||
          !activeInViewport ||
          document.hidden ||
          pausedRef.current ||
          shouldUseFallback()
        ) {
          if (!disposed && token === generationRef.current) {
            context.getExtension("WEBGL_lose_context")?.loseContext();
          }
          return;
        }

        runtime = createEmberSmokeRuntime({ canvas, context, qualityTier: tier, variantId: activeVariantId });
        pendingContext = undefined;
        runtimeRef.current = runtime;
        setQualityTier(tier);
        setSceneState("ready");
        updateRuntimeActivity();
      } catch {
        if (!disposed && token === generationRef.current) {
          context.getExtension("WEBGL_lose_context")?.loseContext();
          setSceneState("fallback");
        }
      } finally {
        if (token === generationRef.current) loading = false;
      }
    };
    startRuntimeRef.current = () => void startRuntime();
    syncRuntimeRef.current = () => {
      updateRuntimeActivity();
      if (!runtime) void startRuntime();
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
      contextLossCountRef.current += 1;
      permanentFallbackRef.current = contextLossCountRef.current >= 2;
      disposeRuntime(false);
    };

    const onContextRestored = () => {
      if (!permanentFallbackRef.current) void startRuntime();
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
      runtimeRef.current = undefined;
      pendingContext?.getExtension("WEBGL_lose_context")?.loseContext();
      pendingContext = undefined;
      startRuntimeRef.current = () => undefined;
      syncRuntimeRef.current = () => undefined;
    };
  }, [activeVariantId, userReduced]);

  return (
    <div
      aria-hidden="true"
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-quality={qualityTier}
      data-state={sceneState}
      data-variant={activeVariantId}
    >
      <EmberSmokeFallback variantId={activeVariantId} />
      <canvas className={styles.canvas} ref={canvasRef} tabIndex={-1} />
    </div>
  );
}
