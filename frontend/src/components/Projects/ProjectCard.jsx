import React, { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Code, Star, Eye } from 'lucide-react';
import { fadeInUp } from '../../animations/gsapAnimations';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      fadeInUp(cardRef.current, index * 0.1);
    }
  }, [index]);

  useEffect(() => {
    if (isHovered && imageRef.current) {
      // Scale image on hover
      imageRef.current.style.transform = 'scale(1.1)';
    } else if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1)';
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="glass rounded-xl overflow-hidden hover:card-glow transition-all duration-500 interactive group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-64 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
        >
          <Code size={80} className="text-primary-400/30" />
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Action Buttons */}
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              onClick={(e) => e.stopPropagation()}
              aria-label="View on GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              onClick={(e) => e.stopPropagation()}
              aria-label="View Live Demo"
            >
              <ExternalLink size={20} />
            </a>
          </div>

          {/* Quick View Text */}
          <p className="text-white/80 text-sm flex items-center gap-2">
            <Eye size={16} />
            View Project
          </p>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-primary-500 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
            <Star size={14} fill="currentColor" />
            Featured
          </div>
        )}

        {/* Gradient Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/50 rounded-xl transition-all duration-300" />
      </div>

      {/* Project Info */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-white/70 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary-500/10 text-primary-400 text-sm rounded-full border border-primary-500/20 hover:bg-primary-500/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links (Mobile) */}
        <div className="flex gap-4 md:hidden">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-primary-500/10 text-primary-400 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-500/20 transition-colors"
          >
            <Github size={18} />
            <span className="text-sm">Code</span>
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors"
          >
            <ExternalLink size={18} />
            <span className="text-sm">Demo</span>
          </a>
        </div>
      </div>

      {/* Card Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>
    </div>
  );
};

// Compact variant for smaller displays
export const ProjectCardCompact = ({ project, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      fadeInUp(cardRef.current, index * 0.1);
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="glass p-4 rounded-lg hover:card-glow transition-all duration-300 interactive"
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="w-16 h-16 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Code size={32} className="text-primary-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold text-white mb-1 truncate">
            {project.title}
          </h4>
          <p className="text-white/60 text-sm line-clamp-2 mb-2">
            {project.description}
          </p>
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;