import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered fade in animation
 */
export const scrollFadeIn = (element, options = {}) => {
  const defaults = {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  };

  return gsap.from(element, { ...defaults, ...options });
};

/**
 * Scroll-triggered scale animation
 */
export const scrollScaleIn = (element, options = {}) => {
  const defaults = {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  };

  return gsap.from(element, { ...defaults, ...options });
};

/**
 * Horizontal scroll reveal
 */
export const scrollSlideIn = (element, direction = 'left', options = {}) => {
  const xValue = direction === 'left' ? -100 : 100;
  
  const defaults = {
    x: xValue,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  };

  return gsap.from(element, { ...defaults, ...options });
};

/**
 * Scroll-based rotation animation
 */
export const scrollRotate = (element, options = {}) => {
  const defaults = {
    rotation: 180,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  };

  return gsap.from(element, { ...defaults, ...options });
};

/**
 * Parallax effect on scroll
 */
export const scrollParallax = (element, speed = 0.5, options = {}) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ...options
    }
  });
};

/**
 * Reveal animation with clip-path on scroll
 */
export const scrollRevealClip = (element, direction = 'bottom', options = {}) => {
  const clipPaths = {
    bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    top: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    left: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    right: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
  };

  gsap.set(element, { clipPath: clipPaths[direction] });

  return gsap.to(element, {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    duration: 1.5,
    ease: 'power4.inOut',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options
    }
  });
};

/**
 * Counter animation on scroll
 */
export const scrollCounter = (element, target, duration = 2, options = {}) => {
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
      toggleActions: 'play none none none',
      ...options
    }
  });
};

/**
 * Pin element during scroll
 */
export const scrollPin = (element, options = {}) => {
  return ScrollTrigger.create({
    trigger: element,
    pin: true,
    start: 'top top',
    end: '+=100%',
    pinSpacing: true,
    ...options
  });
};

/**
 * Scroll-triggered stagger animation
 */
export const scrollStagger = (elements, options = {}) => {
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  };

  return gsap.from(elements, { ...defaults, ...options });
};

/**
 * Scroll progress animation
 */
export const scrollProgress = (element, options = {}) => {
  return gsap.to(element, {
    scaleX: 1,
    transformOrigin: 'left',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      ...options
    }
  });
};

/**
 * Image reveal on scroll
 */
export const scrollImageReveal = (imageContainer, options = {}) => {
  const image = imageContainer.querySelector('img');
  
  gsap.set(imageContainer, { overflow: 'hidden' });
  gsap.set(image, { scale: 1.3 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: imageContainer,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options
    }
  });

  tl.from(imageContainer, {
    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
    duration: 1.2,
    ease: 'power4.inOut'
  })
  .to(image, {
    scale: 1,
    duration: 1.2,
    ease: 'power2.out'
  }, '<');

  return tl;
};

/**
 * Text reveal on scroll (line by line)
 */
export const scrollTextReveal = (element, options = {}) => {
  const lines = element.querySelectorAll('.line');
  
  return gsap.from(lines, {
    yPercent: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options
    }
  });
};

/**
 * 3D rotation on scroll
 */
export const scroll3DRotate = (element, options = {}) => {
  return gsap.to(element, {
    rotationY: 360,
    transformPerspective: 1000,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      ...options
    }
  });
};

/**
 * Batch scroll animations for multiple elements
 */
export const scrollBatch = (selector, animation = {}, options = {}) => {
  ScrollTrigger.batch(selector, {
    onEnter: (elements) => {
      gsap.from(elements, {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        ...animation
      });
    },
    start: 'top 85%',
    once: true,
    ...options
  });
};

/**
 * Morphing shape on scroll
 */
export const scrollMorph = (element, options = {}) => {
  return gsap.to(element, {
    attr: { d: options.targetPath },
    duration: 1,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...options
    }
  });
};

/**
 * Color change on scroll
 */
export const scrollColorChange = (element, options = {}) => {
  const defaults = {
    backgroundColor: '#0ea5e9',
    color: '#ffffff',
    duration: 0.5,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  };

  return gsap.to(element, { ...defaults, ...options });
};

/**
 * Scroll-based timeline
 */
export const createScrollTimeline = (trigger, animations = []) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1
    }
  });

  animations.forEach(({ element, props }) => {
    tl.to(element, props);
  });

  return tl;
};