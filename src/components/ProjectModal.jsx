import React, { useEffect } from 'react';
import { X, ShieldAlert, Cpu, Award, BookOpen, Terminal } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  // Add Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-cyber-darker/80 backdrop-blur-md">
      
      {/* Backdrop Closer */}
      <div className="absolute inset-0 cursor-default" onClick={onClose}></div>

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-cyber-dark border border-cyber-blue/30 rounded-xl shadow-2xl shadow-cyber-blue/10 flex flex-col font-sans z-10 transition-all duration-300">
        
        {/* Neon corner elements */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyber-blue/30 rounded-tr-xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyber-blue/30 rounded-bl-xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex justify-between items-center bg-cyber-dark border-b border-cyber-blue/15 p-5 md:px-8">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-cyber-blue" />
            <span className="font-mono text-xs text-cyber-blue font-bold tracking-wider">PROJECT_REPORT // {project.name.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-cyber-darker border border-cyber-blue/20 text-gray-400 hover:text-cyber-blue hover:border-cyber-blue hover:shadow-neon-blue transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Main Screenshot/Mockup display */}
          <div className="relative aspect-video rounded-lg border border-cyber-blue/25 bg-cyber-darker overflow-hidden flex items-center justify-center max-h-[350px]">
            <img
              src={project.screenshot}
              alt={project.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden absolute inset-0 flex-col items-center justify-center font-mono text-gray-600">
              <Terminal className="w-16 h-16 text-cyber-blue/20 mb-2" />
              <span>LOG_MOCK_IMAGE</span>
            </div>
            {/* Hologram lines mask */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent pointer-events-none"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left column: Overview / Details (2/3 width on md) */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Full Description */}
              <div className="space-y-2">
                <h4 className="flex items-center space-x-2 text-white font-bold text-lg font-sans">
                  <Terminal className="w-4.5 h-4.5 text-cyber-blue" />
                  <span>Project Overview</span>
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {project.fullDesc}
                </p>
              </div>

              {/* Problem Statement */}
              <div className="space-y-2 p-4 rounded bg-cyber-red/5 border border-cyber-red/20">
                <h4 className="flex items-center space-x-2 text-white font-bold text-sm font-sans">
                  <ShieldAlert className="w-4 h-4 text-cyber-red animate-pulse" />
                  <span className="font-mono text-xs text-cyber-red tracking-wider">PROBLEM_STATEMENT</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  {project.problem}
                </p>
              </div>

              {/* Outcomes & Learnings */}
              <div className="space-y-2">
                <h4 className="flex items-center space-x-2 text-white font-bold text-lg font-sans">
                  <BookOpen className="w-4.5 h-4.5 text-cyber-green" />
                  <span>Outcomes & Security Learnings</span>
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {project.outcome}
                </p>
              </div>

            </div>

            {/* Right column: Tech Specs & Features (1/3 width on md) */}
            <div className="space-y-6">
              
              {/* Technologies */}
              <div className="space-y-3">
                <h4 className="flex items-center space-x-2 text-white font-bold text-sm font-sans border-b border-cyber-blue/15 pb-2">
                  <Cpu className="w-4 h-4 text-cyber-cyan" />
                  <span className="font-mono text-xs tracking-wider">TECH_STACK</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-cyber-dark border border-cyber-blue/20 font-mono text-[10px] text-cyan-300 hover:border-cyber-blue transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="flex items-center space-x-2 text-white font-bold text-sm font-sans border-b border-cyber-blue/15 pb-2">
                  <Award className="w-4 h-4 text-cyber-purple" />
                  <span className="font-mono text-xs tracking-wider">KEY_FEATURES</span>
                </h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs text-gray-400">
                      <span className="text-cyber-blue font-mono mt-0.5">&gt;</span>
                      <span className="font-sans leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="border-t border-cyber-blue/15 p-5 md:px-8 bg-cyber-dark flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-cyber-blue text-cyber-darker font-mono font-bold text-xs tracking-widest hover:bg-white hover:shadow-neon-blue transition-all duration-300"
          >
            CLOSE_REPORT
          </button>
        </div>

      </div>
    </div>
  );
}
