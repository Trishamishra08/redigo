import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Phone, User, Smile, Headset } from 'lucide-react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminChat = new URLSearchParams(location.search).get('admin') === 'true';

  const messages = isAdminChat ? [
    { sender: 'driver', text: "Hello! How can we help you today?", time: '12:45' },
  ] : [
    { sender: 'driver', text: "I've arrived at your location.", time: '12:45' },
    { sender: 'user', text: "Okay, coming in 2 minutes.", time: '12:46' },
  ];

  const quickReplies = isAdminChat 
    ? ["Payment Issue", "Ride Cancelled", "Lost Item", "Safety"]
    : ["Wait for me", "I'm coming", "Where exactly?", "Okay"];

  return (
    <div className="h-screen bg-bg-light max-w-lg mx-auto flex flex-col font-sans relative overflow-hidden">
      {/* Header (Branded & Compact) */}
      <header className="bg-[#001b33] px-5 py-5 flex items-center justify-between border-b border-white/5 sticky top-0 z-30 shadow-2xl overflow-hidden shrink-0">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
         <div className="flex items-center gap-4 relative z-10">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-all text-white font-bold">
               <ArrowLeft size={16} strokeWidth={3} />
            </button>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 ${isAdminChat ? 'bg-accent/20 text-accent font-bold' : 'bg-white/10 overflow-hidden'}`}>
                     {isAdminChat ? <Headset size={18} strokeWidth={2.5} /> : <img src={`https://ui-avatars.com/api/?name=${isAdminChat ? 'Support' : 'Kishan'}&background=001b33&color=fff`} alt="Avatar" className="w-full h-full object-cover" />}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#001b33] shadow-sm animate-pulse"></div>
               </div>
               <div>
                  <h1 className="text-[9px] font-bold text-white/30 uppercase tracking-[2px] mb-0.5 opacity-80">{isAdminChat ? 'Crisis Response' : 'En Route'}</h1>
                  <h2 className="text-[15px] font-bold text-white leading-none tracking-tight uppercase">
                    {isAdminChat ? 'Redigo Support' : 'Kishan Kumawat'}
                  </h2>
               </div>
            </div>
         </div>
         {!isAdminChat && (
            <button className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center active:scale-95 transition-all relative z-10">
               <Phone size={14} className="text-white" strokeWidth={3} />
            </button>
         )}
      </header>

      {/* Message Area (High Density) */}
      <div className="flex-1 p-5 space-y-4 overflow-y-auto no-scrollbar pb-24">
         <div className="text-center pb-4">
            <span className="text-[8px] font-bold text-gray-300 uppercase tracking-[3px] bg-gray-50 px-3 py-1 rounded-full border border-gray-100 shadow-inner">Secured Dialogue Stream</span>
         </div>

         {messages.map((m, idx) => (
            <motion.div 
               key={idx} 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
               <div className={`max-w-[85%] px-4 py-3 rounded-[24px] shadow-sm ${
                  m.sender === 'user' 
                  ? 'bg-[#001b33] text-white rounded-br-none border border-white/5' 
                  : 'bg-white text-[#001b33] rounded-bl-none border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.02)]'
               }`}>
                  <p className="text-[14px] font-bold leading-relaxed tracking-tight">{m.text}</p>
                  <div className={`flex items-center gap-1.5 mt-1.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                     <span className={`text-[9px] font-bold uppercase tracking-widest ${m.sender === 'user' ? 'text-white/40' : 'text-gray-300'}`}>
                        {m.time}
                     </span>
                     {m.sender === 'user' && <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]" />}
                  </div>
               </div>
            </motion.div>
         ))}
      </div>

      {/* Floating Footer Area (Sleek & Tactical) */}
      <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-gray-50 space-y-3 pb-8">
         {/* Quick Replies (Branded Pills) */}
         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 px-1">
            {quickReplies.map((reply, idx) => (
               <button 
                  key={idx}
                  onClick={() => setMessage(reply)}
                  className="shrink-0 px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-[16px] text-[10px] font-bold text-gray-400 uppercase tracking-wider hover:bg-[#001b33] hover:text-white hover:border-[#001b33] active:scale-95 transition-all"
               >
                  {reply}
               </button>
            ))}
         </div>

         {/* Text Input (High Density) */}
         <div className="flex items-center gap-2 bg-gray-50/50 rounded-[24px] p-1.5 border border-gray-100 group focus-within:border-accent/30 transition-all">
            <div className="w-9 h-9 flex items-center justify-center text-gray-300 group-focus-within:text-accent transition-colors">
               <Smile size={20} />
            </div>
            <input 
               type="text" 
               placeholder="Write a message..."
               className="flex-1 bg-transparent border-none text-[14px] font-bold text-[#001b33] focus:outline-none placeholder:text-gray-300"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
            />
            <button className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
               message ? 'bg-[#001b33] text-white shadow-xl rotate-0' : 'bg-gray-100 text-gray-300 -rotate-45'
            }`}>
               <Send size={15} strokeWidth={3} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default Chat;

