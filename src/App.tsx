/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Terminal as TerminalIcon,
  User,
  Code2,
  History,
  Mail,
  Send,
  Phone,
  MapPin,
  ChevronRight,
  RefreshCcw,
  Search,
  MessageSquareShare,
  Github as GithubIcon,
  ExternalLink,
  Zap,
  Boxes,
  Cpu,
  Keyboard,
  X,
  HelpCircle,
  Briefcase,
  FolderOpen,
  Home,
  Command
} from 'lucide-react';
import { portfolioData } from './constants';

const COMMANDS = {
  ls: ['ls', 'list', 'dir', 'show'],
  cat: ['cat', 'view', 'read', 'open'],
  projects: ['projects', 'proj', 'project', 'works', 'p'],
  experience: ['experience', 'exp', 'work', 'jobs', 'history', 'career', 'e'],
  contact: ['contact', 'mail', 'email', 'reach', 'connect', 'c'],
  whoami: ['whoami', 'about', 'me', 'bio', 'personal', 'a', 'w']
};

const getCommandMatch = (input: string): { action: string; target: string } | null => {
  const parts = input.toLowerCase().trim().split(/\s+/);
  const cmd = parts[0];
  const arg = parts[1] || '';

  // Check if it's a direct navigation (e.g., "projects", "experience")
  for (const [module, aliases] of Object.entries(COMMANDS)) {
    if (['ls', 'cat'].includes(module)) continue;
    if (aliases.some(a => cmd === a || arg === a)) {
      return { action: 'navigate', target: module };
    }
  }

  // Check for ls/cat style commands (e.g., "ls projects", "cat experience")
  const isLs = COMMANDS.ls.some(l => cmd === l);
  const isCat = COMMANDS.cat.some(c => cmd === c);

  if ((isLs || isCat) && arg) {
    for (const [module, aliases] of Object.entries(COMMANDS)) {
      if (['ls', 'cat'].includes(module)) continue;
      if (aliases.some(a => arg === a)) {
        return { action: 'navigate', target: module };
      }
    }
  }

  return null;
};

// --- Optimized Background Animation ---

const TerminalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Terminal-style characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Track which columns are active (fewer = better performance)
    const drops: number[] = [];
    const activeColumns: boolean[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      activeColumns[i] = Math.random() > 0.7; // Only 30% of columns active
    }

    let frameCount = 0;
    let animationId: number;

    const draw = () => {
      frameCount++;

      // Render every 2nd frame for performance (30fps instead of 60fps)
      if (frameCount % 2 === 0) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          if (!activeColumns[i]) continue;

          const char = chars[Math.floor(Math.random() * chars.length)];
          const y = drops[i] * fontSize;

          // Varying opacity for depth effect
          const opacity = Math.random() > 0.95 ? 0.8 : 0.3;
          ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.fillText(char, i * fontSize, y);

          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};

// --- Floating Particles (Optimized) ---

const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-indigo-400/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

// --- Keyboard Shortcuts Panel ---

