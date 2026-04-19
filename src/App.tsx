/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useState, useRef, useEffect } from 'react';
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
  Maximize2,
  Minus,
  X,
  Bot,
  Cpu,
  Zap,
  Boxes,
  Activity,
  Award,
  ExternalLink,
  Github as GithubIcon,
  RefreshCcw,
  Search,
  MessageSquareShare
} from 'lucide-react';
import { portfolioData } from './constants';

const FUZZY_MODULES = {
  projects: ['proj', 'projects', 'works', 'assignment', 'project'],
  experience: ['exp', 'experience', 'jobs', 'work', 'history'],
  contact: ['contact', 'call', 'mail', 'reach', 'connect'],
  whoami: ['whoami', 'me', 'about', 'bio', 'personal', 'hobbies']
};

const getFuzzyMatch = (input: string) => {
  for (const [module, aliases] of Object.entries(FUZZY_MODULES)) {
    if (aliases.some(a => input.includes(a))) return module;
  }
  return null;
};

// --- Sprites & Animations ---

const ScanLine = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
    <div className="w-full h-1 bg-amber-500/30 blur-[2px] scan-line" />
  </div>
);

const SpritePlayground = ({ type }: { type: string }) => (
  <div className="absolute inset-0 pointer-events-none opacity-20">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: Math.random() * 800, y: Math.random() * 600 }}
        animate={{ 
          x: [Math.random() * 800, Math.random() * 800], 
          y: [Math.random() * 600, Math.random() * 600] 
        }}
        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, repeatType: "mirror" }}
        className="absolute"
      >
        <FloatingSprite type={type} />
      </motion.div>
    ))}
  </div>
);

const FloatingSprite = ({ type }: { type: string }) => {
  const variants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const sprites: Record<string, React.ReactNode> = {
    AI_EXPERT: <div className="relative"><Cpu className="text-amber-500" size={32} /><motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity }} className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full blur-sm" /></div>,
    ARCHITECT: <div className="relative"><Boxes className="text-blue-400" size={32} /><motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-white/20 rounded-lg" /></div>,
    SPEED_NINJA: <div className="relative"><Zap className="text-yellow-400" size={32} /><motion.div animate={{ x: [-10, 10] }} transition={{ repeat: Infinity, duration: 0.5, repeatType: "mirror" }} className="absolute -inset-1 bg-yellow-400/20 blur-md rounded-full" /></div>,
    BUILDER: <div className="relative"><Code2 className="text-emerald-500" size={32} /><motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity }} className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_10px_#10b981]" /></div>,
    SCANNER: <div className="relative"><Search className="text-rose-400" size={32} /><motion.div animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 border border-rose-500 rounded-full" /></div>,
    DEFAULT: <TerminalIcon className="text-white/20" size={32} />
  };

  return (
    <motion.div variants={variants} animate="animate" className="flex items-center justify-center pointer-events-none">
      {sprites[type] || sprites.DEFAULT}
    </motion.div>
  );
};

// --- Hobby Animations ---

const playNote = (freq: number) => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 1);
};

