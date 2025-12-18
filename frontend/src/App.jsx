import React, { useEffect, useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Cursor from './components/Common/Cursor';
import ScrollProgress from './components/Common/ScrollProgress';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Smooth scroll
    const lenis = {
      init() {
        gsap.ticker.add((time) => {
          ScrollTrigger.update();
        });
      }
    };
    lenis.init();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App relative">
      <Cursor />
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;