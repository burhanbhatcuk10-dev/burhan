import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ currentPage, onNavigate, isDark, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Systems & Projects" },
    { id: "experience", label: "Skills & Experience" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/75 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => onNavigate("overview")}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            BB
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 dark:text-white tracking-tight leading-none text-base">
              {portfolioData.personal.name}
            </span>
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
              Production Architect
            </span>
          </div>
        </div>

        {/* Desktop Buttons */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 text-xs font-semibold">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                currentPage === item.id
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition-all cursor-pointer"
          >
            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>

          <button
            onClick={() => onNavigate("contact")}
            className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            Initiate Contact
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-slate-300"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 py-6 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl flex flex-col gap-3">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileOpen(false);
              }}
              className={`text-sm font-semibold p-2 rounded-lg text-left transition-colors ${
                currentPage === item.id
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-900"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}