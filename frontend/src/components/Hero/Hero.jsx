import React from 'react';
import Hero3D from './Hero3D';
import HeroText from './HeroText';

const Hero = () => {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-dark to-dark-lighter">
      {/* 3D Background */}
      <Hero3D />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark z-[1]" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <HeroText />
      </div>
    </section>
  );
};

export default Hero;