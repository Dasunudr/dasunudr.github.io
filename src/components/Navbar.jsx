import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, Terminal } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Credentials', href: '#credentials' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-cyber-darker/80 backdrop-blur-md border-b border-cyber-blue/30 py-3 shadow-lg shadow-cyber-blue/5' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="p-2 rounded bg-cyber-dark border border-cyber-blue/40 group-hover:border-cyber-blue group-hover:shadow-neon-blue transition-all duration-300">
              <Terminal className="w-5 h-5 text-cyber-blue animate-pulse" />
            </div>
            <a href="#home" className="font-mono text-xl font-bold tracking-wider text-white hover:text-cyber-blue transition-colors">
              DASUN<span className="text-cyber-blue font-light">.SEC</span>
            </a>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-mono text-sm tracking-widest text-gray-300 hover:text-cyber-blue hover:text-glow-blue transition-all duration-200 relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="#contact"
              className="px-4 py-1.5 rounded font-mono text-xs tracking-wider border border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 hover:shadow-neon-blue transition-all duration-300"
            >
              SECURE_CONN
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-cyber-blue hover:bg-cyber-dark focus:outline-none transition-colors border border-transparent hover:border-cyber-blue/30"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100 border-b border-cyber-blue/30' : 'max-h-0 opacity-0 pointer-events-none'
      } overflow-hidden bg-cyber-darker/95 backdrop-blur-lg`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md font-mono text-base tracking-wider text-gray-300 hover:text-cyber-blue hover:bg-cyber-dark transition-all duration-200"
            >
              &gt; {item.name}
            </a>
          ))}
          <div className="pt-2 px-3">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-2 rounded font-mono text-sm tracking-wider border border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 hover:shadow-neon-blue transition-all duration-300"
            >
              SECURE_CONN
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
