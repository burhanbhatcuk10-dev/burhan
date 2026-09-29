import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ContactPage() {
  const { personal } = portfolioData;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.8 } });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-indigo-600 dark:text-indigo-400 text-xs font-mono uppercase tracking-wider">Direct Access</span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-1">Initiate Contact</h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">Communication Coordinates</h3>
            
            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <Mail size={18} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <Phone size={18} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              <a href={`tel:${personal.phone}`} className="hover:underline">{personal.phone}</a>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <MapPin size={18} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>{personal.location}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={handleMessageSubmit}
            className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Burhan Bhat"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Your Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's discuss a technical role or project architecture..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer text-sm"
            >
              {submitted ? (
                <>
                  <Check size={18} /> Transmission Received!
                </>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}