import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DigitalCodeBackground() {
  const containerRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const canvasRef = useRef(null);
  const countdownRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Target time: 1 hour from session initialisation
    let targetTime = new Date().getTime() + 3600000;
    let progressPct = 0;

    // 1. GSAP Scroll Trigger for 3D Camera Travel / Zoom-out & Parallax
    const bgTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true,
      }
    });

    // Animate Layer 1: Background matrix texture (Moving backward / zooming out)
    bgTimeline.to(layer1Ref.current, {
      z: -400,
      y: '100px',
      opacity: 0.15,
      ease: 'none',
    }, 0);

    // Animate Layer 2: Middle/Foreground matrix texture (Moving backward faster / parallax)
    bgTimeline.to(layer2Ref.current, {
      z: -120,
      y: '220px',
      opacity: 0.06,
      ease: 'none',
    }, 0);

    // 2. HTML5 Canvas Particles & Data Streams
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId;

    // Particle class definition
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height; // Distribute vertically initially
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.7 + 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(168, 85, 247, ';
        this.pulseSpeed = Math.random() * 0.01 + 0.003;
        this.pulseDir = 1;
      }

      update(scrollVelocity) {
        // Move upward, speed reacting to scrolling speed
        this.y -= this.speedY + scrollVelocity * 0.08;
        
        // Pulse opacity slightly
        this.opacity += this.pulseSpeed * this.pulseDir;
        if (this.opacity > 0.6 || this.opacity < 0.05) {
          this.pulseDir *= -1;
        }

        if (this.y < -20) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.fill();
      }
    }

    // Glowing vertical code streams
    class DataStream {
      constructor() {
        this.reset();
        this.y = Math.random() * height - height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -250 - Math.random() * 250;
        this.speed = Math.random() * 2 + 1.5;
        this.length = Math.floor(Math.random() * 8) + 4;
        this.chars = [];
        const charsList = '01<>[]{}+-*/=%#@!'.split('');
        for (let i = 0; i < this.length; i++) {
          this.chars.push(charsList[Math.floor(Math.random() * charsList.length)]);
        }
      }

      update(scrollVelocity) {
        // Streams flow down, accelerated when scrolling down
        this.y += this.speed + scrollVelocity * 0.12;

        if (this.y > height + 250) {
          this.reset();
        }
      }

      draw() {
        ctx.font = '10px "Fira Code", monospace';
        ctx.textAlign = 'center';

        for (let i = 0; i < this.length; i++) {
          const charY = this.y - i * 13;
          if (charY < -10 || charY > height + 10) continue;

          const opacity = (1 - i / this.length) * 0.12;
          ctx.fillStyle = i === 0 ? `rgba(255, 255, 255, ${opacity * 2})` : `rgba(0, 240, 255, ${opacity})`;
          ctx.fillText(this.chars[i], this.x, charY);
        }
      }
    }

    // Initialize pools
    const particlesCount = Math.min(50, Math.floor(width / 30));
    const streamsCount = Math.min(15, Math.floor(width / 90));
    const particles = Array.from({ length: particlesCount }, () => new Particle());
    const streams = Array.from({ length: streamsCount }, () => new DataStream());

    // Track scroll details for animation inertia
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation frames loop
    const render = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // Dampen velocity gradually
      scrollVelocity *= 0.95;

      ctx.clearRect(0, 0, width, height);

      // Render & update components
      particles.forEach((p) => {
        p.update(scrollVelocity);
        p.draw();
      });

      streams.forEach((s) => {
        s.update(scrollVelocity);
        s.draw();
      });

      // Update 3D Telemetry HUD - Countdown Clock
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        targetTime = new Date().getTime() + 3600000;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const ms = Math.floor((distance % 1000) / 10);

      const formatNum = (num) => String(num).padStart(2, '0');

      if (countdownRef.current) {
        countdownRef.current.innerHTML = `
          <div class="flex items-center space-x-1.5 border-b border-cyber-blue/30 pb-1 mb-2 text-cyber-blue text-[9px] tracking-widest font-bold font-mono">
            <span class="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-ping"></span>
            <span>VAULT_BREACH_LOCKDOWN</span>
          </div>
          <div class="text-2xl font-bold font-mono tracking-wider text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
            ${formatNum(hours)}:${formatNum(minutes)}:${formatNum(seconds)}<span class="text-xs text-cyber-blue/70">.${formatNum(ms)}</span>
          </div>
          <div class="mt-2 text-[8px] text-gray-500 flex justify-between font-mono">
            <span>PACKETS: ${Math.floor(Math.random() * 9000 + 1000)}</span>
            <span class="text-cyber-green">SYS_SECURE</span>
          </div>
        `;
      }

      // Update 3D Telemetry HUD - Decryption Progress Bar
      progressPct += 0.04;
      if (progressPct >= 100) progressPct = 0;

      if (progressRef.current) {
        progressRef.current.innerHTML = `
          <div class="flex items-center space-x-1.5 border-b border-cyber-purple/30 pb-1 mb-2 text-cyber-purple text-[9px] tracking-widest font-bold font-mono">
            <span class="w-1.5 h-1.5 rounded-full bg-cyber-purple animate-ping"></span>
            <span>DECRYPT_HASH_CORRELATION</span>
          </div>
          <div class="text-base font-bold font-mono text-cyber-purple tracking-widest">
            PROGRESS: ${progressPct.toFixed(1)}%
          </div>
          <div class="w-full bg-cyber-gray/30 h-1 rounded mt-1.5 overflow-hidden">
            <div class="bg-cyber-purple h-full shadow-neon-purple" style="width: ${progressPct}%"></div>
          </div>
        `;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      bgTimeline.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: -10,
        backgroundColor: '#020617', // deep cyber dark
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background base plate */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Layer 1: Background Code Image (deep Z-space) */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.24] mix-blend-screen"
        style={{
          backgroundImage: "url('/images/digital_code.png')",
          transform: 'translate3d(0px, 0px, -200px) scale(1.35)',
          filter: 'blur(0.5px)',
        }}
      />

      {/* Layer 2: Middle/Foreground Code Image (closer Z-space) */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.14] mix-blend-color-dodge"
        style={{
          backgroundImage: "url('/images/digital_code.png')",
          transform: 'translate3d(0px, 0px, 20px) scale(1.08)',
        }}
      />

      {/* Floating 3D Cyber HUD Panels (Z-depth parallax) */}
      <div
        ref={countdownRef}
        className="hidden lg:block absolute right-[8%] top-[25%] border border-cyber-blue/20 bg-[#020617]/80 p-4 rounded-lg font-mono text-xs text-cyber-blue backdrop-blur-md"
        style={{
          transform: 'translate3d(0px, 0px, -70px)',
          width: '190px',
          boxShadow: '0 10px 25px -10px rgba(0, 240, 255, 0.25)',
        }}
      />

      <div
        ref={progressRef}
        className="hidden lg:block absolute left-[8%] top-[35%] border border-cyber-purple/20 bg-[#020617]/80 p-4 rounded-lg font-mono text-xs text-cyber-purple backdrop-blur-md"
        style={{
          transform: 'translate3d(0px, 0px, -110px)',
          width: '190px',
          boxShadow: '0 10px 25px -10px rgba(168, 85, 247, 0.25)',
        }}
      />

      {/* Canvas layer for floating particles & data streams */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 mix-blend-screen"
      />

      {/* Dark Vignette Overlay to maintain high contrast for readable text */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90" />
    </div>
  );
}
