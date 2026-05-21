import React, { useState, useEffect } from 'react';
import { 
  Car, Shield, Smartphone, FileSpreadsheet, Lock, Sparkles, Check, 
  ArrowRight, ShieldCheck, Mail, Phone, MapPin, Zap, RefreshCw, Layers,
  Settings, LogOut, Plus, Search, Share2, Eye, ChevronRight, FileText,
  Camera, Copy, X, ChevronLeft, Info, AlertTriangle, CheckSquare
} from 'lucide-react';

// Predefined VIN templates to auto-fill (Decode)
const DECODE_TEMPLATES = {
  'WBAFZ9C54DD090664': {
    year: '2013',
    make: 'BMW',
    model: 'ActiveHybrid 5',
    mileage: '78899',
    vinkey: 'WBAFZ9C54DD090664'
  },
  'JTMRFREV7FD162353': {
    year: '2015',
    make: 'TOYOTA',
    model: 'RAV4',
    mileage: '123456',
    vinkey: 'JTMRFREV7FD162353'
  }
};

// Preset photos modeled after the user's sample PPI Report
const SAMPLE_PHOTOS = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600',
    title: 'Photo 1: Under-carriage Frame Rail, Oil Filter, and Oil Pan'
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=600',
    title: 'Photo 2: Serpentine Belt, Tensioner Cover, and Lower Control Arm Bushings'
  }
];

interface MobileWizardSimulatorProps {
  onOpenPdfReport: (vehicleData: any) => void;
}

