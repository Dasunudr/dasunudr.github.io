import React from 'react';
import { Shield } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  const { profile } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-darker border-t border-cyber-blue/15 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-cyber-blue" />
          <span className="font-mono text-sm tracking-wider font-bold text-white">
            DASUN<span className="text-cyber-blue font-light">.SEC</span>
          </span>
        </div>

        {/* Center: Copy */}
        <div className="text-center font-mono text-xs text-gray-500 space-y-1">
          <p>© {currentYear} {profile.name.toUpperCase()}. ALL RIGHTS SECURED.</p>
          <p className="text-[10px] text-gray-600">// SIGNED_PGP_KEY_2B5A9C0F</p>
        </div>

        {/* Right Side: Security Meta */}
        <div className="flex items-center space-x-2 font-mono text-[10px] text-cyber-green bg-cyber-green/5 border border-cyber-green/20 px-3 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping"></span>
          <span>SECURE_SESSION_CONNECTED_TLS_1.3</span>
        </div>

      </div>
    </footer>
  );
}
