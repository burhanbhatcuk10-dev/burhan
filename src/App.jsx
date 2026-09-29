import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// Preloader & Canvas Components
import LogoPortfolioAnimation from './components/LogoPortfolioAnimation';
import SpotlightEngine from './components/SpotlightEngine';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import OverviewPage from './Pages/ContactPage.jsx';
import ProjectsPage from './Pages/ProjectsPage.jsx';
import ExperienceSkillsPage from './Pages/ExperienceSkillsPage.jsx';
import ContactPage from './Pages/ContactPage.jsx';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentPage, setCurrentPage] = useState("overview");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isDark, setIsDark] = useState(true);

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    setCurrentPage("projects");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white developer-mesh relative flex flex-col justify-between overflow-x-hidden">
      
      {/* 1. Dribbble-inspired Preloader Intro Animation */}
      {showIntro && (
        <LogoPortfolioAnimation 
          variant="intro" 
          onAnimationComplete={() => setShowIntro(false)} 
        />
      )}

      {/* 2. Ambient Spotlight & Scroll Spring Bar */}
      <SpotlightEngine />

      {/* 3. Global Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* 4. Page Engine with Blur & Position Transitions */}
      <main className="max-w-6xl mx-auto px-6 pt-28 pb-20 w-full flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProjectId ? `project-${selectedProjectId}` : currentPage}
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === "overview" && (
              <OverviewPage 
                onNavigate={handleNavigate} 
                onSelectProject={handleSelectProject} 
              />
            )}
            {currentPage === "projects" && (
              <ProjectsPage 
                selectedId={selectedProjectId}
                onSelectProject={handleSelectProject}
                onBack={() => setSelectedProjectId(null)}
              />
            )}
            {currentPage === "experience" && (
              <ExperienceSkillsPage />
            )}
            {currentPage === "contact" && (
              <ContactPage />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 5. Production Footer */}
      <Footer />
    </div>
  );
}