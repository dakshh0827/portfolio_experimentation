import React, { useEffect, useRef } from 'react';
import { magneticButton } from '../../animations/gsapAnimations';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  magnetic = true,
  icon: Icon,
  href
}) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (magnetic && buttonRef.current) {
      magneticButton(buttonRef.current);
    }
  }, [magnetic]);

  const baseClasses = "relative px-8 py-4 rounded-full font-medium transition-all duration-300 overflow-hidden group interactive";
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white",
    secondary: "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white",
    ghost: "bg-transparent text-white hover:bg-white/10"
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  const ButtonContent = () => (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon size={20} />}
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        target={href.startsWith('http') ? '_blank' : '_self'}
        rel={href.startsWith('http') ? 'noopener noreferrer' : ''}
        className={classes}
      >
        <ButtonContent />
      </a>
    );
  }

  return (
    <button ref={buttonRef} onClick={onClick} className={classes}>
      <ButtonContent />
    </button>
  );
};

export default Button;