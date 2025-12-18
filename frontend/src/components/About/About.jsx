import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { fadeInUp, slideInLeft, slideInRight } from '../../animations/gsapAnimations';
import { portfolioData } from '../../data/portfolio';
import { Download, Mail } from 'lucide-react';

// 3D Abstract Avatar
const Avatar3D = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.3;
    meshRef.current.rotation.x = Math.cos(time * 0.3) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Main sphere */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5, 1]} />
          <MeshDistortMaterial
            color="#38bdf8"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0}
            metalness={0.8}
          />
        </mesh>
        
        {/* Orbiting elements */}
        <mesh position={[2, 0, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
        </mesh>
        
        <mesh position={[-2, 0, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const { personal } = portfolioData;

  useEffect(() => {
    if (leftRef.current) {
      slideInLeft(leftRef.current);
    }
    if (rightRef.current) {
      slideInRight(rightRef.current);
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 bg-dark-lighter overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            About Me
          </h2>
          <p className="text-white/60 text-lg">
            Get to know me better
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Visual */}
          <div ref={leftRef} className="h-[500px] relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} color="#38bdf8" />
              <Avatar3D />
            </Canvas>
          </div>

          {/* Content */}
          <div ref={rightRef} className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Hi, I'm <span className="text-gradient">{personal.name}</span>
            </h3>
            
            <p className="text-white/70 text-lg leading-relaxed">
              {personal.bio}
            </p>

            <div className="grid grid-cols-2 gap-4 py-6">
              <div className="glass p-4 rounded-lg">
                <h4 className="text-3xl font-bold text-primary-400 mb-2">50+</h4>
                <p className="text-white/60">Projects Completed</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h4 className="text-3xl font-bold text-primary-400 mb-2">3+</h4>
                <p className="text-white/60">Years Experience</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h4 className="text-3xl font-bold text-primary-400 mb-2">100+</h4>
                <p className="text-white/60">GitHub Repos</p>
              </div>
              <div className="glass p-4 rounded-lg">
                <h4 className="text-3xl font-bold text-primary-400 mb-2">10K+</h4>
                <p className="text-white/60">Lines of Code</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-full text-white font-medium transition-all duration-300 interactive flex items-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="px-6 py-3 bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white rounded-full font-medium transition-all duration-300 interactive flex items-center gap-2"
              >
                <Mail size={20} />
                Email Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;