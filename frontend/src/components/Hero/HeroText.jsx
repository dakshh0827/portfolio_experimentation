import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../../data/portfolio';
import { ChevronDown } from 'lucide-react';

const HeroText = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const { personal } = portfolioData;

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate title
    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    }

    // Animate subtitle
    if (subtitleRef.current) {
      tl.from(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        },
        '-=0.5'
      );
    }

    // Animate tagline
    if (taglineRef.current) {
      tl.from(
        taglineRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out'
        },
        '-=0.4'
      );
    }

    // Animate CTA buttons
    if (ctaRef.current) {
      tl.from(
        ctaRef.current.children,
        {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: 'back.out(1.7)'
        },
        '-=0.3'
      );
    }

    // Animate scroll indicator
    if (scrollIndicatorRef.current) {
      tl.from(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.5
        },
        '-=0.2'
      );
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative z-20 max-w-5xl mx-auto text-center px-4 py-8">
      <h1
        ref={titleRef}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-6 text-gradient glow-effect leading-tight"
        style={{ willChange: 'transform, opacity' }}
      >
        {personal.name}
      </h1>
      
      <h2
        ref={subtitleRef}
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 sm:mb-6 text-white leading-tight"
        style={{ willChange: 'transform, opacity' }}
      >
        {personal.title}
      </h2>
      
      <p
        ref={taglineRef}
        className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
        style={{ willChange: 'transform, opacity' }}
      >
        {personal.tagline}
      </p>
      
      <div 
        ref={ctaRef} 
        className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
        style={{ willChange: 'transform, opacity' }}
      >
        <button
          onClick={() => scrollToSection('#projects')}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary-500 hover:bg-primary-600 rounded-full text-white font-medium transition-all duration-300 interactive group relative overflow-hidden shadow-lg hover:shadow-xl hover:scale-105"
        >
          <span className="relative z-10">View My Work</span>
          <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        
        <button
          onClick={() => scrollToSection('#contact')}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white rounded-full font-medium transition-all duration-300 interactive shadow-lg hover:shadow-xl hover:scale-105"
        >
          Get In Touch
        </button>
      </div>

      {/* Scroll indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={() => scrollToSection('#about')}
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center items-start p-2">
          <ChevronDown className="text-primary-400 animate-pulse" size={16} />
        </div>
      </div>
    </div>
  );
};

export default HeroText;