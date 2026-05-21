import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, CheckSquare, FileText, Search, Share2, Eye, ChevronRight, CornerDownRight, Layers, FileDown, ArrowRight, Smartphone } from 'lucide-react';
import { MobileWizardSimulator } from './MobileWizardSimulator';

export function VisualShowcase() {
  const [activeTab, setActiveTab] = useState<'sim' | 'pdf' | 'dash' | 'checklist'>('sim');
  const [pdfPage, setPdfPage] = useState<1 | 2>(1);
  
  // High fidelity report data synced from the live simulator
  const [reportData, setReportData] = useState<any>({
    vin: '1FM5K8AR3JGC57329',
    year: '2018',
    make: 'FORD',
    model: 'Explorer',
    mileage: '12,345',
    keysCount: '1',
    keysNote: 'Includes 1 smart fob key',
    ratings: {
      'Entertainment/Radio': { value: 'ok', note: '' },
      'Navigation/Back up Camera': { value: 'ok', note: '' },
      'Wiper Operation/Wiper Blades': { value: 'ok', note: '' },
      'Windshield/Window Condition': { value: 'ok', note: '' },
      'Upholstery/Carpet': { value: 'attention', note: '' },
      'AC Compressor/Controls': { value: 'ok', note: '' },
      'Heater & Defroster': { value: 'ok', note: '' }
    },
    additionalNotes: 'Visual and functional appraisal completed successfully. Body panels indicate factory tolerances. Recommending regular service mileage milestones.',
    addedPhotos: [],
    date: '05/20/2026',
    spec: '#483970'
  });

  // Action callback from live mobile wizard to open PDF dynamically
  const handleOpenPdfReport = (vehicleData: any) => {
    setReportData(vehicleData);
    setActiveTab('pdf');
    setPdfPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Tab controls to toggle screenshots/mockups */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { id: 'sim', label: 'Live Mobile Wizard Simulator', icon: Smartphone },
          { id: 'pdf', label: 'Sample PDF Inspection Report', icon: FileText },
          { id: 'dash', label: 'Inspector Mobile Dashboard', icon: LayoutDashboard },
          { id: 'checklist', label: 'Checklist Template Manager', icon: CheckSquare }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all tap-feedback border outline-none ${
              activeTab === tab.id
                ? 'bg-slate-900 border-slate-900 text-white shadow-xl translate-y-[-1px]'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Vector browser/device frame containing high fidelity replica UX screenshots */}
      <div className="bg-slate-900 p-3 sm:p-5 rounded-3xl border border-slate-800 shadow-premium max-w-4xl mx-auto overflow-hidden animate-fade-in">
        {/* Browser Top Window Ribbon */}
        <div className="flex items-center justify-between px-3 pb-3 border-b border-slate-800 shrink-0">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 bg-red-400 border border-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-amber-400 border border-amber-500 rounded-full"></span>
            <span className="w-3 h-3 bg-emerald-400 border border-emerald-500 rounded-full"></span>
          </div>
          <div className="bg-slate-950 px-8 py-1 rounded-lg text-[10px] font-mono text-slate-500 font-medium select-none truncate max-w-sm">
            https://ppipro.click/s/report_view_#483970
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-700 select-none hidden sm:block">DEV PREVIEW</span>
        </div>

        {/* Content Viewer */}
        <div className="bg-slate-50 rounded-2xl p-2 sm:p-6 mt-4 min-h-[460px] relative overflow-hidden text-slate-700">
          <AnimatePresence mode="wait">
            
            {/* TAB 0: LIVE MOBILE WIZARD SIMULATOR */}
            {activeTab === 'sim' && (
              <motion.div
                key="sim-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex items-center justify-center p-0.5 sm:p-4"
              >
                <MobileWizardSimulator onOpenPdfReport={handleOpenPdfReport} />
              </motion.div>
            )}

            {/* TAB 1: PDF REPORT COMPLIANT WITH THE SAMPLE ATTACHED */}
            {activeTab === 'pdf' && (
              <motion.div
                key="pdf-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* PDF Page Toggle Buttons inside viewport */}
                <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Inspection Spec: {reportData.spec || '#483970'}</span>
                    <span className="text-[10px] bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full font-mono font-semibold">
                      {reportData.year} {reportData.make} {reportData.model}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setPdfPage(1)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        pdfPage === 1 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Page 1: Digital Report
                    </button>
                    <button
                      type="button"
                      onClick={() => setPdfPage(2)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        pdfPage === 2 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Page 2: Evidence Photos
                    </button>
                  </div>
                </div>

                {pdfPage === 1 ? (
                  /* PAGE 1: HIGH FIDELITY RECONSTRUCTION OF THE ATTACHED PDF */
                  <div className="bg-white border border-slate-300 shadow-xl rounded-xl p-4 sm:p-8 relative overflow-hidden max-w-3xl mx-auto text-[9px] font-sans text-slate-800 leading-tight text-left">
                    {/* Header Details */}
                    <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-200 pb-3 gap-3">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-xl tracking-tight leading-none uppercase">Pre Purchase Inspection LLC</h3>
                        <span className="text-xs font-bold text-slate-700 block mt-1">Vehicle Inspection Report &nbsp;<span className="text-slate-400 font-normal">{reportData.spec || '#483970'}</span></span>
                      </div>
                      <div className="text-left sm:text-right text-[10px] space-y-0.5 font-medium text-slate-500">
                        <p className="font-bold text-slate-800">Pre Purchase Inspection LLC</p>
                        <p>25354 Pleasant Valley Rd STE 135</p>
                        <p>Chantilly, VA 20152</p>
                        <p className="font-bold text-slate-700">(571)349-6760</p>
                      </div>
                    </div>

                    {/* Rating Color box legend exactly matching the top list */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 pb-3 border-b border-slate-200 font-bold text-[8.5px]">
                      <div className="flex items-center gap-1.5 text-emerald-800">
                        <span className="w-3.5 h-3.5 bg-emerald-500 rounded text-mix flex items-center justify-center font-bold text-[8px] text-white">X</span>
                        <span>Checked & OK</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-blue-800">
                        <span className="w-3.5 h-3.5 bg-blue-500 rounded text-mix flex items-center justify-center font-bold text-[8px] text-white">X</span>
                        <span>Normal for Age/Mileage</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-800">
                        <span className="w-3.5 h-3.5 bg-amber-500 rounded text-mix flex items-center justify-center font-bold text-[8px] text-white">X</span>
                        <span>Future Attention</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-red-800">
                        <span className="w-3.5 h-3.5 bg-red-500 rounded text-mix flex items-center justify-center font-bold text-[8px] text-white">X</span>
                        <span>Immediate Attention</span>
                      </div>
                    </div>

                    {/* Vehicle Metadata boxes */}
                    <div className="bg-slate-50 rounded-lg p-3 my-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] border border-slate-200/80 font-mono text-left">
                      <div>
                        <span className="text-slate-400 block text-[8px] uppercase font-bold leading-none mb-1">VIN Number</span>
                        <strong className="text-slate-800">{reportData.vin}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[8px] uppercase font-bold leading-none mb-1">Year/Make</span>
                        <strong className="text-slate-800">{reportData.year} {reportData.make}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[8px] uppercase font-bold leading-none mb-1">Model Spec</span>
                        <strong className="text-slate-800">{reportData.model}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[8px] uppercase font-bold leading-none mb-1">Tested Mileage / Date</span>
                        <strong className="text-slate-800">{reportData.mileage} mi / {reportData.date}</strong>
                      </div>
                    </div>

                    {/* PDF Table Grid showing 2-column list of items exactly like the PDF */}
                    <div className="space-y-3">
                      {/* Section 1: Interior/Exterior */}
                      <div>
                        <div className="bg-slate-100 px-2 py-1 font-bold text-slate-600 text-[8px] uppercase tracking-wider mb-1.5 rounded text-left">
                          Interior / Exterior
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-left">
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Number of Key(s) <span className="text-red-500 italic text-[8.5px]">{reportData.keysCount || '1'}</span></span>
                            <span className="bg-emerald-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none uppercase">Checked</span>
                          </div>
                          
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Horn Operation {reportData.ratings?.['Horn Operation']?.note && <span className="text-red-500 italic text-[8.5px]">{reportData.ratings?.['Horn Operation']?.note}</span>}</span>
                            <span className={reportData.ratings?.['Horn Operation']?.value === 'immediate' ? 'bg-red-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none' : 'bg-emerald-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none'}>
                              {reportData.ratings?.['Horn Operation']?.value === 'immediate' ? 'Immediate' : 'Checked'}
                            </span>
                          </div>

                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Entertainment / Radio {reportData.ratings?.['Entertainment/Radio']?.note && <span className="text-slate-500 italic text-[8.5px]">({reportData.ratings?.['Entertainment/Radio']?.note})</span>}</span>
                            <span className={reportData.ratings?.['Entertainment/Radio']?.value === 'attention' ? 'bg-amber-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none' : 'bg-emerald-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none'}>
                              {reportData.ratings?.['Entertainment/Radio']?.value === 'attention' ? 'Attention' : 'Checked'}
                            </span>
                          </div>

                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">AC Compressor / Controls {reportData.ratings?.['AC Compressor/Controls']?.note && <span className="text-slate-500 italic text-[8.5px]">({reportData.ratings?.['AC Compressor/Controls']?.note})</span>}</span>
                            <span className="bg-emerald-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none">Checked</span>
                          </div>

                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Navigation / Backup Camera {reportData.ratings?.['Navigation/Back up Camera']?.note && <span className="text-slate-500 italic text-[8.5px]">({reportData.ratings?.['Navigation/Back up Camera']?.note})</span>}</span>
                            <span className={reportData.ratings?.['Navigation/Back up Camera']?.value === 'normal' ? 'bg-blue-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none' : 'bg-emerald-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none'}>
                              {reportData.ratings?.['Navigation/Back up Camera']?.value === 'normal' ? 'Normal' : 'Checked'}
                            </span>
                          </div>

                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Upholstery / Carpet {reportData.ratings?.['Upholstery/Carpet']?.note && <span className="text-slate-500 italic text-[8.5px]">{reportData.ratings?.['Upholstery/Carpet']?.note}</span>}</span>
                            <span className="bg-amber-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none">Attention</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Under Vehicle */}
                      <div>
                        <div className="bg-slate-100 px-2 py-1 font-bold text-slate-600 text-[8px] uppercase tracking-wider mb-1.5 rounded text-left">
                          Under Vehicle
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-left">
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Front Shock Absorbers</span>
                            <span className="bg-blue-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none uppercase">Normal</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Engine Oil / Fluid Leaks <span className="text-red-500 italic text-[8.5px]">oil leak</span></span>
                            <span className="bg-red-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none uppercase">Immediate</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Front Suspension / Bushings</span>
                            <span className="bg-blue-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none uppercase">Normal</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Inspect Nuts & Bolts on Body Chassis</span>
                            <span className="bg-amber-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none uppercase">Attention</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Under Hood */}
                      <div>
                        <div className="bg-slate-100 px-2 py-1 font-bold text-slate-600 text-[8px] uppercase tracking-wider mb-1.5 rounded text-left">
                          Under Hood
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-left">
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Engine Fault Codes</span>
                            <strong className="text-slate-700 font-mono text-[9.5px]">No Codes found</strong>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Fluids: Oil/Coolant Power Steering</span>
                            <span className="bg-emerald-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none uppercase">Checked</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Engine Noise Evaluation</span>
                            <strong className="text-red-605 font-bold font-mono text-[9.5px]">Yes (Valve tap)</strong>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Emissions Monitor Check</span>
                            <strong className="text-slate-400 font-mono text-[9px]">N/A</strong>
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Exterior Inspection */}
                      <div>
                        <div className="bg-slate-100 px-2 py-1 font-bold text-slate-600 text-[8px] uppercase tracking-wider mb-1.5 rounded text-left">
                          Exterior Inspection
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-left">
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Front Bumper & Grille</span>
                            <span className="bg-emerald-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none uppercase">Checked</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Driver Fender <span className="text-red-500 italic text-[1.5px]">painted</span></span>
                            <span className="bg-red-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none uppercase">Immediate</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Driver Door Panel</span>
                            <span className="bg-emerald-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none uppercase">Checked</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1">
                            <span className="font-semibold text-slate-800">Rear Bumper & Trunk Deck</span>
                            <span className="bg-emerald-500 text-white font-mono font-bold px-1.5 py-0.5 rounded text-[8px] leading-none uppercase">Checked</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PDF Additional inspector notes box */}
                    {reportData.additionalNotes && (
                      <div className="mt-4 border border-slate-200 bg-slate-50 rounded-lg p-2.5">
                        <strong className="text-[8px] uppercase font-mono tracking-wide text-slate-400 block mb-1">Additional Inspector Notes</strong>
                        <p className="text-[9px] text-slate-650 font-sans leading-snug">{reportData.additionalNotes}</p>
                      </div>
                    )}

                    {/* PDF Footer Disclaimer exactly similar to the pdf */}
                    <div className="border-t border-slate-200 mt-6 pt-3 text-[7px] text-slate-400 font-medium leading-relaxed uppercase">
                      DISCLAIMER: THIS REPORT IS BASED ON A VISUAL AND FUNCTIONAL ASSESSMENT AT THE TIME OF INSPECTION. IT WAS A STATIONARY INSPECTION WITHOUT A TEST DRIVE AND PROVIDES AN OVERVIEW OF THE VEHICLE'S CONDITION AT THAT MOMENT. IT DOES NOT SERVE AS A WARRANTY OR GUARANTEE OF FUTURE PERFORMANCE.
                    </div>
                  </div>
                ) : (
                  /* PAGE 2: HIGH RESOLUTION EVIDENCE PHOTOS CORRESPONDING TO ATTACHED PAGE 2 */
                  <div className="bg-white border border-slate-300 shadow-xl rounded-xl p-4 sm:p-8 relative overflow-hidden max-w-3xl mx-auto text-[10px] font-sans text-slate-800 leading-tight">
                    <div className="text-center border-b border-slate-200 pb-4">
                      <h4 className="font-extrabold text-slate-900 text-lg uppercase tracking-tight">Inspection Photos (Page 1 of 1)</h4>
                      <p className="font-mono text-slate-500 text-xs mt-1">{reportData.spec || '#483970'} - {reportData.year} {reportData.make} {reportData.model}</p>
                    </div>

                    {/* PDF Image evidence slots */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6">
                      {reportData.addedPhotos && reportData.addedPhotos.length > 0 ? (
                        reportData.addedPhotos.slice(0, 4).map((photo: any, index: number) => (
                          <div key={photo.id} className="space-y-2 text-center animate-fade-in">
                            <div className="aspect-[4/3] bg-slate-105 rounded-lg overflow-hidden border border-slate-200 shadow-sm relative">
                              <img 
                                src={photo.url} 
                                alt={photo.title} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <span className="font-bold text-slate-600 block text-xs">{photo.title}</span>
                          </div>
                        ))
                      ) : (
                        <>
                          {/* Photo 1 Container */}
                          <div className="space-y-2 text-center">
                            <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-sm relative">
                              <img 
                                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400" 
                                alt="Under chassis coil springs" 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <span className="font-bold text-slate-600 block text-xs">Photo 1: Under-carriage Frame Rail, Shock Absorb, and Coils</span>
                          </div>

                          {/* Photo 2 Container */}
                          <div className="space-y-2 text-center">
                            <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-sm relative">
                              <img 
                                src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=400" 
                                alt="Engine pulleys belt oil" 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <span className="font-bold text-slate-600 block text-xs">Photo 2: Serpentine Belt Pulleys and Timing Cover Oil Weep Leak</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Footer disclaimer */}
                    <div className="border-t border-slate-200 mt-12 pt-3 text-[7px] text-slate-400 font-medium leading-relaxed uppercase">
                      DISCLAIMER: THIS REPORT IS BASED ON A VISUAL AND FUNCTIONAL ASSESSMENT AT THE TIME OF INSPECTION. IT WAS A STATIONARY INSPECTION WITHOUT A TEST DRIVE AND PROVIDES AN OVERVIEW OF THE VEHICLE'S CONDITION AT THAT MOMENT. IT DOES NOT SERVE AS A WARRANTY OR GUARANTEE OF FUTURE PERFORMANCE.
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: MOBILE COMPASS DASHBOARD */}
            {activeTab === 'dash' && (
              <motion.div
                key="dash-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Header Replica */}
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">P</div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm tracking-tight leading-none">PPIPro Applet</h4>
                      <span className="text-[9px] text-slate-400 font-semibold font-mono">SECURE CLOUD PLATFORM</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mt-1.5"></span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">Inspector Active</span>
                  </div>
                </div>

                {/* Hero Widget Section */}
                <div className="bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-36 h-36 bg-teal-500/20 rounded-full filter blur-xl"></div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h5 className="font-extrabold text-lg animate-pulse">Start Diagnosis</h5>
                      <p className="text-slate-400 text-xs mt-0.5">Initialize a secure vehicular assessment. Access is private and synced in your cloud vault.</p>
                    </div>
                    <button type="button" className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg shrink-0 flex items-center gap-1.5 shadow-sm">
                      Start New Inspection
                    </button>
                  </div>
                </div>

                {/* Active Resumable Drafts */}
                <div className="space-y-2">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                     ACTIVE RESUMABLE DRAFTS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white border border-slate-200 rounded-xl p-3 flex justify-between items-center shadow-sm">
                      <div>
                        <span className="font-extrabold text-xs text-slate-800">2018 FORD Explorer</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Saved today, 7:02 PM EST</span>
                      </div>
                      <button type="button" className="bg-slate-100 text-slate-800 font-bold text-[10px] px-3 py-1.5 rounded-lg border border-slate-200">Resume</button>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-3 flex justify-between items-center shadow-sm opacity-75">
                      <div>
                        <span className="font-extrabold text-xs text-slate-800">2015 Audi A4 Premium</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Saved yesterday, 4:10 PM EST</span>
                      </div>
                      <button type="button" className="bg-slate-100 text-slate-800 font-bold text-[10px] px-3 py-1.5 rounded-lg border border-slate-200">Resume</button>
                    </div>
                  </div>
                </div>

                {/* Recent Complete Reports List */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Completed Evaluations</h5>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-sm overflow-hidden">
                    {[
                      { v: "2018 FORD Explorer", vin: "1FM5K8AR3JGC5...", miles: "12,345", date: "05/20/2026", url: "https://drive.google.com/..." },
                      { v: "2019 Toyota Highlander", vin: "5TDYK3EH7KS992...", miles: "68,450", date: "05/17/2026", url: "https://drive.google.com/..." }
                    ].map((row, rIdx) => (
                      <div key={rIdx} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50 transition">
                        <div className="min-w-0 pr-4">
                          <span className="font-extrabold text-slate-800 block text-xs">{row.v}</span>
                          <span className="text-[10px] text-slate-400 font-mono">VIN: {row.vin} &bull; {row.miles} miles</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">{row.date}</span>
                          <button type="button" className="bg-slate-100 p-2 rounded-lg text-slate-600 hover:bg-slate-200" title="Copy share link">
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button type="button" className="bg-slate-900 p-2 rounded-lg text-white font-bold flex items-center gap-1 hover:bg-slate-800 text-[10px]">
                            <Eye className="w-3.5 h-3.5" /> View PDF
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: CHECKLIST MANAGER */}
            {activeTab === 'checklist' && (
              <motion.div
                key="checklist-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Checklist Customization Mockup Screen */}
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                       Checklist Templates
                    </h4>
                    <p className="text-slate-400 text-[10px] mt-0.5">Customize the items appearing in the rating ledger to reflect vehicle types.</p>
                  </div>
                  <button type="button" className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-lg">Save Template Config</button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Interior/Exterior", items: ["Number of Key(s)", "Entertainment/Radio", "AC Compressor/Controls", "Heater", "Defroster"] },
                    { name: "Under Hood & Engine", items: ["Engine Fault Codes", "Engine Noise", "Emissions Pass", "Fluids: Oil/Coolant/Washers"] },
                    { name: "Brake System", items: ["Front Brake Pads", "Front Brake Rotors", "Brake Fluid", "LF/RF Lining Condition"] }
                  ].map((sec, sIdx) => (
                    <div key={sIdx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 flex justify-between items-center">
                        <span className="font-extrabold text-xs text-slate-700">{sec.name}</span>
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-2 rounded-md font-bold">{sec.items.length} fields</span>
                      </div>
                      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {sec.items.map((it, iIdx) => (
                          <div key={iIdx} className="bg-slate-50 border border-slate-150 rounded-lg px-3 py-2 flex justify-between items-center">
                            <span className="text-slate-600 font-medium">{it}</span>
                            <span className="text-[8px] text-slate-300 font-bold uppercase">Template Default</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
