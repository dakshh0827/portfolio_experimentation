import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { staggerFadeIn } from '../../animations/gsapAnimations';
import { portfolioData } from '../../data/portfolio';

// 3D Skill Orb
const SkillOrb = ({ skill, position, index }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.2;
    meshRef.current.rotation.y += 0.01;
  });

  const getColor = (category) => {
    switch(category) {
      case 'frontend': return '#38bdf8';
      case 'backend': return '#10b981';
      case 'tools': return '#f59e0b';
      default: return '#38bdf8';
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5}>
      <group ref={meshRef} position={position}>
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={getColor(skill.category)}
            emissive={getColor(skill.category)}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>
      </group>
    </Float>
  );
};

const Skills3D = ({ skills }) => {
  const radius = 3;
  const positions = skills.map((_, index) => {
    const angle = (index / skills.length) * Math.PI * 2;
    return [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.5,
      Math.sin(angle) * radius
    ];
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 0]} color="#38bdf8" intensity={1} />
      
      {skills.map((skill, index) => (
        <SkillOrb
          key={skill.name}
          skill={skill}
          position={positions[index]}
          index={index}
        />
      ))}
    </>
  );
};

const SkillCard = ({ skill }) => {
  return (
    <div className="glass p-6 rounded-xl hover:card-glow transition-all duration-300 interactive">
      <h3 className="text-xl font-semibold text-white mb-3">{skill.name}</h3>
      <div className="w-full bg-dark-light rounded-full h-2 mb-2">
        <div
          className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${skill.level}%` }}
        />
      </div>
      <span className="text-sm text-white/60">{skill.level}%</span>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  
  const { skills } = portfolioData;
  const allSkills = [...skills.frontend, ...skills.backend, ...skills.tools];

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.skill-card');
      staggerFadeIn(cards, { stagger: 0.1 });
    }
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            Skills & Expertise
          </h2>
          <p className="text-white/60 text-lg">
            Technologies I work with
          </p>
        </div>

        {/* 3D Visualization */}
        <div className="h-[400px] mb-20">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <Skills3D skills={allSkills.slice(0, 12)} />
          </Canvas>
        </div>

        {/* Skill Categories */}
        <div className="space-y-12" ref={cardsRef}>
          {/* Frontend Skills */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Frontend Development</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.frontend.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <SkillCard skill={skill} />
                </div>
              ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Backend Development</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.backend.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <SkillCard skill={skill} />
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Tools & Technologies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.tools.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <SkillCard skill={skill} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;