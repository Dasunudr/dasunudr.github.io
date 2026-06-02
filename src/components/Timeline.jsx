import React, { useState } from 'react';
import { GitCommit, Activity, Compass, Terminal, Shield, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Timeline() {
  const { timeline } = portfolioData;
  const [activeStep, setActiveStep] = useState(timeline.length - 1); // Default to current

  const milestoneIcons = {
    beginner: <Compass className="w-5 h-5 text-cyan-400" />,
    intermediate: <GitCommit className="w-5 h-5 text-cyber-blue" />,
    'advanced-intermediate': <Activity className="w-5 h-5 text-cyber-purple" />,
    current: <Shield className="w-5 h-5 text-cyber-green" />
  };

  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-cyber-dark dot-bg">
      {/* Ambient Glow Blobs */}
      <div className="glow-blob blob-purple -top-24 left-1/4"></div>
      <div className="glow-blob blob-cyan -bottom-24 right-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-20 space-y-2">
          <div className="inline-flex items-center space-x-2 text-cyber-purple font-mono text-sm tracking-widest uppercase">
            <Activity className="w-4 h-4 text-cyber-purple" />
            <span>PROGRESSION_LOG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
            Career Growth & Milestones
          </h2>
          <div className="w-24 h-1 bg-cyber-purple mx-auto mt-4 shadow-neon-purple"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Timeline Line Structure */}
          <div className="lg:col-span-7 relative">
            {/* Vertical glowing path */}
            <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-800">
              <div 
                className="w-full bg-gradient-to-b from-cyan-400 via-cyber-purple to-cyber-green transition-all duration-500 shadow-neon-blue"
                style={{ height: `${((activeStep + 0.5) / timeline.length) * 100}%` }}
              ></div>
            </div>

            <div className="space-y-10">
              {timeline.map((item, index) => {
                const isActive = activeStep === index;
                const isPast = activeStep >= index;
                
                return (
                  <div 
                    key={item.year}
                    onClick={() => setActiveStep(index)}
                    className="flex items-start space-x-6 cursor-pointer group"
                  >
                    {/* Node Dot */}
                    <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      isActive 
                        ? 'bg-cyber-darker border-cyber-blue shadow-neon-blue scale-110' 
                        : isPast 
                          ? 'bg-cyber-darker border-cyber-purple' 
                          : 'bg-cyber-darker border-gray-700'
                    }`}>
                      {milestoneIcons[item.milestone] || <Terminal className="w-5 h-5" />}
                    </div>

                    {/* Timeline Card */}
                    <div className={`flex-1 p-5 rounded-lg border transition-all duration-300 ${
                      isActive 
                        ? 'bg-cyber-darker/90 border-cyber-blue/40 shadow-neon-blue' 
                        : 'bg-cyber-darker/40 border-cyber-blue/10 hover:border-cyber-blue/25'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className={`font-mono text-sm font-bold ${
                          isActive ? 'text-cyber-blue' : 'text-cyber-purple'
                        }`}>
                          [{item.year}]
                        </span>
                        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                          {item.category}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-bold text-white mb-2 font-sans">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Console Node Detail view */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative rounded-xl border border-cyber-blue/30 bg-cyber-darker p-6 shadow-2xl overflow-hidden min-h-[350px] flex flex-col justify-between">
              
              {/* Corner scan details */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyber-blue/20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyber-blue/20 pointer-events-none"></div>
              
              {/* Scanline decoration */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent opacity-10 animate-pulse pointer-events-none"></div>

              <div>
                {/* Console header */}
                <div className="flex items-center justify-between border-b border-cyber-blue/20 pb-4 mb-4 font-mono text-[11px]">
                  <div className="flex items-center space-x-1.5 text-cyber-blue">
                    <Terminal className="w-4 h-4" />
                    <span>MILESTONE_INSPECT.sh</span>
                  </div>
                  <span className="text-gray-500">INDEX_{activeStep + 1}_OF_{timeline.length}</span>
                </div>

                {/* Milestone Detail Output */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-cyber-cyan block">// YEAR_{timeline[activeStep].year}</span>
                    <h3 className="text-xl font-bold text-white tracking-wide font-sans">
                      {timeline[activeStep].title}
                    </h3>
                    <p className="font-mono text-xs text-cyber-purple font-semibold">
                      {timeline[activeStep].category}
                    </p>
                  </div>

                  <p className="text-sm text-gray-300 font-sans leading-relaxed">
                    {timeline[activeStep].description}
                  </p>
                </div>
              </div>

              {/* Tools Stack details */}
              <div className="border-t border-cyber-blue/10 pt-4 mt-6">
                <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block mb-2">
                  TOOLS_&_SKILLS_ACQUIRED
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeline[activeStep].skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2.5 py-1 rounded bg-cyber-blue/5 border border-cyber-blue/20 font-mono text-[10px] text-cyber-blue hover:bg-cyber-blue/15 hover:shadow-neon-blue transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
