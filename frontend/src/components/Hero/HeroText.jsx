import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { revealTextBottom } from '../../animations/textAnimations';
import { portfolioData } from '../../data/portfolio';

const HeroText = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);

  const { personal } = portfolioData;

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate title
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Animate subtitle
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

    // Animate tagline
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

    // Animate CTA buttons
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
    <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
      <h1
        ref={titleRef}
        className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-gradient glow-effect"
      >
        {personal.name}
      </h1>
      
      <h2
        ref={subtitleRef}
        className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-white"
      >
        {personal.title}
      </h2>
      
      <p
        ref={taglineRef}
        className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto"
      >
        {personal.tagline}
      </p>
      
      <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={() => scrollToSection('#projects')}
          className="px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-full text-white font-medium transition-all duration-300 interactive group relative overflow-hidden"
        >
          <span className="relative z-10">View My Work</span>
          <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        
        <button
          onClick={() => scrollToSection('#contact')}
          className="px-8 py-4 bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white rounded-full font-medium transition-all duration-300 interactive"
        >
          Get In Touch
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default HeroText;