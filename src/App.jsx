import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Achievements from './components/Achievements';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-cyber-darker text-gray-100 flex flex-col justify-between selection:bg-cyber-blue selection:text-cyber-darker">
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
