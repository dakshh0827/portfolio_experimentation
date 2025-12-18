import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fade in animation with scroll trigger
 */
export const fadeIn = (element, options = {}) => {
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  };

  return gsap.from(element, { ...defaults, ...options });
};

/**
 * Fade in up animation
 */
export const fadeInUp = (element, delay = 0) => {
  return gsap.from(element, {
    y: 100,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
};

/**
 * Stagger animation for multiple elements
 */
export const staggerFadeIn = (elements, options = {}) => {
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  };

  return gsap.from(elements, { ...defaults, ...options });
};

/**
 * Scale in animation
 */
export const scaleIn = (element, options = {}) => {
  const defaults = {
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  };

  return gsap.from(element, { ...defaults, ...options });
};

/**
 * Slide in from left
 */
export const slideInLeft = (element, options = {}) => {
  const defaults = {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  };

  return gsap.from(element, { ...defaults, ...options });
};

/**
 * Slide in from right
 */
export const slideInRight = (element, options = {}) => {
  const defaults = {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  };

  return gsap.from(element, { ...defaults, ...options });
};

/**
 * Parallax scroll effect
 */
export const parallaxScroll = (element, speed = 0.5) => {
  return gsap.to(element, {
    y: () => -ScrollTrigger.maxScroll(window) * speed,
    ease: 'none',
    scrollTrigger: {
      start: 0,
      end: 'max',
      invalidateOnRefresh: true,
      scrub: 0
    }
  });
};

/**
 * Pin element during scroll
 */
export const pinElement = (element, options = {}) => {
  return ScrollTrigger.create({
    trigger: element,
    pin: true,
    start: 'top top',
    end: '+=100%',
    ...options
  });
};

/**
 * Counter animation
 */
export const animateCounter = (element, target, duration = 2) => {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: target,
    duration,
    ease: 'power1.inOut',
    onUpdate: () => {
      element.textContent = Math.round(obj.value);
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
};

/**
 * Rotate continuously
 */
export const rotateInfinite = (element, duration = 10) => {
  return gsap.to(element, {
    rotation: 360,
    duration,
    ease: 'none',
    repeat: -1
  });
};

/**
 * Hover scale effect
 */
export const hoverScale = (element) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, { scale: 1, duration: 0.3, ease: 'power2.out' });
  });
};

/**
 * Reveal animation with clip-path
 */
export const revealClip = (element, direction = 'left') => {
  const clipPaths = {
    left: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    right: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
    top: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
  };

  gsap.set(element, { clipPath: clipPaths[direction] });

  return gsap.to(element, {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    duration: 1.5,
    ease: 'power4.inOut',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
};

/**
 * Magnetic button effect
 */
export const magneticButton = (button) => {
  const strength = 50;

  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x / strength,
      y: y / strength,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  });
};

/**
 * Batch animation helper
 */
export const batchAnimation = (selector, animation, stagger = 0.1) => {
  ScrollTrigger.batch(selector, {
    onEnter: (elements) => {
      gsap.from(elements, {
        ...animation,
        stagger
      });
    },
    once: true
  });
};