import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ExperienceSkillsPage() {
  const { skills, experience, education, certifications } = portfolioData;
  const categories = Object.keys(skills);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <div className="space-y-24">
      <div className="space-y-3 max-w-2xl">
        <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Technical Foundation</span>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Experience & Capabilities</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          8+ years of engineering leadership, scalable frontend architectures, and system reliability.
        </p>
      </div>

      {/* Dynamic Skill Matrix */}
      <section className="space-y-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                  : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills[activeTab].map((skill, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 shadow-sm hover:border-indigo-500/50 hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{skill.name}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Ledger */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Briefcase className="text-indigo-500" /> Career Milestones
        </h2>
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/30 transition-all hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">{exp.company}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 w-fit">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-2 mt-4 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                {exp.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Certs */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/30 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="text-indigo-500" /> Education
          </h3>
          <div className="space-y-5">
            {education.map((edu, idx) => (
              <div key={idx} className="border-l-2 border-indigo-600 dark:border-indigo-500 pl-4 space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{edu.degree}</h4>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{edu.institution}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{edu.focus}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/30 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="text-purple-500" /> Certifications
          </h3>
          <div className="space-y-3">
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/60">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}