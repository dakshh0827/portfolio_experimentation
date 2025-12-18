import React, { useEffect, useRef } from 'react';
import { revealTextBottom, waveText, typewriterEffect } from '../../animations/textAnimations';

const AnimatedText = ({ 
  children, 
  animation = 'reveal', 
  className = '',
  delay = 0 
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const animationMap = {
      reveal: () => revealTextBottom(element),
      wave: () => waveText(element),
      typewriter: () => typewriterEffect(element)
    };

    const timeline = animationMap[animation]?.();
    
    if (timeline && delay > 0) {
      timeline.delay(delay);
    }
  }, [animation, delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedText;