import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Phone, HelpCircle, AlertCircle, XCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import BottomNavbar from '../../components/BottomNavbar';

const Support = () => {
  const navigate = useNavigate();

  const helpTopics = [
    { title: "Driver didn't arrive", icon: <XCircle size={20} className="text-red-500" /> },
    { title: "Safety concern", icon: <ShieldCheck size={20} className="text-blue-500" /> },
    { title: "I lost an item", icon: <HelpCircle size={20} className="text-orange-500" /> },
    { title: "Payment failure", icon: <AlertCircle size={20} className="text-gray-900" /> },
  ];

  const handleCall = () => {
    window.open('tel:+919876543210', '_self');
  };

  const handleChat = () => {
    navigate('/ride/chat?admin=true');
  };

  return (
    <div className="h-screen bg-bg-light max-w-lg mx-auto flex flex-col font-sans relative overflow-hidden">
      <header className="bg-[#001b33] px-5 py-5 flex items-center gap-4 border-b border-white/5 sticky top-0 z-30 shadow-2xl overflow-hidden shrink-0">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
         <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-all text-white relative z-10 font-bold">
            <ArrowLeft size={16} strokeWidth={3} />
         </button>
         <div className="relative z-10">
            <h1 className="text-[9px] font-bold text-white/30 uppercase tracking-[2px] leading-none mb-1 opacity-80">Crisis Desk</h1>
            <h2 className="text-[17px] font-bold text-white leading-none tracking-tight uppercase">HELP & SUPPORT</h2>
         </div>
      </header>

      <div className="flex-1 p-5 space-y-4 overflow-y-auto no-scrollbar pb-24">
         {/* Live Contact Options (Highly Compact) */}
         <div className="grid grid-cols-2 gap-3">
            {[
               { id: 'chat', label: 'Live Chat', icon: <MessageCircle size={22} />, color: 'accent', bg: 'accent/5', borderColor: 'accent/20' },
               { id: 'call', label: 'Call Support', icon: <Phone size={22} />, color: 'emerald-500', bg: 'emerald-50', borderColor: 'emerald-500/20' }
            ].map((contact, i) => (
               <motion.div 
                  key={i}
                  whileTap={{ scale: 0.97 }}
                  onClick={contact.id === 'chat' ? handleChat : handleCall}
                  className={`bg-white border border-gray-100 rounded-[28px] p-5 shadow-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer group active:bg-gray-50 transition-all border-b-4 border-${contact.borderColor}`}
               >
                  <div className={`w-10 h-10 bg-${contact.bg} text-${contact.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                     {contact.icon}
                  </div>
                  <span className="text-[13px] font-bold text-[#001b33] tracking-tight">{contact.label}</span>
               </motion.div>
            ))}
         </div>

         {/* Common Help Topics Area (High Density) */}
         <div className="pt-2">
            <div className="flex items-center justify-between mb-4 px-2">
               <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px] opacity-80">System Topics</h3>
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Active Support</span>
               </div>
            </div>
            <div className="space-y-3">
               {helpTopics.map((topic, idx) => (
                  <motion.div 
                     key={idx} 
                     whileTap={{ scale: 0.99 }}
                     onClick={handleChat}
                     className="bg-white border border-gray-50 rounded-[24px] p-3.5 flex items-center justify-between shadow-sm cursor-pointer group active:bg-gray-50 transition-all"
                  >
                     <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-50/50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all text-gray-400 shadow-inner">
                           {topic.icon}
                        </div>
                        <span className="text-[14px] font-bold text-[#001b33] tracking-tight">{topic.title}</span>
                     </div>
                     <ChevronRight size={16} className="text-gray-200 group-hover:text-accent transition-all" strokeWidth={3} />
                  </motion.div>
               ))}
            </div>
         </div>

         {/* Trust Note */}
         <div className="bg-[#001b33]/5 border border-[#001b33]/10 rounded-[28px] p-5 flex items-start gap-4">
            <AlertCircle size={20} className="text-[#001b33]/40 shrink-0 mt-1" />
            <p className="text-[10px] font-bold text-[#001b33]/50 uppercase tracking-[1.5px] leading-relaxed">Safety is our priority. In case of immediate emergency, please use the SOS button in your main menu.</p>
         </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Support;
