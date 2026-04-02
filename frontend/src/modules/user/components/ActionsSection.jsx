import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionCard = ({ title, subtitle, image, bgColor, textColor, buttonColor, buttonText, path }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`relative flex-1 rounded-[40px] p-6 overflow-hidden ${bgColor} group transition-all hover:shadow-2xl active:scale-[0.98] border border-white/5`}>
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="max-w-[140px] mb-4">
          <h3 className={`text-[22px] font-bold leading-tight tracking-tight ${textColor}`}>{title}</h3>
          <p className={`text-[12px] font-medium mt-1.5 opacity-60 leading-tight ${textColor}`}>{subtitle}</p>
        </div>
        <div className="mt-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(path);
            }}
            className={`px-6 py-3 rounded-2xl text-[14px] font-bold whitespace-nowrap shadow-2xl transition-all active:scale-95 ${buttonColor} text-white self-start border border-white/10`}
          >
            {buttonText}
          </button>
        </div>
      </div>
      <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-[140px] opacity-100 group-hover:scale-110 group-hover:-translate-x-4 transition-all duration-700 pointer-events-none">
        <img src={image} alt={title} className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
      </div>
    </div>
  );
};


const ActionsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="px-5 mb-10">
      <h2 className="text-[20px] font-bold text-[#001b33] mb-5 ml-1 tracking-tight">Daily Essentials</h2>

      <div className="flex gap-4">
        {/* Ride Now Section */}
        <ActionCard 
          title="Ride Now"
          subtitle="Prompt bike & auto pickup"
          image="/1_Bike.png"
          bgColor="bg-[#001b33]"
          textColor="text-white"
          buttonColor="bg-accent"
          buttonText="Book Now"
          path="/ride/select-location"
        />

        {/* Delivery Section */}
        <ActionCard 
          title="Delivery"
          subtitle="Fetch or Send anything"
          image="/5_Parcel.png"
          bgColor="bg-[#003366]"
          textColor="text-white"
          buttonColor="bg-[#0052cc]"
          buttonText="Send Now"
          path="/parcel/type"
        />
      </div>
    </div>
  );
};

export default ActionsSection;
