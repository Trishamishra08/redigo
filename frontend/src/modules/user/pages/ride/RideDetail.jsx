import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Share2, HelpCircle, Star, Repeat, Bike, Clock, Calendar } from 'lucide-react';

const RideDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shareToast, setShareToast] = useState(false);

  const handleShare = () => {
    const text = `My Redigo Trip #RDG${id || '8231'} — Pipaliyahana → Vijay Nagar Square | ₹22.00`;
    if (navigator.share) {
      navigator.share({ title: 'Redigo Trip', text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text).then(() => {
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2500);
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg-light max-w-lg mx-auto flex flex-col font-sans relative pb-20">
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#001b33] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-2xl border border-white/10"
          >
            ✅ Trip details copied!
          </motion.div>
        )}
      </AnimatePresence>

      {/* BRANDED HEADER */}
      <header className="bg-[#001b33] p-4 pt-6 pb-6 flex items-center justify-between sticky top-0 z-30 shadow-2xl border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="flex items-center gap-3 relative z-10">
           <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-all text-white">
              <ArrowLeft size={18} strokeWidth={3} />
           </button>
           <div>
              <h1 className="text-[15px] font-bold text-white leading-none tracking-tight">Trip ID: #RDG{id || '8231'}</h1>
              <p className="text-[9px] font-bold text-white/30 mt-1 uppercase tracking-widest">Completed: 29 Mar 2026</p>
           </div>
        </div>
        <button onClick={handleShare} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-90 transition-all text-white/50 relative z-10">
          <Share2 size={16} />
        </button>
      </header>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto no-scrollbar">
         {/* Map View (More Compact) */}
         <div className="h-36 bg-white rounded-[32px] overflow-hidden relative shadow-lg border border-gray-100 p-1">
            <div className="w-full h-full rounded-[28px] overflow-hidden opacity-80 bg-gray-50">
               <img src="/map image.avif" className="w-full h-full object-cover" alt="Map View" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#001b33]/10 to-transparent"></div>
         </div>

         {/* Journey Detail (Tighter) */}
         <div className="bg-white rounded-[32px] p-6 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute left-[33px] top-[46px] bottom-[46px] w-0.5 border-l-2 border-dashed border-gray-100 opacity-60"></div>
            
            <div className="space-y-7">
               <div className="flex gap-4 relative">
                  <div className="w-4 h-4 rounded-full border-[3px] border-emerald-50 bg-white shadow-md flex items-center justify-center shrink-0 z-10 mt-1">
                     <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                  </div>
                  <div>
                     <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Pickup</h4>
                     <p className="text-[14px] font-bold text-[#001b33] leading-tight">Pipl, Indore, Madhya Pradesh</p>
                     <span className="text-[10px] font-bold text-gray-300 block mt-1">12:32 PM</span>
                  </div>
               </div>

               <div className="flex gap-4 relative">
                  <div className="w-4 h-4 rounded-full border-[3px] border-blue-50 bg-white shadow-md flex items-center justify-center shrink-0 z-10 mt-1">
                     <div className="w-1 h-1 bg-accent rounded-full"></div>
                  </div>
                  <div>
                     <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1.5">Drop</h4>
                     <p className="text-[14px] font-bold text-[#001b33] leading-tight">Vijay Nagar Square, Scheme 54</p>
                     <span className="text-[10px] font-bold text-gray-300 block mt-1">12:45 PM</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Fare Breakdown (More Efficient) */}
         <div className="bg-white rounded-[32px] p-6 shadow-xl border border-gray-100">
             <div className="flex items-center justify-between pb-4 border-b border-gray-50 mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent shadow-sm border border-accent/10">
                       <Bike size={20} strokeWidth={2.5} />
                   </div>
                   <div>
                      <h3 className="text-[14px] font-bold text-[#001b33]">Bike Ride</h3>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Payment by Cash</p>
                   </div>
                </div>
                <div className="text-right">
                   <span className="text-[18px] font-black text-[#001b33]">₹22.00</span>
                </div>
             </div>
             
             <div className="space-y-3">
                <div className="flex justify-between items-center text-[12px] font-bold text-gray-400">
                   <span className="uppercase tracking-widest text-[9px]">Base Fare</span>
                   <span className="text-[#001b33]">₹18.00</span>
                </div>
                <div className="flex justify-between items-center text-[12px] font-bold text-gray-400">
                   <span className="uppercase tracking-widest text-[9px]">Taxes & Fees</span>
                   <span className="text-[#001b33]">₹4.00</span>
                </div>
                <div className="h-px bg-gray-50 my-1"></div>
                <div className="flex justify-between items-center text-[13px] font-bold text-[#001b33]">
                   <span className="uppercase tracking-widest text-[10px]">Total Paid</span>
                   <span className="text-accent underline underline-offset-4 decoration-2">₹22.00</span>
                </div>
             </div>
         </div>

         {/* Support Toggle */}
         <div className="flex items-center justify-between p-4 bg-[#001b33] rounded-[28px] shadow-2xl">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white/10 rounded-xl p-0.5 border border-white/10">
                  <img src="https://ui-avatars.com/api/?name=Kishan+Kumawat&background=003366&color=fff" className="w-full h-full rounded-[9px]" alt="Captain" />
               </div>
               <div>
                  <h4 className="text-[13px] font-bold text-white">Kishan Kumawat</h4>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-accent uppercase tracking-wider">
                     <Star size={10} className="fill-accent" />
                     <span>Top Captain</span>
                  </div>
               </div>
            </div>
            <button 
               onClick={() => navigate('/support')}
               className="bg-white/10 text-white px-4 py-2 rounded-xl text-[11px] font-bold border border-white/10 active:scale-95 transition-all uppercase tracking-widest"
            >
               Support
            </button>
         </div>
      </div>

      {/* ACTION BAR (Fixed & Compact) */}
      <div className="p-4 pb-10 pt-3 bg-white/80 backdrop-blur-md border-t border-gray-100 flex gap-3 sticky bottom-0 z-40">
         <button
           onClick={() => navigate('/ride/select-location')}
           className="flex-[3] bg-[#001b33] text-white py-4 rounded-[22px] text-[12px] font-bold uppercase tracking-[1.5px] shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all"
         >
            <Repeat size={16} strokeWidth={3} />
            <span>Rebook Ride</span>
         </button>
         <button
           onClick={() => navigate('/support')}
           className="flex-1 bg-gray-50 text-[#001b33] rounded-[22px] flex items-center justify-center border border-gray-100 active:scale-95 transition-all"
         >
            <HelpCircle size={22} />
         </button>
      </div>
    </div>
  );
};

export default RideDetail;
