import React, { useState } from 'react';
import { Send, Mail, Terminal, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { profile } = portfolioData;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | encrypting | sending | success
  const [logs, setLogs] = useState([]);

  const addLog = (msg, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, msg]);
        resolve();
      }, delay);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('encrypting');
    setLogs([]);

    await addLog(">> INITIALIZING PGP ENCRYPTION ENGINE...", 400);
    await addLog(">> ENCRYPTING MESSAGE BODY WITH AES-256-GCM...", 500);
    await addLog(">> PACKAGING DATAPACK FOR SECURE PORT 443...", 400);
    
    setStatus('sending');
    await addLog(">> OPENING TUNNEL TO DASUN.SEC REMOTE SUITE...", 500);
    await addLog(">> VERIFYING SSL CERTIFICATE AND IP HONEYPOTS...", 400);
    await addLog(">> PUSHING ENCRYPTED PAYLOAD TO TELEMETRY PIPELINE...", 600);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/dasun23udara@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`
        })
      });
      const data = await response.json();
      if (response.ok && data.success !== false && data.success !== "false") {
        setStatus('success');
        await addLog(">> TRANSMISSION COMPLETE. SUCCESS CODE 200 // OK", 300);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || "HTTP failure");
      }
    } catch (err) {
      setStatus('error');
      await addLog(">> !! TRANSMISSION ERROR: UPLINK FAILED", 400);
      await addLog(`>> ERROR DETAIL: ${err.message || "SECURE PORT TIMEOUT"}`, 400);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-cyber-darker dot-bg">
      {/* Ambient Glow Blobs */}
      <div className="glow-blob blob-purple top-1/4 left-1/4 -translate-x-1/2"></div>
      <div className="glow-blob blob-cyan bottom-1/4 right-0 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center space-x-2 text-cyber-purple font-mono text-sm tracking-widest uppercase">
            <Send className="w-4 h-4 text-cyber-purple" />
            <span>ESTABLISH_UPLINK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
            Secure Contact Portal
          </h2>
          <div className="w-24 h-1 bg-cyber-purple mx-auto mt-4 shadow-neon-purple"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Socials & Terminal Bio */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-white font-sans">
              Connect With Me
            </h3>
            
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Have a project, security audit, or job opportunity? Ping me via the secure transmission form or find my profiles on standard developer and security sites.
            </p>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 p-3 rounded bg-cyber-dark border border-cyber-blue/15 hover:border-cyber-blue hover:bg-cyber-blue/5 text-gray-300 hover:text-white hover:shadow-neon-blue transition-all duration-300 font-mono text-xs"
              >
                <svg className="w-4.5 h-4.5 text-cyber-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>GITHUB</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 p-3 rounded bg-cyber-dark border border-cyber-blue/15 hover:border-cyber-blue hover:bg-cyber-blue/5 text-gray-300 hover:text-white hover:shadow-neon-blue transition-all duration-300 font-mono text-xs"
              >
                <svg className="w-4.5 h-4.5 text-cyber-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>LINKEDIN</span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="flex items-center space-x-2.5 p-3 rounded bg-cyber-dark border border-cyber-blue/15 hover:border-cyber-blue hover:bg-cyber-blue/5 text-gray-300 hover:text-white hover:shadow-neon-blue transition-all duration-300 font-mono text-xs"
              >
                <Mail className="w-4.5 h-4.5 text-cyber-blue" />
                <span>SECURE_MAIL</span>
              </a>

              <a
                href={profile.tryhackme}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 p-3 rounded bg-cyber-dark border border-cyber-purple/15 hover:border-cyber-purple hover:bg-cyber-purple/5 text-gray-300 hover:text-white hover:shadow-neon-purple transition-all duration-300 font-mono text-xs"
              >
                <span className="w-4.5 h-4.5 flex items-center justify-center font-bold text-cyber-purple text-[10px]">THM</span>
                <span>TRYHACKME</span>
              </a>

              <a
                href={profile.hackthebox}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 p-3 rounded bg-cyber-dark border border-cyber-purple/15 hover:border-cyber-purple hover:bg-cyber-purple/5 text-gray-300 hover:text-white hover:shadow-neon-purple transition-all duration-300 font-mono text-xs"
              >
                <span className="w-4.5 h-4.5 flex items-center justify-center font-bold text-cyber-purple text-[10px]">HTB</span>
                <span>HACKTHEBOX</span>
              </a>

              <a
                href={profile.twitter}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 p-3 rounded bg-cyber-dark border border-cyber-blue/15 hover:border-cyber-blue hover:bg-cyber-blue/5 text-gray-300 hover:text-white hover:shadow-neon-blue transition-all duration-300 font-mono text-xs"
              >
                <svg className="w-4.5 h-4.5 text-cyber-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span>TWITTER</span>
              </a>
            </div>

            {/* Diagnostic Box */}
            <div className="border border-cyber-blue/20 bg-cyber-dark rounded p-4 font-mono text-[10px] text-gray-500 shadow-inner space-y-1">
              <div className="flex items-center space-x-1 text-cyber-cyan mb-2 font-bold text-xs">
                <Cpu className="w-3.5 h-3.5" />
                <span>SUITE_SYSTEM_STATUS</span>
              </div>
              <p>IP_ADDRESS: 127.0.0.1 (LOCAL_LOOP)</p>
              <p>UPLINK: ENCRYPTED_SSL_TLS_v1.3</p>
              <p>FIREWALL: SHIELD_ACTIVE</p>
            </div>
          </div>

          {/* Right Column: Encrypted Form & Logs console */}
          <div className="lg:col-span-7">
            <div className="relative bg-cyber-dark/40 border border-cyber-blue/20 rounded-xl p-6 md:p-8 overflow-hidden shadow-2xl">
              
              {status === 'idle' ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        SENDER_NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-cyber-dark border border-cyber-blue/20 rounded font-mono text-sm text-white focus:outline-none focus:border-cyber-blue focus:shadow-neon-blue transition-all duration-300 placeholder-gray-600"
                        placeholder="e.g. Agent Smith"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                        SENDER_EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-cyber-dark border border-cyber-blue/20 rounded font-mono text-sm text-white focus:outline-none focus:border-cyber-blue focus:shadow-neon-blue transition-all duration-300 placeholder-gray-600"
                        placeholder="email@domain.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                      TRANSMISSION_PAYLOAD
                    </label>
                    <textarea
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-cyber-dark border border-cyber-blue/20 rounded font-mono text-sm text-white focus:outline-none focus:border-cyber-blue focus:shadow-neon-blue transition-all duration-300 placeholder-gray-600 resize-none"
                      placeholder="Type secure message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded bg-cyber-purple text-white font-mono font-bold text-xs tracking-widest hover:bg-white hover:text-cyber-darker hover:shadow-neon-purple transition-all duration-300 cursor-pointer"
                  >
                    <span>INITIALIZE_TRANSMISSION</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Encrypting & Transmitting Console screen */
                <div className="bg-cyber-darker border border-cyber-blue/30 rounded p-6 font-mono text-xs text-gray-400 min-h-[280px] flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-cyber-blue/20 pb-2 mb-4">
                      <div className="flex items-center space-x-1.5 text-cyber-blue font-bold">
                        <Terminal className="w-4 h-4 text-cyber-blue" />
                        <span>SECURE_CONNECTION_CONSOLE</span>
                      </div>
                      <span className="text-[9px] text-gray-500">SYS_V2.0</span>
                    </div>

                    <div className="space-y-1.5 select-none">
                      {logs.map((log, index) => (
                        <p 
                          key={index} 
                          className={log.includes("COMPLETE") ? "text-cyber-green" : log.includes("ERROR") || log.includes("FAILED") ? "text-cyber-red" : log.includes("PGP") ? "text-cyan-400" : "text-gray-300"}
                        >
                          {log}
                        </p>
                      ))}
                    </div>
                  </div>

                  {status === 'success' && (
                    <div className="mt-6 pt-4 border-t border-cyber-blue/15 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-cyber-green text-xs font-bold">
                        <CheckCircle2 className="w-4.5 h-4.5" />
                        <span>PAYLOAD DELIVERED SECURELY</span>
                      </div>
                      <button
                        onClick={() => setStatus('idle')}
                        className="px-3 py-1.5 rounded border border-cyber-blue text-cyber-blue hover:bg-cyber-blue/10 transition-colors text-[10px]"
                      >
                        NEW_TRANSMISSION
                      </button>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="mt-6 pt-4 border-t border-cyber-blue/15 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-cyber-red text-xs font-bold">
                        <ShieldAlert className="w-4.5 h-4.5" />
                        <span>TRANSMISSION FAILED</span>
                      </div>
                      <button
                        onClick={() => setStatus('idle')}
                        className="px-3 py-1.5 rounded border border-cyber-red text-cyber-red hover:bg-cyber-red/10 transition-colors text-[10px]"
                      >
                        RETRY_TRANSMISSION
                      </button>
                    </div>
                  )}

                  {(status === 'encrypting' || status === 'sending') && (
                    <div className="mt-6 flex items-center space-x-2 text-cyber-blue">
                      <span className="w-2.5 h-2.5 bg-cyber-blue rounded-full animate-ping"></span>
                      <span className="text-[10px] animate-pulse">TRANSMITTING UPLINK... PLEASE MAINTAIN LINK</span>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
