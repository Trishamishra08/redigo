import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import NammataxiLogo from '@/assets/nammataxi_logo_solid_bg.png';
import { User } from 'lucide-react';

const HeaderGreeting = ({ name = "hritik raghuwanshi" }) => {
  const navigate = useNavigate();

  return (
    <div className="pt-6 pb-6 space-y-5 bg-[#001b33] sticky top-0 z-50 shadow-2xl border-b border-white/5 overflow-hidden">
      {/* Abstract light effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

      {/* Brand Header */}
      <div className="px-5 flex items-center justify-between relative z-10">
         <div className="shrink-0 active:scale-95 transition-all">
            <img 
               src={NammataxiLogo} 
               alt="Nammataxi" 
               className="h-18 w-auto object-contain" 
            />
         </div>
         <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/wallet')}
              className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center active:scale-90 transition-all hover:bg-white/10"
            >
               <Wallet size={20} className="text-white" strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center active:scale-90 transition-all hover:bg-white/10"
            >
               <User size={20} className="text-white" strokeWidth={2.5} />
            </button>
         </div>
      </div>

      {/* Greeting Row (Integrated) */}
      <div className="px-5 relative z-10">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-[19px] font-bold text-white tracking-tight leading-none uppercase">
                 Good Morning, <span className="text-accent">{name.split(' ')[0]}</span> 👋
               </h1>
               <p className="text-[12px] text-white/20 font-medium mt-2 tracking-widest uppercase">Select your destination</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HeaderGreeting;
