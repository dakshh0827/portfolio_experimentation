import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Individual skill orb
export const SkillOrb = ({ skill, position, index }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const getColor = (category) => {
    switch(category) {
      case 'frontend': return '#38bdf8';
      case 'backend': return '#10b981';
      case 'tools': return '#f59e0b';
      default: return '#38bdf8';
    }
  };

  const color = getColor(skill.category);
  const size = 0.2 + (skill.level / 100) * 0.2; // Size based on skill level

  return (
    <Float speed={2} rotationIntensity={0.5}>
      <group ref={meshRef} position={position}>
        {/* Outer glow sphere */}
        <Sphere args={[size + 0.05, 32, 32]}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
          />
        </Sphere>

        {/* Main sphere */}
        <Sphere args={[size, 32, 32]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>

        {/* Skill name text */}
        <Text
          position={[0, -size - 0.3, 0]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>

        {/* Skill level text */}
        <Text
          position={[0, -size - 0.45, 0]}
          fontSize={0.08}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {skill.level}%
        </Text>
      </group>
    </Float>
  );
};

// Orbiting skill visualization
export const OrbitingSkills = ({ skills }) => {
  const groupRef = useRef();
  
  const radius = 3;
  const positions = useMemo(() => {
    return skills.map((_, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.5,
        Math.sin(angle) * radius
      ];
    });
  }, [skills.length]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <SkillOrb
          key={skill.name}
          skill={skill}
          position={positions[index]}
          index={index}
        />
      ))}
    </group>
  );
};

// Central core sphere
export const CoreSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#38bdf8"
        emissive="#38bdf8"
        emissiveIntensity={0.5}
        metalness={0.9}
        roughness={0.1}
        wireframe
      />
    </mesh>
  );
};

// Connecting lines between skills
export const SkillConnections = ({ skills, radius = 3 }) => {
  const linesRef = useRef();

  const points = useMemo(() => {
    const positions = skills.map((_, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.5,
        Math.sin(angle) * radius
      );
    });

    const lines = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (Math.random() > 0.7) { // Only connect some skills
          lines.push(positions[i], positions[j]);
        }
      }
    }
    return lines;
  }, [skills.length, radius]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.2}
      />
    </lineSegments>
  );
};

// Particle field around skills
export const SkillParticles = () => {
  const pointsRef = useRef();
  const particleCount = 300;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color();
      color.setHSL(0.55 + Math.random() * 0.1, 0.7, 0.6);
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
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
      />
    </points>
  );
};

// Rotating rings around the sphere
export const SkillRings = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) ring1Ref.current.rotation.x = time * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.y = time * 0.4;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.2;
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </>
  );
};

// Complete SkillSphere scene
const SkillSphere = ({ skills }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 0]} color="#38bdf8" intensity={2} />
      <pointLight position={[-10, -10, -5]} color="#06b6d4" intensity={1} />

      {/* Core sphere */}
      <CoreSphere />

      {/* Orbiting skills */}
      <OrbitingSkills skills={skills} />

      {/* Connecting lines */}
      <SkillConnections skills={skills} />

      {/* Particle field */}
      <SkillParticles />

      {/* Rotating rings */}
      <SkillRings />

      {/* Fog for depth */}
      <fog attach="fog" args={['#1a1a1a', 8, 15]} />
    </>
  );
};

export default SkillSphere;