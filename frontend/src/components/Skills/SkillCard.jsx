import React, { useEffect, useRef, useState } from 'react';
import { scaleIn } from '../../animations/gsapAnimations';

const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const progressRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      scaleIn(cardRef.current, { delay: index * 0.1 });
    }

    // Intersection Observer for progress animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index, isVisible]);

  useEffect(() => {
    if (isVisible && progressRef.current) {
      // Animate progress bar
      setTimeout(() => {
        progressRef.current.style.width = `${skill.level}%`;
      }, 100);
    }
  }, [isVisible, skill.level]);

  return (
    <div
      ref={cardRef}
      className="glass p-6 rounded-xl hover:card-glow transition-all duration-300 interactive group"
    >
      {/* Skill Icon/Name */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
          {skill.name}
        </h3>
        <span className="text-2xl font-bold text-primary-400">
          {skill.level}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full bg-dark-light rounded-full h-3 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark-light to-dark-lighter" />
        
        {/* Progress */}
        <div
          ref={progressRef}
          className="relative h-full bg-gradient-to-r from-primary-400 via-primary-500 to-secondary-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: '0%' }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-gradient" />
        </div>
      </div>

      {/* Level indicator */}
      <div className="flex justify-between text-xs text-white/40 mt-2">
        <span>Beginner</span>
        <span>Expert</span>
      </div>

      {/* Hover shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </div>
  );
};

// Icon variant with larger visual
export const SkillCardWithIcon = ({ skill, icon: Icon, index }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      scaleIn(cardRef.current, { delay: index * 0.1 });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="glass p-6 rounded-xl hover:card-glow transition-all duration-300 interactive group text-center"
    >
      {/* Icon */}
      <div className="w-20 h-20 mx-auto mb-4 bg-primary-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {Icon ? (
          <Icon size={40} className="text-primary-400" />
        ) : (
          <span className="text-3xl">{skill.name.charAt(0)}</span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
        {skill.name}
      </h3>

      {/* Level indicator */}
      <div className="flex justify-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < Math.ceil(skill.level / 20)
                ? 'bg-primary-400'
                : 'bg-white/20'
            }`}
            style={{
              transitionDelay: isVisible ? `${i * 100}ms` : '0ms'
            }}
          />
        ))}
      </div>

      {/* Percentage */}
      <p className="text-primary-400 text-sm font-medium">
        {skill.level}% Proficiency
      </p>
    </div>
  );
};

// Compact variant for lists
export const SkillCardCompact = ({ skill, index }) => {
  const cardRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      scaleIn(cardRef.current, { delay: index * 0.05 });
    }

    setTimeout(() => {
      setProgress(skill.level);
    }, index * 100);
  }, [index, skill.level]);

  return (
    <div
      ref={cardRef}
      className="flex items-center gap-4 p-4 glass rounded-lg hover:card-glow transition-all duration-300 interactive"
    >
      {/* Name */}
      <span className="text-white font-medium flex-shrink-0 w-32">
        {skill.name}
      </span>

      {/* Progress bar */}
      <div className="flex-1 relative h-2 bg-dark-light rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-400 to-secondary-500 rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <span className="text-primary-400 font-semibold flex-shrink-0 w-12 text-right">
        {skill.level}%
      </span>
    </div>
  );
};

// Category header component
export const SkillCategoryHeader = ({ category, icon: Icon }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      {Icon && (
        <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
          <Icon size={24} className="text-primary-400" />
        </div>
      )}
      <h3 className="text-2xl font-bold text-white">
        {category}
      </h3>
      <div className="flex-1 h-px bg-gradient-to-r from-primary-500/50 to-transparent" />
    </div>
  );
};

export default SkillCard;