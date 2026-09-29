import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LogoPortfolioAnimation from '../components/LogoPortfolioAnimation';
import TerminalCLI from '../components/TerminalCLI';
import { portfolioData } from '../data/portfolioData';

const ROLES = ["Full-Stack Architect", "React Specialist", "Systems & DevOps Lead", "UI/UX Micro-Interactions"];

export default function OverviewPage({ onNavigate, onSelectProject }) {
  const { personal } = portfolioData;
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = ROLES[roleIdx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting && displayed === word) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && displayed === "") {
        setDeleting(false);
        setRoleIdx((prev) => (prev + 1) % ROLES.length);
      } else {
        setDisplayed(word.substring(0, deleting ? displayed.length - 1 : displayed.length + 1));
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, deleting, roleIdx]);

  return (
    <div className="space-y-24">
      {/* Hero section */}
      <section className="relative pt-6 sm:pt-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 text-xs font-semibold backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Senior Roles & Architecture
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{personal.name}</span>
              </h1>
              <div className="h-10 text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center lg:justify-start gap-1 font-mono">
                <span>{displayed}</span>
                <span className="inline-block w-2.5 h-6 bg-indigo-500 animate-pulse"></span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {personal.subtitle}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-3 max-w-lg mx-auto lg:mx-0">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-sm">
                <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">{personal.yearsOfExperience}</div>
                <div className="text-xs text-slate-500 font-medium">Years Active</div>
              </div>
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-sm">
                <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">{personal.completedProjects}</div>
                <div className="text-xs text-slate-500 font-medium">Production Apps</div>
              </div>
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-sm">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">+{personal.efficiencyGain}</div>
                <div className="text-xs text-slate-500 font-medium">Ops Optimization</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onNavigate("projects")}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 text-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Projects <ArrowRight size={18} />
              </button>
              <button
                onClick={() => onNavigate("contact")}
                className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-indigo-500 font-semibold transition-all flex items-center gap-2 text-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                Initiate Contact
              </button>
            </div>
          </motion.div>

          {/* Dribbble Kinetic Logo Badge & Terminal Combination */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-center gap-6"
          >
            <LogoPortfolioAnimation variant="hero" />
            <TerminalCLI onNavigate={onNavigate} />
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Highlight */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Featured Builds</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">Enterprise Highlights</h2>
          </div>
          <button
            onClick={() => onNavigate("projects")}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            Open Project Index <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.projects.slice(0, 2).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProject(item.id)}
              className="group p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl hover:border-indigo-500/50 transition-all shadow-md hover:shadow-xl space-y-4 cursor-pointer"
            >
              <div className="h-48 rounded-2xl overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-1 rounded-md bg-slate-950/80 text-white backdrop-blur-md">
                  {item.category}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {item.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}