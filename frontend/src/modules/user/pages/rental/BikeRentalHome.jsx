import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Fuel, Shield, ChevronRight, Star, Info } from 'lucide-react';

const DURATION_TABS = ['Hourly', 'Half-Day', 'Daily'];

const vehicles = [
  {
    id: 'activa',
    name: 'Honda Activa 6G',
    tag: '⚡ Most Popular',
    tagColor: 'bg-orange-50 text-orange-600 border-orange-100',
    image: '/2_AutoRickshaw.png',
    rating: '4.8',
    fuel: 'Petrol · Full tank provided',
    prices: { Hourly: 59, 'Half-Day': 249, Daily: 399 },
    kmLimit: { Hourly: '20 km', 'Half-Day': '80 km', Daily: '150 km' },
    features: ['Helmet included', 'GPS tracking', '24/7 roadside assist'],
    color: 'from-orange-50 to-white',
    accent: 'bg-orange-500',
  },
  {
    id: 'splendor',
    name: 'Hero Splendor+',
    tag: '💸 Best Value',
    tagColor: 'bg-green-50 text-green-600 border-green-100',
    image: '/1_Bike.png',
    rating: '4.6',
    fuel: 'Petrol · Full tank provided',
    prices: { Hourly: 45, 'Half-Day': 189, Daily: 299 },
    kmLimit: { Hourly: '25 km', 'Half-Day': '100 km', Daily: '180 km' },
    features: ['Helmet included', 'GPS tracking'],
    color: 'from-green-50 to-white',
    accent: 'bg-green-500',
  },
  {
    id: 'pulsar',
    name: 'Bajaj Pulsar 150',
    tag: '🏍️ Sport Ride',
    tagColor: 'bg-blue-50 text-blue-600 border-blue-100',
    image: '/1_Bike.png',
    rating: '4.7',
    fuel: 'Petrol · Full tank provided',
    prices: { Hourly: 79, 'Half-Day': 349, Daily: 549 },
    kmLimit: { Hourly: '30 km', 'Half-Day': '100 km', Daily: '200 km' },
    features: ['Helmet included', 'GPS tracking', 'Insurance covered'],
    color: 'from-blue-50 to-white',
    accent: 'bg-blue-500',
  },
  {
    id: 'royal-enfield',
    name: 'Royal Enfield Classic 350',
    tag: '👑 Premium',
    tagColor: 'bg-purple-50 text-purple-600 border-purple-100',
    image: '/1_Bike.png',
    rating: '4.9',
    fuel: 'Petrol · Full tank provided',
    prices: { Hourly: 149, 'Half-Day': 599, Daily: 999 },
    kmLimit: { Hourly: '30 km', 'Half-Day': '100 km', Daily: '200 km' },
    features: ['Helmet included', 'GPS tracking', 'Insurance covered', 'Priority support'],
    color: 'from-purple-50 to-white',
    accent: 'bg-purple-500',
  },
];

