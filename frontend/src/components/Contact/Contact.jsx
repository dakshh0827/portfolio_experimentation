import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { fadeInUp } from '../../animations/gsapAnimations';
import { portfolioData } from '../../data/portfolio';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

// 3D Contact Particles
const ContactParticles = () => {
  const particlesRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = time * 0.1;
  });

  const count = 500;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#38bdf8" transparent opacity={0.6} />
    </points>
  );
};

// 3D Mail Icon
const Mail3D = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time) * 0.3;
    meshRef.current.rotation.y = time * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1, 0.2]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { personal } = portfolioData;

  useEffect(() => {
    if (formRef.current) {
      fadeInUp(formRef.current);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you! Your message has been sent.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const socialLinks = [
    { icon: Github, href: personal.social.github, label: 'GitHub' },
    { icon: Linkedin, href: personal.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personal.social.twitter, label: 'Twitter' }
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 bg-dark-lighter overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <ContactParticles />
          <Mail3D />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
            Let's Connect
          </h2>
          <p className="text-white/60 text-lg">
            Have a project in mind? Let's work together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-8">Get in Touch</h3>
              <p className="text-white/70 text-lg mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 glass p-4 rounded-lg">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <Mail className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <a href={`mailto:${personal.email}`} className="text-white hover:text-primary-400 transition-colors">
                    {personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 glass p-4 rounded-lg">
                <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <MapPin className="text-primary-400" size={20} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Location</p>
                  <p className="text-white">{personal.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-white/60 mb-4">Follow me on</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/5 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all duration-300 interactive group"
                      aria-label={social.label}
                    >
                      <Icon size={20} className="text-white/60 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="glass p-8 rounded-xl space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-light border border-white/10 rounded-lg text-white focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-light border border-white/10 rounded-lg text-white focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-dark-light border border-white/10 rounded-lg text-white focus:border-primary-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 rounded-full text-white font-medium transition-all duration-300 interactive flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;