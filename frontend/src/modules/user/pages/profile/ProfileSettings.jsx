import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Smartphone, Camera, CheckCircle2 } from 'lucide-react';

const ProfileSettings = () => {
  const [name, setName] = useState('Hritik Raghuwanshi');
  const [email, setEmail] = useState('hritik@redigo.com');
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-bg-light max-w-lg mx-auto flex flex-col font-sans relative overflow-hidden">
      <header className="bg-[#001b33] px-5 py-4 flex items-center gap-4 border-b border-white/5 sticky top-0 z-30 shadow-2xl overflow-hidden shrink-0">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
         <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-all text-white relative z-10 font-bold">
            <ArrowLeft size={16} strokeWidth={3} />
         </button>
         <div className="relative z-10">
            <h1 className="text-[9px] font-bold text-white/30 uppercase tracking-[2px] leading-none mb-1 opacity-80">Settings</h1>
            <h2 className="text-[16px] font-bold text-white leading-none tracking-tight uppercase">User Profile</h2>
         </div>
      </header>

      <div className="flex-1 p-5 space-y-4 overflow-hidden flex flex-col">
         {/* AVATAR EDIT AREA (More Compact) */}
         <div className="flex flex-col items-center gap-3 py-2 shrink-0">
            <div className="relative group cursor-pointer active:scale-95 transition-all">
               <div className="w-[85px] h-[85px] rounded-[36px] bg-white p-1 border-2 border-accent/10 shadow-lg overflow-hidden relative">
                  <img src="https://ui-avatars.com/api/?name=Hritik+Raghuwanshi&background=001b33&color=fff" className="w-full h-full rounded-[28px] object-cover" alt="User" />
               </div>
               <div className="absolute -bottom-1 -right-1 bg-[#001b33] p-2 rounded-xl shadow-2xl border-2 border-white text-accent">
                  <Camera size={14} strokeWidth={3} />
               </div>
            </div>
         </div>

         {/* FORM FIELDS - HIGH DENSITY */}
         <div className="space-y-3 flex-1">
            <div className="space-y-1">
               <label className="text-[9px] font-bold text-gray-400 ml-5 uppercase tracking-[1.5px] opacity-70">Identity</label>
               <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-[22px] p-3.5 px-6 focus-within:border-accent/40 transition-all group">
                  <User size={16} className="text-gray-300 group-focus-within:text-accent transition-colors" strokeWidth={2.5} />
                  <input 
                     type="text" 
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="flex-1 bg-transparent border-none text-[14px] font-bold text-[#001b33] focus:outline-none placeholder:text-gray-300"
                  />
                  <CheckCircle2 size={14} className="text-emerald-500" strokeWidth={3} />
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-[9px] font-bold text-gray-400 ml-5 uppercase tracking-[1.5px] opacity-70">Email</label>
               <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-[22px] p-3.5 px-6 focus-within:border-accent/40 transition-all group">
                  <Mail size={16} className="text-gray-300 group-focus-within:text-accent transition-colors" strokeWidth={2.5} />
                  <input 
                     type="email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="flex-1 bg-transparent border-none text-[14px] font-bold text-[#001b33] focus:outline-none placeholder:text-gray-300"
                  />
               </div>
            </div>

            <div className="space-y-1">
               <label className="text-[9px] font-bold text-gray-400 ml-5 uppercase tracking-[1.5px] opacity-70">Verified Mobile</label>
               <div className="flex items-center gap-3 bg-gray-50/30 border border-gray-50 rounded-[22px] p-3.5 px-6 opacity-70 cursor-not-allowed">
                  <Smartphone size={16} className="text-gray-300" strokeWidth={2.5} />
                  <span className="flex-1 text-[14px] font-bold text-[#001b33]">91 98765 43210</span>
                  <div className="bg-emerald-50 text-emerald-500 text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider border border-emerald-100/50">OK</div>
               </div>
            </div>
         </div>
      </div>

      <div className="p-5 pb-8 bg-white border-t border-gray-50 shrink-0">
         <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/profile')}
            className="w-full h-14 bg-[#001b33] rounded-[22px] text-[14px] font-bold text-white uppercase tracking-[2px] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
            <span className="relative z-10">Update Profile</span>
         </motion.button>
      </div>
    </div>
  );
};

export default ProfileSettings;
