import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, Terminal, Award, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { profile } = portfolioData;
  const titles = [
    "Cybersecurity Student",
    "Ethical Hacker",
    "Threat Hunter",
    "Security Automation Engineer"
  ];
  
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const currentTitle = titles[titleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText === currentTitle) {
          timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before delete
          return;
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
          setTypingSpeed(100); // Reset speed
          return;
        }
      }
      setTypingSpeed(isDeleting ? 50 : 100);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section id="home" className="min-h-screen pt-28 flex flex-col justify-center relative overflow-hidden cyber-grid dot-bg">
      {/* Scanning Line overlay */}
      <div className="scanner-line"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
        
        {/* Left Column: Bio & Intro */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyber-blue/30 bg-cyber-blue/5 text-cyber-blue font-mono text-xs tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyber-blue animate-ping"></span>
            <span>SYSTEM_STATUS: ACTIVE // TARGET_ACQUIRED</span>
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-lg text-cyber-blue font-semibold tracking-wider">&gt;_ INITIALIZE_IDENTITY</h2>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase select-none">
              <span className="glitch-text text-glow-blue" data-text={profile.name}>{profile.name}</span>
            </h1>
            <div className="h-8 font-mono text-lg sm:text-xl text-cyan-400 font-medium flex items-center">
              <span>$ {displayText}</span>
              <span className="w-2 h-5 bg-cyan-400 ml-1 animate-pulse"></span>
            </div>
          </div>

          <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
            {profile.shortBio}
          </p>

          {/* Terminal Console Mock */}
          <div className="border border-cyber-blue/20 bg-cyber-darker/90 rounded p-4 font-mono text-xs text-gray-400 max-w-xl shadow-inner">
            <div className="flex items-center space-x-2 border-b border-cyber-blue/10 pb-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-red/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/60"></div>
              <span className="text-[10px] text-gray-500 ml-2">guest@dasun-sec-terminal: ~</span>
            </div>
            <p className="text-cyber-blue">$ cat skills_overview.txt</p>
            <p className="text-gray-300 mt-1">
              &gt; pentesting [nmap, metasploit, burpsuite]<br />
              &gt; blue-teaming [splunk, syslog, firewalls]<br />
              &gt; scripting    [python, bash, nodejs]
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="flex items-center space-x-2 px-6 py-3 rounded bg-cyber-blue text-cyber-darker font-mono font-bold text-sm tracking-wider hover:bg-white hover:shadow-neon-blue transition-all duration-300 cursor-pointer"
            >
              <span>VIEW_PROJECTS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <a
              href="#credentials"
              className="flex items-center space-x-2 px-6 py-3 rounded border border-cyber-blue text-cyber-blue font-mono text-sm tracking-wider hover:bg-cyber-blue/10 hover:shadow-neon-blue transition-all duration-300 cursor-pointer"
            >
              <span>VIEW_CREDENTIALS</span>
            </a>

            <a
              href="#contact"
              className="flex items-center space-x-2 px-6 py-3 rounded border border-cyber-purple/50 text-cyber-purple hover:text-white font-mono text-sm tracking-wider hover:bg-cyber-purple/20 hover:shadow-neon-purple transition-all duration-300 cursor-pointer"
            >
              <span>CONTACT_ME</span>
            </a>
          </div>
        </div>

        {/* Right Column: Featured Achievement Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group max-w-sm w-full">
            {/* Hologram glow effect behind card */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-purple rounded-xl blur-lg opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <div className="relative bg-cyber-darker border-2 border-cyber-blue/40 rounded-xl overflow-hidden p-6 space-y-6 shadow-2xl">
              
              {/* Header */}
              <div className="flex justify-between items-start border-b border-cyber-blue/20 pb-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-cyber-blue animate-bounce" />
                  <span className="font-mono text-xs text-cyber-cyan tracking-wider font-bold">FEATURED_CREDENTIAL</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-cyber-green/10 border border-cyber-green/30 text-cyber-green font-mono text-[10px]">
                  VERIFIED
                </div>
              </div>

              {/* Certificate Image Frame */}
              <div className="relative aspect-video rounded-lg border border-cyber-blue/10 bg-cyber-dark overflow-hidden flex items-center justify-center p-2 group-hover:border-cyber-blue/30 transition-colors">
                <img
                  src={profile.featuredCertification.image}
                  alt={profile.featuredCertification.title}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
                  onError={(e) => {
                    // Fallback to digital card style if image has loading issues
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 flex-col items-center justify-center bg-cyber-dark font-mono p-4 text-center">
                  <Shield className="w-12 h-12 text-cyber-blue mb-2" />
                  <span className="text-white text-sm font-bold">{profile.featuredCertification.title}</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-gray-500 block">CERTIFICATION_NAME</label>
                  <span className="text-white font-bold text-sm block">{profile.featuredCertification.title}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-500 block">ISSUER</label>
                    <span className="text-cyan-300 font-bold block">{profile.featuredCertification.issuer}</span>
                  </div>
                  <div>
                    <label className="text-gray-500 block">DATE_EARNED</label>
                    <span className="text-gray-300 block">{profile.featuredCertification.dateEarned}</span>
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 block">CREDENTIAL_ID</label>
                  <span className="text-cyber-purple font-mono block select-all">{profile.featuredCertification.id}</span>
                </div>

                <div>
                  <label className="text-gray-500 block">SUMMARY</label>
                  <p className="text-gray-400 font-sans text-xs leading-relaxed mt-1">
                    {profile.featuredCertification.description}
                  </p>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="flex items-center space-x-1.5 font-mono text-[10px] text-cyber-green pt-2 border-t border-cyber-blue/10">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>SHA-256 INTEGRITY VERIFIED</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
