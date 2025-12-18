import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PageTransition = ({ isLoading, onComplete }) => {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      // Animate entrance
      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 0.6, ease: 'power3.inOut' }
      )
      .fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.3'
      )
      .fromTo(
        progressRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }
      );

      // Simulate loading progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.random() * 30;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          
          // Trigger exit animation after a brief delay
          setTimeout(() => {
            handleExit();
          }, 500);
        }
        setProgress(Math.min(currentProgress, 100));
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleExit = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.to(logoRef.current, {
      scale: 0,
      rotation: 180,
      duration: 0.5,
      ease: 'back.in(1.7)'
    })
    .to(
      overlayRef.current,
      {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.6,
        ease: 'power3.inOut'
      },
      '-=0.2'
    );
  };

  if (!isLoading) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-dark flex flex-col items-center justify-center"
      style={{ transformOrigin: 'top' }}
    >
      {/* Logo/Icon */}
      <div
        ref={logoRef}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-dark flex items-center justify-center">
            <span className="text-4xl font-bold text-gradient">DT</span>
          </div>
        </div>
        {/* Rotating ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-primary-400 rounded-full animate-spin" />
      </div>

      {/* Loading text */}
      <h2 className="text-2xl font-bold text-white mb-8">
        Loading Experience
      </h2>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-primary-400 to-secondary-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress percentage */}
      <p className="text-primary-400 mt-4 text-sm font-medium">
        {Math.round(progress)}%
      </p>

      {/* Animated dots */}
      <div className="flex gap-2 mt-8">
        <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
    </div>
  );
};

// Alternative: Slide transition
export const SlideTransition = ({ isActive, direction = 'left' }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (isActive && panelRef.current) {
      const xStart = direction === 'left' ? '-100%' : '100%';
      const xEnd = direction === 'left' ? '100%' : '-100%';

      const tl = gsap.timeline();

      tl.fromTo(
        panelRef.current,
        { x: xStart },
        { x: '0%', duration: 0.5, ease: 'power3.inOut' }
      )
      .to(
        panelRef.current,
        { x: xEnd, duration: 0.5, ease: 'power3.inOut', delay: 0.3 }
      );
    }
  }, [isActive, direction]);

  if (!isActive) return null;

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-50 bg-primary-500"
    />
  );
};

// Alternative: Reveal transition
export const RevealTransition = ({ isActive, children }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isActive && overlayRef.current && contentRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        overlayRef.current,
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.8,
          ease: 'power4.inOut'
        }
      )
      .fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-dark flex items-center justify-center"
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

// Alternative: Curtain transition
export const CurtainTransition = ({ isActive }) => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (isActive && leftRef.current && rightRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        [leftRef.current, rightRef.current],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'power3.inOut',
          stagger: 0.1
        }
      )
      .to(
        [leftRef.current, rightRef.current],
        {
          scaleX: 0,
          duration: 0.6,
          ease: 'power3.inOut',
          stagger: 0.1,
          delay: 0.3
        }
      );
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        ref={leftRef}
        className="w-1/2 h-full bg-primary-500"
        style={{ transformOrigin: 'left' }}
      />
      <div
        ref={rightRef}
        className="w-1/2 h-full bg-secondary-500"
        style={{ transformOrigin: 'right' }}
      />
    </div>
  );
};

export default PageTransition;