import React from 'react';
import { useNavigate } from 'react-router-dom';

const LocationCard = ({ location = "Fetching location..." }) => {
  const navigate = useNavigate();

  return (
    <div className="px-5 my-5">
      <div className="bg-[#001b33] rounded-[32px] p-6 shadow-2xl border border-white/5 transition-all group active:scale-[0.98] cursor-pointer" onClick={() => navigate('/ride/select-location')}>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0 border border-accent/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-accent" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
               <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div className="flex-1">
            <span className="text-[12px] text-white/40 font-bold uppercase tracking-widest block">Where to?</span>
            <span className="text-[19px] text-white font-bold block mt-0.5 group-hover:text-accent transition-colors leading-tight">
              {location}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-accent">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
             </svg>
          </div>
          <div className="w-full bg-white/5 border border-white/10 group-hover:border-accent/30 group-hover:bg-white/10 transition-all text-[16px] text-white/40 font-bold rounded-2xl py-4.5 pl-14 pr-6">
            Enter your destination...
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
