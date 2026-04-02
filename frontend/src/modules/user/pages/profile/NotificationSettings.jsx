import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, MessageSquare, Tag } from 'lucide-react';

const Toggle = ({ active, onToggle }) => (
  <button 
    onClick={onToggle}
    className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-green-500' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${active ? 'right-1' : 'left-1'}`}></div>
  </button>
);

const NotificationSettings = () => {
  const [offers, setOffers] = useState(true);
  const [updates, setUpdates] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-bg-light max-w-lg mx-auto flex flex-col font-sans relative overflow-hidden">
      <header className="bg-[#001b33] px-5 py-5 flex items-center gap-4 border-b border-white/5 sticky top-0 z-30 shadow-2xl overflow-hidden shrink-0">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
         <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-all text-white relative z-10 font-bold">
            <ArrowLeft size={16} strokeWidth={3} />
         </button>
         <div className="relative z-10">
            <h1 className="text-[9px] font-bold text-white/30 uppercase tracking-[2px] leading-none mb-1 opacity-80">Sync Preferences</h1>
            <h2 className="text-[17px] font-bold text-white leading-none tracking-tight uppercase">NOTIFICATIONS</h2>
         </div>
      </header>

      <div className="flex-1 p-5 space-y-4 overflow-y-auto no-scrollbar">
         {[
            { id: 'offers', title: 'Offers & Promotions', state: offers, setState: setOffers, icon: <Tag size={20} />, color: 'orange-500', bg: 'orange-50', sub: 'Exclusive trip discounts' },
            { id: 'updates', title: 'Critical App Updates', state: updates, setState: setUpdates, icon: <Bell size={20} />, color: 'blue-500', bg: 'blue-50', sub: 'Security and feature logs' },
            { id: 'messages', title: 'Direct Messages', state: true, setState: () => {}, icon: <MessageSquare size={20} />, color: 'accent', bg: 'accent/10', sub: 'Captain communications' }
         ].map((item, idx) => (
            <motion.div 
               key={idx}
               whileTap={{ scale: 0.98 }}
               className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center justify-between shadow-[0_4px_25px_rgba(0,0,0,0.03)] group transition-all"
            >
               <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${item.bg} text-${item.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
                     {item.icon}
                  </div>
                  <div>
                     <p className="font-bold text-[15px] text-[#001b33] tracking-tight">{item.title}</p>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{item.sub}</p>
                  </div>
               </div>
               <button 
                  onClick={() => item.setState(!item.state)}
                  className={`w-12 h-6.5 rounded-full transition-all relative flex items-center px-1 ${item.state ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-gray-100'}`}
               >
                  <motion.div 
                     animate={{ x: item.state ? 22 : 0 }}
                     className="w-4.5 h-4.5 bg-white rounded-full shadow-lg"
                  />
               </button>
            </motion.div>
         ))}
      </div>

      <div className="p-8 pb-12 bg-gray-50/50 text-center shrink-0">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[2px] leading-relaxed">System notifications are essential. <br/>Promotion settings can be modified anytime.</p>
      </div>
    </div>
  );
};