const BikeRentalHome = () => {
  const [selectedDuration, setSelectedDuration] = useState('Hourly');
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-bg-light max-w-lg mx-auto flex flex-col font-sans relative overflow-hidden">
      {/* Header (Branded & Compact) */}
      <header className="bg-[#001b33] px-5 py-5 flex items-center gap-4 border-b border-white/5 sticky top-0 z-30 shadow-2xl overflow-hidden shrink-0">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
         <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-all text-white relative z-10 font-bold">
            <ArrowLeft size={16} strokeWidth={3} />
         </button>
         <div className="relative z-10">
            <h1 className="text-[9px] font-bold text-white/30 uppercase tracking-[2px] leading-none mb-1 opacity-80">Autonomous Mobility</h1>
            <h2 className="text-[17px] font-bold text-white leading-none tracking-tight uppercase">BIKE RENTALS</h2>
         </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
         {/* Duration Selector (Compact) */}
         <div className="px-5 mt-5">
            <div className="bg-white/5 border border-white/5 p-1 rounded-[20px] shadow-sm flex backdrop-blur-md">
               {DURATION_TABS.map(tab => (
                  <button
                     key={tab}
                     onClick={() => setSelectedDuration(tab)}
                     className={`flex-1 py-2.5 rounded-[16px] text-[10px] font-bold uppercase tracking-[2px] transition-all duration-300 ${
                        selectedDuration === tab
                           ? 'bg-accent text-white shadow-lg'
                           : 'text-gray-400 hover:text-[#001b33]'
                     }`}
                  >
                     {tab}
                  </button>
               ))}
            </div>
         </div>

         {/* Info Banner (Sophisticated) */}
         <div className="px-5 mt-5">
            <div className="bg-[#001b33]/5 border border-[#001b33]/10 rounded-[28px] p-4 flex items-center gap-3">
               <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Info size={16} strokeWidth={2.5} />
               </div>
               <p className="text-[10px] font-bold text-[#001b33]/60 uppercase tracking-[1.5px] leading-relaxed">
                  {selectedDuration === 'Hourly' && 'Min 2 hours · Extra km @ ₹3/km'}
                  {selectedDuration === 'Half-Day' && '6 hours · Extra km @ ₹2.5/km'}
                  {selectedDuration === 'Daily' && '24 hours · Extra km @ ₹2/km · VIP return'}
               </p>
            </div>
         </div>

         {/* Vehicle Cards (Branded) */}
         <div className="px-5 mt-6 space-y-4">
            {vehicles.map((v, idx) => (
               <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[36px] overflow-hidden border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] group"
               >
                  <div className={`bg-gradient-to-br from-gray-50 to-white p-5 flex items-center justify-between relative`}>
                     <div className="space-y-2.5 relative z-10">
                        <div className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-black/5 bg-white shadow-sm inline-block`}>
                           {v.tag}
                        </div>
                        <h3 className="text-[18px] font-bold text-[#001b33] tracking-tight">{v.name}</h3>
                        <div className="flex items-center gap-2">
                           <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-lg">
                              <Star size={10} className="text-yellow-600 fill-yellow-600" />
                              <span className="text-[10px] font-black text-yellow-700">{v.rating}</span>
                           </div>
                           <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">· {v.kmLimit[selectedDuration]} LIMIT</span>
                        </div>
                     </div>
                     <img src={v.image} alt={v.name} className="h-20 w-24 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  <div className="p-5 space-y-5 border-t border-gray-50">
                     <div className="flex flex-wrap gap-2">
                        {v.features.map(f => (
                           <span key={f} className="text-[9px] font-bold bg-[#001b33]/5 text-[#001b33]/60 px-3 py-1 rounded-full uppercase tracking-wider">
                              {f}
                           </span>
                        ))}
                     </div>

                     <div className="flex items-center justify-between">
                        <div>
                           <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[2.5px] mb-1">Standard Rate</p>
                           <div className="flex items-baseline gap-1">
                              <span className="text-[28px] font-bold text-[#001b33] tracking-tighter">₹{v.prices[selectedDuration]}</span>
                              <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
                                 /{selectedDuration === 'Hourly' ? 'Hr' : selectedDuration === 'Half-Day' ? '6Hr' : 'Day'}
                              </span>
                           </div>
                        </div>
                        <motion.button
                           whileTap={{ scale: 0.96 }}
                           onClick={() => navigate('/ride/select-location', { state: { isRental: true, vehicle: v, duration: selectedDuration } })}
                           className="bg-[#001b33] text-white h-13 px-6 rounded-[22px] text-[11px] font-bold uppercase tracking-[2px] flex items-center gap-2 shadow-2xl active:scale-95 transition-all"
                        >
                           BOOK NOW <ChevronRight size={14} strokeWidth={3} />
                        </motion.button>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>

         {/* Trust Note */}
         <div className="mx-5 my-8 bg-gray-50/50 rounded-[28px] p-5 flex items-start gap-4 border border-gray-50">
            <Shield size={20} className="text-gray-300 shrink-0 mt-1" />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[1.5px] leading-relaxed">
               All rental assets are insured, regularly logged, and GPS-tracked. Valid credentials mandatory at pickup.
            </p>
         </div>
      </div>
    </div>
  );
};

export default BikeRentalHome;
