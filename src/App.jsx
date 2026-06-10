import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Achievements from './components/Achievements';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DigitalCodeBackground from './components/DigitalCodeBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    // Select all main portfolio sections except hero (which has its own entry scripts)
    const sections = Array.from(document.querySelectorAll('section')).filter(s => s.id !== 'home');

    sections.forEach((section) => {
      const heading = section.querySelector('.text-center');
      // Target card wrappers or sub-grid elements for staggered reveals
      const cards = section.querySelectorAll('.grid > div, .space-y-10 > div');
      const otherContent = Array.from(section.children).filter(child => child !== heading);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      });

      // Initially set hidden transform positions to prevent layout shifts
      if (heading) {
        gsap.set(heading, { opacity: 0, y: 35 });
        tl.to(heading, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        });
      }

      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 40 });
        tl.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
        }, '-=0.35');
      } else if (otherContent.length > 0) {
        gsap.set(otherContent, { opacity: 0, y: 45 });
        tl.to(otherContent, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        }, '-=0.35');
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-gray-100 flex flex-col justify-between selection:bg-cyber-blue selection:text-cyber-darker relative overflow-hidden">
      <DigitalCodeBackground />
      <div>
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* Certifications Grid */}
        <Achievements />

        {/* Interactive Growth Timeline */}
        <Timeline />

        {/* Projects Showcase */}
        <Projects onSelectProject={handleSelectProject} />

        {/* Skills Section */}
        <Skills />

        {/* Contact Form */}
        <Contact />
      </div>

      {/* Footer */}
      <Footer />

      {/* Detailed Project Overlay Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
