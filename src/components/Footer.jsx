import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.</span>
        <span>Built with React, Vite, Framer Motion & Tailwind CSS.</span>
      </div>
    </footer>
  );
}