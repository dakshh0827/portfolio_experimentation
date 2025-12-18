// Animation constants
export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1,
  verySlow: 1.5
};

export const EASING = {
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: [0.68, -0.55, 0.265, 1.55]
};

// Theme colors
export const COLORS = {
  primary: '#38bdf8',
  secondary: '#0ea5e9',
  accent: '#06b6d4',
  dark: '#0a0a0a',
  darkLighter: '#1a1a1a',
  darkLight: '#2a2a2a'
};

// 3D Scene settings
export const SCENE_CONFIG = {
  cameraPosition: [0, 0, 5],
  ambientLightIntensity: 0.5,
  directionalLightIntensity: 1,
  fogDensity: 0.05
};

// Breakpoints
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280
};

// Performance settings
export const PERFORMANCE = {
  pixelRatio: Math.min(window.devicePixelRatio, 2),
  antialias: true,
  shadowMapEnabled: true
};