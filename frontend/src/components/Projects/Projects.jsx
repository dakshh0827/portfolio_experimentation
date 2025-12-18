import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { staggerFadeIn } from '../../animations/gsapAnimations';
import { portfolioData } from '../../data/portfolio';
import { Github, ExternalLink, Code, Star } from 'lucide-react';

// 3D Project Card
const ProjectCard3D = ({ index }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(time + index) * 0.2;
      meshRef.current.rotation.y = Math.sin(time * 0.5 + index) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <RoundedBox ref={meshRef} args={[1.5, 2, 0.2]} radius={0.1} position={[index * 2 - 2, 0, 0]}>
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>
    </Float>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      staggerFadeIn([cardRef.current], {
        delay: index * 0.1,
        y: 100
      });
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="glass rounded-xl overflow-hidden hover:card-glow transition-all duration-500 interactive group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image Placeholder */}
      <div className="relative h-64 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Code size={80} className="text-primary-400/30" />
        </div>
        <div
          className={`absolute inset-0 bg-dark/80 flex items-center justify-center gap-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={20} />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={20} />
          </a>
        </div>
        
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-primary-500 rounded-full text-sm font-medium flex items-center gap-1">
            <Star size={14} fill="currentColor" />
            Featured
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-white/70 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-500/10 text-primary-400 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('all');
  
  const { projects } = portfolioData;
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.featured);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 bg-dark-lighter overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          {[0, 1, 2].map((i) => (
            <ProjectCard3D key={i} index={i} />
          ))}
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            Featured Projects
          </h2>
          <p className="text-white/60 text-lg mb-8">
            A showcase of my recent work
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === 'featured'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Featured Only
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white rounded-full font-medium transition-all duration-300 interactive"
          >
            <Github size={20} />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;