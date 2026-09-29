import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Code2 } from 'lucide-react';

export default function LogoPortfolioAnimation({ onAnimationComplete, variant = "hero" }) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === "intro") {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.2, duration: 0.6, ease: "easeInOut" }}
        onAnimationComplete={onAnimationComplete}
      >
        <div className="relative flex items-center justify-center">
          {/* Multi-layered rotating kinetic orbits */}
          <motion.div
            className="absolute w-36 h-36 rounded-full border border-indigo-500/30 border-dashed"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full border border-purple-500/20"
            animate={{ rotate: -360, scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
          <motion.div
            className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-indigo-500/50"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: [0, 1.2, 1], rotate: [ -180, 20, 0 ] }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-black text-3xl tracking-tighter text-white font-mono">
              BB
            </span>
          </motion.div>
        </div>
        <motion.p
          className="mt-6 text-xs font-mono tracking-widest text-indigo-400 uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Burhan Bhat • Architecture Stack Initializing
        </motion.p>
      </motion.div>
    );
  }

  // Interactive In-Page Logo Variant
  return (
    <div 
      className="relative flex items-center justify-center p-4 cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer ambient blur */}
      <motion.div
        className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-indigo-600/30 to-purple-600/30 blur-2xl pointer-events-none"
        animate={{
          scale: isHovered ? 1.3 : 1,
          opacity: isHovered ? 0.9 : 0.4
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Orbit 1 with orbital bead */}
      <motion.div
        className="absolute w-40 h-40 rounded-full border border-indigo-500/30 border-dashed"
        animate={{ rotate: isHovered ? 360 : 180 }}
        transition={{ repeat: Infinity, duration: isHovered ? 4 : 12, ease: "linear" }}
      >
        <span className="absolute -top-1.5 left-1/2 w-3 h-3 bg-indigo-400 rounded-full shadow-lg shadow-indigo-400" />
      </motion.div>

      {/* Orbit 2 */}
      <motion.div
        className="absolute w-52 h-52 rounded-full border border-purple-500/20"
        animate={{ rotate: isHovered ? -360 : -180 }}
        transition={{ repeat: Infinity, duration: isHovered ? 5 : 15, ease: "linear" }}
      >
        <span className="absolute -bottom-1.5 left-1/2 w-2.5 h-2.5 bg-pink-400 rounded-full shadow-lg shadow-pink-400" />
      </motion.div>

      {/* Core Morphing Badge */}
      <motion.div
        className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 p-0.5 shadow-2xl shadow-indigo-500/30"
        animate={{
          rotate: isHovered ? [0, -10, 10, 0] : 0,
          scale: isHovered ? 1.08 : 1
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-[22px] bg-slate-950 flex flex-col items-center justify-center p-2 text-center">
          <motion.div
            animate={{ y: isHovered ? -2 : 0 }}
            className="flex items-center gap-1 text-indigo-400 font-mono text-[10px] uppercase font-bold"
          >
            <Code2 size={12} /> React Core
          </motion.div>
          <span className="font-black text-2xl tracking-tighter text-white font-mono mt-0.5">
            BB
          </span>
          <span className="text-[9px] font-mono text-slate-400">
            v8.4.0
          </span>
        </div>
      </motion.div>
    </div>
  );
}