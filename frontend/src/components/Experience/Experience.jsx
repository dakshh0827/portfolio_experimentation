import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { fadeInUp } from '../../animations/gsapAnimations';
import { portfolioData } from '../../data/portfolio';
import { Briefcase, Calendar, MapPin, Trophy, Code, Book, Award } from 'lucide-react';

// 3D Timeline Line
const Timeline3D = () => {
  const lineRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    lineRef.current.position.y = Math.sin(time * 0.5) * 0.1;
  });

  const points = [
    [0, 2, 0],
    [0, -2, 0]
  ];

  return (
    <group ref={lineRef}>
      <Line
        points={points}
        color="#38bdf8"
        lineWidth={3}
      />
    </group>
  );
};

const ExperienceCard = ({ experience, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      fadeInUp(cardRef.current, index * 0.2);
    }
  }, [index]);

  return (
    <div ref={cardRef} className={`flex items-center gap-8 mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Timeline Dot */}
      <div className="relative">
        <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center animate-pulse-slow">
          <Briefcase className="text-white" size={24} />
        </div>
        <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-20" />
      </div>

      {/* Content */}
      <div className="flex-1 glass p-6 rounded-xl hover:card-glow transition-all duration-300 interactive">
        <div className="flex items-center gap-2 text-primary-400 text-sm mb-2">
          <Calendar size={16} />
          <span>{experience.period}</span>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">
          {experience.title}
        </h3>
        
        <div className="flex items-center gap-2 text-white/60 mb-4">
          <span className="font-semibold">{experience.company}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span className="text-sm">{experience.location}</span>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {experience.description.map((item, i) => (
            <li key={i} className="text-white/70 flex items-start gap-2">
              <span className="text-primary-400 mt-1">▹</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
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

const AchievementCard = ({ achievement }) => {
  const iconMap = {
    trophy: Trophy,
    code: Code,
    book: Book,
    award: Award
  };
  
  const Icon = iconMap[achievement.icon] || Trophy;

  return (
    <div className="glass p-6 rounded-xl hover:card-glow transition-all duration-300 interactive text-center">
      <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="text-primary-400" size={32} />
      </div>
      <h4 className="text-xl font-bold text-white mb-2">{achievement.title}</h4>
      <p className="text-white/70 mb-2">{achievement.description}</p>
      <span className="text-primary-400 text-sm">{achievement.year}</span>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);
  const { experience, achievements } = portfolioData;

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            Experience & Achievements
          </h2>
          <p className="text-white/60 text-lg">
            My professional journey
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative mb-32">
          {/* 3D Timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden lg:block">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <Timeline3D />
            </Canvas>
          </div>

          {/* Experience Cards */}
          <div className="space-y-0">
            {experience.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Achievements & Recognition</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;