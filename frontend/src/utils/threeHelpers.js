import * as THREE from 'three';

/**
 * Create a custom shader material with glow effect
 */
export const createGlowMaterial = (color = '#38bdf8') => {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(color) },
      time: { value: 0 }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float time;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        vec3 glow = color * intensity;
        gl_FragColor = vec4(glow, 1.0);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending
  });
};

/**
 * Create particles for background effects
 */
export const createParticles = (count = 1000) => {
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

    const color = new THREE.Color();
    color.setHSL(0.6 + Math.random() * 0.1, 0.8, 0.5);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  return particles;
};

/**
 * Animate mesh with floating effect
 */
export const animateFloat = (mesh, time) => {
  if (!mesh) return;
  mesh.position.y = Math.sin(time * 0.5) * 0.2;
  mesh.rotation.x = Math.sin(time * 0.3) * 0.1;
  mesh.rotation.y = Math.cos(time * 0.2) * 0.1;
};

/**
 * Create gradient texture
 */
export const createGradientTexture = (color1 = '#38bdf8', color2 = '#0ea5e9') => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');

  const gradient = context.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

/**
 * Mouse parallax effect
 */
export const applyParallax = (mesh, mouseX, mouseY, intensity = 0.5) => {
  if (!mesh) return;
  mesh.rotation.y = mouseX * intensity;
  mesh.rotation.x = -mouseY * intensity;
};

/**
 * Responsive camera adjustment
 */
export const adjustCameraForScreen = (camera) => {
  const width = window.innerWidth;
  
  if (width < 768) {
    camera.position.z = 7;
  } else if (width < 1024) {
    camera.position.z = 6;
  } else {
    camera.position.z = 5;
  }
};

/**
 * Optimize renderer settings
 */
export const optimizeRenderer = (renderer) => {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor('#0a0a0a');
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
};