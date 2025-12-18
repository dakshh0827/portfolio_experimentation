import React, { Suspense } from 'react';
import Hero3D from './Hero3D';
import HeroText from './HeroText';

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #0a0a0a 0%, #1a1a1a 100%)',
        isolation: 'isolate'
      }}
    >
      {/* 3D Background - Lower z-index */}
      <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <Hero3D />
        </Suspense>
      </div>
      
      {/* Gradient Overlay - Middle layer */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ 
          background: 'linear-gradient(to bottom, transparent 0%, rgba(10, 10, 10, 0.3) 50%, rgba(10, 10, 10, 0.8) 100%)',
          pointerEvents: 'none'
        }} 
      />
      
      {/* Content - Highest z-index */}
      <div className="relative z-20 w-full h-full flex items-center justify-center px-4 py-20">
        <HeroText />
      </div>
    </section>
  );
};

export default Hero;