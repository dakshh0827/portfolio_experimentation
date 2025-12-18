import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { personal } = portfolioData;

  const socialLinks = [
    { icon: Github, href: personal.social.github, label: 'GitHub' },
    { icon: Linkedin, href: personal.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personal.social.twitter, label: 'Twitter' },
    { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' }
  ];

  return (
    <footer className="bg-dark-lighter border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">
              {personal.name}
            </h3>
            <p className="text-white/60">
              {personal.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/60 hover:text-primary-400 transition-colors duration-200 interactive"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all duration-300 interactive group"
                    aria-label={social.label}
                  >
                    <Icon size={18} className="text-white/60 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
            <p>
              © {currentYear} {personal.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-1 mt-2 md:mt-0">
              Built with <Heart size={14} className="text-red-500 animate-pulse" /> using React, Three.js & GSAP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;