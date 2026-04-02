import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, X, Plus, Minus } from 'lucide-react';

const SelectLocation = () => {
  const [pickup, setPickup] = useState('Pipaliyahana, Indore');
  const [drop, setDrop] = useState('');
  const [stops, setStops] = useState([]);          // array of stop strings
  const [activeInput, setActiveInput] = useState('drop'); // 'pickup' | 'drop' | stopIdx
  const [mapToast, setMapToast] = useState(false);
  const navigate = useNavigate();

  // All known locations — filtered live as user types
  const allResults = [
    { title: 'Vijay Nagar', address: 'Vijay Nagar, Indore, Madhya Pradesh' },
    { title: 'Vijay Nagar Square', address: 'Vijay Nagar Square, Bhagyashree Colony, Indore' },
    { title: 'Vijayawada', address: 'Vijayawada, Andhra Pradesh, India' },
    { title: 'Vijay Nagar Police Station', address: 'Vijay Nagar Police Station, Sector D, Indore' },
    { title: 'Rajwada', address: 'Rajwada, Old Palasia, Indore, MP' },
    { title: 'Bhawarkua', address: 'Bhawarkua, Indore, Madhya Pradesh' },
    { title: 'MG Road', address: 'MG Road, Indore, Madhya Pradesh' },
    { title: 'Palasia Square', address: 'Palasia Square, AB Road, Indore' },
    { title: 'LIG Colony', address: 'LIG Colony, Indore, Madhya Pradesh' },
    { title: 'Scheme No 54', address: 'Scheme No 54, Vijay Nagar, Indore' },
    { title: 'Bhangadh', address: 'Bhangadh, Indore, Madhya Pradesh' },
    { title: 'AB Road', address: 'AB Road, Indore, Madhya Pradesh' },
    { title: 'Geeta Bhawan', address: 'Geeta Bhawan, Indore, Madhya Pradesh' },
    { title: 'Sapna Sangeeta', address: 'Sapna Sangeeta Road, Indore, MP' },
    { title: 'Mahalaxmi Nagar', address: 'Mahalaxmi Nagar, Indore, Madhya Pradesh' },
  ];

  const getQuery = () => {
    if (activeInput === 'pickup') return pickup;
    if (activeInput === 'drop') return drop;
    if (typeof activeInput === 'number') return stops[activeInput] || '';
    return '';
  };

  const query = getQuery();

  const searchResults = query.trim().length >= 1
    ? allResults.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.address.toLowerCase().includes(query.toLowerCase())
      )
    : allResults.slice(0, 6);

  const showMapToast = () => {
    setMapToast(true);
    setTimeout(() => setMapToast(false), 2500);
  };

  // Add a new empty stop
  const addStop = () => {
    setStops(prev => [...prev, '']);
    setActiveInput(stops.length); // focus the new stop
  };

  // Remove a stop by index
  const removeStop = (idx) => {
    setStops(prev => prev.filter((_, i) => i !== idx));
    setActiveInput('drop');
  };

  // Update a stop value
  const updateStop = (idx, val) => {
    setStops(prev => prev.map((s, i) => i === idx ? val : s));
  };

  // When a suggestion is tapped
  const handleSelectResult = (title) => {
    if (activeInput === 'pickup') {
      setPickup(title);
      setActiveInput('drop');
    } else if (activeInput === 'drop') {
      navigate('/ride/select-vehicle', {
        state: {
          pickup: pickup || 'Pipaliyahana, Indore',
          drop: title,
          stops: stops.filter(s => s.trim().length > 0),
        },
      });
    } else if (typeof activeInput === 'number') {
      updateStop(activeInput, title);
      // Move to next stop or drop
      if (activeInput < stops.length - 1) {
        setActiveInput(activeInput + 1);
      } else {
        setActiveInput('drop');
      }
    }
  };

  return (
    <div className="h-screen bg-bg-light max-w-lg mx-auto flex flex-col font-sans relative overflow-hidden">
      {/* Map Picker Toast - Premium Styling */}
      <AnimatePresence>
        {mapToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#001b33] text-white px-6 py-3 rounded-full text-[11px] font-bold shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="uppercase tracking-[2px]">Map System — Activating soon</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header (Branded) */}
      <header className="bg-[#001b33] px-5 py-5 flex items-center gap-4 border-b border-white/5 sticky top-0 z-30 shadow-2xl overflow-hidden shrink-0">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
         <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-all text-white relative z-10 font-bold">
            <ArrowLeft size={16} strokeWidth={3} />
         </button>
         <div className="relative z-10">
            <h1 className="text-[9px] font-bold text-white/30 uppercase tracking-[2px] leading-none mb-1 opacity-80">Route Planner</h1>
            <h2 className="text-[17px] font-bold text-white leading-none tracking-tight uppercase">WHERE TO?</h2>
         </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
         {/* Input Card (Refined & Compact) */}
         <div className="px-4 mt-5">
            <div className="bg-white rounded-[32px] p-5 shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-gray-50 space-y-4">
               {/* Pickup Row */}
               <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center shrink-0">
                     <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div 
                     className={`flex-1 flex items-center border rounded-[20px] px-4 py-3 transition-all ${activeInput === 'pickup' ? 'border-emerald-500/30 bg-emerald-50/10' : 'border-gray-50 bg-gray-50/30'}`}
                     onClick={() => setActiveInput('pickup')}
                  >
                     <input
                        type="text"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        placeholder="Your pickup location"
                        className="w-full bg-transparent border-none text-[15px] font-bold text-[#001b33] focus:outline-none placeholder:text-gray-300"
                     />
                     {pickup.length > 0 && (
                        <button onClick={() => setPickup('')} className="ml-2 text-gray-300 hover:text-gray-500"><X size={14} /></button>
                     )}
                  </div>
               </div>

               {/* Dynamic Stops */}
               <AnimatePresence>
                  {stops.map((stop, idx) => (
                     <motion.div
                        key={`stop-${idx}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-1"
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center shrink-0">
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                           </div>
                           <div 
                              className={`flex-1 flex items-center border rounded-[20px] px-4 py-3 transition-all ${activeInput === idx ? 'border-blue-500/30 bg-blue-50/10' : 'border-gray-50 bg-gray-50/30'}`}
                              onClick={() => setActiveInput(idx)}
                           >
                              <input
                                 type="text"
                                 value={stop}
                                 placeholder={`Stop ${idx + 1} point...`}
                                 onChange={(e) => updateStop(idx, e.target.value)}
                                 className="w-full bg-transparent border-none text-[15px] font-bold text-[#001b33] focus:outline-none placeholder:text-blue-300"
                              />
                           </div>
                           <button onClick={() => removeStop(idx)} className="w-8 h-8 rounded-xl bg-red-50 text-red-400 flex items-center justify-center shrink-0"><Minus size={14} strokeWidth={3} /></button>
                        </div>
                     </motion.div>
                  ))}
               </AnimatePresence>

               {/* Drop Row */}
               <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-orange-500 flex items-center justify-center shrink-0">
                     <div className="w-2 h-2 rounded-full bg-orange-500" />
                  </div>
                  <div 
                     className={`flex-1 flex items-center border rounded-[20px] px-4 py-3 transition-all ${activeInput === 'drop' ? 'border-orange-500/30 bg-orange-50/10' : 'border-gray-50 bg-gray-50/30'}`}
                     onClick={() => setActiveInput('drop')}
                  >
                     <input
                        type="text"
                        value={drop}
                        placeholder="Where to?"
                        onChange={(e) => setDrop(e.target.value)}
                        className="w-full bg-transparent border-none text-[15px] font-bold text-[#001b33] focus:outline-none placeholder:text-gray-300"
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Action Pills (Compact) */}
         <div className="grid grid-cols-2 gap-3 px-4 mt-6">
            <button
               onClick={showMapToast}
               className="h-13 bg-white border border-gray-100 rounded-[22px] flex items-center justify-center gap-2 active:scale-95 transition-all text-[12px] font-bold text-[#001b33] uppercase tracking-wider"
            >
               <MapPin size={16} className="text-gray-400" />
               <span>On Map</span>
            </button>
            <button
               onClick={addStop}
               className="h-13 bg-blue-50 border border-blue-100 rounded-[22px] flex items-center justify-center gap-2 active:scale-95 transition-all text-[12px] font-bold text-blue-600 uppercase tracking-wider"
            >
               <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center text-white"><Plus size={10} strokeWidth={4} /></div>
               <span>Add Stop</span>
            </button>
         </div>

         {/* Search Results (Standardized) */}
         <div className="px-4 mt-8">
            <div className="flex items-center justify-between mb-5 px-1">
               <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[2.5px]">{query.trim().length > 0 ? 'Live Discovery' : 'Trusted Hubs'}</h3>
                {query.trim().length > 0 && <span className="text-[9px] font-bold text-accent uppercase tracking-widest">{searchResults.length} Hits</span>}
            </div>

            <div className="space-y-1">
               {searchResults.length > 0 ? (
                  searchResults.map((result, idx) => (
                     <motion.div
                        key={idx}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectResult(result.title)}
                        className="flex items-center gap-4 p-3.5 hover:bg-white rounded-[24px] cursor-pointer group transition-all"
                     >
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all text-gray-300">
                           <MapPin size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                           <h4 className="text-[15px] font-bold text-[#001b33] leading-none tracking-tight mb-1">{result.title}</h4>
                           <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest truncate">{result.address}</p>
                        </div>
                     </motion.div>
                  ))
               ) : (
                  <div className="text-center py-10">
                     <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin size={28} className="text-gray-200" />
                     </div>
                     <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">No routes found for "{query}"</p>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default SelectLocation;
