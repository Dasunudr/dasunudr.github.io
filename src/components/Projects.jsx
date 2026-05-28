import React from 'react';
import { Terminal, ArrowUpRight, FolderGit } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Projects({ onSelectProject }) {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-cyber-darker dot-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center space-x-2 text-cyber-blue font-mono text-sm tracking-widest uppercase">
            <FolderGit className="w-4 h-4 text-cyber-blue" />
            <span>PROJECT_INDEX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
            Security Projects & Codebases
          </h2>
          <div className="w-24 h-1 bg-cyber-blue mx-auto mt-4 shadow-neon-blue"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer relative bg-cyber-dark/40 border border-cyber-blue/15 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyber-blue/40 hover:shadow-neon-blue-hover hover:-translate-y-1 flex flex-col justify-between"
            >
              
              {/* Scanline decoration for cards */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/0 via-cyber-blue/5 to-cyber-blue/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Card Header image or placeholder */}
              <div className="relative aspect-video bg-cyber-darker border-b border-cyber-blue/15 overflow-hidden flex items-center justify-center">
                <img
                  src={project.screenshot}
                  alt={project.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 flex flex-col items-center justify-center font-mono bg-cyber-darker text-gray-500">
                  <Terminal className="w-12 h-12 text-cyber-blue/30 mb-2" />
                  <span className="text-xs uppercase">{project.name} SCREENSHOT</span>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyber-blue transition-colors font-sans">
                    {project.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-cyber-blue/20 flex items-center justify-center text-cyber-blue group-hover:border-cyber-blue group-hover:bg-cyber-blue/10 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-sm text-gray-400 font-sans leading-relaxed line-clamp-3">
                  {project.shortDesc}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-cyber-dark border border-cyber-blue/10 font-mono text-[10px] text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-0.5 rounded bg-cyber-dark border border-cyber-blue/10 font-mono text-[10px] text-gray-500">
                      +{project.techStack.length - 4} MORE
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
