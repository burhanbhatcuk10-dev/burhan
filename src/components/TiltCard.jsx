import React, { useState } from 'react';
import { Terminal, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function TerminalCLI({ onNavigate }) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    { cmd: "init", text: "Burhan Bhat production kernel loaded successfully." }
  ]);

  const handleCommand = (e) => {
    e.preventDefault();
    const clean = inputVal.trim().toLowerCase();
    if (!clean) return;

    let reply = "";
    if (clean === "help") {
      reply = "Available: projects, experience, contact, stack, clear";
    } else if (clean === "projects") {
      reply = "Routing to Production Projects Matrix...";
      setTimeout(() => onNavigate("projects"), 400);
    } else if (clean === "experience") {
      reply = "Routing to Experience & Academics...";
      setTimeout(() => onNavigate("experience"), 400);
    } else if (clean === "contact") {
      reply = `Direct: ${portfolioData.personal.email} | ${portfolioData.personal.phone}`;
    } else if (clean === "stack") {
      reply = "React 19, Vite, Tailwind CSS v4, Redux Toolkit, Node.js, Docker, MongoDB";
    } else if (clean === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    } else {
      reply = `command not recognized: '${clean}'. Type 'help'`;
    }

    setHistory((prev) => [...prev, { cmd: inputVal, text: reply }]);
    setInputVal("");
  };

  return (
    <div className="relative mx-auto max-w-md w-full rounded-2xl border border-slate-700/80 bg-slate-950 text-slate-300 shadow-2xl overflow-hidden font-mono text-xs">
      <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
        </div>
        <span className="text-slate-400 text-[11px] flex items-center gap-1">
          <Terminal size={12} className="text-indigo-400" /> burhan@shell:~
        </span>
      </div>

      <div className="p-4 space-y-3 h-64 overflow-y-auto flex flex-col justify-between">
        <div className="space-y-2">
          <p className="text-slate-500">// Type 'help', 'projects', 'stack', 'contact', 'clear'</p>
          {history.map((log, i) => (
            <div key={i} className="space-y-0.5">
              <p className="text-indigo-400 font-semibold">$ {log.cmd}</p>
              <p className="text-slate-300 text-[11px] pl-2">{log.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-slate-800/80 pt-2">
          <span className="text-emerald-400 font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type command..."
            className="bg-transparent text-white focus:outline-none flex-1 text-xs"
          />
          <button type="submit" className="text-slate-400 hover:text-indigo-400">
            <Send size={12} />
          </button>
        </form>
      </div>
    </div>
  );
}