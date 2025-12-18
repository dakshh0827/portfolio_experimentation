import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Ring, Text3D } from '@react-three/drei';
import * as THREE from 'three';

// Main avatar sphere with distortion
export const AvatarSphere = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.cos(time * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Main distorted sphere */}
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#38bdf8"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0}
            metalness={0.8}
          />
        </Sphere>
      </group>
    </Float>
  );
};

// Orbiting particles
export const OrbitingParticles = () => {
  const groupRef = useRef();
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 2 + Math.random() * 0.5;
    
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    const color = new THREE.Color();
    color.setHSL(0.55 + Math.random() * 0.1, 0.8, 0.6);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <points ref={groupRef}>
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
        opacity={0.8}
      />
    </points>
  );
};

// Small orbiting spheres
export const OrbitingSphere = ({ radius, speed, color, size = 0.3 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(time * speed) * radius;
      meshRef.current.position.z = Math.sin(time * speed) * radius;
      meshRef.current.position.y = Math.sin(time * speed * 2) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

// Floating ring
export const FloatingRing = ({ radius, color, position = [0, 0, 0] }) => {
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.5;
      ringRef.current.rotation.y = time * 0.3;
      ringRef.current.position.y = position[1] + Math.sin(time) * 0.2;
    }
  });

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[radius, 0.05, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Glowing dots
export const GlowingDot = ({ position, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.2);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Wireframe sphere
export const WireframeSphere = ({ radius }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial
        color="#38bdf8"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
};

// Energy field effect
export const EnergyField = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = time * 0.5;
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[2, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

// Complete About3D Scene
const About3D = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#38bdf8" intensity={2} />
      <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={1.5} />

      {/* Main avatar */}
      <AvatarSphere />

      {/* Orbiting elements */}
      <OrbitingSphere radius={2.5} speed={0.5} color="#0ea5e9" size={0.3} />
      <OrbitingSphere radius={3} speed={-0.3} color="#38bdf8" size={0.25} />
      <OrbitingSphere radius={2.8} speed={0.4} color="#06b6d4" size={0.2} />

      {/* Floating rings */}
      <FloatingRing radius={2.5} color="#0ea5e9" position={[0, 0.5, 0]} />
      <FloatingRing radius={3} color="#06b6d4" position={[0, -0.5, 0]} />

      {/* Particles */}
      <OrbitingParticles />

      {/* Glowing dots */}
      <GlowingDot position={[2, 0, 0]} color="#38bdf8" />
      <GlowingDot position={[-2, 0, 0]} color="#0ea5e9" />
      <GlowingDot position={[0, 2, 0]} color="#06b6d4" />
      <GlowingDot position={[0, -2, 0]} color="#38bdf8" />

      {/* Wireframe sphere */}
      <WireframeSphere radius={3.5} />

      {/* Energy fields */}
      <EnergyField />

      {/* Fog */}
      <fog attach="fog" args={['#1a1a1a', 5, 15]} />
    </>
  );
};

export default About3D;