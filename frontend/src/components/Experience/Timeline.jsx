import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { fadeInUp, staggerFadeIn } from '../../animations/gsapAnimations';

const TimelineItem = ({ experience, index, isLast }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current) {
      fadeInUp(itemRef.current, index * 0.2);
    }
  }, [index]);

  return (
    <div ref={itemRef} className="relative flex gap-8 pb-16 last:pb-0">
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div className="relative z-10">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center animate-pulse-slow">
            <Briefcase className="text-white" size={24} />
          </div>
          {/* Pulse effect */}
          <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-20" />
        </div>

        {/* Vertical line */}
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-primary-500 to-primary-500/20 mt-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="glass p-6 rounded-xl hover:card-glow transition-all duration-300 interactive">
          {/* Period */}
          <div className="flex items-center gap-2 text-primary-400 text-sm mb-2">
            <Calendar size={16} />
            <span className="font-medium">{experience.period}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2">
            {experience.title}
          </h3>

          {/* Company and Location */}
          <div className="flex flex-wrap items-center gap-3 text-white/60 mb-4">
            <span className="font-semibold text-white/80">{experience.company}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span className="text-sm">{experience.location}</span>
            </div>
          </div>

          {/* Description */}
          <ul className="space-y-2 mb-4">
            {experience.description.map((item, i) => (
              <li key={i} className="text-white/70 flex items-start gap-2">
                <span className="text-primary-400 mt-1 flex-shrink-0">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary-500/10 text-primary-400 text-sm rounded-full border border-primary-500/20 hover:bg-primary-500/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = ({ experiences }) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      staggerFadeIn(items, { stagger: 0.2 });
    }
  }, []);

  return (
    <div ref={timelineRef} className="relative">
      {/* Desktop Timeline */}
      <div className="hidden lg:block">
        {experiences.map((experience, index) => (
          <div key={experience.id} className="timeline-item">
            <TimelineItem
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          </div>
        ))}
      </div>

      {/* Mobile Timeline */}
      <div className="lg:hidden space-y-8">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className="glass p-6 rounded-xl hover:card-glow transition-all duration-300"
          >
            {/* Period badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm mb-4">
              <Calendar size={16} />
              <span className="font-medium">{experience.period}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2">
              {experience.title}
            </h3>

            {/* Company and Location */}
            <div className="flex flex-wrap items-center gap-2 text-white/60 mb-4">
              <span className="font-semibold text-white/80">{experience.company}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span className="text-sm">{experience.location}</span>
              </div>
            </div>

            {/* Description */}
            <ul className="space-y-2 mb-4">
              {experience.description.map((item, i) => (
                <li key={i} className="text-white/70 flex items-start gap-2 text-sm">
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
                  className="px-3 py-1 bg-primary-500/10 text-primary-400 text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;