export function MobileWizardSimulator({ onOpenPdfReport }: MobileWizardSimulatorProps) {
  // Mobile UI Step/Stage state
  // 0: Dashboard, 1: Vehicle Info, 2: Checklist questions, 3: Photos & Notes, 4: Loading progress, 5: Success Report
  const [stage, setStage] = useState<number>(0);
  const [vin, setVin] = useState<string>('WBAFZ9C54DD090664');
  const [year, setYear] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [mileage, setMileage] = useState<string>('');
  
  // Verification states
  const [isDecoding, setIsDecoding] = useState<boolean>(false);
  
  // Checklist questions states
  const [keysCount, setKeysCount] = useState<string>('2');
  const [keysNote, setKeysNote] = useState<string>('');
  
  // Rating values: 'ok' | 'normal' | 'attention' | 'immediate' | 'na'
  const [ratings, setRatings] = useState<Record<string, { value: string; note: string }>>({
    'Entertainment/Radio': { value: 'ok', note: '' },
    'Navigation/Back up Camera': { value: 'normal', note: '' },
    'Wiper Operation/Wiper Blades': { value: 'attention', note: 'Needs wiper blades replacement' },
    'Windshield/Window Condition': { value: 'ok', note: '' },
    'Upholstery/Carpet': { value: 'normal', note: '' },
    'AC Compressor/Controls': { value: 'ok', note: '' },
    'Heater & Defroster': { value: 'ok', note: '' }
  });

  // Additional Notes and Photo states
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [addedPhotos, setAddedPhotos] = useState<Array<{ id: string; url: string; title: string }>>([]);
  
  // Success states
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Auto-decode VIN helper
  const handleDecode = () => {
    setIsDecoding(true);
    setTimeout(() => {
      setIsDecoding(false);
      const cleanVin = vin.trim().toUpperCase();
      const template = DECODE_TEMPLATES[cleanVin as keyof typeof DECODE_TEMPLATES];
      if (template) {
        setYear(template.year);
        setMake(template.make);
        setModel(template.model);
        setMileage(template.mileage);
        triggerToast('VIN decoded successfully from NHTSA records!');
      } else {
        // Fallback for custom entries
        setYear('2018');
        setMake('FORD');
        setModel('Explorer');
        setMileage('45200');
        triggerToast('NHTSA API: Custom vehicle details fetched!');
      }
    }, 850);
  };

  // Toast trigger
  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  // Resume Draft handler
  const handleResumeDraft = (vinkey: 'WBAFZ9C54DD090664' | 'JTMRFREV7FD162353') => {
    const data = DECODE_TEMPLATES[vinkey];
    setVin(data.vinkey);
    setYear(data.year);
    setMake(data.make);
    setModel(data.model);
    setMileage(data.mileage);
    
    // Adjust checklist states to match draft data if RAV4
    if (vinkey === 'JTMRFREV7FD162353') {
      setKeysCount('2');
      setRatings({
        'Entertainment/Radio': { value: 'ok', note: '' },
        'Navigation/Back up Camera': { value: 'ok', note: '' },
        'Wiper Operation/Wiper Blades': { value: 'attention', note: 'needs wiper blades' },
        'Windshield/Window Condition': { value: 'ok', note: '' },
        'Upholstery/Carpet': { value: 'normal', note: '' },
        'AC Compressor/Controls': { value: 'ok', note: '' },
        'Heater & Defroster': { value: 'ok', note: '' }
      });
      setAdditionalNotes('Overall good frame, minor rust beginning on rear suspension arm.');
    } else {
      setKeysCount('2');
      setRatings({
        'Entertainment/Radio': { value: 'ok', note: '' },
        'Navigation/Back up Camera': { value: 'normal', note: '' },
        'Wiper Operation/Wiper Blades': { value: 'attention', note: 'Needs wiper blades replacement' },
        'Windshield/Window Condition': { value: 'ok', note: '' },
        'Upholstery/Carpet': { value: 'normal', note: '' },
        'AC Compressor/Controls': { value: 'ok', note: '' },
        'Heater & Defroster': { value: 'ok', note: '' }
      });
      setAdditionalNotes('');
    }
    
    setStage(1);
    triggerToast(`Resumed draft for ${data.year} ${data.make} ${data.model}`);
  };

  // Start checking process handler
  const handleStartInspection = () => {
    // Reset values to clear
    setVin('WBAFZ9C54DD090664');
    setYear('');
    setMake('');
    setModel('');
    setMileage('');
    setAddedPhotos([]);
    setAdditionalNotes('');
    setStage(1);
  };

  // Toggle checklist button value
  const handleRatingToggle = (itemKey: string, val: string) => {
    setRatings(prev => ({
      ...prev,
      [itemKey]: {
        ...prev[itemKey],
        value: val
      }
    }));
  };

  // Handle rating comment change
  const handleRatingCommentChange = (itemKey: string, comment: string) => {
    setRatings(prev => ({
      ...prev,
      [itemKey]: {
        ...prev[itemKey],
        note: comment
      }
    }));
  };

  // Add photos
  const handleAddPhoto = () => {
    if (addedPhotos.length >= 12) {
      triggerToast('Maximum photgraphs limit reached for report (12 Max)');
      return;
    }
    const nextPhotoIndex = addedPhotos.length % SAMPLE_PHOTOS.length;
    const photoToAdd = {
      id: `photo-${Date.now()}-${addedPhotos.length}`,
      url: SAMPLE_PHOTOS[nextPhotoIndex].url,
      title: addedPhotos.length === 0 
        ? 'Photo 1: Under-carriage structural frame rails, oil filter, and exhaust fittings'
        : `Photo ${addedPhotos.length + 1}: Serpentine belt assembly and engine compartment`
    };
    setAddedPhotos(prev => [...prev, photoToAdd]);
    triggerToast(`Inspection photo ${addedPhotos.length + 1} attached!`);
  };

  // Trigger submission to spreadsheet
  const handleGenerateReportSubmit = () => {
    setStage(4); // Advance to Loading Spinner Page
    
    // Automatically transition to Success Stage after exactly 1900ms
    setTimeout(() => {
      const generatedCode = Math.floor(100000 + Math.random() * 900000);
      setGeneratedPdfUrl(`https://drive.google.com/file/d/1SgDsfHCCALmY9N8f1eO29pQ-${generatedCode}/view`);
      setStage(5);
    }, 1900);
  };

  // Copy drive link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedPdfUrl);
    setIsCopied(true);
    triggerToast('Drive link copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Launch report viewer on parent
  const handleLaunchParentPdfViewer = () => {
    onOpenPdfReport({
      vin: vin || 'WBAFZ9C54DD090664',
      year: year || '2013',
      make: make || 'BMW',
      model: model || 'ActiveHybrid 5',
      mileage: mileage || '78899',
      keysCount,
      keysNote,
      ratings,
      additionalNotes: additionalNotes || 'Completed vehicle appraisal with no diagnostic faults found.',
      addedPhotos: addedPhotos.length > 0 ? addedPhotos : SAMPLE_PHOTOS,
      date: '05/21/2026',
      spec: '#551665'
    });
  };

  return (
    <div className="relative mx-auto max-w-[375px] h-[760px] bg-slate-950 rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-800 ring-12 ring-slate-900 overflow-hidden flex flex-col font-sans select-none">
      
      {/* Phone Notch/Dynamic Island Speaker */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-full z-50 flex items-center justify-between px-4">
        <span className="w-1.5 h-1.5 bg-slate-850 rounded-full"></span>
        <div className="w-14 h-3 bg-slate-900 rounded-full flex items-center justify-center">
          <span className="w-2 h-0.5 bg-slate-800 rounded-full"></span>
        </div>
        <span className="w-1.5 h-1.5 bg-slate-850 rounded-full"></span>
      </div>

      {/* Screen Container */}
      <div className="w-full h-full bg-slate-50 rounded-[38px] overflow-hidden relative flex flex-col pt-8 text-slate-800">
        
        {/* Toast Container */}
        {showToast && (
          <div className="absolute top-20 left-4 right-4 bg-slate-900/95 backdrop-blur text-white text-[11px] font-bold py-2 px-3 rounded-xl shadow-lg border border-slate-850 z-50 flex items-center gap-2 animate-bounce">
            <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{showToast}</span>
          </div>
        )}

        {/* STAGE 0: HOME / INSPECT DASHBOARD */}
        {stage === 0 && (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Top Navigation Bar */}
            <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-slate-950 rounded-lg flex items-center justify-center text-white">
                  <Car className="w-4 h-4 text-teal-400" />
                </div>
                <div className="leading-none text-left">
                  <span className="font-extrabold text-sm tracking-tighter text-slate-950">
                    PPPro<span className="text-teal-500 font-extrabold italic">.Click</span>
                  </span>
                  <span className="text-[7.5px] font-black text-slate-400 block uppercase font-mono tracking-wider">PPI Module</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500" title="Settings">
                  <Settings className="w-4 h-4" />
                </button>
                <button type="button" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-4 space-y-5 flex-1 text-left">
              
              {/* Ready to Inspect Card Banner */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-4 text-white relative overflow-hidden shadow-md">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-teal-500/20 rounded-full blur-xl"></div>
                <div className="space-y-3 relative z-10">
                  <h3 className="font-black text-base tracking-tight text-white">Ready to Inspect?</h3>
                  <p className="text-slate-400 text-[11px] leading-tight font-medium">
                    Start a new comprehensive vehicle inspection — optimized for field use.
                  </p>
                  <button 
                    type="button"
                    onClick={handleStartInspection}
                    className="w-full bg-[#06b6d4] hover:bg-[#0891b2] text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 stroke-[3px]" /> Start New Inspection
                  </button>
                </div>
              </div>

              {/* Active Drafts (Resume work) */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 pl-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Active Drafts</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-white border border-slate-150 rounded-xl p-3 flex justify-between items-center shadow-sm">
                    <div className="min-w-0 pr-3">
                      <span className="font-extrabold text-xs text-slate-800 truncate block">2013 BMW ActiveHybrid 5</span>
                      <span className="text-[9px] text-slate-400 font-medium block">Saved 5/20/2026 &bull; Draft</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleResumeDraft('WBAFZ9C54DD090664')}
                      className="bg-slate-900 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg shadow hover:bg-slate-800 shrink-0"
                    >
                      Resume
                    </button>
                  </div>

                  <div className="bg-white border border-slate-150 rounded-xl p-3 flex justify-between items-center shadow-sm">
                    <div className="min-w-0 pr-3">
                      <span className="font-extrabold text-xs text-slate-800 truncate block">2015 TOYOTA RAV4</span>
                      <span className="text-[9px] text-slate-400 font-medium block">Saved 5/20/2026 &bull; Draft</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleResumeDraft('JTMRFREV7FD162353')}
                      className="bg-slate-900 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg shadow hover:bg-slate-800 shrink-0"
                    >
                      Resume
                    </button>
                  </div>
                </div>
              </div>

              {/* Completed / Recent Reports */}
              <div className="space-y-2.5">
                <div className="pl-1.5 flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">Recent Reports</span>
                </div>
                
                {/* Search box filters */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search VIN, Make, Year..." 
                    className="w-full bg-white border border-slate-200 pl-8 pr-3 py-2 rounded-xl text-[11px] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
                    readOnly 
                  />
                </div>

                <div className="bg-white border border-slate-150 rounded-xl shadow-sm divide-y divide-slate-100 overflow-hidden text-[11px]">
                  <div className="p-3 flex items-center justify-between hover:bg-slate-50 pointer-events-none">
                    <div className="min-w-0 pr-2">
                      <span className="font-extrabold text-slate-800 block">2015 TOYOTA RAV4</span>
                      <span className="text-[9.5px] text-slate-400 font-mono">VIN: JTMRFREV7 &bull; 123k mi</span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold uppercase text-[7.5px] shrink-0 border border-emerald-100">
                      Completed
                    </span>
                  </div>

                  <div className="p-3 flex items-center justify-between hover:bg-slate-50 pointer-events-none opacity-85">
                    <div className="min-w-0 pr-2">
                      <span className="font-extrabold text-slate-800 block">2013 BMW ActiveHybrid 5</span>
                      <span className="text-[9.5px] text-slate-400 font-mono">VIN: WBAFZ9C5 &bull; 78k mi</span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono font-bold uppercase text-[7.5px] shrink-0 border border-emerald-100">
                      Completed
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STAGE 1: VEHICLE DETAILS */}
        {stage === 1 && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            {/* Header */}
            <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
              <button type="button" onClick={() => setStage(0)} className="p-1 px-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center gap-1 text-[11px] font-bold">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <h4 className="font-black text-xs text-slate-900">Vehicle Info</h4>
              <button type="button" onClick={() => { setStage(0); triggerToast('Draft saved successfully!'); }} className="text-teal-600 font-bold text-[10px] bg-teal-50 px-2.5 py-1 rounded-lg">
                Save Draft
              </button>
            </div>

            {/* Content Form Scroll */}
            <div className="p-4 flex-1 space-y-4 text-left">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-4">
                <h3 className="font-black text-sm tracking-tight text-slate-900 border-b border-slate-100 pb-2">Vehicle Details</h3>
                
                {/* VIN Field */}
                <div className="space-y-1.5">
                  <label className="text-[8.5px] font-bold text-slate-400 tracking-wider block uppercase font-mono">VIN (Vehicle Identification Number)</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={vin} 
                      onChange={(e) => setVin(e.target.value)}
                      placeholder="Enter 17-digit VIN..." 
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold tracking-wider placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
                    />
                    <button 
                      type="button" 
                      onClick={handleDecode} 
                      disabled={isDecoding || !vin}
                      className="bg-[#1e293b] hover:bg-[#0f172a] text-white font-extrabold text-[10px] px-3.5 py-2.5 rounded-xl transition"
                    >
                      {isDecoding ? '...' : 'Decode'}
                    </button>
                  </div>
                  <span className="text-[8px] text-slate-400 italic font-medium mt-1 block">Supported test keys: WBAFZ9C5..., JTMRFREV...</span>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-2 gap-3.5 pt-1">
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest font-mono">Year</label>
                    <input 
                      type="text" 
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="e.g. 2013" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest font-mono">Make</label>
                    <input 
                      type="text" 
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      placeholder="e.g. BMW" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest font-mono">Model</label>
                    <input 
                      type="text" 
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="e.g. ActiveHybrid 5" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest font-mono">Mileage</label>
                    <input 
                      type="text" 
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      placeholder="e.g. 78899" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold" 
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Actions Sticky bar */}
            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <button 
                type="button" 
                onClick={() => setStage(2)}
                disabled={!make || !model}
                className="w-full bg-[#1e293b] hover:bg-[#0f172a] disabled:opacity-50 text-white font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 shadow"
              >
                Next Section <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: CHECKLIST DETAILS */}
        {stage === 2 && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            {/* Header */}
            <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
              <button type="button" onClick={() => setStage(1)} className="p-1 px-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center gap-1 text-[11px] font-bold">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <h4 className="font-black text-xs text-slate-900 truncate max-w-[150px]">Interior/Exterior</h4>
              <button type="button" onClick={() => { setStage(0); triggerToast('Draft saved successfully!'); }} className="text-teal-600 font-bold text-[10px] bg-teal-50 px-2.5 py-1 rounded-lg">
                Save Draft
              </button>
            </div>

            {/* Content Checklist Scroll */}
            <div className="p-4 flex-1 space-y-4 text-left overflow-y-auto">
              
              {/* Question: Keys count */}
              <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
                <span className="text-[11px] font-extrabold text-slate-900 block">Number of Key(s)</span>
                <input 
                  type="text" 
                  value={keysCount}
                  onChange={(e) => setKeysCount(e.target.value)}
                  placeholder="2 keys" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-center" 
                />
                <input 
                  type="text" 
                  value={keysNote}
                  onChange={(e) => setKeysNote(e.target.value)}
                  placeholder="Add optional note or finding..." 
                  className="w-full bg-slate-50 border border-slate-150 rounded-lg px-2.5 py-1 text-[10px]" 
                />
              </div>

              {/* Loop other checklist items */}
              {Object.keys(ratings).slice(0, 3).map((itemKey) => {
                const currentRating = ratings[itemKey];
                return (
                  <div key={itemKey} className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm space-y-2">
                    <span className="text-[11px] font-extrabold text-slate-900 block">{itemKey}</span>
                    
                    {/* The 5 rating states buttons exactly matching image 7 */}
                    <div className="grid grid-cols-5 gap-1.5 py-1">
                      {[
                        { id: 'ok', color: 'border-emerald-500 bg-emerald-50 text-emerald-600', activeBg: 'bg-emerald-500 text-white border-emerald-600', icon: Check },
                        { id: 'normal', color: 'border-blue-500 bg-blue-50 text-blue-600', activeBg: 'bg-blue-500 text-white border-blue-600', icon: Info },
                        { id: 'attention', color: 'border-amber-500 bg-amber-50 text-amber-600', activeBg: 'bg-amber-500 text-white border-amber-600', icon: AlertTriangle },
                        { id: 'immediate', color: 'border-red-500 bg-red-50 text-red-600', activeBg: 'bg-red-500 text-white border-red-600', icon: X },
                        { id: 'na', color: 'border-slate-300 bg-slate-50 text-slate-400', activeBg: 'bg-slate-400 text-white border-slate-500', icon: Layers }
                      ].map((btn) => {
                        const IconComponent = btn.icon;
                        const isActive = currentRating.value === btn.id;
                        return (
                          <button
                            key={btn.id}
                            type="button"
                            onClick={() => handleRatingToggle(itemKey, btn.id)}
                            className={`h-9 border rounded-lg flex items-center justify-center transition-all ${
                              isActive ? btn.activeBg : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-400'
                            }`}
                            title={btn.id}
                          >
                            <IconComponent className="w-4 h-4 stroke-[2.5]" />
                          </button>
                        );
                      })}
                    </div>

                    <input 
                      type="text" 
                      value={currentRating.note}
                      onChange={(e) => handleRatingCommentChange(itemKey, e.target.value)}
                      placeholder="Add optional note or finding..." 
                      className="w-full bg-slate-50 border border-slate-150 rounded-lg px-2.5 py-1 text-[10px]" 
                    />
                  </div>
                );
              })}

            </div>

            {/* Bottom actions sticky bar */}
            <div className="p-4 bg-white border-t border-slate-100 grid grid-cols-2 gap-2">
              <button 
                type="button" 
                onClick={() => setStage(1)}
                className="w-full bg-slate-100 hover:bg-slate-205 text-slate-800 font-bold text-xs py-3 rounded-xl border border-slate-200"
              >
                Back
              </button>
              <button 
                type="button" 
                onClick={() => setStage(3)}
                className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 shadow"
              >
                Next Section <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: PHOTOS & NOTES */}
        {stage === 3 && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto">
            {/* Header */}
            <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
              <button type="button" onClick={() => setStage(2)} className="p-1 px-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center gap-1 text-[11px] font-bold">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <h4 className="font-black text-xs text-slate-900">Photos & Notes</h4>
              <button type="button" onClick={() => { setStage(0); triggerToast('Draft saved successfully!'); }} className="text-teal-600 font-bold text-[10px] bg-teal-50 px-2.5 py-1 rounded-lg">
                Save Draft
              </button>
            </div>

            {/* Scrollable form content */}
            <div className="p-4 flex-1 space-y-4 text-left overflow-y-auto">
              
              {/* Additional Notes Box */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2">
                <label className="text-[11px] font-black text-slate-900 block uppercase">Additional Notes</label>
                <textarea 
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Enter overall inspection summary, conditions, or unlisted issues..." 
                  className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-350"
                />
              </div>

              {/* Photos Gallery dragbox slot */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-slate-900 uppercase">Photos</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-bold">{addedPhotos.length} / 12 Max</span>
                </div>

                {/* Simulated photo uploads grid */}
                {addedPhotos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2.5">
                    {addedPhotos.map((photo, pIdx) => (
                      <div key={photo.id} className="aspect-square bg-slate-50 rounded-xl relative overflow-hidden border border-slate-200 shadow-sm animate-fade-in group">
                        <img src={photo.url} alt="Uploaded damage" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 right-1 bg-black/50 text-white text-[6px] truncate px-1 rounded block">
                          Photo {pIdx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Photo dashed dotted area button */}
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="w-full border-2 border-dashed border-slate-200 hover:border-[#06b6d4] bg-slate-50 hover:bg-slate-100 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <div className="w-10 h-10 bg-white rounded-full border border-slate-250 flex items-center justify-center text-slate-500 shadow-sm">
                    <Camera className="w-5 h-5 text-[#06b6d4]" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-800">Add Photo</span>
                  <span className="text-[9px] text-slate-400 font-medium">Click to attach sample photos</span>
                </button>
              </div>

            </div>

            {/* Bottom action bar */}
            <div className="p-4 bg-white border-t border-slate-100 grid grid-cols-2 gap-2">
              <button 
                type="button" 
                onClick={() => setStage(2)}
                className="w-full bg-slate-100 hover:bg-slate-205 text-slate-800 font-bold text-xs py-3 rounded-xl border border-slate-200"
              >
                Back
              </button>
              <button 
                type="button" 
                onClick={handleGenerateReportSubmit}
                className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 shadow"
              >
                Generate Report
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: LOADING / SPINNER PAGE */}
        {stage === 4 && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-900 text-white relative">
            
            {/* Spinning custom circular widget */}
            <div className="relative w-20 h-20 mb-6 font-mono flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-[#06b6d4]/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-[#06b6d4] border-r-[#06b6d4]/40 border-b-[#06b6d4]/10 border-l-transparent rounded-full animate-spin"></div>
              <Car className="w-7 h-7 text-teal-400 animate-pulse" />
            </div>

            <div className="space-y-2 text-center">
              <h3 className="font-extrabold text-lg text-white">Generating PPI Report...</h3>
              <p className="text-[#06b6d4] text-[11px] font-bold font-mono tracking-wide">
                Uploading to Secure Cloud & Database...
              </p>
            </div>

            <div className="absolute bottom-8 left-4 right-4 text-center font-mono text-[9px] text-slate-600 block">
              SECURE APPLET PROTOCOL &bull; SYNC ACTIVE
            </div>
          </div>
        )}

        {/* STAGE 5: SUCCESS & SHARE REPORT VIEW */}
        {stage === 5 && (
          <div className="flex-1 flex flex-col justify-between p-4 text-center overflow-y-auto">
            <div className="flex-1 flex flex-col justify-center items-center py-4 space-y-5">
              
              {/* Checkmark graphic */}
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/10 animate-scale-up">
                <Check className="w-8 h-8 stroke-[3.5]" />
              </div>

              {/* Title descriptions */}
              <div className="space-y-1 mt-2 text-center">
                <h3 className="font-black text-xl text-slate-950 tracking-tight">Report Generated</h3>
                <p className="text-slate-500 text-[11.5px] max-w-sm mx-auto leading-relaxed">
                  Saved to Drive and logged in your sheet.
                </p>
              </div>

              {/* URL Textbox copy holder */}
              <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 pl-3 pr-2 flex items-center justify-between gap-1 shadow-sm">
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[10px] text-slate-500 font-mono font-medium truncate">
                    {generatedPdfUrl}
                  </span>
                </div>
                <button 
                  type="button" 
                  onClick={handleCopyLink}
                  className="bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-[10px] px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-350 shadow-inner flex items-center gap-1 shadow-xs shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-600" /> {isCopied ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Custom Action triggers */}
              <div className="w-full space-y-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => triggerToast('Direct SMS & Email share card copied to clipboard!')}
                  className="w-full bg-[#06b6d4] hover:bg-[#0891b2] text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <Share2 className="w-4 h-4 fill-white/10" /> Share Report
                </button>

                <button
                  type="button"
                  onClick={handleLaunchParentPdfViewer}
                  className="w-full bg-slate-950 hover:bg-slate-850 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <Eye className="w-4 h-4 text-teal-400" /> Open PDF
                </button>
              </div>

            </div>

            {/* Back action */}
            <div className="pt-2 pb-1 border-t border-slate-100 flex justify-center">
              <button 
                type="button" 
                onClick={() => setStage(0)}
                className="text-slate-500 hover:text-slate-900 font-bold text-xs"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
