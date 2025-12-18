import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Optimized particles with reduced count for performance
const Particles = () => {
  const pointsRef = useRef();
  const particleCount = 1000; // Reduced from 2000

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const color = new THREE.Color();
      color.setHSL(0.55 + Math.random() * 0.1, 0.8, 0.6);
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }

    return [pos, cols];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.03;
      pointsRef.current.rotation.x = time * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// Main sphere with distortion
const MainSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.08;
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[2, 0, 0]}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#38bdf8"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

// Orbiting sphere
const OrbitingSphere = ({ radius, speed, color, size = 0.4 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(time * speed) * radius;
      meshRef.current.position.z = Math.sin(time * speed) * radius;
      meshRef.current.position.y = Math.sin(time * speed * 2) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Torus ring
const TorusRing = ({ radius, speed, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * speed * 0.5;
      meshRef.current.rotation.y = time * speed * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, 0.03, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </mesh>
  );
};

const Hero3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'transparent'
      }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance'
      }}
    >
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[8, 8, 5]} intensity={0.8} />
      <pointLight position={[-8, -8, -5]} color="#38bdf8" intensity={1.5} />
      <pointLight position={[8, 8, 8]} color="#06b6d4" intensity={1} />

      {/* 3D Elements */}
      <Particles />
      <MainSphere />
      <OrbitingSphere radius={2.5} speed={0.4} color="#0ea5e9" size={0.3} />
      <OrbitingSphere radius={3} speed={-0.25} color="#38bdf8" size={0.25} />
      <TorusRing radius={3} speed={0.2} color="#0ea5e9" />
      <TorusRing radius={4} speed={-0.15} color="#06b6d4" />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0a', 8, 20]} />
    </Canvas>
  );
};

export default Hero3D;