import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { x: '100%' },
        { x: 0, duration: 0.5, ease: 'power3.out' }
      );

      const items = menuRef.current.querySelectorAll('.mobile-nav-item');
      gsap.fromTo(
        items,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2 }
      );
    }
  }, [isOpen]);

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-dark/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="text-2xl font-bold text-gradient interactive cursor-pointer"
            >
              DT
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-white/80 hover:text-white transition-colors duration-200 interactive cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="px-6 py-2 bg-primary-500 hover:bg-primary-600 rounded-full text-white transition-colors duration-200 interactive cursor-pointer"
              >
                Let's Talk
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white interactive"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div
            ref={menuRef}
            className="fixed top-0 right-0 h-full w-64 bg-dark-lighter z-40 md:hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 space-y-6 mt-20">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="mobile-nav-item text-xl text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="mobile-nav-item px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-full text-white text-center transition-colors duration-200 cursor-pointer"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;