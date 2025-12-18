import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    // Only show custom cursor on desktop
    if (window.innerWidth < 768) {
      return;
    }

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out'
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out'
      });
    };

    // Add hover effect for interactive elements
    const handleMouseEnter = () => {
      setIsHovering(true);
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-primary-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {isHovering && (
          <div className="absolute inset-0 bg-primary-400/20 rounded-full animate-ping" />
        )}
      </div>
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-primary-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default Cursor;