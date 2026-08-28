import * as THREE from "three";

const QUALITY = {
  low: { dpr: 1.15, fps: 30, ribbons: 2, segments: 28 },
  medium: { dpr: 1.5, fps: 45, ribbons: 3, segments: 38 },
  high: { dpr: 1.75, fps: 60, ribbons: 3, segments: 48 },
};

const SMOKE_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  uniform float uWidth;
  uniform float uSway;

  varying vec2 vUv;
  varying float vBreath;

  void main() {
    vUv = uv;
    float height = uv.y;
    float slowWave = sin(height * 8.2 - uTime * 0.58 + uPhase);
    float fineWave = sin(height * 17.0 + uTime * 0.23 + uPhase * 1.7);
    float unfolding = smoothstep(0.0, 0.82, height);
    float center = (slowWave * 0.22 + fineWave * 0.07) * uSway * (0.28 + unfolding);

    vec3 transformed = position;
    transformed.x += center + (uv.x - 0.5) * uWidth * (1.0 - height * 0.28);
    transformed.y += sin(height * 10.0 - uTime * 0.31 + uPhase) * 0.025;
    transformed.z += fineWave * 0.025;
    vBreath = 0.82 + 0.18 * sin(uTime * 0.42 + uPhase + height * 5.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const SMOKE_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uPhase;

  varying vec2 vUv;
  varying float vBreath;

  void main() {
    float centerDistance = abs(vUv.x - 0.5) * 2.0;
    float softEdge = pow(max(0.0, 1.0 - centerDistance), 1.55);
    float enter = smoothstep(0.01, 0.12, vUv.y);
    float dissolve = 1.0 - smoothstep(0.70, 1.0, vUv.y);
    float striation = 0.88 + 0.12 * sin(vUv.y * 34.0 + uPhase * 4.0);
    float alpha = softEdge * enter * dissolve * striation * vBreath * uOpacity;

    if (alpha < 0.008) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const EMBER_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const EMBER_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec3 uEmber;
  uniform vec3 uCore;

  varying vec2 vUv;

  void main() {
    float distanceFromCenter = length(vUv - 0.5) * 2.0;
    float breath = 0.94 + 0.06 * sin(uTime * 1.7);
    float halo = exp(-3.8 * distanceFromCenter) * 0.38;
    float coal = smoothstep(0.5, 0.04, distanceFromCenter / breath);
    float heat = smoothstep(0.26, 0.0, distanceFromCenter);
    vec3 color = mix(uEmber, uCore, heat);
    float alpha = max(halo, coal);

    if (alpha < 0.008) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

function createRibbonGeometry(segments) {
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let index = 0; index <= segments; index += 1) {
    const height = index / segments;
    const y = height * 3.65;
    positions.push(0, y, 0, 0, y, 0);
    uvs.push(0, height, 1, height);

    if (index < segments) {
      const offset = index * 2;
      indices.push(offset, offset + 1, offset + 2, offset + 1, offset + 3, offset + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

function createSmokeRibbon({ opacity, phase, segments, sway, width }) {
  const geometry = createRibbonGeometry(segments);
  const material = new THREE.ShaderMaterial({
    blending: THREE.NormalBlending,
    depthTest: false,
    depthWrite: false,
    fragmentShader: SMOKE_FRAGMENT_SHADER,
    transparent: true,
    uniforms: {
      uColor: { value: new THREE.Color(0xc9c1b5) },
      uOpacity: { value: opacity },
      uPhase: { value: phase },
      uSway: { value: sway },
      uTime: { value: 0 },
      uWidth: { value: width },
    },
    vertexShader: SMOKE_VERTEX_SHADER,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, -0.25, 0);
  return { geometry, material, mesh };
}

function createEmber() {
  const geometry = new THREE.PlaneGeometry(0.72, 0.72, 1, 1);
  const material = new THREE.ShaderMaterial({
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
    fragmentShader: EMBER_FRAGMENT_SHADER,
    transparent: true,
    uniforms: {
      uCore: { value: new THREE.Color(0xffd3a3) },
      uEmber: { value: new THREE.Color(0xb73b1d) },
      uTime: { value: 0 },
    },
    vertexShader: EMBER_VERTEX_SHADER,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, -0.28, 0.04);
  return { geometry, material, mesh };
}

function createStick() {
  const geometry = new THREE.PlaneGeometry(0.055, 1.55, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x3c3026,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    opacity: 0.94,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0.04, -1.02, 0);
  mesh.rotation.z = -0.055;
  return { geometry, material, mesh };
}

/**
 * Inicializa a camada WebGL já validada pelo componente React. O chamador é
 * responsável por controlar visibilidade e encerrar o runtime.
 */
export function createEmberSmokeRuntime({ canvas, context, qualityTier }) {
  const settings = QUALITY[qualityTier] ?? QUALITY.low;
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: qualityTier !== "low",
    canvas,
    context,
    depth: false,
    powerPreference: qualityTier === "high" ? "high-performance" : "low-power",
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
    stencil: false,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2.2, 2.2, 2.9, -1.7, 0.1, 10);
  camera.position.z = 5;

  const ribbonSettings = [
    { opacity: 0.42, phase: 0.4, sway: 1, width: 0.32 },
    { opacity: 0.24, phase: 2.5, sway: 0.82, width: 0.46 },
    { opacity: 0.17, phase: 4.1, sway: 1.16, width: 0.56 },
  ];
  const ribbons = ribbonSettings
    .slice(0, settings.ribbons)
    .map((options) => createSmokeRibbon({ ...options, segments: settings.segments }));
  const ember = createEmber();
  const stick = createStick();

  scene.add(stick.mesh);
  for (const ribbon of ribbons) {
    scene.add(ribbon.mesh);
  }
  scene.add(ember.mesh);

  let active = false;
  let disposed = false;
  let lastFrameAt = Number.NEGATIVE_INFINITY;
  const frameInterval = 1000 / settings.fps;

  const render = (time) => {
    if (disposed || !active) {
      return;
    }

    if (time - lastFrameAt < frameInterval) {
      return;
    }
    lastFrameAt = time;
    const seconds = time * 0.001;

    for (const ribbon of ribbons) {
      ribbon.material.uniforms.uTime.value = seconds;
    }
    ember.material.uniforms.uTime.value = seconds;
    renderer.render(scene, camera);
  };

  const resize = () => {
    if (disposed) {
      return;
    }

    const bounds = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(bounds.width));
    const height = Math.max(1, Math.round(bounds.height));
    const aspect = width / height;
    const verticalExtent = 2.3;
    camera.left = -verticalExtent * aspect;
    camera.right = verticalExtent * aspect;
    camera.top = 2.9;
    camera.bottom = -1.7;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, settings.dpr));
    renderer.setSize(width, height, false);
    renderer.render(scene, camera);
  };

  const resizeObserver =
    "ResizeObserver" in window ? new ResizeObserver(resize) : undefined;
  resizeObserver?.observe(canvas);
  if (!resizeObserver) {
    window.addEventListener("resize", resize, { passive: true });
  }
  resize();

  return {
    dispose(loseContext = true) {
      if (disposed) {
        return;
      }
      disposed = true;
      active = false;
      renderer.setAnimationLoop(null);
      resizeObserver?.disconnect();
      if (!resizeObserver) {
        window.removeEventListener("resize", resize);
      }

      for (const ribbon of ribbons) {
        scene.remove(ribbon.mesh);
        ribbon.geometry.dispose();
        ribbon.material.dispose();
      }
      scene.remove(ember.mesh, stick.mesh);
      ember.geometry.dispose();
      ember.material.dispose();
      stick.geometry.dispose();
      stick.material.dispose();
      renderer.renderLists.dispose();
      renderer.dispose();
      if (loseContext) {
        renderer.forceContextLoss();
      }
    },
    setActive(nextActive) {
      if (disposed || active === nextActive) {
        return;
      }
      active = nextActive;
      lastFrameAt = Number.NEGATIVE_INFINITY;
      renderer.setAnimationLoop(active ? render : null);
      if (active) {
        renderer.render(scene, camera);
      }
    },
  };
}
