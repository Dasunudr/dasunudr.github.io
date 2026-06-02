import React from 'react';
import { Award, Calendar, CheckCircle2, ShieldCheck, Key } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Achievements() {
  const { certifications } = portfolioData;

  return (
    <section id="credentials" className="py-24 relative overflow-hidden bg-cyber-darker dot-bg">
      {/* Ambient Glow Blobs */}
      <div className="glow-blob blob-cyan -top-24 right-1/4"></div>
      <div className="glow-blob blob-purple -bottom-24 left-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center space-x-2 text-cyber-blue font-mono text-sm tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>CREDENTIAL_VAULT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
            Certifications & Badges
          </h2>
          <div className="w-24 h-1 bg-cyber-blue mx-auto mt-4 shadow-neon-blue"></div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="group relative bg-cyber-dark/40 border border-cyber-blue/20 rounded-xl p-6 transition-all duration-300 hover:border-cyber-blue/50 hover:shadow-neon-blue-hover flex flex-col justify-between overflow-hidden"
            >
              {/* Top scanning line for cards */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-blue to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div>
                {/* Badge Image Frame */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded bg-cyber-dark border border-cyber-blue/15 p-2 flex items-center justify-center relative overflow-hidden group-hover:border-cyber-blue/40 transition-colors">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_4px_rgba(0,240,255,0.2)] group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <Award className="hidden w-8 h-8 text-cyber-blue" />
                  </div>
                  <div className="font-mono text-[9px] text-cyber-green bg-cyber-green/5 border border-cyber-green/20 px-2 py-0.5 rounded flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyber-blue transition-colors font-sans">
                  {cert.title}
                </h3>
                
                <div className="flex items-center space-x-4 font-mono text-[11px] text-gray-400 mb-4">
                  <span className="text-cyan-400 font-semibold">{cert.issuer}</span>
                  <span className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cert.dateEarned}</span>
                  </span>
                </div>
              </div>

              {/* Hover Overlay showing short description */}
              <div className="border-t border-cyber-blue/10 pt-4 mt-2">
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {cert.description}
                </p>
                <div className="flex items-center space-x-1 mt-3 font-mono text-[9px] text-cyber-purple">
                  <Key className="w-3 h-3" />
                  <span className="select-all">ID: {cert.id}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
