"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { animate } from "animejs/animation";
import { ShaderMount } from "@paper-design/shaders-react";
import {
  getShaderColorFromString,
  type PaperShaderElement,
} from "@paper-design/shaders";
import { getRisingColorFront } from "./healSmokeSpectrum";

import styles from "./HealSmokePlume.module.css";

const HEAL_SMOKE_COLORS = [
  "#f7f7f5",
  "#ffd43b",
  "#ff8a1f",
  "#ff4938",
  "#38e6a1",
  "#2ecdf2",
  "#5868ff",
  "#a855f7",
  "#f43fa4",
  "#ff4f5e",
] as const;

const PAPER_SMOKE_SETTINGS = {
  innerShape: 0.7,
  noiseIterations: 8,
  noiseScale: 5,
  radius: 0.25,
  speed: 4,
  thickness: 0.65,
} as const;

// Movimento aprovado: C — Pulsos ascendentes, em todos os dispositivos.
const SMOKE_MOTION = { id: "pulse", shaderIndex: 2 } as const;

// Adaptado da lógica de ruído em camadas do Smoke Ring da Paper Shaders.
// A topologia radial foi trocada por uma pluma vertical que nasce na brasa.
const HEAL_SMOKE_FRAGMENT_SHADER = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_colorBack;
uniform vec4 u_colors[10];
uniform float u_introProgress;
uniform float u_colorCount;
uniform float u_risingFront;
uniform float u_motionVariant;
uniform float u_sourceX;
uniform float u_sourceY;
uniform float u_noiseScale;
uniform float u_noiseIterations;
uniform float u_radius;
uniform float u_thickness;
uniform float u_innerShape;

out vec4 fragColor;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 8; i++) {
    if (float(i) >= u_noiseIterations) break;
    sum += valueNoise(p) * amplitude;
    p = p * 1.99 + vec2(7.3, 3.7);
    amplitude *= 0.58;
  }
  return sum;
}

float plume(vec2 uv, float aspect, float time, float seed, float widthScale) {
  float rise = uv.y - u_sourceY;
  if (rise < -0.018) return 0.0;

  float height = max(rise, 0.0);
  float height01 = clamp(height / max(0.001, 1.0 - u_sourceY), 0.0, 1.0);
  float variant = floor(u_motionVariant + 0.5);
  float slowNoise = fbm(vec2(height * u_noiseScale - time * (0.34 + variant * 0.08), seed));
  float curl = sin(height * (8.0 + seed) + time * (0.92 + seed * 0.04));
  float counterCurl = sin(height * 17.0 - time * 0.64 + seed * 2.1);
  float drift = curl * (0.014 + height01 * (0.058 + u_radius * 0.1));
  drift += counterCurl * (0.006 + height01 * 0.024);
  drift += (slowNoise - 0.48) * (0.032 + height01 * 0.098);

  if (variant > 0.5 && variant < 1.5) {
    float helix = sin(height * 19.0 - time * 2.15 + seed * 3.14159);
    drift += helix * (0.012 + height01 * 0.068);
  } else if (variant > 1.5) {
    float pulseWander = sin(height * 7.0 - time * 1.45 + seed * 1.7);
    drift += pulseWander * (0.008 + height01 * 0.036);
  }

  float center = u_sourceX + drift + (seed - 1.65) * 0.028 * height01;
  float horizontal = abs((uv.x - center) * aspect);
  float width = mix(0.0105, 0.168, pow(height01, 0.74));
  width *= widthScale * (0.7 + u_thickness * 0.82);
  if (variant > 0.5 && variant < 1.5) width *= 0.82;
  if (variant > 1.5) {
    float breath = 0.82 + 0.28 * sin(height01 * 18.0 - time * 3.1 + seed);
    width *= breath;
  }

  float body = exp(-pow(horizontal / max(width, 0.001), 1.45 + u_innerShape * 0.42));
  float detail = fbm(vec2(
    uv.x * aspect * u_noiseScale * 1.65 + seed * 9.0,
    uv.y * u_noiseScale * 1.45 - time * (0.72 + variant * 0.16)
  ));
  float breakupNoise = smoothstep(0.28, 0.79, detail + body * 0.28);
  float breakup = mix(0.16, 1.0, breakupNoise);
  float sourceFade = smoothstep(-0.012, 0.042, rise);
  float upperFade = 1.0 - smoothstep(0.82, 0.99, uv.y);
  return body * breakup * sourceFade * upperFade;
}

