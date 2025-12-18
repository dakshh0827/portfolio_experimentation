import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

// Floating project card representation
export const FloatingCard = ({ position, index, color = '#38bdf8' }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.3;
      meshRef.current.rotation.y = Math.sin(time * 0.5 + index) * 0.2;
      meshRef.current.rotation.x = Math.cos(time * 0.3 + index) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <RoundedBox
        ref={meshRef}
        args={[1.8, 2.4, 0.2]}
        radius={0.1}
        position={position}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>
    </Float>
  );
};

// Orbiting code symbols
export const CodeSymbols = () => {
  const groupRef = useRef();
  const symbols = ['<>', '{}', '[]', '//'];
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {symbols.map((symbol, i) => {
        const angle = (i / symbols.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <Text
            key={i}
            position={[x, 0, z]}
            fontSize={0.5}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            {symbol}
          </Text>
        );
      })}
    </group>
  );
};

// Particle system for background
export const ProjectParticles = () => {
  const pointsRef = useRef();
  const particleCount = 500;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    const color = new THREE.Color();
    color.setHSL(0.55 + Math.random() * 0.1, 0.7, 0.6);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = time * 0.03;
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
      />
    </points>
  );
};

// Wireframe cube
export const WireframeCube = ({ position = [0, 0, 0], size = 2 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial
        color="#38bdf8"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
};

// Glowing sphere
export const GlowingSphere = ({ position, color = '#0ea5e9', size = 0.3 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.2);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
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

// Rotating ring
export const RotatingRing = ({ radius = 3, color = '#06b6d4' }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, 0.05, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

// Grid floor
export const GridFloor = () => {
  return (
    <gridHelper
      args={[20, 20, '#38bdf8', '#1a1a1a']}
      position={[0, -5, 0]}
    />
  );
};

// Main Projects3D Scene
const Projects3D = ({ projectCount = 6 }) => {
  const colors = ['#38bdf8', '#0ea5e9', '#06b6d4'];
  
  // Generate positions for project cards
  const cardPositions = [];
  const cols = 3;
  const spacing = 2.5;
  
  for (let i = 0; i < Math.min(projectCount, 6); i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = (col - 1) * spacing;
    const y = 0;
    const z = row * spacing - 2;
    cardPositions.push([x, y, z]);
  }

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} color="#38bdf8" intensity={1} />
      <pointLight position={[5, -5, -5]} color="#06b6d4" intensity={1} />

      {/* Floating project cards */}
      {cardPositions.map((position, index) => (
        <FloatingCard
          key={index}
          position={position}
          index={index}
          color={colors[index % colors.length]}
        />
      ))}

      {/* Background elements */}
      <ProjectParticles />
      <CodeSymbols />
      
      {/* Decorative elements */}
      <WireframeCube position={[-4, 2, -3]} size={1.5} />
      <WireframeCube position={[4, -2, -3]} size={1.8} />
      
      <GlowingSphere position={[3, 3, 2]} color="#38bdf8" size={0.3} />
      <GlowingSphere position={[-3, -3, 2]} color="#0ea5e9" size={0.25} />
      <GlowingSphere position={[0, 4, -2]} color="#06b6d4" size={0.2} />
      
      <RotatingRing radius={3.5} color="#38bdf8" />
      <RotatingRing radius={4.5} color="#06b6d4" />

      {/* Grid floor */}
      <GridFloor />

      {/* Fog */}
      <fog attach="fog" args={['#1a1a1a', 8, 20]} />
    </>
  );
};

export default Projects3D;