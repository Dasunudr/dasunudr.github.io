import React, { useState, useEffect, useRef } from 'react';
import { Shield, ArrowRight, Terminal, Award, CheckCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { profile } = portfolioData;
  const titles = [
    "Cybersecurity Student",
    "SOC Analyst",
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

  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'command', text: 'cat skills_overview.txt' },
    {
      type: 'output', text: [
        '> pentesting [nmap, metasploit, burpsuite]',
        '> blue-teaming [splunk, syslog, firewalls]',
        '> scripting    [python, bash, nodejs]'
      ]
    },
    { type: 'output', text: ['Type --help to view all available commands.'] }
  ]);

  const [contactStep, setContactStep] = useState(null); // null | 'name' | 'email' | 'message' | 'sending'
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  const [asciiArt, setAsciiArt] = useState('');
  const [showAscii, setShowAscii] = useState(false);
  const canvasRef = useRef(null);

  const [secCounter, setSecCounter] = useState(0);
  const [telemetry, setTelemetry] = useState({
    pps: 45,
    latency: 12,
    cpu: 1.5,
    status: 'SECURE'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSecCounter(prev => (prev + 1) % 12);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let pps, latency, cpu, status;
    if (secCounter < 5) {
      pps = Math.floor(35 + Math.random() * 20);
      latency = Math.floor(8 + Math.random() * 8);
      cpu = (0.8 + Math.random() * 1.4).toFixed(1);
      status = 'SECURE';
    } else if (secCounter < 8) {
      pps = Math.floor(750 + Math.random() * 200);
      latency = Math.floor(180 + Math.random() * 140);
      cpu = (82.0 + Math.random() * 13.0).toFixed(1);
      status = 'ATTACK_DETECTED';
    } else if (secCounter < 10) {
      pps = Math.floor(90 + Math.random() * 60);
      latency = Math.floor(30 + Math.random() * 35);
      cpu = (28.0 + Math.random() * 14.0).toFixed(1);
      status = 'ISOLATING';
    } else {
      pps = Math.floor(30 + Math.random() * 20);
      latency = Math.floor(10 + Math.random() * 8);
      cpu = (2.0 + Math.random() * 4.0).toFixed(1);
      status = 'SYS_RECOVERY';
    }
    setTelemetry({ pps, latency, cpu, status });
  }, [secCounter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const columns = Math.floor(width / 20) + 1;
    const yPositions = Array(columns).fill(0);

    const cyberWords = [
      "01", "10", "SECURE", "BREACH", "ATTACK", "SHIELD",
      "BYPASS", "ENCRYPT", "DECRYPT", "IP_BLOCK", "ROOT",
      "FIREWALL", "PORT_SCAN", "SOC", "MALWARE", "SSH_INIT",
      "SYS_AUTH", "AES_256", "HASH", "XSS_DETECT", "SQL_INJ"
    ];

    ctx.font = '10px "Fira Code", monospace';

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.08)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < yPositions.length; i++) {
        const text = Math.random() > 0.96
          ? cyberWords[Math.floor(Math.random() * cyberWords.length)]
          : Math.random() > 0.5 ? "1" : "0";

        const x = i * 20;
        const y = yPositions[i];

        const blendRatio = y / height;
        if (Math.random() > 0.985) {
          ctx.fillStyle = '#ffffff';
        } else if (i % 2 === 0) {
          ctx.fillStyle = `rgba(0, 240, 255, ${0.35 + (1 - blendRatio) * 0.55})`;
        } else {
          ctx.fillStyle = `rgba(168, 85, 247, ${0.35 + blendRatio * 0.55})`;
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 12;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/profile.png';
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const width = 75;
      const height = 50;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height).data;

      const chars = '.:-=+*#%@';
      let art = '';
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];
          const avg = (r + g + b) / 3;

          if (a < 50 || avg < 35) {
            // Fill background / transparent corners with random binary code / noise
            const bgChars = '01.';
            art += bgChars[Math.floor(Math.random() * bgChars.length)];
          } else {
            const charIdx = Math.floor((avg / 255) * (chars.length - 1));
            art += chars[charIdx];
          }
        }
        art += '\n';
      }
      setAsciiArt(art);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAscii(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getPromptLabel = () => {
    if (contactStep === 'name') return 'Name:';
    if (contactStep === 'email') return 'Email:';
    if (contactStep === 'message') return 'Message:';
    return 'guest@dasun-sec-terminal:~$';
  };

  const handleContactWizard = (line) => {
    if (contactStep === 'name') {
      if (!line) {
        setHistory(prev => [...prev, { type: 'output', text: ['Name cannot be empty. Please enter your Name:'] }]);
        return;
      }
      setContactData(prev => ({ ...prev, name: line }));
      setHistory(prev => [
        ...prev,
        { type: 'output', text: [`Name: ${line}`, 'Please enter your Email:'] }
      ]);
      setContactStep('email');
    } else if (contactStep === 'email') {
      if (!line || !line.includes('@')) {
        setHistory(prev => [...prev, { type: 'output', text: ['Invalid email. Please enter a valid Email:'] }]);
        return;
      }
      setContactData(prev => ({ ...prev, email: line }));
      setHistory(prev => [
        ...prev,
        { type: 'output', text: [`Email: ${line}`, 'Please enter your Message:'] }
      ]);
      setContactStep('message');
    } else if (contactStep === 'message') {
      if (!line) {
        setHistory(prev => [...prev, { type: 'output', text: ['Message cannot be empty. Please enter your Message:'] }]);
        return;
      }
      const finalData = { ...contactData, message: line };
      setContactData({ name: '', email: '', message: '' });
      setContactStep('sending');

      setHistory(prev => [
        ...prev,
        { type: 'output', text: [`Message: ${line}`, '>> SHIELDING CONNECTION...', '>> ENCRYPTING MESSAGE BODY WITH AES-256-GCM...', '>> PACKAGING DATAPACK...'] }
      ]);

      fetch("https://formsubmit.co/ajax/dasun23udara@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: finalData.name,
          email: finalData.email,
          message: finalData.message,
          _subject: `New Portfolio Message (Terminal) from ${finalData.name}`
        })
      })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok && data.success !== false && data.success !== "false") {
            setHistory(prev => [
              ...prev,
              {
                type: 'output',
                text: [
                  '>> OPENING TUNNEL TO DASUN.SEC REMOTE SUITE...',
                  '>> TRANSMISSION COMPLETE. SUCCESS CODE 200 // OK',
                  'Message delivered successfully!'
                ]
              }
            ]);
          } else {
            throw new Error(data.message || "HTTP failure");
          }
        })
        .catch((err) => {
          setHistory(prev => [
            ...prev,
            {
              type: 'output',
              text: [
                '>> OPENING TUNNEL TO DASUN.SEC REMOTE SUITE...',
                '>> !! TRANSMISSION FAILURE: SECURE LINK DISRUPTED',
                `Error: ${err.message || "Connection failed. Please send direct email."}`
              ]
            }
          ]);
        })
        .finally(() => {
          setContactStep(null);
        });
    }
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const line = inputVal.trim();
    setInputVal('');

    if (contactStep) {
      handleContactWizard(line);
      return;
    }

    if (!line) {
      setHistory(prev => [...prev, { type: 'command', text: '' }]);
      return;
    }

    const newHistory = [...history, { type: 'command', text: line }];
    const args = line.split(/\s+/);
    const command = args[0].toLowerCase();

    const scrollTo = (id) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };

    switch (command) {
      case 'help':
      case '--help':
        newHistory.push({
          type: 'output',
          text: [
            'Available commands:',
            '  about    - Display identity & details',
            '  skills   - List technical skills & experience levels',
            '  workex   - Show work experience history timeline',
            '  cert     - List cybersecurity certifications',
            '  projects - Show technical projects',
            '  contact  - Start secure email wizard',
            '  clear    - Clear terminal screen',
            '  goto <x> - Scroll directly to section (e.g., "goto skills")'
          ]
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: [
            `Name: ${profile.name}`,
            `Title: ${profile.title}`,
            `Bio: ${profile.shortBio}`,
            `Email: ${profile.email}`,
            `Profiles:`,
            `  - GitHub: ${profile.github}`,
            `  - LinkedIn: ${profile.linkedin}`
          ]
        });
        scrollTo('home');
        break;

      case 'skills':
        {
          const skillsList = ['Technical Skills Matrix:'];
          portfolioData.skills.forEach(cat => {
            skillsList.push(`[${cat.category}]`);
            cat.items.forEach(skill => {
              skillsList.push(`  - ${skill.name} (${skill.level}%)`);
            });
          });
          newHistory.push({ type: 'output', text: skillsList });
          scrollTo('skills');
        }
        break;

      case 'workex':
      case 'work':
        {
          const workList = ['Work Experience Timeline:'];
          portfolioData.timeline.forEach(item => {
            workList.push(`[${item.year}] ${item.title}`);
            workList.push(`  Company/Org: ${item.category}`);
            workList.push(`  Details: ${item.description}`);
            if (item.skills && item.skills.length > 0) {
              workList.push(`  Skills: ${item.skills.join(', ')}`);
            }
            workList.push('');
          });
          newHistory.push({ type: 'output', text: workList });
          scrollTo('timeline');
        }
        break;

      case 'cert':
      case 'certs':
        {
          const certList = ['Certifications Vault:'];
          portfolioData.certifications.forEach(cert => {
            certList.push(`- ${cert.title}`);
            certList.push(`  Issuer: ${cert.issuer} | Date: ${cert.dateEarned}`);
            certList.push(`  ID: ${cert.id}`);
          });
          newHistory.push({ type: 'output', text: certList });
          scrollTo('credentials');
        }
        break;

      case 'projects':
        {
          const projectList = ['Featured Projects:'];
          portfolioData.projects.forEach(proj => {
            projectList.push(`- ${proj.name}`);
            projectList.push(`  Desc: ${proj.shortDesc}`);
            projectList.push(`  Tech: ${proj.techStack.join(', ')}`);
          });
          newHistory.push({ type: 'output', text: projectList });
          scrollTo('projects');
        }
        break;

      case 'contact':
        setContactStep('name');
        newHistory.push({
          type: 'output',
          text: [
            '>> INITIALIZING SECURE UPLINK CONNECTION...',
            'Please enter your Name:'
          ]
        });
        scrollTo('contact');
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'goto':
        {
          const target = args[1]?.toLowerCase();
          if (!target) {
            newHistory.push({
              type: 'output',
              text: ['Usage: goto <section>', 'Sections: home, skills, workex, cert, projects, contact']
            });
          } else {
            const sectionMap = {
              home: 'home',
              about: 'home',
              skills: 'skills',
              workex: 'timeline',
              work: 'timeline',
              timeline: 'timeline',
              cert: 'credentials',
              certs: 'credentials',
              credentials: 'credentials',
              projects: 'projects',
              contact: 'contact'
            };
            const id = sectionMap[target];
            if (id) {
              newHistory.push({ type: 'output', text: [`Scrolling to ${target} section...`] });
              scrollTo(id);
            } else {
              newHistory.push({
                type: 'output',
                text: [`Section "${target}" not found.`, 'Try: goto home|skills|workex|cert|projects|contact']
              });
            }
          }
        }
        break;

      default:
        newHistory.push({
          type: 'output',
          text: [`Command not found: "${command}". Type --help or help for all commands.`]
        });
        break;
    }

    setHistory(newHistory);
  };

  return (
    <section id="home" className="min-h-screen pt-28 flex flex-col justify-center relative overflow-hidden cyber-grid dot-bg">
      {/* Scanning Line overlay */}
      <div className="scanner-line"></div>

      {/* Ambient Glow Blobs */}
      <div className="glow-blob blob-cyan top-10 left-0 -translate-x-1/2"></div>
      <div className="glow-blob blob-purple bottom-10 right-0 translate-x-1/2"></div>

      {/* Cyber Security Matrix Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.10] -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 space-y-6 py-12">

        {/* Style block for self-contained SVG Animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
          /* Pulsing rings for regular nodes */
          @keyframes net-pulse {
            0% { r: 6px; opacity: 0.8; }
            100% { r: 18px; opacity: 0; }
          }
          .net-pulse-cyan {
            animation: net-pulse 3s infinite ease-out;
            transform-origin: center;
          }

          /* Alert Node cycle (12 second loop) */
          @keyframes alert-node-cycle {
            0%, 41.6% { fill: #39ff14; r: 4px; }
            45.8%, 62.5% { fill: #ef4444; r: 6px; }
            66.6%, 79.1% { fill: #f97316; r: 5px; }
            83.3%, 100% { fill: #39ff14; r: 4px; }
          }
          .net-alert-node {
            animation: alert-node-cycle 12s infinite ease-in-out;
            transform-origin: center;
          }

          /* Alert pulse ring (only pulses during alert state) */
          @keyframes alert-pulse-cycle {
            0%, 41.6% { stroke: transparent; r: 10px; opacity: 0; }
            45.8%, 62.5% { stroke: #ef4444; r: 24px; opacity: 0.8; animation-timing-function: ease-out; }
            66.6%, 79.1% { stroke: #f97316; r: 20px; opacity: 0.6; }
            83.3%, 100% { stroke: transparent; r: 10px; opacity: 0; }
          }
          .net-alert-pulse {
            animation: alert-pulse-cycle 12s infinite linear;
            stroke-width: 1.5px;
            transform-origin: center;
          }

          /* Stage visibility timings */
          @keyframes stage-1-fade {
            0%, 41.6% { opacity: 0; visibility: hidden; }
            45.8%, 62.5% { opacity: 1; visibility: visible; fill: #ef4444; }
            66.6%, 100% { opacity: 0; visibility: hidden; }
          }
          .net-alert-stage-1 {
            animation: stage-1-fade 12s infinite;
          }

          @keyframes stage-2-fade {
            0%, 62.5% { opacity: 0; visibility: hidden; }
            66.6%, 79.1% { opacity: 1; visibility: visible; fill: #f97316; }
            83.3%, 100% { opacity: 0; visibility: hidden; }
          }
          .net-alert-stage-2 {
            animation: stage-2-fade 12s infinite;
          }

          @keyframes stage-3-fade {
            0%, 79.1% { opacity: 0; visibility: hidden; }
            83.3%, 95.8% { opacity: 1; visibility: visible; fill: #39ff14; }
            100% { opacity: 0; visibility: hidden; }
          }
          .net-alert-stage-3 {
            animation: stage-3-fade 12s infinite;
          }

          @keyframes stage-4-fade {
            0%, 41.6% { opacity: 1; visibility: visible; }
            45.8%, 95.8% { opacity: 0; visibility: hidden; }
            100% { opacity: 1; visibility: visible; }
          }
          .net-alert-stage-4 {
            animation: stage-4-fade 12s infinite;
          }

          /* Radar Scanner Sweep Rotation */
          @keyframes radar-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .radar-line {
            animation: radar-rotate 4s linear infinite;
            transform-origin: 50px 50px;
          }

          /* Bandwidth Telemetry Bars */
          @keyframes grow-1 { 0%, 100% { height: 15px; y: 65px; } 50% { height: 45px; y: 35px; } }
          @keyframes grow-2 { 0%, 100% { height: 50px; y: 30px; } 50% { height: 20px; y: 60px; } }
          @keyframes grow-3 { 0%, 100% { height: 10px; y: 70px; } 50% { height: 55px; y: 25px; } }
          @keyframes grow-4 { 0%, 100% { height: 35px; y: 45px; } 50% { height: 40px; y: 40px; } }

          .tel-bar-1 { animation: grow-1 1.8s infinite ease-in-out; }
          .tel-bar-2 { animation: grow-2 2.4s infinite ease-in-out; }
          .tel-bar-3 { animation: grow-3 1.5s infinite ease-in-out; }
          .tel-bar-4 { animation: grow-4 2.1s infinite ease-in-out; }

          /* Event Log Scrolling */
          @keyframes log-scroll-anim {
            0%, 12% { transform: translateY(0); }
            15%, 27% { transform: translateY(-8px); }
            30%, 42% { transform: translateY(-16px); }
            45%, 57% { transform: translateY(-24px); }
            60%, 72% { transform: translateY(-32px); }
            75%, 87% { transform: translateY(-40px); }
            90%, 98% { transform: translateY(-48px); }
            100% { transform: translateY(0); }
          }
          .scrolling-logs {
            animation: log-scroll-anim 14s ease-in-out infinite;
          }

          /* Signal Analyzer Waves */
          @keyframes wave-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(40px); }
          }
          .scrolling-wave-fast {
            animation: wave-scroll 1.5s linear infinite;
          }
          .scrolling-wave-slow {
            animation: wave-scroll 2.5s linear infinite;
          }

          /* Fiber Optic Flow Animation */
          @keyframes net-flow {
            to { stroke-dashoffset: -12; }
          }
          .net-flow-path {
            animation: net-flow 1.5s linear infinite;
            stroke-dasharray: 4, 8;
          }

          /* Shield Rotation and Pulse */
          @keyframes shield-cycle {
            0%, 41.6% { stroke: #00f0ff; stroke-width: 1px; r: 20px; opacity: 0.3; transform: rotate(0deg); }
            45.8%, 62.5% { stroke: #ef4444; stroke-width: 2px; r: 26px; opacity: 0.8; transform: rotate(180deg); }
            66.6%, 79.1% { stroke: #f97316; stroke-width: 1.5px; r: 23px; opacity: 0.6; transform: rotate(360deg); }
            83.3%, 95.8% { stroke: #39ff14; stroke-width: 1.5px; r: 20px; opacity: 0.7; transform: rotate(480deg); }
            100% { stroke: #00f0ff; stroke-width: 1px; r: 20px; opacity: 0.3; transform: rotate(720deg); }
          }
          .net-shield-cycle {
            animation: shield-cycle 12s infinite linear;
            transform-origin: 500px 70px;
          }
        `}} />

        {/* Active Network Monitoring Banner */}
        <div className="border border-cyber-blue/20 bg-cyber-darker/90 rounded-xl p-4 overflow-hidden relative shadow-inner shadow-cyber-blue/5 backdrop-blur-md">
          {/* Legend / Title */}
          <div className="flex justify-between items-center mb-2 font-mono text-[10px] text-gray-500 select-none">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${telemetry.status === 'ATTACK_DETECTED' ? 'bg-cyber-red animate-ping' :
                telemetry.status === 'ISOLATING' ? 'bg-orange-500 animate-ping' : 'bg-cyber-green animate-ping'
                }`}></span>
              <span className="text-cyber-blue font-bold tracking-wider">
                MONITOR: ACTIVE_NET_TRAFFIC [
                <span className={
                  telemetry.status === 'ATTACK_DETECTED' ? 'text-cyber-red font-extrabold' :
                    telemetry.status === 'ISOLATING' ? 'text-orange-500 font-bold' : 'text-cyber-green'
                }>
                  {telemetry.status}
                </span>
                ]
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1">
              <span>PPS: <span className="text-white font-bold">{telemetry.pps}</span></span>
              <span>LATENCY: <span className="text-white font-bold">{telemetry.latency}ms</span></span>
              <span>LOAD: <span className="text-white font-bold">{telemetry.cpu}%</span></span>
              <span>NODES: <span className="text-cyber-blue">7/7</span></span>
            </div>
          </div>

          {/* SVG Animated Topology */}
          <div className="h-28 md:h-32 w-full">
            <svg
              viewBox="0 -20 1000 160"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Grid Pattern */}
                <pattern id="net-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 240, 255, 0.04)" strokeWidth="1" />
                </pattern>

                {/* Glow Filters */}
                <filter id="glow-cyan" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-green" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-red" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <clipPath id="log-clip">
                  <rect x="135" y="56" width="130" height="30" />
                </clipPath>
                <clipPath id="wave-clip">
                  <rect x="735" y="56" width="130" height="30" />
                </clipPath>
              </defs>

              {/* Background grid */}
              <rect width="100%" height="100%" fill="url(#net-grid)" />

              {/* Network Topology Connections (Static background lines + animated glowing paths overlay) */}
              <path d="M 50 50 L 100 50" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" strokeDasharray="3, 3" fill="none" />
              <path d="M 900 50 L 925 50" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" strokeDasharray="3, 3" fill="none" />

              {/* Sentinel 1 -> Sentinel 2 */}
              <path d="M 100 50 L 100 90" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1.5" fill="none" />
              <path d="M 100 50 L 100 90" stroke="#00f0ff" strokeWidth="1.2" fill="none" className="net-flow-path" opacity="0.35" />

              {/* Sentinel 2 -> Threat Hub */}
              <path d="M 100 90 L 500 70" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1.5" fill="none" />
              <path d="M 100 90 L 500 70" stroke="#00f0ff" strokeWidth="1.2" fill="none" className="net-flow-path" opacity="0.35" />

              {/* Sentinel 1 -> Uplink */}
              <path d="M 100 50 L 300 30" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1.5" fill="none" />
              <path d="M 100 50 L 300 30" stroke="#00f0ff" strokeWidth="1.2" fill="none" className="net-flow-path" opacity="0.35" />

              {/* Uplink -> Threat Hub */}
              <path d="M 300 30 L 500 70" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1.5" fill="none" />
              <path d="M 300 30 L 500 70" stroke="#00f0ff" strokeWidth="1.2" fill="none" className="net-flow-path" opacity="0.35" />

              {/* Sentinel 1 -> Threat Hub */}
              <path d="M 100 50 L 500 70" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1.5" fill="none" />
              <path d="M 100 50 L 500 70" stroke="#00f0ff" strokeWidth="1.2" fill="none" className="net-flow-path" opacity="0.35" />

              {/* Threat Hub -> DB A */}
              <path d="M 500 70 L 700 30" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1.5" fill="none" />
              <path d="M 500 70 L 700 30" stroke="#00f0ff" strokeWidth="1.2" fill="none" className="net-flow-path" opacity="0.35" />

              {/* DB A -> DB B */}
              <path d="M 700 30 L 700 110" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1.5" fill="none" />
              <path d="M 700 30 L 700 110" stroke="#00f0ff" strokeWidth="1.2" fill="none" className="net-flow-path" opacity="0.35" />

              {/* Threat Hub -> DB B */}
              <path d="M 500 70 L 700 110" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1.5" fill="none" />
              <path d="M 500 70 L 700 110" stroke="#00f0ff" strokeWidth="1.2" fill="none" className="net-flow-path" opacity="0.35" />

              {/* DB B -> Egress */}
              <path d="M 700 110 L 900 50" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1.5" fill="none" />
              <path d="M 700 110 L 900 50" stroke="#00f0ff" strokeWidth="1.2" fill="none" className="net-flow-path" opacity="0.35" />

              {/* DB A -> Egress */}
              <path d="M 700 30 L 900 50" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1.5" fill="none" />
              <path d="M 700 30 L 900 50" stroke="#00f0ff" strokeWidth="1.2" fill="none" className="net-flow-path" opacity="0.35" />

              {/* Threat Hub -> Egress */}
              <path d="M 500 70 L 900 50" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1.5" fill="none" />
              <path d="M 500 70 L 900 50" stroke="#00f0ff" strokeWidth="1.2" fill="none" className="net-flow-path" opacity="0.35" />

              {/* Animated Packets */}
              <circle r="3" fill="#00f0ff" filter="url(#glow-cyan)">
                <animateMotion dur="6s" repeatCount="indefinite" path="M 100 50 L 300 30" />
              </circle>
              <circle r="3" fill="#39ff14" filter="url(#glow-green)">
                <animateMotion dur="4s" begin="1s" repeatCount="indefinite" path="M 300 30 L 500 70" />
              </circle>
              <circle r="3" fill="#00f0ff" filter="url(#glow-cyan)">
                <animateMotion dur="8s" begin="2s" repeatCount="indefinite" path="M 100 50 L 500 70" />
              </circle>
              <circle r="2.5" fill="#39ff14" filter="url(#glow-green)">
                <animateMotion dur="5s" begin="0.5s" repeatCount="indefinite" path="M 500 70 L 700 30" />
              </circle>
              <circle r="3" fill="#00f0ff" filter="url(#glow-cyan)">
                <animateMotion dur="7s" begin="1.5s" repeatCount="indefinite" path="M 700 30 L 900 50" />
              </circle>
              <circle r="3" fill="#39ff14" filter="url(#glow-green)">
                <animateMotion dur="6.5s" begin="3s" repeatCount="indefinite" path="M 500 70 L 900 50" />
              </circle>

              {/* Packets on New Paths */}
              <circle r="2.5" fill="#00f0ff" filter="url(#glow-cyan)">
                <animateMotion dur="4.5s" repeatCount="indefinite" path="M 100 50 L 100 90" />
              </circle>
              <circle r="2.5" fill="#39ff14" filter="url(#glow-green)">
                <animateMotion dur="7s" begin="2s" repeatCount="indefinite" path="M 100 90 L 500 70" />
              </circle>
              <circle r="2.5" fill="#00f0ff" filter="url(#glow-cyan)">
                <animateMotion dur="5.5s" repeatCount="indefinite" path="M 700 30 L 700 110" />
              </circle>
              <circle r="2.5" fill="#39ff14" filter="url(#glow-green)">
                <animateMotion dur="6s" begin="1s" repeatCount="indefinite" path="M 500 70 L 700 110" />
              </circle>
              <circle r="2.5" fill="#00f0ff" filter="url(#glow-cyan)">
                <animateMotion dur="8s" begin="3s" repeatCount="indefinite" path="M 700 110 L 900 50" />
              </circle>

              {/* Static Nodes */}
              {/* Node 1 */}
              <g>
                <circle cx="100" cy="50" r="10" fill="rgba(0, 240, 255, 0.03)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" className="net-pulse-cyan" />
                <circle cx="100" cy="50" r="4" fill="#00f0ff" filter="url(#glow-cyan)" />
                <text x="100" y="38" textAnchor="middle" fill="#00f0ff" fontSize="7" fontFamily="monospace">SENTINEL_01</text>
              </g>

              {/* Node 1 Sub - Sentinel 02 */}
              <g>
                <circle cx="100" cy="90" r="8" fill="rgba(0, 240, 255, 0.03)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" className="net-pulse-cyan" />
                <circle cx="100" cy="90" r="3" fill="#00f0ff" filter="url(#glow-cyan)" />
                <text x="100" y="103" textAnchor="middle" fill="#00f0ff" fontSize="6.5" fontFamily="monospace">SENTINEL_02</text>
              </g>

              {/* Node 2 */}
              <g>
                <circle cx="300" cy="30" r="10" fill="rgba(0, 240, 255, 0.03)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" className="net-pulse-cyan" />
                <circle cx="300" cy="30" r="4" fill="#00f0ff" filter="url(#glow-cyan)" />
                <text x="300" y="18" textAnchor="middle" fill="#00f0ff" fontSize="7.5" fontFamily="monospace">GATEWAY_UPLINK</text>
              </g>

              {/* Node 4 */}
              <g>
                <circle cx="700" cy="30" r="10" fill="rgba(0, 240, 255, 0.03)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" className="net-pulse-cyan" />
                <circle cx="700" cy="30" r="4" fill="#00f0ff" filter="url(#glow-cyan)" />
                <text x="700" y="18" textAnchor="middle" fill="#00f0ff" fontSize="7.5" fontFamily="monospace">DB_CLUSTER_A</text>
              </g>

              {/* Node 4 Sub - DB Cluster B */}
              <g>
                <circle cx="700" cy="110" r="8" fill="rgba(0, 240, 255, 0.03)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" className="net-pulse-cyan" />
                <circle cx="700" cy="110" r="3" fill="#00f0ff" filter="url(#glow-cyan)" />
                <text x="700" y="123" textAnchor="middle" fill="#00f0ff" fontSize="6.5" fontFamily="monospace">DB_CLUSTER_B</text>
              </g>

              {/* Node 5 */}
              <g>
                <circle cx="900" cy="50" r="10" fill="rgba(0, 240, 255, 0.03)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" className="net-pulse-cyan" />
                <circle cx="900" cy="50" r="4" fill="#00f0ff" filter="url(#glow-cyan)" />
                <text x="900" y="38" textAnchor="middle" fill="#00f0ff" fontSize="7" fontFamily="monospace">FW_EGRESS</text>
              </g>

              {/* Node 3: The Threat Analysis Alert Node */}
              <g>
                {/* Alert ring pulses */}
                <circle cx="500" cy="70" r="14" fill="none" className="net-alert-pulse" />
                <circle cx="500" cy="70" r="5" className="net-alert-node" />

                {/* Dynamic firewall shield ring */}
                <circle cx="500" cy="70" r="20" fill="none" className="net-shield-cycle" />

                {/* Alert text alerts overlay */}
                <g className="net-alert-stage-1">
                  <text x="500" y="44" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#ef4444" letterSpacing="1">
                    [!!] ALERT: PORT_SCAN_DETECTED
                  </text>
                  <path d="M 500 70 L 515 85 L 530 85" stroke="#ef4444" strokeWidth="1" fill="none" />
                  <text x="535" y="88" fontSize="7" fill="#ef4444" fontFamily="monospace">SRC: 192.168.1.105</text>
                </g>

                <g className="net-alert-stage-2">
                  <text x="500" y="44" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#f97316" letterSpacing="1">
                    [&gt;&gt;] SYS_ACTION: ISOLATING_PORT...
                  </text>
                  <path d="M 500 70 L 515 85 L 530 85" stroke="#f97316" strokeWidth="1" fill="none" />
                  <text x="535" y="88" fontSize="7" fill="#f97316" fontFamily="monospace">BLOCKING TARGET IP...</text>
                </g>

                <g className="net-alert-stage-3">
                  <text x="500" y="44" textAnchor="middle" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="#39ff14" letterSpacing="1">
                    [OK] RESOLVED: FIREWALL_RULE_UPDATED
                  </text>
                  <path d="M 500 70 L 515 85 L 530 85" stroke="#39ff14" strokeWidth="1" fill="none" />
                  <text x="535" y="88" fontSize="7" fill="#39ff14" fontFamily="monospace">THREAT MITIGATED</text>
                </g>

                <g className="net-alert-stage-4">
                  {/* Dynamic system label with real-time loads */}
                  <text x="500" y="44" textAnchor="middle" fill="#00f0ff" fontSize="8" fontFamily="monospace">
                    THREAT_ANALYSIS_HUB
                  </text>
                  <text x="500" y="103" textAnchor="middle" fill={telemetry.status === 'ATTACK_DETECTED' ? '#ef4444' : telemetry.status === 'ISOLATING' ? '#f97316' : '#39ff14'} fontSize="6.5" fontFamily="monospace">
                    SYS_LOAD: {telemetry.cpu}% | PPS: {telemetry.pps}
                  </text>
                </g>
              </g>

              {/* Radar Scanner (Left side) */}
              <g>
                <text x="50" y="10" textAnchor="middle" fill="#00f0ff" fontSize="6" fontFamily="monospace" letterSpacing="0.5">RADAR_SCAN</text>
                <circle cx="50" cy="50" r="25" fill="rgba(0, 240, 255, 0.01)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.8" strokeDasharray="2, 2" />
                <circle cx="50" cy="50" r="16" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="8" fill="none" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="0.5" />
                <line x1="25" y1="50" x2="75" y2="50" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="0.5" />
                <line x1="50" y1="25" x2="50" y2="75" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="0.5" />
                <circle cx="42" cy="40" r="1.5" fill="#39ff14" opacity="0.7" />
                <circle cx="62" cy="58" r="2" fill="#ef4444" opacity="0.8" className="animate-pulse" />
                <line x1="50" y1="50" x2="50" y2="25" stroke="#00f0ff" strokeWidth="1.2" className="radar-line" filter="url(#glow-cyan)" />
              </g>

              {/* Bandwidth Telemetry (Right side) */}
              <g>
                <text x="950" y="10" textAnchor="middle" fill="#00f0ff" fontSize="6" fontFamily="monospace" letterSpacing="0.5">BANDWIDTH</text>
                <rect x="925" y="20" width="50" height="60" rx="4" fill="rgba(0, 240, 255, 0.01)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="0.8" strokeDasharray="2, 2" />
                <rect x="932" y="50" width="6" height="30" fill="#39ff14" filter="url(#glow-green)" className="tel-bar-1" rx="1" />
                <rect x="942" y="35" width="6" height="45" fill="#00f0ff" filter="url(#glow-cyan)" className="tel-bar-2" rx="1" />
                <rect x="952" y="60" width="6" height="20" fill="#39ff14" filter="url(#glow-green)" className="tel-bar-3" rx="1" />
                <rect x="962" y="45" width="6" height="35" fill="#00f0ff" filter="url(#glow-cyan)" className="tel-bar-4" rx="1" />
              </g>

              {/* Event Log Console (Left Inner) */}
              <g>
                <text x="200" y="50" textAnchor="middle" fill="#00f0ff" fontSize="6" fontFamily="monospace" letterSpacing="0.5">EVENT_LOG</text>
                <rect x="135" y="55" width="130" height="32" rx="3" fill="rgba(0, 0, 0, 0.4)" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.8" />
                <g clipPath="url(#log-clip)">
                  <g className="scrolling-logs">
                    <text x="140" y="65" fill="#39ff14" fontSize="5" fontFamily="monospace">&gt; SYN_ACK port 80 [OK]</text>
                    <text x="140" y="73" fill="#00f0ff" fontSize="5" fontFamily="monospace">&gt; ICMP reply: 12ms</text>
                    <text x="140" y="81" fill="#39ff14" fontSize="5" fontFamily="monospace">&gt; SSH socket init</text>
                    <text x="140" y="89" fill="#f97316" fontSize="5" fontFamily="monospace">&gt; WARN: port 22 scan</text>
                    <text x="140" y="97" fill="#ef4444" fontSize="5" fontFamily="monospace">&gt; BLOCK IP 192.168.1.5</text>
                    <text x="140" y="105" fill="#39ff14" fontSize="5" fontFamily="monospace">&gt; NIDS policy reload</text>
                    <text x="140" y="113" fill="#00f0ff" fontSize="5" fontFamily="monospace">&gt; UPLINK ESTABLISHED</text>
                  </g>
                </g>
              </g>

              {/* Signal Oscilloscope (Right Inner) */}
              <g>
                <text x="800" y="50" textAnchor="middle" fill="#00f0ff" fontSize="6" fontFamily="monospace" letterSpacing="0.5">SIGNAL_ANALYZER</text>
                <rect x="735" y="55" width="130" height="32" rx="3" fill="rgba(0, 0, 0, 0.4)" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="0.8" />
                <g clipPath="url(#wave-clip)">
                  {/* Grid Lines inside scope */}
                  <line x1="735" y1="71" x2="865" y2="71" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" />
                  <line x1="767.5" y1="55" x2="767.5" y2="87" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" />
                  <line x1="800" y1="55" x2="800" y2="87" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" />
                  <line x1="832.5" y1="55" x2="832.5" y2="87" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="0.5" />

                  {/* Scrolling Wave 1 (Fast Cyan) */}
                  <g className="scrolling-wave-fast">
                    <path
                      d="M 695 71 Q 705 61 715 71 T 735 71 T 755 71 T 775 71 T 795 71 T 815 71 T 835 71 T 855 71 T 875 71 T 895 71"
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="1"
                      opacity="0.85"
                      filter="url(#glow-cyan)"
                    />
                  </g>

                  {/* Scrolling Wave 2 (Slow Green) */}
                  <g className="scrolling-wave-slow">
                    <path
                      d="M 695 71 Q 705 66 715 71 T 735 71 T 755 71 T 775 71 T 795 71 T 815 71 T 835 71 T 855 71 T 875 71 T 895 71"
                      fill="none"
                      stroke="#39ff14"
                      strokeWidth="0.8"
                      opacity="0.5"
                      filter="url(#glow-green)"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Bio & Intro */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex-grow space-y-6">
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
              </div>

              {/* Profile Photo with ASCII Transition */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue via-cyber-cyan to-cyber-purple rounded-full blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative w-full h-full rounded-full border-2 border-cyber-blue/40 overflow-hidden bg-cyber-darker flex items-center justify-center">

                  {/* Laser Scanner Line */}
                  {showAscii && (
                    <div
                      key={showAscii ? 'sweep-active' : 'sweep-idle'}
                      className="absolute left-0 w-full h-[2px] bg-cyber-blue shadow-[0_0_10px_#00f0ff] pointer-events-none z-20 laser-sweep"
                    />
                  )}

                  {/* RAW Image Layer */}
                  <img
                    src="/images/profile.png"
                    alt={profile.name}
                    className={`absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-90 hover:grayscale-0 transition-opacity duration-1500 ease-in-out ${showAscii ? 'opacity-0' : 'opacity-100'
                      }`}
                  />

                  {/* ASCII Code Layer */}
                  <pre
                    className={`absolute inset-0 font-mono text-[4.8px] leading-[4px] md:text-[5.8px] md:leading-[4.8px] text-cyber-blue font-bold tracking-tighter select-none text-center w-full h-full overflow-hidden flex items-center justify-center transition-opacity duration-1500 ease-in-out ${showAscii ? 'opacity-100 animate-pulse ascii-reveal' : 'opacity-0'
                      }`}
                  >
                    {asciiArt}
                  </pre>

                  {/* Mode Indicator Overlay */}
                  <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-cyber-darker/80 border border-cyber-blue/30 text-[7px] font-mono text-cyber-blue tracking-widest select-none uppercase z-10">
                    {showAscii ? 'ASCII' : 'RAW'}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Console */}
            <div
              onClick={handleTerminalClick}
              className="border border-cyber-blue/20 bg-cyber-darker/90 rounded p-4 font-mono text-xs text-gray-400 max-w-xl shadow-inner cursor-text hover:border-cyber-blue/40 transition-colors"
            >
              <div className="flex items-center space-x-2 border-b border-cyber-blue/10 pb-2 mb-2 select-none">
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-red/60"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/60"></div>
                <span className="text-[10px] text-gray-500 ml-2">guest@dasun-sec-terminal: ~</span>
              </div>

              {/* Terminal History Container */}
              <div
                ref={terminalBodyRef}
                className="h-48 overflow-y-auto pr-1 mb-2 space-y-2 custom-scrollbar scroll-smooth"
              >
                {history.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap">
                    {line.type === 'command' ? (
                      <div className="flex items-start space-x-2">
                        <span className="text-cyber-blue select-none">guest@dasun-sec-terminal:~$</span>
                        <span className="text-white">{line.text}</span>
                      </div>
                    ) : (
                      <div className="text-gray-300">
                        {Array.isArray(line.text) ? (
                          line.text.map((subLine, subIdx) => (
                            <div key={subIdx}>{subLine}</div>
                          ))
                        ) : (
                          <div>{line.text}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Terminal Input Line */}
              {contactStep !== 'sending' && (
                <form onSubmit={handleCommandSubmit} className="flex items-center space-x-2 pt-2 border-t border-cyber-blue/10">
                  <span className="text-cyber-blue select-none">{getPromptLabel()}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    className="flex-grow bg-transparent outline-none border-none text-white font-mono text-xs caret-cyber-blue"
                    placeholder={contactStep ? "" : "Type --help for commands..."}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </form>
              )}
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
      </div>
    </section>
  );
}
