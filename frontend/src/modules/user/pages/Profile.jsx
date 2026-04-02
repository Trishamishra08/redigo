import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Wallet, Bell, Shield, LogOut, ChevronRight, HelpCircle, MapPin } from 'lucide-react';
import BottomNavbar from '../components/BottomNavbar';

const SettingRow = ({ icon: Icon, title, sub, color, onClick }) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex items-center gap-4 py-5 px-6 bg-white border-b border-gray-50 last:border-none cursor-pointer group active:bg-gray-50 transition-colors"
  >
    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${color} shadow-sm border border-white/10`}>
        <Icon size={22} strokeWidth={2.5} />
    </div>
    <div className="flex-1 min-w-0">
        <h4 className="text-[16px] font-bold text-[#001b33] leading-none">{title}</h4>
        {sub && <p className="text-[12px] font-medium text-gray-400 mt-1.5 opacity-80 truncate">{sub}</p>}
    </div>
    <ChevronRight size={18} className="text-gray-300 group-hover:text-accent transition-colors" strokeWidth={3} />
  </motion.div>
);

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-light max-w-lg mx-auto flex flex-col font-sans pb-32">
       {/* PROFILE HEADER - BRANDED */}
       <header className="bg-[#001b33] px-5 pt-10 pb-8 flex flex-col items-center gap-4 relative overflow-hidden shadow-xl border-b border-white/5">
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/5 to-transparent opacity-20"></div>
          <div className="relative z-10 scale-95">
             <div className="w-[84px] h-[84px] rounded-[32px] bg-white/10 p-1 border-2 border-white/20 shadow-2xl backdrop-blur-md">
                <img src="https://ui-avatars.com/api/?name=Hritik+Raghuwanshi&background=003366&color=fff" className="w-full h-full rounded-[28px] object-cover" alt="User" />
             </div>
             <div className="absolute -bottom-1 -right-1 bg-accent w-6 h-6 rounded-full border-[3px] border-[#001b33] shadow-lg flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
             </div>
          </div>
          <div className="text-center z-10">
             <h1 className="text-[19px] font-bold text-white tracking-tight leading-none capitalize">hritik raghuwanshi</h1>
             <p className="text-[12px] font-bold text-white/40 mt-2 uppercase tracking-widest">+91 98765 43210</p>
          </div>
       </header>

       {/* SETTINGS MENU - PREMIUM STYLE */}
       <div className="flex-1 -mt-6 px-5 relative z-20">
          <div className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-2xl flex flex-col">
             <SettingRow 
                icon={User} 
                title="Profile Settings" 
                sub="Manage your personal info" 
                onClick={() => navigate('/profile/settings')}
                color="bg-accent/10 text-accent" 
             />
             <SettingRow 
                icon={Wallet} 
                title="Wallet" 
                sub="Balance, Transactions & Add Money" 
                onClick={() => navigate('/wallet')}
                color="bg-blue-50 text-blue-600" 
             />
             <SettingRow 
                icon={MapPin} 
                title="Saved Addresses" 
                sub="Home, Office & others" 
                onClick={() => navigate('/profile/addresses')}
                color="bg-green-50 text-green-600" 
             />
             <SettingRow 
                icon={Bell} 
                title="Notifications" 
                sub="Offers, News & Safety alerts" 
                onClick={() => navigate('/profile/notifications')}
                color="bg-purple-50 text-purple-600" 
             />
             <SettingRow 
                icon={Shield} 
                title="Security" 
                sub="Manage your privacy" 
                onClick={() => navigate('/profile/security')}
                color="bg-red-50 text-red-600" 
             />
             <SettingRow 
                icon={HelpCircle} 
                title="Support Center" 
                sub="Get help with your experience" 
                onClick={() => navigate('/support')}
                color="bg-[#001b33]/10 text-[#001b33]" 
             />
          </div>

          <button 
            className="w-full mt-10 mb-10 flex items-center justify-center gap-3 py-5 bg-red-50 text-red-600 rounded-[32px] text-[15px] font-bold uppercase tracking-widest active:scale-[0.98] transition-all hover:bg-red-100/50 shadow-sm border border-red-100 mb-20"
            onClick={() => navigate('/login')}
          >
             <LogOut size={20} strokeWidth={3} />
             <span>Sign Out</span>
          </button>
       </div>

      <BottomNavbar />
    </div>
  );
};

export default Profile;

