/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Linkedin, Mail, Phone, Code2, Database, Layout, Terminal, Bot, Zap, Globe, Cpu, Accessibility, ShieldCheck, Microscope } from 'lucide-react';

export const portfolioData = {
  name: "Naitik Rajyaguru",
  title: "AI Systems & Full-Stack Engineer",
  description: "Architecting high-performance, AI-native ecosystems and microservices. Expert in RAG evolution, neural content adaptation, and agentic CI/CD workflows. Optimized 100+ legacy systems through performance-driven refactoring and automated accessibility compliance.",
  profilePhoto: "/profile_avatar.png",
  contact: {
    email: "naitikrajyaguru@gmail.com",
    phone: "+91 9924254848",
    location: "Gujarat, India"
  },
  socialProfiles: [
    { name: "LinkedIn", link: "https://www.linkedin.com/in/naitik-rajyaguru/", icon: Linkedin },
    { name: "GitHub", link: "https://github.com/Naitik1Rajyaguru", icon: Github }
  ],
  hobbies: [
    {
      name: "Competitive Gaming",
      desc: "High-stakes tactical FPS and strategy games. Leveling up reaction times and strategic foresight.",
      type: "GAMING",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Piano Performance",
      desc: "Classical and contemporary pieces. Mastering rhythm, coordination, and creative flow.",
      type: "PIANO",
      image: "https://images.unsplash.com/photo-1520529611404-9aba50303a0c?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Cinematic Exploration",
      desc: "Deep diving into world cinema and high-concept web series. Analyzing narrative structures and pacing.",
      type: "MEDIA",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop"
    }
  ],
  skills: [
    {
      category: "AI & Neural Systems",
      items: ["RAG Evolution", "Adaptive Learning Engines", "Personalized Content Synthesis", "Semantic Caching", "Agentic Pipelines"],
      icon: Bot
    },
    {
      category: "Full-Stack Architecture",
      items: ["Microservices Migration", ".NET (C#)", "Node.js", "React/Angular", "SQL Optimization"],
      icon: Database
    },
    {
      category: "Automation & UX",
      items: ["GitHub Copilot Agents", "MCP Servers", "WCAG 2.2 Accessiblity", "Liquibase CI/CD", "QA Frameworks"],
      icon: Zap
    }
  ],
  experience: [
    {
      company: "Zeus Learning",
      role: "Software Developer",
      duration: "Present",
      logo: "https://zeuslearning.com/wp-content/uploads/2019/04/Zeus_Learning_Logo_2-1.png",
      type: "Full-time",
      highlights: [
        {
          title: "Next-Gen Personalized Learning Engine",
          description: "Pioneered an AI-native educational ecosystem within an enterprise LMS that synthesizes static content into interactive cognitive nodes. Orchestrated real-time complexity scaling via neural personality profiling, multi-lingual semantic Q&A, and synchronized TTS with bit-precise word highlighting for universal accessibility.",
          sprite: "AI_EXPERT"
        },
        {
          title: "LMS Agentic Microservices Migration",
          description: "Spearheaded the modularization of a massive monolithic PHP Learning Management System into high-availability microservices. Revolutionized the CI/CD lifecycle using GitHub Copilot agents, MCP servers for contextual system mapping, and enforced WCAG 2.2 accessibility compliance across the full stack.",
          sprite: "ARCHITECT"
        },
        {
          title: "Enterprise SQL & Caching Optimization",
          description: "Catalyzed system performance by 80% through rigorous SQL validation and semantic data caching within the LMS core. Slashed organizational cloud overhead by 60% by implementing advanced prompt caching strategies and refining stored procedure logic.",
          sprite: "SPEED_NINJA"
        }
      ]
    },
    {
      company: "Zeus Learning",
      role: "Software Developer Intern",
      duration: "Summer 2023",
      logo: "https://zeuslearning.com/wp-content/uploads/2019/04/Zeus_Learning_Logo_2-1.png",
      type: "Internship",
      highlights: [
        {
          title: "Unified Profile Infrastructure",
          description: "Architected a full-stack recruitment gateway using Angular and .NET Core. Engineered a high-throughput profile management system that streamlined decentralized registration for 500+ global candidates.",
          sprite: "BUILDER"
        },
        {
          title: "QA Interval Engine",
          description: "Integrated a high-fidelity QA automation suite designed to execute mission-critical test vectors on scheduled intervals, providing real-time telemetry and predictive regression analytics.",
          sprite: "SCANNER"
        }
      ]
    }
  ],
  projects: [
    {
      title: "Your11: Reactive Fantasy Platform",
      description: "Serverless real-time fantasy platform handling high-concurrency event snapshots. Implemented live admin match control and sub-second leaderboard updates for massive user participation.",
      tech: ["Firebase", "React", "Live Snapshot"],
      sprite: "SPORTS_BOT",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop",
      links: { github: "https://github.com/Naitik1Rajyaguru/Your11", live: "https://your11-zeta.vercel.app/" }
    },
    {
      title: "CollabDoc Engine",
      description: "Multi-user document workspace using Socket.io and OT concepts. Supports 50+ concurrent editors with persistent room-based state and sub-100ms sync latency.",
      tech: ["Node.js", "Socket.io", "React"],
      sprite: "COLLAB_SPRITE",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      links: { github: "https://github.com/Naitik1Rajyaguru/socker_multicommunication", live: "https://socker-multicommunication.onrender.com/" }
    },
    {
      title: "Agentic News Automator",
      description: "Python-driven web crawler and NLP summarizer. Features an automated SMTP delivery system and a Tkinter-based user registration gateway for daily intelligence digests.",
      tech: ["Python", "NLTK", "Scrapy"],
      sprite: "SCANNER",
      image: "https://images.unsplash.com/photo-1504711432819-0627d74ad302?q=80&w=800&auto=format&fit=crop",
      links: { github: "https://github.com/Naitik1Rajyaguru/News-Summerizer", live: "" }
    },
    {
      title: "Neural Movie Recommender",
      description: "Content-based engine utilizing Cosine Similarity metrics on vectorized metadata portfolios. Built with a Streamlit interface for real-time sentiment-aware recommendations.",
      tech: ["Python", "Scikit-learn", "Streamlit"],
      sprite: "AI_EXPERT",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
      links: { github: "https://github.com/Naitik1Rajyaguru/recommendation", live: "" }
    },
    {
      title: "Flappy Physics Engine",
      description: "High-fidelity recreation of the Flappy Bird mechanics using Unity and C#. Optimized character motion vectors and collision boundaries for perfect game feel.",
      tech: ["Unity", "C#", "Game Design"],
      sprite: "SPEED_NINJA",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
      links: { github: "https://github.com/Naitik1Rajyaguru/FlappyBird/blob/main/FlappyPhone/flappy.apk", live: "" }
    }
  ],
  terminalHelp: [
    { cmd: "ls projects", desc: "View innovative project snapshots" },
    { cmd: "cat experience", desc: "Reveal technical timeline and achievements" },
    { cmd: "ssh contact", desc: "Establish direct communication protocols" },
    { cmd: "whoami", desc: "Display core engineering philosophy" },
    { cmd: "clear", desc: "Purge terminal buffers" }
  ]
};