vec4 paletteForCount(float t, float discreteCount) {
  float activeCount = clamp(floor(discreteCount + 0.0001), 1.0, 10.0);
  if (activeCount < 1.5) return u_colors[0];

  float mixer = clamp(t, 0.0, 1.0) * (activeCount - 1.0);
  int index = int(floor(mixer));
  float localT = fract(mixer);
  vec4 result = u_colors[0];
  for (int i = 0; i < 9; i++) {
    if (float(i) < activeCount - 1.0 && index == i) {
      result = mix(u_colors[i], u_colors[i + 1], smoothstep(0.0, 1.0, localT));
    }
  }
  for (int i = 1; i < 10; i++) {
    if (float(i) == activeCount - 1.0 && index >= i) result = u_colors[i];
  }
  return result;
}

vec4 palette(float t, float colorCount) {
  float level = clamp(colorCount, 1.0, 10.0);
  float lowerCount = floor(level);
  float upperCount = min(10.0, lowerCount + 1.0);
  float reveal = smoothstep(0.0, 1.0, fract(level));
  return mix(
    paletteForCount(t, lowerCount),
    paletteForCount(t, upperCount),
    reveal
  );
}

float particles(vec2 uv, float aspect, float time, float corridor) {
  vec2 moving = vec2(uv.x * aspect, uv.y - time * (0.12 + u_motionVariant * 0.035));
  moving.x += sin(uv.y * 15.0 - time * 1.4) * 0.018 * step(0.5, u_motionVariant);
  vec2 grid = moving * vec2(46.0, 54.0);
  vec2 cell = floor(grid);
  vec2 local = fract(grid) - 0.5;
  float randomValue = hash21(cell + 31.7);
  float chosen = step(0.92, randomValue);
  float point = 1.0 - smoothstep(0.035, 0.095, length(local));
  float verticalGate = smoothstep(u_sourceY + 0.08, u_sourceY + 0.22, uv.y);
  return point * chosen * corridor * verticalGate;
}

