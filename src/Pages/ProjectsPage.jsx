import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, ArrowLeft, Search, 
  ShieldCheck, Zap, Cpu, Sparkles, Terminal, Code2, Layers, CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const PROJECT_VISUALS = {
  crm: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  ecommerce: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
  dashboard: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80",
  default: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
};

// 3D Perspective Tilt Card Sub-Component
function AnimatedBentoCard({ item, isFeatured, onSelect }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 220, damping: 25 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const projectImage = PROJECT_VISUALS[item.id] || item.image || PROJECT_VISUALS.default;

  return (
    <motion.article
      layout
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onClick={() => onSelect(item.id)}
      className={`group relative rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl overflow-hidden hover:border-indigo-500/60 transition-colors duration-300 shadow-xl cursor-pointer flex flex-col justify-between ${
        isFeatured 
          ? "md:col-span-12 lg:grid lg:grid-cols-12 lg:gap-8 p-3.5 sm:p-5" 
          : "md:col-span-6 p-4 sm:p-5"
      }`}
    >
      {/* Dynamic Ambient Hover Glow Halo */}
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-purple-500/5 to-transparent blur-xl" />

      {/* Visual Image Frame */}
      <div 
        className={`relative overflow-hidden rounded-2xl bg-slate-950 ${
          isFeatured ? "lg:col-span-7 h-64 sm:h-80 lg:h-full min-h-[270px]" : "h-56 w-full"
        }`}
        style={{ transform: "translateZ(20px)" }}
      >
        <motion.img
          src={projectImage}
          alt={item.title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none"></div>

        {/* Dynamic Category Tag */}
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-3.5 left-3.5 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-indigo-400 border border-indigo-500/30 shadow-lg"
        >
          {item.category}
        </motion.span>

        {/* Floating Quick Action Button */}
        <div className="absolute bottom-3.5 right-3.5 w-10 h-10 rounded-2xl bg-slate-950/85 backdrop-blur-md flex items-center justify-center text-white border border-slate-700/60 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 transition-all duration-300 shadow-xl">
          <ArrowUpRight size={18} className="text-indigo-400 group-hover:rotate-45 transition-transform duration-300" />
        </div>
      </div>

      {/* Content Specification Column */}
      <div 
        className={`flex flex-col justify-between flex-1 py-4 sm:py-5 px-2 ${
          isFeatured ? "lg:col-span-5 lg:py-6" : ""
        }`}
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="space-y-3">
          {/* Metrics Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <Zap size={13} className="shrink-0" />
            {item.metrics}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors leading-snug">
            {item.title}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {item.tagline}
          </p>
        </div>

        <div className="pt-6 space-y-4">
          {/* Tech Badges with Micro-Interactions */}
          <div className="flex flex-wrap gap-1.5">
            {item.tech.map((t, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -2 }}
                className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 font-medium transition-colors hover:border-indigo-500/50"
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* Action Trigger Line */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500">
            <span className="tracking-wide">Explore System Blueprint</span>
            <motion.div 
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPage({ selectedId, onSelectProject, onBack }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Full-Stack", "Frontend", "DevOps"];

  // Memoized instant search and category filter
  const filteredProjects = useMemo(() => {
    return (portfolioData?.projects || []).filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Case Study View
  if (selectedId) {
    const project = portfolioData.projects.find((p) => p.id === selectedId);
    if (!project) return null;

    const bannerImage = PROJECT_VISUALS[project.id] || project.image || PROJECT_VISUALS.default;

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="max-w-5xl mx-auto space-y-10"
      >
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 hover:text-indigo-500 transition-colors cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform duration-200" />
          BACK TO DIRECTORY MATRIX
        </button>

        {/* Case Study Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono px-3.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Deployment Active
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Hero Banner with Depth Frame */}
        <motion.div 
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl h-80 sm:h-[440px] bg-slate-950 group"
        >
          <img 
            src={bannerImage} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-90 group-hover:brightness-100" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none"></div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {project.tech.map((t, idx) => (
                <span key={idx} className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700/60 shadow-lg">
                  {t}
                </span>
              ))}
            </div>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-bold text-xs transition-all flex items-center gap-2 shadow-xl"
            >
              Inspect Source on GitHub <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </motion.div>

        {/* Architecture Spec Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm font-mono uppercase tracking-wider">
              <Cpu size={18} /> Architectural Specification
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.deepDive}
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 font-mono block">Observed Metric</span>
                <span className="text-sm font-bold text-emerald-500 mt-1 block">{project.metrics}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 font-mono block">Status</span>
                <span className="text-sm font-bold text-indigo-400 mt-1 block">Zero Defect Verification</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-purple-500 font-bold text-sm font-mono uppercase tracking-wider">
                <ShieldCheck size={18} /> Core Pillars
              </div>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-indigo-500 shrink-0 mt-0.5" />
                  Deterministic reactive state machine with zero cascading re-renders.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-purple-500 shrink-0 mt-0.5" />
                  Encrypted tenant partitioning with role-based policies.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  Continuous verification pipelines running automated test matrices.
                </li>
              </ul>
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
            >
              View Repository on GitHub <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  }

  // Gallery View
  return (
    <div className="space-y-12">
      {/* Title & Real-Time Search */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-mono font-semibold">
            <Sparkles size={13} className="text-amber-400" />
            ENGINEERED PRODUCTION DEPLOYMENTS
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Systems & Projects
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Enterprise frontend platforms, low-latency client utilities, and distributed operations monitors.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter stack, keywords..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
          />
        </div>
      </motion.div>

      {/* Animated Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-4 overflow-x-auto">
        {categories.map((c) => {
          const isActive = activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`relative px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                isActive ? "text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterBubble"
                  className="absolute inset-0 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{c}</span>
            </button>
          );
        })}
      </div>

      {/* Animated Bento Grid */}
      {filteredProjects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center space-y-3"
        >
          <p className="text-slate-400 text-sm">No systems match your filter criteria.</p>
          <button 
            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            className="text-indigo-400 text-xs font-semibold hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </motion.div>
      ) : (
        <motion.div layout className="grid md:grid-cols-12 gap-6 [perspective:1200px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item, index) => (
              <AnimatedBentoCard
                key={item.id}
                item={item}
                isFeatured={index === 0}
                onSelect={onSelectProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}