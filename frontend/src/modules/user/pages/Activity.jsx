import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bike, Box, ChevronRight, Calendar, Clock, Headset } from 'lucide-react';
import BottomNavbar from '../components/BottomNavbar';

const ActivityItem = ({ id, type, title, address, date, time, status, price, onClick }) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(id)}
    className="bg-white rounded-[32px] p-5 mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all active:bg-gray-50/50"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
        type === 'ride' ? 'bg-accent/10 text-accent' : 'bg-primary-light/50 text-secondary'
    }`}>
        {type === 'ride' ? <Bike size={24} strokeWidth={2.5} /> : <Box size={24} strokeWidth={2.5} />}
    </div>
    <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
            <h4 className="text-[16px] font-bold text-[#001b33] leading-none truncate">{title}</h4>
            <span className="text-[15px] font-bold text-[#001b33]">₹{price}</span>
        </div>
        <p className="text-[13px] font-medium text-gray-400 mt-1.5 truncate max-w-[200px]">{address}</p>
        <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                <Calendar size={12} strokeWidth={2.5} />
                <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider leading-none">
                <Clock size={12} strokeWidth={2.5} />
                <span>{time}</span>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg leading-none ${
                status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
                {status.toUpperCase()}
            </span>
        </div>
    </div>
  </motion.div>
);

const Activity = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const activities = [
    { id: '8231', type: 'ride', title: 'Ride with Kishan Kumawat', address: 'Vijay Nagar, Indore', date: '29 Mar', time: '12:45 PM', status: 'Completed', price: '22' },
    { id: '4492', type: 'parcel', title: 'Gift for Rahul', address: 'Bhawarkua, Indore', date: '28 Mar', time: '11:20 AM', status: 'Completed', price: '45' },
    { id: '1105', type: 'ride', title: 'Ride with Rajesh', address: 'LIG Colony, Indore', date: '28 Mar', time: '09:12 AM', status: 'Cancelled', price: '0' },
  ];

  const filtered = activities.filter((a) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Rides') return a.type === 'ride';
    if (activeTab === 'Parcels') return a.type === 'parcel';
    return false;
  });

  const handleItemClick = (item) => {
    if (item.type === 'parcel') {
      navigate(`/parcel/detail/${item.id}`);
    } else {
      navigate(`/ride/detail/${item.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light max-w-lg mx-auto flex flex-col font-sans pb-32">
      <header className="bg-[#001b33] px-5 pt-8 pb-10 flex items-center gap-6 sticky top-0 z-20 shadow-xl border-b border-white/5">
         <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center active:scale-95 transition-all text-white border border-white/10">
            <ArrowLeft size={22} strokeWidth={3} />
         </button>
         <div>
            <h1 className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-1">My Bookings</h1>
            <h2 className="text-[20px] font-bold text-white tracking-tight leading-none">Recent Activity</h2>
         </div>
      </header>

      <div className="px-5 -mt-6 py-4 flex gap-3 overflow-x-auto no-scrollbar z-30">
          {['All', 'Rides', 'Parcels', 'Support'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-7 py-3 rounded-2xl text-[12px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab ? 'bg-accent text-white shadow-xl shadow-accent/20 scale-100' : 'bg-white text-gray-400 shadow-sm border border-gray-100'
                }`}
              >
                {tab}
              </button>
          ))}
      </div>

      <div className="flex-1 px-5 pt-4">
         {activeTab === 'Support' ? (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col items-center justify-center py-20 text-center gap-5"
           >
             <div className="w-24 h-24 bg-[#001b33] rounded-[40px] flex items-center justify-center shadow-2xl">
               <Headset size={40} className="text-accent" />
             </div>
             <div className="space-y-1">
               <h3 className="text-[19px] font-bold text-[#001b33]">No support tickets</h3>
               <p className="text-[13px] font-medium text-gray-400">You haven't raised any support tickets yet.</p>
             </div>
             <button
               onClick={() => navigate('/support')}
               className="mt-4 bg-[#001b33] text-white px-10 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-2xl active:scale-95 transition-all"
             >
               Contact Us
             </button>
           </motion.div>
         ) : filtered.length === 0 ? (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="flex flex-col items-center justify-center py-20 text-center gap-3"
           >
             <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-500">📭</div>
             <p className="text-[15px] font-bold text-gray-400">No {activeTab.toLowerCase()} found</p>
           </motion.div>
         ) : (
           filtered.map((a, idx) => (
             <ActivityItem
               key={idx}
               {...a}
               onClick={() => handleItemClick(a)}
             />
           ))
         )}
      </div>

      <BottomNavbar />
    </div>
  );
};

export default Activity;