const SnakeAnimation = () => (
  <div className="w-full h-24 bg-black/40 rounded-xl relative overflow-hidden border border-white/5">
    <motion.div 
      animate={{ 
        x: [0, 50, 50, 100, 100, 20, 20, 0],
        y: [0, 0, 30, 30, 60, 60, 10, 0]
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      className="absolute w-2 h-2 bg-emerald-500 shadow-[0_0_8px_#10b981]"
    />
    {[...Array(5)].map((_, i) => (
      <motion.div 
        key={i}
        animate={{ 
          x: [0, 50, 50, 100, 100, 20, 20, 0],
          y: [0, 0, 30, 30, 60, 60, 10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: (i + 1) * 0.1 }}
        className="absolute w-2 h-2 bg-emerald-500/40"
      />
    ))}
    <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
  </div>
);

const MiniPiano = () => (
  <div className="flex gap-1 h-24">
    {[261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88].map((f, i) => (
      <motion.button
        key={i}
        whileTap={{ scaleY: 0.9, backgroundColor: '#f59e0b' }}
        onClick={() => playNote(f)}
        className="flex-1 bg-white/10 hover:bg-white/20 rounded-b-lg border-x border-white/5 transition-colors"
      />
    ))}
  </div>
);

const CinemaAnimation = () => (
  <div className="w-full h-24 bg-zinc-900 rounded-xl relative overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
    <motion.div 
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 0.1, repeat: Infinity }}
      className="w-3/4 h-3/4 bg-white/5 flex items-center justify-center rounded border border-white/10"
    >
      <div className="flex gap-1">
        <motion.div animate={{ height: [10, 30, 10] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-amber-500" />
        <motion.div animate={{ height: [20, 10, 20] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-amber-500/50" />
        <motion.div animate={{ height: [15, 25, 15] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-amber-500" />
      </div>
    </motion.div>
  </div>
);

// --- Terminal Component ---

const Terminal = ({ onCommand }: { onCommand: (cmd: string) => void }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['[SYSTEM_BOOT]: Success', 'Welcome, Operator Rajyaguru.', 'Available Sectors: projects, experience, contact, whoami', 'Type "help" to start.']);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdInput = input.trim().toLowerCase();
    if (!cmdInput) return;

    setHistory(prev => [...prev, `> ${cmdInput}`]);
    
    // Split command and argument
    const parts = cmdInput.split(' ');
    const command = parts[0];
    const target = parts[1] || command;

    if (command === 'help') {
      const helpLines = portfolioData.terminalHelp.map(h => `${h.cmd.padEnd(15)} - ${h.desc}`);
      setHistory(prev => [...prev, ...helpLines]);
    } else if (command === 'clear') {
      setHistory([]);
    } else {
      const matchedModule = getFuzzyMatch(target);
      if (matchedModule) {
        if (target !== matchedModule) {
          setHistory(prev => [...prev, `[SYSTEM_WARNING]: Spelling mismatch detected.`, `[REROUTING]: Translating '${target}' to sectoral protocol '${matchedModule}'...`]);
          setTimeout(() => onCommand(matchedModule), 800);
        } else {
          onCommand(matchedModule);
        }
      } else {
        setHistory(prev => [...prev, `[ERROR]: Sector '${target}' not found in mainframe.`, `[TIP]: Are you sure you are authorized? Try 'projects' or 'experience'.`]);
      }
    }
    
    setInput('');
  };

  useEffect(() => {
    const container = document.getElementById('terminal-buffer');
    if (container) container.scrollTop = container.scrollHeight;
  }, [history]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl bg-black/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-amber-500" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">NR_OS v2.0.42</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
        </div>
      </div>
      
      <div id="terminal-buffer" className="h-64 overflow-y-auto p-4 font-mono text-xs space-y-1 invisible-scrollbar">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-amber-500' : 'text-white/60'}>
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2 px-4 py-3 bg-white/5 border-t border-white/5">
        <ChevronRight size={14} className="text-amber-500 animate-pulse" />
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Execute module..."
          className="flex-1 bg-transparent border-none outline-none text-amber-500 placeholder:text-white/10"
          autoFocus
        />
      </form>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  
  // Interactive Avatar Movement
  const x = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    x.set(e.clientX - innerWidth / 2);
    y.set(e.clientY - innerHeight / 2);
  };

  const executeCommand = (cmd: string) => {
    const target = getFuzzyMatch(cmd);
    if (target) setActiveModule(target);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#050505] text-white selection:bg-amber-500 selection:text-black overflow-hidden font-sans"
    >
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-amber-500/10 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-500/10 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25]" />
        
        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <AnimatePresence mode="wait">
          {!activeModule ? (
            <motion.div 
              key="hero"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-12"
            >
              {/* Profile Avatar */}
              <motion.div
                 style={{ rotateX, rotateY, perspective: 1000 }}
                 className="relative group"
              >
                <div className="absolute inset-0 bg-amber-500/30 blur-3xl rounded-full scale-125 group-hover:scale-150 transition-all duration-1000" />
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(255,159,11,0.2)]">
                  <img 
                    src={portfolioData.profilePhoto} 
                    alt="Naitik Rajyaguru" 
                    className="w-full h-full object-cover scale-100 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Naitik+Rajyaguru&background=f59e0b&color=000&bold=true";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  <ScanLine />
                </div>
                
                {/* Tactical Overlays */}
                <div className="absolute -top-4 -right-4 flex flex-col items-end">
                  <div className="px-3 py-1 bg-amber-500 text-black text-[12px] font-black uppercase tracking-tighter rounded-sm shadow-lg shadow-amber-500/20">Live</div>
                  <div className="text-[10px] font-mono text-white/60 mt-2 tracking-widest font-bold">ID: NR_779</div>
                </div>
              </motion.div>

              <div className="text-center space-y-6">
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] italic flex flex-wrap justify-center items-center gap-x-4">
                  <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">NAITIK</span> 
                  <span className="text-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.2)] tracking-tight">RAJYAGURU</span>
                </h1>
                <div className="flex items-center justify-center gap-4 text-[11px] md:text-sm font-mono uppercase tracking-[0.6em] text-white/40 font-bold">
                  <span>ADAPTIVE SYSTEMS</span>
                  <span className="text-amber-500/50">/</span>
                  <span>AI ARCHITECT</span>
                  <span className="text-amber-500/50">/</span>
                  <span>NEURAL FRONTIERS</span>
                </div>
              </div>

              <Terminal onCommand={executeCommand} />
              
              <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-white/20">
                 {portfolioData.terminalHelp.slice(0, 3).map(h => (
                   <span key={h.cmd} className="flex gap-2 items-center">
                     <span className="text-amber-500/50">#</span> {h.cmd}
                   </span>
                 ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="module"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              className="w-full max-w-7xl bg-zinc-950/90 border border-white/5 rounded-[40px] p-6 md:p-12 relative overflow-hidden backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,1)]"
            >
              <SpritePlayground type={activeModule === 'experience' ? 'ARCHITECT' : activeModule === 'projects' ? 'SPEED_NINJA' : 'DEFAULT'} />
              
              <div className="absolute top-8 right-8 flex gap-4 z-50">
                <button 
                  onClick={() => setActiveModule(null)}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                >
                  <RefreshCcw size={14} /> Back to Shell
                </button>
              </div>

              {/* Module Content */}
              <div className="space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
                  <div className="flex items-center gap-6">
                    <div className="p-6 bg-amber-500/10 rounded-[32px] border border-amber-500/20 shadow-inner">
                      {activeModule === 'experience' && <History className="text-amber-500" size={32} />}
                      {activeModule === 'projects' && <Code2 className="text-amber-500" size={32} />}
                      {activeModule === 'contact' && <Mail className="text-amber-500" size={32} />}
                      {activeModule === 'whoami' && <User className="text-amber-500" size={32} />}
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-amber-500/50 uppercase tracking-[0.4em] font-bold">Sector: {activeModule}</div>
                      <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
                        {activeModule}
                      </h2>
                    </div>
                  </div>
                </div>

                {activeModule === 'experience' && (
                  <div className="grid gap-4">
                    {portfolioData.experience.map((exp, idx) => (
                      <div key={idx} className="group relative grid md:grid-cols-[200px,1fr] gap-12 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-500">
                        <div className="space-y-4">
                          <div className="w-20 h-20 rounded-2xl bg-white overflow-hidden flex items-center justify-center p-2 shadow-xl grayscale group-hover:grayscale-0 transition-all duration-700">
                            <img src={(exp as any).logo} alt={exp.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-white">{exp.company}</h3>
                            <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">{exp.role}</p>
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{exp.duration}</p>
                          </div>
                        </div>

                        <div className="grid gap-12">
                          {exp.highlights.map((h, i) => (
                            <div key={i} className="space-y-4 relative">
                              <div className="flex items-center gap-4">
                                <div className="p-2 bg-amber-500 rounded-lg">
                                  <FloatingSprite type={h.sprite} />
                                </div>
                                <h4 className="text-xl font-bold text-white uppercase tracking-tight">{h.title}</h4>
                              </div>
                              <p className="text-sm text-white/50 leading-relaxed max-w-3xl">
                                {h.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeModule === 'projects' && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolioData.projects.map((p: any, i) => (
                      <motion.div 
                        key={i}
                        layoutId={`project-${i}`}
                        className="rounded-[40px] bg-zinc-900/50 border border-white/5 group flex flex-col overflow-hidden relative shadow-2xl hover:border-amber-500/30 transition-colors"
                      >
                         <div className="h-64 overflow-hidden relative">
                           <img 
                             src={p.image} 
                             className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                             referrerPolicy="no-referrer" 
                             alt={p.title}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                           
                           <div className="absolute top-6 right-6 flex gap-2">
                             <a href={p.links?.github} target="_blank" rel="noopener noreferrer" title="View Source" className="p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-amber-500 hover:text-black transition-all">
                               <GithubIcon size={18} />
                             </a>
                             {p.links?.live && (
                               <a href={p.links?.live} target="_blank" rel="noopener noreferrer" title="Live Demo" className="p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-amber-500 hover:text-black transition-all">
                                 <ExternalLink size={18} />
                               </a>
                             )}
                           </div>
                         </div>
                         
                         <div className="p-10 space-y-6 flex-1 flex flex-col">
                           <div className="flex flex-wrap gap-2">
                             {p.tech.map((t: string) => <span key={t} className="text-[10px] font-mono bg-white/5 border border-white/5 px-3 py-1 rounded-full uppercase text-white/40">{t}</span>)}
                           </div>
                           <h3 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">{p.title}</h3>
                           <p className="text-sm text-white/40 leading-relaxed font-medium flex-1 line-clamp-3 group-hover:line-clamp-none transition-all">{p.description}</p>
                           
                           <div className="pt-4 flex items-center gap-2 text-[10px] font-mono text-amber-500/40 uppercase tracking-widest font-bold">
                             <Zap size={12} /> System Active
                           </div>
                         </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeModule === 'contact' && (
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex-1 space-y-12">
                      <div className="space-y-6">
                        <div className="flex items-center gap-6 group cursor-pointer">
                          <motion.div 
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, -10, 10, -10, 10, 0]
                            }} 
                            transition={{ repeat: Infinity, duration: 1.5 }} 
                            className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center text-black"
                          >
                            <Phone size={24} />
                          </motion.div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono opacity-30 uppercase tracking-[0.3em]">Direct Voice Line</span>
                            <div className="text-2xl font-black group-hover:text-amber-500 transition-colors uppercase">{portfolioData.contact.phone}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 group cursor-pointer">
                          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500">
                            <Mail size={24} />
                          </motion.div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono opacity-30 uppercase tracking-[0.3em]">Neural Mailbox</span>
                            <div className="text-2xl font-black group-hover:text-amber-500 transition-colors uppercase">{portfolioData.contact.email}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 group cursor-pointer">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                            <MapPin size={24} />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono opacity-30 uppercase tracking-[0.3em]">Deployment Base</span>
                            <div className="text-2xl font-black uppercase">{portfolioData.contact.location}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        {portfolioData.socialProfiles.map(s => (
                          <motion.a 
                            key={s.name} 
                            href={s.link} 
                            whileHover={{ y: -5, scale: 1.1 }}
                            className="p-5 rounded-2xl bg-white/5 border border-white/10 text-white/30 hover:text-amber-500 hover:border-amber-500/50 transition-all"
                          >
                            <s.icon size={24} />
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 rounded-3xl bg-amber-500 p-8 md:p-12 relative overflow-hidden flex flex-col justify-end min-h-[400px]">
                       <div className="absolute top-0 right-0 p-12 opacity-10">
                         <Send size={200} className="md:w-96 md:h-96" />
                       </div>
                       <div className="relative z-10 space-y-4">
                         <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter italic leading-none">Initialize <br /> Connection?</h3>
                         <button className="w-full py-5 bg-black text-white text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3">
                           Send Pulse <Zap size={14} className="fill-white" />
                         </button>
                       </div>
                    </div>
                  </div>
                )}

                {activeModule === 'whoami' && (
                  <div className="space-y-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div className="space-y-8">
                        <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-500/20">Identity Profile</div>
                        <p className="text-3xl md:text-5xl font-black leading-none uppercase tracking-tighter italic opacity-95">
                          I build software that <span className="text-amber-500 underline decoration-white/20 underline-offset-8">learns</span>, <span className="text-amber-500 underline decoration-white/20 underline-offset-8">adapts</span>, and <span className="text-amber-500 underline decoration-white/20 underline-offset-8">empowers</span>.
                        </p>
                        <p className="text-lg text-white/50 leading-relaxed font-medium">
                          Focused on the intersection of AI-native architecture and high-scale systems. From legacy microservice transition to multi-agent generative frameworks, my goal is peak operational efficiency and absolute accessibility.
                        </p>
                        <div className="flex gap-4">
                           {portfolioData.socialProfiles.map(s => (
                             <a key={s.name} href={s.link} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl hover:bg-amber-500 hover:text-black transition-all text-xs font-bold uppercase tracking-widest">
                               <s.icon size={14} /> {s.name}
                             </a>
                           ))}
                        </div>
                      </div>
                      <div className="relative group">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="absolute inset-0 border-t-2 border-r-2 border-amber-500/30 rounded-full scale-110 pointer-events-none" />
                        <div className="aspect-square rounded-3xl border-4 border-white/10 bg-zinc-900 shadow-2xl relative overflow-hidden group-hover:border-amber-500/50 transition-all duration-500">
                           <img src={portfolioData.profilePhoto} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" referrerPolicy="no-referrer" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                           <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 uppercase font-mono text-[10px] text-white/40">
                              Neural Ops Specialist // Lvl 42
                           </div>
                           <ScanLine />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center gap-6">
                        <div className="h-px flex-1 bg-white/10" />
                        <h3 className="text-xl font-black uppercase tracking-widest text-white/20">Personal Interests</h3>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-8">
                        {(portfolioData as any).hobbies.map((h: any, i: number) => (
                          <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6 group">
                            <div className="h-40 rounded-2xl overflow-hidden relative">
                              <img src={h.image} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" referrerPolicy="no-referrer" />
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                                {h.type === 'GAMING' && <SnakeAnimation />}
                                {h.type === 'PIANO' && <MiniPiano />}
                                {h.type === 'MEDIA' && <CinemaAnimation />}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-lg font-black uppercase tracking-tight text-amber-500">{h.name}</h4>
                              <p className="text-xs text-white/40 leading-relaxed font-medium uppercase">{h.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-t from-black to-transparent pointer-events-none">
        <div className="flex items-center gap-4">
           <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
           <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] font-bold">Signal Strong • Latency: 4ms</span>
        </div>
        <div className="flex gap-6 pointer-events-auto">
           {portfolioData.socialProfiles.map(s => (
             <a key={s.name} href={s.link} target="_blank" rel="noopener noreferrer">
              <s.icon size={14} className="text-white/30 hover:text-amber-500 cursor-pointer transition-colors" />
             </a>
           ))}
        </div>
      </footer>
    </div>
  );
}
