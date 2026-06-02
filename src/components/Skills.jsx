import React from 'react';
import { Shield, Network, Terminal, Cpu, Cloud, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { skills } = portfolioData;

  const categoryIcons = {
    "Networking & Infrastructure": <Network className="w-5 h-5 text-cyber-blue" />,
    "Cybersecurity Tools": <Shield className="w-5 h-5 text-cyber-cyan" />,
    "Programming & Cryptography": <Terminal className="w-5 h-5 text-cyber-purple" />,
    "DevOps & Cloud Security": <Cloud className="w-5 h-5 text-cyber-green" />
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-cyber-dark dot-bg">
      {/* Ambient Glow Blobs */}
      <div className="glow-blob blob-cyan top-1/2 left-0 -translate-y-1/2 -translate-x-1/2"></div>
      <div className="glow-blob blob-purple top-1/2 right-0 -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center space-x-2 text-cyber-cyan font-mono text-sm tracking-widest uppercase">
            <Cpu className="w-4 h-4 text-cyber-cyan" />
            <span>CAPABILITY_METRICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
            Technical Skillset
          </h2>
          <div className="w-24 h-1 bg-cyber-cyan mx-auto mt-4 shadow-neon-blue"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category) => (
            <div
              key={category.category}
              className="bg-cyber-darker/60 border border-cyber-blue/15 rounded-xl p-6 hover:border-cyber-blue/30 hover:shadow-neon-blue transition-all duration-300"
            >
              
              {/* Category Header */}
              <div className="flex items-center space-x-3 border-b border-cyber-blue/15 pb-4 mb-6">
                <div className="p-2 rounded bg-cyber-dark border border-cyber-blue/10">
                  {categoryIcons[category.category] || <Globe className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-bold text-white font-mono tracking-wide uppercase">
                  {category.category}
                </h3>
              </div>

              {/* Skills Progress list */}
              <div className="space-y-5">
                {category.items.map((skill) => (
                  <div key={skill.name} className="space-y-1.5 group">
                    <div className="flex justify-between items-center text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
                      <span>&gt;_ {skill.name}</span>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Outer Bar */}
                    <div className="h-2 w-full bg-cyber-dark rounded-full overflow-hidden border border-cyber-blue/5">
                      {/* Progress Inner Bar */}
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-cyber-blue/70 to-cyber-blue group-hover:shadow-neon-blue transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
