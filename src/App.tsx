import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Car, Shield, Smartphone, FileSpreadsheet, Lock, Sparkles, Check, 
  ArrowRight, ShieldCheck, Mail, Phone, MapPin, Zap, RefreshCw, Layers 
} from 'lucide-react';
import { VisualShowcase } from './components/VisualShowcase';
import { CLIENT_BENEFITS } from './data/mockData';

export default function App() {
  const [activeBenefitIndex, setActiveBenefitIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'err' | null>(null);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    // Access key explicitly requested by user
    formData.append('access_key', '87774ba7-dcf7-411b-9e40-5e0a81ae5151');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('err');
      }
    } catch (err) {
      setSubmitStatus('err');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Smooth scroll handler
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-teal-100 selection:text-teal-900">
      
      {/* ==================================================== */}
      {/* FLOATING TOP NAVIGATION BAR */}
      {/* ==================================================== */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200/60 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Brand - Optimized & Ultra Stylish */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-500/10 border border-white/10 relative overflow-hidden group-hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-teal-400 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <Car className="w-5 h-5 stroke-[2.2] text-teal-400 relative z-10" />
            </div>
            <div className="leading-none">
              <div className="flex items-center gap-0.5">
                <span className="font-black text-xl text-slate-950 tracking-tighter">
                  PPI<span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-teal-600">Pro</span>
                </span>
                <span className="text-teal-500 font-black text-xl leading-none">.click</span>
              </div>
              <span className="text-[9px] font-black text-slate-400 font-mono tracking-widest block uppercase mt-0.5">VEHICLE AUDITS</span>
            </div>
          </div>

          {/* Nav middle links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-black text-slate-500 uppercase tracking-widest">
            <button type="button" onClick={() => scrollToId('features-section')} className="hover:text-slate-950 cursor-pointer transition">Core Tech</button>
            <button type="button" onClick={() => scrollToId('values-section')} className="hover:text-slate-950 cursor-pointer transition">Product Values</button>
            <button type="button" onClick={() => scrollToId('showcase-section')} className="hover:text-slate-950 cursor-pointer transition">Simulator</button>
            <button type="button" onClick={() => scrollToId('contact-section')} className="hover:text-slate-950 cursor-pointer transition">Contact Us</button>
          </div>

          {/* Action button */}
          <div className="flex items-center gap-3">
            <a 
              href="https://script.google.com/macros/s/AKfycbwzjeKZm-Q9sCqFtwA-Y8JMT2Tpcf7MhlqyH_KBiSIB2zLAMz8o8EfGaZeaaLhMm8VXWw/exec" 
              target="_blank" 
              rel="noopener"
              className="text-xs font-black bg-slate-950 hover:bg-slate-800 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
            >
              Launch App <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </nav>

      {/* ==================================================== */}
      {/* HERO BANNER SECTION */}
      {/* ==================================================== */}
      <header className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-white">
        {/* Subtle decorative mesh background */}
        <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-teal-500/[0.04] rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          {/* Tag badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900/5 px-4 py-1.5 rounded-full text-xs font-bold text-slate-800 tracking-wide uppercase leading-none">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span> 
            Deploying on <strong className="text-slate-950 font-black">ppipro.click</strong>
          </div>

          {/* Core pitch */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1] font-sans">
              The professional platform for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">
                Pre-Purchase Vehicle Inspections
              </span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
              Generate elite, professional-grade automotive reports directly from your mobile device. Instant NHTSA VIN decoding, custom checklists, high-res photos, and real-time private cloud synchronization.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 max-w-sm mx-auto">
            <a 
              href="https://script.google.com/macros/s/AKfycbwzjeKZm-Q9sCqFtwA-Y8JMT2Tpcf7MhlqyH_KBiSIB2zLAMz8o8EfGaZeaaLhMm8VXWw/exec" 
              target="_blank" 
              rel="noopener"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-black text-xs py-4 px-8 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 active:scale-95 transition-all text-center flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 animate-pulse fill-white/10" /> Launch App
            </a>
            <button 
              type="button"
              onClick={() => scrollToId('showcase-section')}
              className="w-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs py-4 px-8 rounded-xl transition-all text-center shadow-lg hover:shadow-xl flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
            >
              Test Mobile Simulator <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trusted indicators */}
          <div className="pt-8 border-t border-slate-100 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-black text-slate-400">
            <span>CERTIFIED VEHICLE AUDITING SYSTEM</span>
            <div className="flex gap-4 items-center">
              <span>NHTSA DECODE SYNCED</span>
              <span className="text-slate-200">|</span>
              <span>SECURE STORAGE VAULT</span>
            </div>
          </div>

        </div>
      </header>

      {/* ==================================================== */}
      {/* ADVANCED BENTO GRID FEATURES SYSTEM */}
      {/* ==================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16" id="features-section">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full uppercase tracking-wider">Engine Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Engineered to eliminate vehicle transaction friction</h2>
          <p className="text-slate-500 text-sm">Everything you need to compile elite field-inspections on standard mobile web browsers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: VIN Decode (6 columns) */}
          <div className="md:col-span-6 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-premium space-y-4">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shadow-inner shrink-0">
              <Zap className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-950 text-lg">Instant NHTSA VIN decoding</h3>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                Stop typing out production details manually. Enter any standard 17-character vehicle identification number (VIN) and fetch manufacturer specs, series models, build years, and engine displacement parameters instantly.
              </p>
            </div>
          </div>

          {/* Card 2: Custom Categories (6 columns) */}
          <div className="md:col-span-6 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-premium space-y-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center shadow-inner shrink-0">
              <Layers className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-950 text-lg">Dynamic Checklist Manager</h3>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                Build and arrange Checklist items easily via system admin settings. Manage specific checklist elements such as emissions passing checks, battery terminals voltage, or brake system linings based on standard ASE standards.
              </p>
            </div>
          </div>

          {/* Card 3: PDF Generation (7 columns) */}
          <div className="md:col-span-7 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-premium flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shadow-inner shrink-0 leading-none">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-950 text-lg">Professional PDF Generation</h3>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                Generate high-fidelity, client-ready vehicle evaluations instantly. Our built-in formatting engine arranges checklists and notes into modular color-coded assessment ledgers with standard pass/attention states.
              </p>
            </div>
          </div>

          {/* Card 4: Shared Links (5 columns) */}
          <div className="md:col-span-5 bg-white border border-slate-250 p-6 sm:p-8 rounded-3xl shadow-premium space-y-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center shadow-inner shrink-0">
              <Smartphone className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-950 text-lg">One-Tap Shared Links</h3>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                Send interactive pre-purchase vehicle summaries and photos directly to prospective buyers via text or email using lightning-fast viewport links with zero software downloads needed.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* USER BENEFIT HIGHLIGHT TOGGLES */}
      {/* ==================================================== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="values-section">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full uppercase tracking-wider">Product Values</span>
          <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Tailored layouts for both sides of the deal</h2>
          <p className="text-slate-500 text-sm">Whether you are crawls under a chassis or detailing a trade-in, we optimize the flow.</p>
        </div>

        {/* Dynamic selector block */}
        <div className="max-w-3xl mx-auto bg-slate-100 p-1.5 rounded-2xl border border-slate-200 flex">
          {CLIENT_BENEFITS.map((b, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveBenefitIndex(idx)}
              className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all outline-none ${
                activeBenefitIndex === idx 
                  ? 'bg-white text-slate-950 shadow-md translate-y-[-1px]' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {b.badge}
            </button>
          ))}
        </div>

        {/* Selected Benefit Slide */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-premium animate-fade-in">
          {CLIENT_BENEFITS.map((b, idx) => {
            if (activeBenefitIndex !== idx) return null;
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 space-y-4">
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">{b.badge}</span>
                  <h3 className="text-2xl font-black text-slate-950 tracking-tight">{b.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{b.description}</p>
                </div>
                <div className="md:col-span-7 space-y-3.5">
                  {b.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex gap-3 items-start text-xs sm:text-sm text-slate-800 bg-slate-50 border border-slate-150 p-4 rounded-xl">
                      <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3px]" />
                      </div>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================== */}
      {/* SCREENSHOT WORKFLOW SHOWCASE */}
      {/* ==================================================== */}
      <section className="bg-slate-900 text-white py-24 border-t border-b border-slate-950" id="showcase-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-teal-400 bg-teal-950/50 border border-teal-500/20 px-3.5 py-1 rounded-full uppercase tracking-wider">
              Pictures of the webapp
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Explore the High-Fidelity Interface</h2>
            <p className="text-slate-400 text-sm">
              Take a walk through the principal viewports of the platform. Designed specifically for professional field appraising and clean online buyer coordination.
            </p>
          </div>

          <VisualShowcase />
        </div>
      </section>

      {/* ==================================================== */}
      {/* CONTACT SECTION WITH WEB3FORMS INTEGRATION */}
      {/* ==================================================== */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200" id="contact-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full uppercase tracking-wider">Get in Touch</span>
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Connect with the Appraisers</h2>
            <p className="text-slate-550 text-sm">
              Have questions about vehicle pre-purchase inspections or want to custom-tailor checklists? Reach out to us below.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-premium p-6 sm:p-10 text-left">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              {/* Web3Forms Access Key explicitly requested */}
              <input type="hidden" name="access_key" value="87774ba7-dcf7-411b-9e40-5e0a81ae5151" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-750 uppercase tracking-wider mb-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="John Doe"
                    className="w-full bg-slate-50/50 border border-slate-250 focus:border-teal-500 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-750 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="john@example.com"
                    className="w-full bg-slate-50/50 border border-slate-250 focus:border-teal-500 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-750 uppercase tracking-wider mb-2">Subject / Request Type</label>
                <select 
                  name="subject" 
                  className="w-full bg-slate-50/50 border border-slate-250 focus:border-teal-500 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none transition text-slate-700"
                >
                  <option value="General Query">General Query</option>
                  <option value="Custom Checklist Template Integration">Custom Checklist Integration</option>
                  <option value="Enterprise Inspection Workflow Setup">Enterprise Applet Setup</option>
                  <option value="Technical Support">Technical Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-755 uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  name="message" 
                  rows={4} 
                  required 
                  placeholder="Tell us about the vehicle inspect templates or support queries you have..."
                  className="w-full bg-slate-50/50 border border-slate-250 focus:border-teal-500 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none transition resize-none"
                ></textarea>
              </div>

              {submitStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-xs font-semibold ${
                    submitStatus === 'success' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                      : 'bg-red-50 text-red-800 border border-red-100'
                  }`}
                >
                  {submitStatus === 'success' 
                    ? 'Thank you! Your message has been sent successfully.' 
                    : 'Oops! Something went wrong. Please check your network and try again.'}
                </motion.div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-400 text-white font-black text-xs py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Sending Message...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" /> Send Secure Message via Web3Forms
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* FOOTER */}
      {/* ==================================================== */}
      <footer className="bg-white border-t border-slate-200/80 py-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 cursor-pointer group animate-fade-in" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-9 h-9 bg-slate-950 rounded-xl flex items-center justify-center text-white shadow-md border border-white/5 relative overflow-hidden">
                <Car className="w-4.5 h-4.5 text-teal-400 relative z-10" />
              </div>
              <div className="leading-none">
                <div className="flex items-center gap-0.5">
                  <span className="font-black text-base text-slate-950 tracking-tighter">
                    PPI<span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-teal-600">Pro</span>
                  </span>
                  <span className="text-teal-500 font-extrabold text-base leading-none">.click</span>
                </div>
                <span className="text-[8px] font-black text-slate-400 font-mono tracking-wider block uppercase mt-0.5">VEHICLE AUDITS</span>
              </div>
            </div>
            <p className="leading-relaxed text-xs">
              Modern automotive evaluations configured directly inside secure private cloud environments. Optimized to prevent inspection friction.
            </p>
          </div>

          <div className="space-y-3">
            <strong className="text-slate-900 tracking-wider uppercase font-black text-[10px] block">Contact Appraiser & Support</strong>
            <p className="space-y-2">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-800">support@ppipro.click</span>
              </span>
            </p>
          </div>

          <div className="space-y-3 md:text-right">
            <strong className="text-slate-900 tracking-wider uppercase font-black text-[10px] block">Legal Disclaimer</strong>
            <p className="leading-normal">
              Reports provided through our viewport represents mockups of vehicle evaluation scores. Active reports compiled on the ppipro.click production applet are bound by standard vehicle appraisal agreements.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 mt-12 pt-6 text-center font-semibold text-slate-400 text-[11px]">
          <span>© 2026 PPIPro.Click. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}