const KeyboardShortcuts = ({ onCommand }: { onCommand: (cmd: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'H', label: 'Home / Back to Shell', cmd: 'home', icon: Home },
    { key: 'P', label: 'Projects', cmd: 'projects', icon: FolderOpen },
    { key: 'E', label: 'Experience', cmd: 'experience', icon: Briefcase },
    { key: 'C', label: 'Contact', cmd: 'contact', icon: Mail },
    { key: 'A', label: 'About / Whoami', cmd: 'whoami', icon: User },
    { key: '?', label: 'Toggle Help', cmd: 'help', icon: HelpCircle },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement) return;

      const key = e.key.toLowerCase();

      switch (key) {
        case 'h':
          onCommand('home');
          break;
        case 'p':
          onCommand('projects');
          break;
        case 'e':
          onCommand('experience');
          break;
        case 'c':
          onCommand('contact');
          break;
        case 'a':
        case 'w':
          onCommand('whoami');
          break;
        case '?':
        case '/':
          e.preventDefault();
          setIsOpen(prev => !prev);
          break;
        case 'escape':
          setIsOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCommand]);

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 p-3 bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl text-slate-300 hover:text-indigo-400 hover:border-indigo-500/50 transition-all shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Keyboard size={20} />
      </motion.button>

      {/* Help Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-24 right-6 z-50 w-80 bg-slate-900/95 border border-slate-700/50 rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Command size={18} className="text-indigo-400" />
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Shortcuts</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2">
                {shortcuts.map(({ key, label, cmd, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      onCommand(cmd);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors group"
                  >
                    <Icon size={16} className="text-slate-400 group-hover:text-indigo-400" />
                    <span className="flex-1 text-left text-sm text-slate-300">{label}</span>
                    <kbd className="px-2 py-1 text-xs font-mono bg-slate-700 text-slate-300 rounded border border-slate-600">
                      {key}
                    </kbd>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <p className="text-xs text-slate-500 text-center">
                  Press <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-300">?</kbd> to toggle
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Optimized Sprites ---

const FloatingSprite = ({ type }: { type: string }) => {
  const sprites: Record<string, React.ReactNode> = {
    AI_EXPERT: <Cpu className="text-indigo-400" size={28} />,
    ARCHITECT: <Boxes className="text-blue-400" size={28} />,
    SPEED_NINJA: <Zap className="text-amber-400" size={28} />,
    BUILDER: <Code2 className="text-emerald-400" size={28} />,
    SCANNER: <Search className="text-rose-400" size={28} />,
    DEFAULT: <TerminalIcon className="text-white/20" size={28} />
  };

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="flex items-center justify-center"
    >
      {sprites[type] || sprites.DEFAULT}
    </motion.div>
  );
};

// --- Simplified Hobby Animations ---

const MiniPiano = () => (
  <div className="flex gap-0.5 h-16 items-end justify-center">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ height: [15, 30, 15] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08 }}
        className="w-3 bg-indigo-400/50 rounded-t"
      />
    ))}
  </div>
);

const CinemaAnimation = () => (
  <div className="flex items-center justify-center gap-1 h-16">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ height: [8, 24, 8] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
        className="w-1 bg-indigo-400/60 rounded-full"
      />
    ))}
  </div>
);

const VibeCodingAnimation = () => (
  <div className="flex flex-col items-center justify-center h-16 gap-1">
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
          className="w-2 h-2 bg-emerald-400/70 rounded-full"
        />
      ))}
    </div>
    <motion.span
      className="font-mono text-[10px] text-emerald-400/60"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity }}
    >_</motion.span>
  </div>
);

// --- Simplified Terminal Component ---

const Terminal = ({ onCommand }: { onCommand: (cmd: string) => void }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Naitik\'s Portfolio Terminal.',
    'Type a command or use keyboard shortcuts.',
    'Try: projects | experience | contact | whoami'
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdInput = input.trim().toLowerCase();
    if (!cmdInput) return;

    setHistory(prev => [...prev.slice(-10), `> ${cmdInput}`]); // Keep only last 10 lines

    const command = getCommandMatch(cmdInput);

    if (cmdInput === 'help' || cmdInput === 'h') {
      setHistory(prev => [...prev,
        'Available commands:',
        '  ls projects    - View projects',
        '  cat experience - View experience',
        '  ls contact     - Get in touch',
        '  cat whoami     - About me',
        '  projects, p    - Quick: View projects',
        '  experience, e  - Quick: View experience',
        '  contact, c     - Quick: Get in touch',
        '  whoami, a      - Quick: About me',
        '  clear          - Clear terminal'
      ]);
    } else if (cmdInput === 'clear') {
      setHistory([]);
    } else if (command) {
      setHistory(prev => [...prev, `Loading ${command.target}...`]);
      setTimeout(() => onCommand(command.target), 300);
    } else {
      setHistory(prev => [...prev, `Command not found: ${cmdInput}`, 'Type "help" for available commands']);
    }

    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl bg-slate-900/90 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-indigo-400" />
          <span className="text-xs font-mono text-slate-400">portfolio-terminal</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-600" />
          <div className="w-3 h-3 rounded-full bg-slate-600" />
          <div className="w-3 h-3 rounded-full bg-indigo-500" />
        </div>
      </div>

      <div className="h-48 overflow-y-auto p-4 font-mono text-sm space-y-1 invisible-scrollbar">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-indigo-400' : 'text-slate-400'}>
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2 px-4 py-3 bg-slate-800/30 border-t border-slate-700/50">
        <ChevronRight size={14} className="text-indigo-400" />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          className="flex-1 bg-transparent border-none outline-none text-indigo-300 placeholder:text-slate-600"
          autoFocus
        />
      </form>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  // Simplified avatar movement (reduced complexity)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    x.set((e.clientX - innerWidth / 2) / 10);
    y.set((e.clientY - innerHeight / 2) / 10);
  }, [x, y]);

  const executeCommand = useCallback((cmd: string) => {
    if (cmd === 'home' || cmd === '') {
      setActiveModule(null);
    } else {
      const command = getCommandMatch(cmd);
      if (command) {
        setActiveModule(command.target);
      } else {
        // Direct navigation if no command match found
        const validModules = ['projects', 'experience', 'contact', 'whoami'];
        if (validModules.includes(cmd)) {
          setActiveModule(cmd);
        }
      }
    }
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white overflow-hidden font-sans"
    >
      {/* Background Effects */}
      <TerminalBackground />
      <FloatingParticles />

      {/* Gradient Overlays */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts onCommand={executeCommand} />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 md:p-8">
        <AnimatePresence mode="wait">
          {!activeModule ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-10 max-w-4xl"
            >
              {/* Profile Avatar */}
              <motion.div
                 style={{ rotateX, rotateY, perspective: 1000 }}
                 className="relative group"
              >
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-125 group-hover:scale-150 transition-all duration-700" />
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-slate-700 shadow-2xl">
                  <img
                    src="/avatar_3d_portrait.png"
                    alt="Naitik Rajyaguru"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/profile.jpg";
                    }}
                  />
                </div>
              </motion.div>

              <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  <span className="text-white">Naitik </span>
                  <span className="text-indigo-400">Rajyaguru</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 font-medium">
                  AI Systems & Full-Stack Engineer
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                  <span>Adaptive Systems</span>
                  <span className="text-indigo-500">/</span>
                  <span>AI Architecture</span>
                  <span className="text-indigo-500">/</span>
                  <span>Neural Frontiers</span>
                </div>
              </div>

              <Terminal onCommand={executeCommand} />

              <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">P</kbd> Projects
                </span>
                <span className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">E</kbd> Experience
                </span>
                <span className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">C</kbd> Contact
                </span>
                <span className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">?</kbd> Help
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="module"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-6xl bg-slate-900/80 border border-slate-700/50 rounded-3xl p-6 md:p-10 relative overflow-hidden backdrop-blur-xl shadow-2xl"
            >
              <div className="absolute top-6 right-6">
                <button
                  onClick={() => setActiveModule(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-500 transition-colors"
                >
                  <RefreshCcw size={14} /> Back
                </button>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-slate-700/50 pb-6">
                  <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                    {activeModule === 'experience' && <History className="text-indigo-400" size={24} />}
                    {activeModule === 'projects' && <Code2 className="text-indigo-400" size={24} />}
                    {activeModule === 'contact' && <Mail className="text-indigo-400" size={24} />}
                    {activeModule === 'whoami' && <User className="text-indigo-400" size={24} />}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-indigo-400/70 uppercase tracking-wider">Section</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white capitalize">{activeModule}</h2>
                  </div>
                </div>

                {activeModule === 'experience' && (
                  <div className="grid gap-4">
                    {portfolioData.experience.map((exp, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/30 transition-colors">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-48 space-y-2">
                            <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center">
                              <img src={(exp as any).logo} alt={exp.company} className="w-full h-full object-contain" />
                            </div>
                            <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                            <p className="text-xs text-indigo-400 font-medium">{exp.role}</p>
                            <p className="text-xs text-slate-500">{exp.duration}</p>
                          </div>
                          <div className="flex-1 space-y-4">
                            {exp.highlights.map((h, i) => (
                              <div key={i} className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <FloatingSprite type={h.sprite} />
                                  <h4 className="font-semibold text-slate-200">{h.title}</h4>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed">{h.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeModule === 'projects' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {portfolioData.projects.map((p: any, i) => (
                      <div
                        key={i}
                        className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden group hover:border-indigo-500/30 transition-colors"
                      >
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={p.image}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={p.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                          <div className="absolute top-4 right-4 flex gap-2">
                            {p.links?.github && (
                              <a href={p.links.github} target="_blank" rel="noopener noreferrer"
                                 className="p-2 bg-black/50 backdrop-blur rounded-lg hover:bg-indigo-600 transition-colors">
                                <GithubIcon size={16} />
                              </a>
                            )}
                            {p.links?.live && (
                              <a href={p.links.live} target="_blank" rel="noopener noreferrer"
                                 className="p-2 bg-black/50 backdrop-blur rounded-lg hover:bg-indigo-600 transition-colors">
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="p-6 space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {p.tech.map((t: string) => (
                              <span key={t} className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded-full">{t}</span>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold text-white">{p.title}</h3>
                          <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeModule === 'contact' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <a href={`tel:${portfolioData.contact.phone}`} className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                          <Phone size={20} />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Phone</div>
                          <div className="text-lg font-semibold text-white">{portfolioData.contact.phone}</div>
                        </div>
                      </a>
                      <a href={`mailto:${portfolioData.contact.email}`} className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                          <Mail size={20} />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Email</div>
                          <div className="text-lg font-semibold text-white">{portfolioData.contact.email}</div>
                        </div>
                      </a>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center text-slate-400">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Location</div>
                          <div className="text-lg font-semibold text-white">{portfolioData.contact.location}</div>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        {portfolioData.socialProfiles.map(s => (
                          <a
                            key={s.name}
                            href={s.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-slate-700/50 text-slate-400 hover:bg-indigo-500 hover:text-white transition-colors"
                          >
                            <s.icon size={20} />
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-indigo-600 p-8 flex flex-col justify-end min-h-[300px] relative overflow-hidden">
                      <Send size={120} className="absolute top-4 right-4 text-white/10" />
                      <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-white mb-4">Let\'s Connect</h3>
                        <a
                          href={`mailto:${portfolioData.contact.email}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-slate-100 transition-colors"
                        >
                          Send Message <Zap size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {activeModule === 'whoami' && (
                  <div className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-medium rounded-full border border-indigo-500/20">
                          About Me
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
                          Building software that learns, adapts, and empowers.
                        </p>
                        <p className="text-slate-400 leading-relaxed">
                          {portfolioData.description}
                        </p>
                        <div className="flex gap-3">
                          {portfolioData.socialProfiles.map(s => (
                            <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer"
                               className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg hover:bg-indigo-500 hover:text-white transition-colors text-sm">
                              <s.icon size={16} /> {s.name}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden border border-slate-700">
                          <img src="/avatar_3d_portrait.png" className="w-full h-full object-cover"
                               onError={(e) => { (e.target as HTMLImageElement).src = "/profile.jpg"; }} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-6">Personal Interests</h3>
                      <div className="grid md:grid-cols-4 gap-4">
                        {(portfolioData as any).hobbies.map((h: any, i: number) => (
                          <div key={i} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-3">
                            <div className="h-16 rounded-xl overflow-hidden relative bg-slate-900 flex items-center justify-center">
                              {h.type === 'PIANO' && <MiniPiano />}
                              {h.type === 'MEDIA' && <CinemaAnimation />}
                              {h.type === 'GAMING' && (
                                <div className="text-3xl">🎮</div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-indigo-400 text-sm">{h.name}</h4>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{h.desc}</p>
                            </div>
                          </div>
                        ))}
                        {/* Vibe Coding Card */}
                        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-3">
                          <div className="h-16 rounded-xl overflow-hidden relative bg-slate-900 flex items-center justify-center">
                            <VibeCodingAnimation />
                          </div>
                          <div>
                            <h4 className="font-semibold text-emerald-400 text-sm">Vibe Coding</h4>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">Building with AI, riding the flow state, shipping fast.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Simplified Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 p-4 flex justify-between items-center bg-gradient-to-t from-slate-950 to-transparent pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono text-slate-500">Ready</span>
        </div>
        <div className="flex gap-4 pointer-events-auto">
          {portfolioData.socialProfiles.map(s => (
            <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer">
              <s.icon size={16} className="text-slate-500 hover:text-indigo-400 transition-colors" />
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
