import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Briefcase, Plus } from 'lucide-react';

const AddressSettings = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-bg-light max-w-lg mx-auto flex flex-col font-sans relative overflow-hidden">
      <header className="bg-[#001b33] px-5 py-5 flex items-center gap-4 border-b border-white/5 sticky top-0 z-30 shadow-2xl overflow-hidden shrink-0">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
         <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-all text-white relative z-10 font-bold">
            <ArrowLeft size={16} strokeWidth={3} />
         </button>
         <div className="relative z-10">
            <h1 className="text-[9px] font-bold text-white/30 uppercase tracking-[2px] leading-none mb-1 opacity-80">Location Hub</h1>
            <h2 className="text-[17px] font-bold text-white leading-none tracking-tight uppercase">SAVED ADDRESSES</h2>
         </div>
      </header>

      <div className="flex-1 p-5 space-y-4 overflow-y-auto no-scrollbar">
         {[
            { id: 'home', title: 'Home', address: 'Pipl, Indore, Madhya Pradesh', description: 'Primary residence', icon: <Home size={22} />, color: 'accent', bg: 'accent/10' },
            { id: 'work', title: 'Work', address: 'Vijay Nagar Squre, Scheme 54', description: 'Workspace defined', icon: <Briefcase size={22} />, color: 'blue-500', bg: 'blue-50', active: true }
         ].map((item, idx) => (
            <motion.div 
               key={idx}
               whileTap={{ scale: 0.98 }}
               className={`bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4 shadow-[0_4px_25px_rgba(0,0,0,0.03)] cursor-pointer group active:bg-gray-50 transition-all ${!item.active && 'opacity-60 grayscale-[0.5]'}`}
            >
               <div className={`w-14 h-14 bg-${item.bg} text-${item.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
                  {item.icon}
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                     <p className="font-bold text-[16px] text-[#001b33] tracking-tight uppercase">{item.title}</p>
                     {item.active && <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-sm"></div>}
                  </div>
                  <p className="text-[13px] font-bold text-gray-400 line-clamp-1">{item.address}</p>
                  <p className="text-[10px] font-bold text-gray-300 mt-1 uppercase tracking-widest">{item.description}</p>
               </div>
            </motion.div>
         ))}

         <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full h-18 bg-[#001b33] rounded-[28px] text-[13px] font-bold text-white uppercase tracking-[3px] shadow-2xl shadow-[#001b33]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
            <Plus size={18} strokeWidth={3} />
            <span className="relative z-10">ADD NEW LANDMARK</span>
         </motion.button>
      </div>

      <div className="p-8 pb-12 bg-gray-50/50 text-center shrink-0">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px] leading-relaxed">System secured via encryption. <br/>Addresses only used for navigation assistance.</p>
      </div>
    </div>
  );
};

export default AddressSettings;
