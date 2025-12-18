import gsap from 'gsap';

/**
 * Split text into characters for animation
 */
export const splitText = (element) => {
  const text = element.textContent;
  element.innerHTML = '';
  
  const chars = text.split('').map((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.classList.add('char');
    return span;
  });

  chars.forEach(char => element.appendChild(char));
  return chars;
};

/**
 * Split text into words for animation
 */
export const splitWords = (element) => {
  const text = element.textContent;
  element.innerHTML = '';
  
  const words = text.split(' ').map((word, index) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    span.style.marginRight = '0.25em';
    span.classList.add('word');
    return span;
  });

  words.forEach(word => element.appendChild(word));
  return words;
};

/**
 * Split text into lines for animation
 */
export const splitLines = (element) => {
  const text = element.innerHTML;
  const lines = text.split('<br>');
  
  element.innerHTML = '';
  
  const lineElements = lines.map((line, index) => {
    const div = document.createElement('div');
    div.innerHTML = line;
    div.classList.add('line');
    div.style.overflow = 'hidden';
    return div;
  });

  lineElements.forEach(line => element.appendChild(line));
  return lineElements;
};

/**
 * Typewriter effect
 */
export const typewriterEffect = (element, speed = 0.05) => {
  const chars = splitText(element);
  
  gsap.set(chars, { opacity: 0 });
  
  return gsap.to(chars, {
    opacity: 1,
    duration: speed,
    stagger: speed,
    ease: 'none'
  });
};

/**
 * Reveal text from bottom
 */
export const revealTextBottom = (element, stagger = 0.02) => {
  const chars = splitText(element);
  
  gsap.set(chars, {
    yPercent: 100,
    opacity: 0
  });

  return gsap.to(chars, {
    yPercent: 0,
    opacity: 1,
    duration: 0.6,
    stagger,
    ease: 'power3.out'
  });
};

/**
 * Scramble text effect
 */
export const scrambleText = (element, duration = 1) => {
  const originalText = element.textContent;
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  let iteration = 0;

  const interval = setInterval(() => {
    element.textContent = originalText
      .split('')
      .map((char, index) => {
        if (index < iteration) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    iteration += 1 / 3;

    if (iteration >= originalText.length) {
      clearInterval(interval);
      element.textContent = originalText;
    }
  }, 30);
};

/**
 * Wave text animation
 */
export const waveText = (element) => {
  const chars = splitText(element);
  
  return gsap.from(chars, {
    y: -20,
    opacity: 0,
    duration: 0.6,
    stagger: {
      each: 0.05,
      from: 'start',
      ease: 'power2.inOut'
    },
    ease: 'back.out(1.7)'
  });
};

/**
 * Rotate in text
 */
export const rotateInText = (element) => {
  const words = splitWords(element);
  
  gsap.set(words, {
    rotationX: -90,
    opacity: 0,
    transformOrigin: '50% 100%'
  });

  return gsap.to(words, {
    rotationX: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  });
};

/**
 * Slide in text with mask
 */
export const slideInTextMask = (element) => {
  const lines = splitLines(element);
  
  lines.forEach(line => {
    const inner = document.createElement('div');
    inner.innerHTML = line.innerHTML;
    line.innerHTML = '';
    line.appendChild(inner);
    
    gsap.set(inner, { yPercent: 100 });
  });

  const inners = lines.map(line => line.querySelector('div'));

  return gsap.to(inners, {
    yPercent: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out'
  });
};

/**
 * Glitch text effect
 */
export const glitchText = (element) => {
  const tl = gsap.timeline({ repeat: 2, repeatDelay: 0.1 });
  
  tl.to(element, {
    skewX: 10,
    duration: 0.1,
    ease: 'power1.inOut'
  })
  .to(element, {
    skewX: -10,
    x: -5,
    duration: 0.1,
    ease: 'power1.inOut'
  })
  .to(element, {
    skewX: 0,
    x: 0,
    duration: 0.1,
    ease: 'power1.inOut'
  });

  return tl;
};

/**
 * Text gradient animation
 */
export const animateTextGradient = (element) => {
  return gsap.to(element, {
    backgroundPosition: '200% center',
    duration: 3,
    ease: 'none',
    repeat: -1
  });
};

/**
 * Blur in text
 */
export const blurInText = (element) => {
  const chars = splitText(element);
  
  gsap.set(chars, {
    filter: 'blur(10px)',
    opacity: 0
  });

  return gsap.to(chars, {
    filter: 'blur(0px)',
    opacity: 1,
    duration: 0.8,
    stagger: 0.03,
    ease: 'power2.out'
  });
};

/**
 * Random reveal text
 */
export const randomRevealText = (element) => {
  const chars = splitText(element);
  
  gsap.set(chars, {
    opacity: 0,
    scale: 0
  });

  return gsap.to(chars, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    stagger: {
      amount: 1,
      from: 'random'
    },
    ease: 'back.out(1.7)'
  });
};