void main() {
  vec2 uv = gl_FragCoord.xy / max(u_resolution.xy, vec2(1.0));
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  // Paper entrega u_time em segundos. 0.105 mantém a pluma contemplativa;
  // não converter novamente como se o valor ainda estivesse em milissegundos.
  float time = u_time * 0.105;
  float intro = clamp(u_introProgress, 0.0, 1.0);
  float colorLevel = clamp(u_colorCount, 1.0, 10.0);
  float variant = floor(u_motionVariant + 0.5);

  float mainPlume = plume(uv, aspect, time, 0.83, 1.12);
  float companion = plume(uv, aspect, time, 1.67, 0.92);
  float hairline = plume(uv, aspect, time, 2.41, 0.58);
  float outerVeil = plume(uv, aspect, time, 3.16, 1.46);
  float leftVeil = plume(uv, aspect, time, 0.14, 1.28);
  float density = clamp(
    mainPlume * 0.46 + companion * 0.34 + hairline * 0.2 +
    outerVeil * 0.16 + leftVeil * 0.18,
    0.0,
    1.0
  );

  float height01 = clamp((uv.y - u_sourceY) / max(0.001, 1.0 - u_sourceY), 0.0, 1.0);
  if (variant > 0.5 && variant < 1.5) {
    density = clamp(
      mainPlume * 0.44 + companion * 0.42 + hairline * 0.27 +
      outerVeil * 0.17 + leftVeil * 0.2,
      0.0,
      1.0
    );
  } else if (variant > 1.5) {
    float packetTexture = fbm(vec2(
      uv.x * aspect * 8.0 + time * 0.28,
      uv.y * 8.0 - time * 0.92
    ));
    float pulseWave = 0.82 + 0.18 * sin(
      height01 * 14.0 - time * 2.6 + packetTexture * 4.8 +
      (uv.x - u_sourceX) * aspect * 5.0
    );
    float organicPacket = mix(0.78, 1.18, smoothstep(0.24, 0.8, packetTexture));
    density = clamp(density * pulseWave * organicPacket, 0.0, 1.0);
  }

  float volumeTexture = fbm(vec2(
    uv.x * aspect * 9.5 + time * 0.21,
    uv.y * 10.8 - time * (1.04 + variant * 0.11)
  ));
  float turbulentVolume = mix(0.34, 1.12, smoothstep(0.24, 0.78, volumeTexture));
  density = clamp(density * turbulentVolume, 0.0, 1.0);

  vec2 chromaFlowUv = vec2(
    (uv.x - u_sourceX) * aspect * (4.4 + variant * 0.45),
    height01 * (3.25 + variant * 0.34) - time * (0.92 + variant * 0.12)
  );
  float colorNoise = fbm(chromaFlowUv + vec2(13.7, 4.2));
  float colorDetail = fbm(chromaFlowUv * 1.73 + vec2(-8.4, time * 0.18));
  float colorTransport = colorNoise * 0.68 + colorDetail * 0.32;
  colorTransport += time * (0.055 + variant * 0.012) - height01 * 0.18;
  float palettePosition = fract(colorTransport);
  vec4 targetA = palette(palettePosition, colorLevel);
  vec4 targetB = palette(fract(palettePosition + 0.2 + colorDetail * 0.12), colorLevel);
  vec3 targetColor = mix(targetA.rgb, targetB.rgb, smoothstep(0.38, 0.72, colorDetail));

  float risingFront = u_risingFront;
  float warpedHeight = height01 + (colorNoise - 0.5) * 0.2 +
    sin(height01 * 11.0 - time * 1.1) * 0.028;
  float risingColor = 1.0 - smoothstep(risingFront - 0.22, risingFront + 0.13, warpedHeight);
  float colorArrival = smoothstep(1.05, 1.85, colorLevel);
  float colorOpacity = colorArrival * risingColor;
  float chromaCloudA = smoothstep(0.22, 0.76, colorNoise + volumeTexture * 0.16);
  float chromaCloudB = smoothstep(0.28, 0.8, colorDetail + volumeTexture * 0.12);
  float chromaVolume = clamp(chromaCloudA * 0.64 + chromaCloudB * 0.52, 0.0, 1.0);
  float smokeContainment = smoothstep(0.025, 0.36, density);
  float colorStrength = colorOpacity * smokeContainment * mix(0.3, 0.96, chromaVolume);

  vec3 neutral = mix(vec3(0.64, 0.66, 0.68), vec3(0.98), density);
  vec3 smokeColor = mix(neutral, targetColor, colorStrength);

  float sourceDistance = length(vec2(
    (uv.x - u_sourceX) * aspect * 1.25,
    (uv.y - u_sourceY) * 2.3
  ));
  float sourceBloom = exp(-pow(sourceDistance / 0.055, 2.0)) * colorArrival *
    smoothstep(0.02, 0.2, intro);
  vec4 emittedColor = palette(fract(time * 0.075), colorLevel);
  smokeColor = mix(smokeColor, emittedColor.rgb, sourceBloom * 0.78);

  float corridorCenter = u_sourceX + sin(height01 * (7.0 + variant * 3.0) - time * (0.82 + variant * 0.28)) * (0.02 + height01 * 0.08);
  float corridor = 1.0 - smoothstep(0.035, 0.23, abs((uv.x - corridorCenter) * aspect));
  float particleField = particles(uv, aspect, time, corridor);
  float particleReveal = smoothstep(0.34, 0.88, intro);
  vec4 particleColor = palette(clamp(height01 + 0.16, 0.0, 1.0), colorLevel);

  float smokeAlpha = density * mix(0.26, 0.56, intro);
  float particleAlpha = particleField * 0.72 * particleReveal * colorOpacity;
  float luminousGain = 1.08 + intro * 0.58;
  vec3 finalColor = smokeColor * smokeAlpha * luminousGain;
  finalColor += targetColor * chromaVolume * colorOpacity * smokeAlpha * 0.22;
  finalColor += particleColor.rgb * particleAlpha * 1.25;
  finalColor += emittedColor.rgb * sourceBloom * 0.36;
  float finalAlpha = clamp(smokeAlpha + particleAlpha + sourceBloom * 0.22, 0.0, 0.94);

  finalColor += u_colorBack.rgb * 0.0;
  fragColor = vec4(finalColor, finalAlpha);
}
`;

type SourcePoint = { x: number; y: number };

export type HealSmokePlumeProps = {
  className?: string;
};

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function HealSmokePlume({ className }: HealSmokePlumeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<PaperShaderElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const combustionRef = useRef<HTMLSpanElement>(null);
  const contextLossCountRef = useRef(0);
  const permanentFallbackRef = useRef(false);
  const [source, setSource] = useState<SourcePoint>({ x: 0.735, y: 0.405 });
  const [capabilitiesChecked, setCapabilitiesChecked] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [preferenceReduced, setPreferenceReduced] = useState(false);
  const [userReduced, setUserReduced] = useState(false);
  const [contextFallback, setContextFallback] = useState(false);
  const [shaderGeneration, setShaderGeneration] = useState(0);
  const [paused, setPaused] = useState(false);
  const motionVariant = SMOKE_MOTION.id;
  const motionVariantIndex = SMOKE_MOTION.shaderIndex;
  const reducedMotion = preferenceReduced || userReduced;
  const shaderEnabled = capabilitiesChecked && webglAvailable && !reducedMotion;
  const sceneState = shaderEnabled && !contextFallback ? "ready" : "fallback";
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dataQuery = window.matchMedia("(prefers-reduced-data: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const syncPreference = () => {
      const shouldReduce =
        motionQuery.matches || dataQuery.matches || connection?.saveData === true;
      let supportsWebgl = false;
      if (!shouldReduce) {
        const probe = document.createElement("canvas");
        const context = probe.getContext("webgl2");
        supportsWebgl = context !== null;
        context?.getExtension("WEBGL_lose_context")?.loseContext();
      }
      setPreferenceReduced(shouldReduce);
      setWebglAvailable(supportsWebgl);
      setCapabilitiesChecked(true);
    };
    syncPreference();
    motionQuery.addEventListener("change", syncPreference);
    dataQuery.addEventListener("change", syncPreference);
    return () => {
      motionQuery.removeEventListener("change", syncPreference);
      dataQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    const onMotionControl = (event: Event) => {
      const detail = (event as CustomEvent<{ paused?: boolean; reduced?: boolean }>).detail;
      if (typeof detail?.paused === "boolean") setPaused(detail.paused);
      if (typeof detail?.reduced === "boolean") setUserReduced(detail.reduced);
    };
    window.addEventListener("heal:motion-control", onMotionControl);
    return () => window.removeEventListener("heal:motion-control", onMotionControl);
  }, []);

  useEffect(() => {
    if (!shaderEnabled) return;
    const root = rootRef.current;
    if (!root) return;

    let canvas: HTMLCanvasElement | null = null;
    const bindContextEvents = () => {
      canvas = root.querySelector("canvas");
      if (!canvas) return;
      canvas.addEventListener("webglcontextlost", onContextLost);
      canvas.addEventListener("webglcontextrestored", onContextRestored);
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLossCountRef.current += 1;
      permanentFallbackRef.current = contextLossCountRef.current >= 2;
      setContextFallback(true);
    };
    const onContextRestored = () => {
      if (permanentFallbackRef.current) return;
      setShaderGeneration((current) => current + 1);
      setContextFallback(false);
    };
    const frame = window.requestAnimationFrame(bindContextEvents);
    return () => {
      window.cancelAnimationFrame(frame);
      canvas?.removeEventListener("webglcontextlost", onContextLost);
      canvas?.removeEventListener("webglcontextrestored", onContextRestored);
    };
  }, [shaderEnabled, shaderGeneration]);

  useEffect(() => {
    const root = rootRef.current;
    const stick = stickRef.current;
    const combustion = combustionRef.current;
    if (!root || !stick || !combustion) return;

    const updateSource = () => {
      const rootBounds = root.getBoundingClientRect();
      const combustionBounds = combustion.getBoundingClientRect();
      if (rootBounds.width <= 0 || rootBounds.height <= 0) return;
      const next = {
        x: (combustionBounds.left - rootBounds.left) / rootBounds.width,
        y: 1 - (combustionBounds.top - rootBounds.top) / rootBounds.height,
      };
      root.dataset.sourceX = next.x.toFixed(6);
      root.dataset.sourceY = next.y.toFixed(6);
      setSource((current) =>
        Math.abs(current.x - next.x) < 0.001 && Math.abs(current.y - next.y) < 0.001
          ? current
          : next,
      );
    };

    const observer = new ResizeObserver(updateSource);
    observer.observe(root);
    observer.observe(stick);
    observer.observe(combustion);
    const frame = window.requestAnimationFrame(updateSource);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!shaderEnabled || contextFallback) return;
    const root = rootRef.current;
    const stick = stickRef.current;
    if (!root) return;

    const spectrum = { value: 1 };
    let lastVisibleCount = 1;
    root.dataset.colorCount = "1";
    shaderRef.current?.paperShaderMount?.setUniforms({
      u_colorCount: 1,
      u_introProgress: 0,
      u_risingFront: getRisingColorFront(1),
      u_motionVariant: motionVariantIndex,
    });
    const spectrumAnimation = animate(spectrum, {
      value: { from: 1, to: 10 },
      delay: 650,
      duration: 12_600,
      ease: "linear",
      onUpdate: () => {
        const visibleCount = Math.min(10, Math.max(1, Math.floor(spectrum.value + 0.0001)));
        if (visibleCount !== lastVisibleCount) {
          root.dataset.colorCount = String(visibleCount);
          lastVisibleCount = visibleCount;
        }
        shaderRef.current?.paperShaderMount?.setUniforms({
          u_colorCount: spectrum.value,
          u_introProgress: (spectrum.value - 1) / 9,
          u_risingFront: getRisingColorFront(spectrum.value),
        });
      },
    });
    const stickAnimation = stick
      ? animate(stick, {
          opacity: { from: 0, to: 1 },
          duration: 1_650,
          ease: "out(4)",
        })
      : undefined;

    return () => {
      spectrumAnimation.cancel();
      stickAnimation?.cancel();
    };
  }, [contextFallback, motionVariantIndex, shaderEnabled, shaderGeneration]);

  const uniforms = useMemo(
    () => ({
      u_colorBack: getShaderColorFromString("#000000"),
      u_colors: HEAL_SMOKE_COLORS.map(getShaderColorFromString),
      u_introProgress: 0,
      u_colorCount: 1,
      u_risingFront: getRisingColorFront(1),
      u_motionVariant: motionVariantIndex,
      u_sourceX: source.x,
      u_sourceY: source.y,
      u_noiseScale: PAPER_SMOKE_SETTINGS.noiseScale,
      u_noiseIterations: PAPER_SMOKE_SETTINGS.noiseIterations,
      u_radius: PAPER_SMOKE_SETTINGS.radius,
      u_thickness: PAPER_SMOKE_SETTINGS.thickness,
      u_innerShape: PAPER_SMOKE_SETTINGS.innerShape,
      u_fit: 2,
      u_scale: 1,
      u_rotation: 0,
      u_offsetX: 0,
      u_offsetY: 0,
      u_originX: 0.5,
      u_originY: 0.5,
      u_worldWidth: 0,
      u_worldHeight: 0,
    }),
    [motionVariantIndex, source.x, source.y],
  );

  return (
    <>
      <div
        ref={rootRef}
        aria-hidden="true"
        className={joinClassNames(styles.root, className)}
        data-motion-variant={motionVariant}
        data-paused={paused || undefined}
        data-reduced-motion={reducedMotion || undefined}
        data-state={sceneState}
      >
        {shaderEnabled ? (
          <ShaderMount
            key={`${shaderGeneration}-${motionVariant}`}
            ref={shaderRef}
            className={styles.shader}
            fragmentShader={HEAL_SMOKE_FRAGMENT_SHADER}
            uniforms={uniforms}
            speed={paused || contextFallback ? 0 : PAPER_SMOKE_SETTINGS.speed}
            frame={0}
            minPixelRatio={1}
            maxPixelCount={1_200_000}
            webGlContextAttributes={{
              alpha: true,
              antialias: false,
              depth: false,
              powerPreference: "low-power",
              premultipliedAlpha: true,
              preserveDrawingBuffer: false,
              stencil: false,
            }}
          />
        ) : null}
        <div ref={stickRef} className={styles.stick} data-incense-stick>
          <Image
            alt=""
            src="/images/heals/heal-incense-stick-fhd-v7.png"
            width={1080}
            height={1920}
            priority
            sizes="(max-width: 720px) 12rem, 16rem"
          />
          <span ref={combustionRef} className={styles.combustionAnchor} data-combustion-anchor>
            <span className={styles.heatShimmer} data-combustion-layer="heat" />
            <span className={styles.emberHalo} data-combustion-layer="halo" />
            <span className={styles.emberCore} data-combustion-layer="core" />
            <span className={styles.emberSparks} data-combustion-layer="sparks">
              <i />
              <i />
              <i />
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
