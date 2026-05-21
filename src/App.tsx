import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, ShieldCheck, Smartphone, Zap, Layers, ArrowRight, Check, 
  Sparkles, Mail, User, Info, MessageSquare, CheckCircle2, AlertCircle, Phone
} from 'lucide-react';
import { VisualShowcase } from './components/VisualShowcase';

export default function App() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'err' | null>(null);
  const [submittedName, setSubmittedName] = useState<string>('');
  const [previewTab, setPreviewTab] = useState<'live' | 'mock'>('live');

  // Smooth scroll handler
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.currentTarget);
    const nameVal = formData.get('name') as string;
    setSubmittedName(nameVal || '');

    // Access key explicitly requested by user (both standard and project keys backed up)
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
      } else {
        setSubmitStatus('err');
      }
    } catch (err) {
      setSubmitStatus('err');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white antialiased overflow-x-hidden">
      
      {/* ==================================================== */}
      {/* NAVIGATION HEADER */}
      {/* ==================================================== */}
      <nav className="fixed w-full z-50 glass-header border-b border-slate-200 shadow-sm transition-all h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          
          {/* Stylish Logo */}
          <button 
            type="button" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center gap-3 group text-left outline-none cursor-pointer"
            id="brand-logo"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20 transform group-hover:-rotate-3 transition-transform duration-300">
              <ShieldCheck className="w-6 h-6 text-brand-400 stroke-[2.2]" />
            </div>
            <span className="font-black text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-brand-600">
              PPIPro<span className="text-brand-500">.Click</span>
            </span>
          </button>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <button type="button" onClick={() => scrollToId('features')} className="hover:text-brand-600 transition-colors uppercase outline-none cursor-pointer">Features</button>
            <button type="button" onClick={() => scrollToId('how-it-works')} className="hover:text-brand-600 transition-colors uppercase outline-none cursor-pointer">How it Works</button>
            <button type="button" onClick={() => scrollToId('preview')} className="hover:text-brand-600 transition-colors uppercase outline-none cursor-pointer">Preview</button>
            <button type="button" onClick={() => scrollToId('contact')} className="hover:text-brand-600 transition-colors uppercase outline-none cursor-pointer">Contact</button>
          </div>

          {/* CTA Header Run Action */}
          <div className="flex items-center">
            <a 
              href="https://script.google.com/macros/s/AKfycbwzjeKZm-Q9sCqFtwA-Y8JMT2Tpcf7MhlqyH_KBiSIB2zLAMz8o8EfGaZeaaLhMm8VXWw/exec" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-900 hover:bg-brand-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-slate-900/20 active:scale-95 flex items-center gap-2"
              id="nav-cta-button"
            >
              Launch App
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* ==================================================== */}
      {/* HERO SECTION */}
      {/* ==================================================== */}
      <section className="pt-40 pb-24 hero-gradient overflow-hidden relative" id="hero-banner">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 text-left">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white border border-brand-100 text-brand-600 px-4 py-2 rounded-full text-sm font-bold mb-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              The New Standard in Mobile Inspections
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[5.2rem] font-black text-slate-900 leading-[1.05] tracking-tight">
              Professional PPI Reports <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-400">in Minutes.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
              Stop using paper forms. PPIPro.Click is the mobile-first platform built for inspectors who need professional PDF reports, automatic VIN decoding, and cloud storage—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://script.google.com/macros/s/AKfycbwzjeKZm-Q9sCqFtwA-Y8JMT2Tpcf7MhlqyH_KBiSIB2zLAMz8o8EfGaZeaaLhMm8VXWw/exec" 
                className="bg-brand-500 hover:bg-brand-600 text-white text-lg px-8 py-4 rounded-2xl font-bold text-center shadow-xl shadow-brand-500/30 transition-all duration-300 transform hover:-translate-y-1 block"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-launch"
              >
                Start Your First Inspection
              </a>
              <button 
                type="button" 
                onClick={() => scrollToId('how-it-works')}
                className="bg-white border border-slate-200 text-slate-700 text-lg px-8 py-4 rounded-2xl font-bold text-center hover:bg-slate-50 transition-all shadow-sm cursor-pointer outline-none"
              >
                View Demo
              </button>
            </div>
            
            {/* Quick value indicators */}
            <div className="mt-12 flex items-center gap-8 text-slate-500 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 font-extrabold text-sm">100% Mobile</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">iOS & Android</span>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 font-extrabold text-sm">Instant PDF</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Dealer Quality</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Mockup showcasing application context */}
          <div className="relative mx-auto w-full max-w-[280px] lg:max-w-none flex justify-center perspective-1000">
            <div className="relative w-[260px] aspect-[9/19.5] bg-slate-800 rounded-[2.5rem] p-[0.35rem] phone-frame transform rotate-2 hover:rotate-0 transition-transform duration-500 group z-10 shadow-2xl overflow-hidden">
              <img 
                src="https://ppi.is-best.net/pictures/prepurchaseinspectionwebapp/IMG_8012.jpg" 
                alt="App Dashboard" 
                className="rounded-[2.1rem] w-full h-full object-cover border border-slate-700" 
                referrerPolicy="no-referrer"
              />
              {/* Dynamic Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center pointer-events-none">
                <div className="w-1/3 h-5 bg-[#0f172a] rounded-b-xl"></div>
              </div>
            </div>
            {/* Abstract glow effects behind frame */}
            <div className="absolute top-1/4 -right-10 w-72 h-72 bg-brand-400/30 blur-[64px] rounded-full mix-blend-multiply pointer-events-none"></div>
            <div className="absolute bottom-10 -left-10 w-72 h-72 bg-blue-400/20 blur-[64px] rounded-full mix-blend-multiply pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* FEATURES SECTION */}
      {/* ==================================================== */}
      <section id="features" class="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-sm font-black text-brand-600 uppercase tracking-widest">Powerful Features</h2>
            <p className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Everything you need to scale your inspection business.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-left">
              <div className="w-16 h-16 bg-white border border-slate-200 text-brand-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-brand-500 group-hover:text-white group-hover:border-transparent transition-all">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Smart VIN Decoding</h3>
              <p className="text-slate-600 leading-relaxed font-semibold text-sm">Simply enter a 17-digit VIN and our system automatically pulls the Year, Make, and Model instantly to save you time.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-left">
              <div className="w-16 h-16 bg-white border border-slate-200 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Luxury PDF Reports</h3>
              <p className="text-slate-600 leading-relaxed font-semibold text-sm">Generate dealership-grade PDFs with color-coded safety statuses, comprehensive layouts, and integrated photos.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-left">
              <div className="w-16 h-16 bg-white border border-slate-200 text-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-purple-600 group-hover:text-white group-hover:border-transparent transition-all">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Fully Customizable</h3>
              <p className="text-slate-600 leading-relaxed font-semibold text-sm">Your inspection, your way. Easily add, remove, or modify checklist items to match your workflow exactly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* HOW IT WORKS */}
      {/* ==================================================== */}
      <section id="how-it-works" class="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 text-left space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">The Fastest Way to Complete an Inspection</h2>
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center font-black text-xl group-hover:border-brand-500 group-hover:text-brand-500 transition-colors shadow-sm">1</div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2 text-slate-900">Input & Decode</h4>
                    <p class="text-slate-600 text-lg leading-relaxed">Enter the vehicle VIN and mileage. Our system handles the heavy lifting, pulling exact details instantly.</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center font-black text-xl group-hover:border-brand-500 group-hover:text-brand-500 transition-colors shadow-sm">2</div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2 text-slate-900">Conduct Inspection</h4>
                    <p class="text-slate-600 text-lg leading-relaxed">Tap through the mobile-optimized checklist. Take photos and add notes directly from your phone's browser.</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center font-black text-xl group-hover:border-brand-500 group-hover:text-brand-500 transition-colors shadow-sm">3</div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2 text-slate-900">Share & File</h4>
                    <p class="text-slate-600 text-lg leading-relaxed">Generate a stunning PDF. Share it instantly with the customer via SMS or Email directly from the success screen.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Desktop PDF Previews on the Right */}
            <div className="lg:w-1/2 relative w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] transform lg:-rotate-2 transition-transform duration-500 hover:rotate-0">
                {/* Main Report Image */}
                <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl border border-slate-200">
                  <img 
                    src="https://ppi.is-best.net/pictures/prepurchaseinspectionwebapp/ppisample1.jpeg" 
                    alt="PDF Report Page 1" 
                    className="w-full rounded-xl border border-slate-100" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Photos Addendum Image overlaying */}
                <div className="absolute -bottom-12 -right-6 lg:-right-12 w-3/5 z-20 bg-white p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200 transform rotate-6 hover:rotate-2 transition-transform duration-300">
                  <img 
                    src="https://ppi.is-best.net/pictures/prepurchaseinspectionwebapp/ppiphotos.jpeg" 
                    alt="PDF Photos Addendum" 
                    className="w-full rounded-xl border border-slate-100" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="absolute inset-0 bg-brand-500 blur-[80px] opacity-10 rounded-[3rem] -z-10 transform scale-110 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SHOWCASE & SIMULATOR EXPERIMENT WORKSPACE */}
      {/* ==================================================== */}
      <section id="preview" className="py-24 bg-slate-900 text-white overflow-hidden relative border-t-8 border-brand-500">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white">Designed for Professionals, Built for the Field.</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              A clean, intuitive interface that works flawlessly on your smartphone. We offer both a live simulated trial sandbox and high fidelity production mockup showcases.
            </p>

            {/* Simulated Live toggle layout switch */}
            <div className="inline-flex p-1 bg-slate-850 rounded-xl border border-slate-800 self-center mt-4">
              <button
                type="button"
                onClick={() => setPreviewTab('live')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all outline-none cursor-pointer ${
                  previewTab === 'live' 
                    ? 'bg-brand-500 text-white shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive Live Simulator
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab('mock')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all outline-none cursor-pointer ${
                  previewTab === 'mock' 
                    ? 'bg-brand-500 text-white shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Production Viewport Mockups
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {previewTab === 'live' ? (
              <motion.div
                key="workspace-interactive"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center max-w-md mx-auto mb-2">
                  <span className="text-xs bg-slate-800 text-brand-400 border border-brand-500/15 font-mono px-3 py-1 rounded-full uppercase tracking-wider block font-bold">
                    ★ Developer Sandbox Active
                  </span>
                </div>
                <VisualShowcase />
              </motion.div>
            ) : (
              <motion.div
                key="viewport-mockups"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-nowrap lg:justify-center items-center gap-8 overflow-x-auto hide-scrollbar pb-10 px-4 -mx-4 lg:mx-0 select-none"
              >
                {/* Mockup 1: VIN Decode */}
                <div className="flex-none w-[260px] transform lg:translate-y-8 transition-transform hover:-translate-y-2 duration-300">
                  <div className="bg-slate-800 rounded-[2.5rem] p-[0.35rem] shadow-2xl phone-frame aspect-[9/19.5] relative overflow-hidden">
                    <img 
                      src="https://ppi.is-best.net/pictures/prepurchaseinspectionwebapp/IMG_8011.jpg" 
                      alt="VIN Decoding Screen" 
                      className="rounded-[2.1rem] w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-center mt-6 font-bold text-slate-400 uppercase tracking-widest text-xs">1. Quick Decode</p>
                </div>

                {/* Mockup 2: Inspection Checklist */}
                <div className="flex-none w-[280px] transform z-10 transition-transform hover:-translate-y-4 duration-300">
                  <div className="bg-slate-800 rounded-[2.5rem] p-[0.35rem] shadow-2xl phone-frame border border-brand-500/30 aspect-[9/19.5] relative overflow-hidden">
                    <img 
                      src="https://ppi.is-best.net/pictures/prepurchaseinspectionwebapp/IMG_8014.jpg" 
                      alt="Inspection Checklist Screen" 
                      className="rounded-[2.1rem] w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-center mt-6 font-bold text-brand-400 uppercase tracking-widest text-xs">2. Intuitive Checklist</p>
                </div>

                {/* Mockup 3: Add Photos */}
                <div className="flex-none w-[260px] transform lg:translate-y-8 transition-transform hover:-translate-y-2 duration-300">
                  <div className="bg-slate-800 rounded-[2.5rem] p-[0.35rem] shadow-2xl phone-frame aspect-[9/19.5] relative overflow-hidden">
                    <img 
                      src="https://ppi.is-best.net/pictures/prepurchaseinspectionwebapp/IMG_8015.jpg" 
                      alt="Photos & Notes Screen" 
                      className="rounded-[2.1rem] w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-center mt-6 font-bold text-slate-400 uppercase tracking-widest text-xs">3. Photos & Notes</p>
                </div>
                
                {/* Mockup 4: Generate Success */}
                <div className="flex-none w-[260px] transform lg:translate-y-16 transition-transform hover:translate-y-12 duration-300">
                  <div className="bg-slate-800 rounded-[2.5rem] p-[0.35rem] shadow-2xl phone-frame aspect-[9/19.5] relative overflow-hidden">
                    <img 
                      src="https://ppi.is-best.net/pictures/prepurchaseinspectionwebapp/IMG_8017.jpg" 
                      alt="Success Screen" 
                      className="rounded-[2.1rem] w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-center mt-6 font-bold text-slate-400 uppercase tracking-widest text-xs">4. Instant Share</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ==================================================== */}
      {/* WEB3FORMS CONTACT SECTION */}
      {/* ==================================================== */}
      <section id="contact" className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <h2 className="text-sm font-black text-brand-600 uppercase tracking-widest">Support & Inquiries</h2>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Get in Touch</h3>
            <p className="text-lg sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Have questions about setting up your customized inspection template? Send us a message and our team will help you get started.
            </p>
          </div>
          
          {/* Professional Form Card / Success Feedback wrapper */}
          <div className="bg-white p-6 sm:p-10 md:p-14 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 relative overflow-hidden text-left">
            {/* Decorative layout element */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gradient-to-br from-brand-50 to-brand-100/50 blur-3xl -z-10 pointer-events-none"></div>

            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                /* EXTREMELY PROFESSIONAL THANK YOU CARD */
                <motion.div 
                  key="thank-you-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-10 text-center space-y-6 max-w-xl mx-auto relative z-10"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500 border-4 border-white shadow-lg shadow-emerald-500/10">
                    <Check className="w-10 h-10 stroke-[3]" />
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-3xl font-black text-slate-900 tracking-tight">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-slate-600 font-medium text-base">
                      Thank you, <span className="text-brand-600 font-extrabold">{submittedName || 'there'}</span>. We have securely received your inquiry via Web3Forms.
                    </p>
                    <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                      Our system administration appraisers and custom template specialists are reviewing your request. We generally reply to all inquiries on the same business day.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="button"
                      onClick={() => {
                        setSubmitStatus(null);
                        setSubmittedName('');
                      }}
                      className="bg-slate-900 hover:bg-brand-500 text-white font-extrabold px-6 py-3 rounded-xl transition duration-300 shadow-md active:scale-95 outline-none cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* HIGH STYLISH PROFESSIONAL INQUIRY FORM */
                <motion.form 
                  key="form-view"
                  onSubmit={handleContactSubmit}
                  className="space-y-5 sm:space-y-6 relative z-10"
                >
                  <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-bold text-slate-700 ml-1">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400 stroke-[2]" />
                        </div>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          required 
                          placeholder="John Doe" 
                          className="w-full pl-11 pr-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-bold text-slate-700 ml-1">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400 stroke-[2]" />
                        </div>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          required 
                          placeholder="john@example.com" 
                          className="w-full pl-11 pr-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-bold text-slate-700 ml-1">Subject</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Info className="h-5 w-5 text-slate-400 stroke-[2]" />
                      </div>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        required 
                        placeholder="How can we help you today?" 
                        className="w-full pl-11 pr-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-bold text-slate-700 ml-1">Message</label>
                    <div className="relative">
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={5} 
                        required 
                        placeholder="Tell us about your inspection workflow needs, desired custom features, or general questions..." 
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium resize-none shadow-sm"
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* Honeypot anti-spam check */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                  {submitStatus === 'err' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-800 text-xs font-semibold flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>Oops! Critical communication issue. Please review your network state and retry.</span>
                    </motion.div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-brand-600 hover:to-brand-500 text-white font-extrabold text-lg py-5 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-slate-900/20 active:scale-95 flex justify-center items-center gap-2 mt-4 cursor-pointer outline-none"
                  >
                    {isSubmitting ? (
                      <>Sending Message...</>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* PRICING / CTA SECTION */}
      {/* ==================================================== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center bg-gradient-to-br from-brand-600 to-brand-505 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-brand-500/30">
          <div className="relative z-10 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 sm:mb-8 tracking-tight">Ready to upgrade your inspections?</h2>
            
            {/* Pricing Features */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 text-white/90 font-bold mb-8 text-sm uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-brand-200 stroke-[3]" />
                No monthly subscription
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-brand-200 stroke-[3]" />
                No hidden fees
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-brand-200 stroke-[3]" />
                No video training
              </div>
            </div>

            {/* Price Tag */}
            <div className="mb-10 sm:mb-12">
              <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter">$499</span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-brand-100 ml-2">one-time purchase</span>
            </div>

            <a 
              href="https://script.google.com/macros/s/AKfycbwzjeKZm-Q9sCqFtwA-Y8JMT2Tpcf7MhlqyH_KBiSIB2zLAMz8o8EfGaZeaaLhMm8VXWw/exec" 
              className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-white text-brand-600 hover:text-slate-900 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl transition-all duration-300 transform hover:-translate-y-1 shadow-2xl block"
              id="bottom-cta-launch"
            >
              Launch Web App
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          
          {/* Decorative design aesthetics behind pricing banner */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-slate-900/15 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* FOOTER */}
      {/* ==================================================== */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4.5 h-4.5 text-brand-400" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">PPIPro<span className="text-brand-500">.Click</span></span>
          </div>
          <p className="text-sm font-medium">© 2026 PPIPro.Click. Built for professional inspectors.</p>
        </div>
      </footer>

    </div>
  );
}
