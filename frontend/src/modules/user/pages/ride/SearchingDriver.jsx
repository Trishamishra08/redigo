import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Search, ShieldCheck, AlertTriangle,
  Phone, MessageCircle, Star, Shield,
  CheckCircle2, MapPin, Navigation,
} from 'lucide-react';

// ---------- constants ----------
const generateOTP = () => String(Math.floor(1000 + Math.random() * 9000));

const MOCK_DRIVERS = [
  { name: 'Kishan Kumawat', rating: '4.9', vehicle: 'Grey Honda Shine', plate: 'MP09 CL 5308', phone: '+919876543210', eta: 2 },
  { name: 'Rajesh Patel',   rating: '4.7', vehicle: 'Black Royal Enfield', plate: 'MP09 AB 1234', phone: '+919876543211', eta: 3 },
  { name: 'Sunil Sharma',   rating: '4.8', vehicle: 'Blue Activa 6G',   plate: 'MP09 CD 9876', phone: '+919876543212', eta: 2 },
];

// Flow stages
// 'searching'  → finding a captain
// 'assigned'   → captain assigned, showing details, cancel visible, OTP hidden
// 'accepted'   → captain accepted ride, OTP revealed, cancel hidden
// 'completing' → ride ending animation
const STAGES = { SEARCHING: 'searching', ASSIGNED: 'assigned', ACCEPTED: 'accepted', COMPLETING: 'completing' };

// ---------- component ----------
const SearchingDriver = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const routeState = location.state || {};

  const [stage, setStage] = useState(STAGES.SEARCHING);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [otp]    = useState(generateOTP);
  const [driver] = useState(() => MOCK_DRIVERS[Math.floor(Math.random() * MOCK_DRIVERS.length)]);

  const timerRef = useRef(null);

  useEffect(() => {
    // Stage 1 → 2: after 5 s captain "found"
    timerRef.current = setTimeout(() => {
      setStage(STAGES.ASSIGNED);

      // Stage 2 → 3: after another 5 s captain "accepts"
      timerRef.current = setTimeout(() => {
        setStage(STAGES.ACCEPTED);

        // Stage 3 → 4: after another 5 s ride "completed"
        timerRef.current = setTimeout(() => {
          setStage(STAGES.COMPLETING);
          setTimeout(() => {
            navigate('/ride/complete', {
              state: {
                ...routeState,
                otp,
                driver,
                fare: routeState.fare || (routeState.vehicle?.price) || 22,
                paymentMethod: routeState.paymentMethod || 'Cash',
              },
            });
          }, 800);
        }, 5000);
      }, 5000);
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, []);

  const handleCancelSearch = () => {
    clearTimeout(timerRef.current);
    navigate('/');
  };

  const isSearching = stage === STAGES.SEARCHING;
  const isAssigned  = stage === STAGES.ASSIGNED;
  const isAccepted  = stage === STAGES.ACCEPTED || stage === STAGES.COMPLETING;

  return (
    <div className="min-h-screen bg-bg-light max-w-lg mx-auto relative font-sans overflow-hidden">

      {/* Blurred Map Background */}
      <div className="absolute inset-0 z-0 scale-110">
        <img src="/map image.avif" className="w-full h-full object-cover blur-[2px] opacity-70 grayscale-[0.2]" alt="Map View" />
      </div>

      {/* ── SEARCHING ANIMATION ── */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            key="pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/20 rounded-[64px]"
              />
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-[64px]"
              />
              <div className="relative w-24 h-24 bg-white rounded-[32px] shadow-2xl flex items-center justify-center p-4 border-4 border-accent/10">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}>
                  <Search size={36} className="text-accent" strokeWidth={3} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close button (only while searching) */}
      {isSearching && (
        <div className="absolute top-8 right-6 z-20">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCancelConfirm(true)}
            className="w-11 h-11 bg-[#001b33] rounded-2xl shadow-xl flex items-center justify-center border border-white/10 active:scale-95 transition-all text-white"
          >
            <X size={20} strokeWidth={3} />
          </motion.button>
        </div>
      )}

      {/* Route Summary Pill */}
      <div className={`absolute top-8 z-20 bg-white/95 backdrop-blur-md rounded-[20px] px-5 py-3 shadow-2xl border border-gray-100 max-w-[70%] ${isSearching ? 'left-6' : 'left-6 right-6 max-w-none'}`}>
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[2px] leading-none mb-1.5 opacity-60">Route</p>
        <p className="text-[14px] font-bold text-[#001b33] leading-tight line-clamp-1 capitalize">
          {routeState.pickup || 'Pickup'} → {routeState.drop || 'Drop'}
        </p>
      </div>

      {/* ── BOTTOM CARD ── */}
      <div className="absolute bottom-10 left-5 right-5 z-20">
        <AnimatePresence mode="wait">

          {/* ---- SEARCHING CARD ---- */}
          {isSearching && (
            <motion.div
              key="searching-card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-white rounded-[40px] p-8 shadow-2xl space-y-6 border border-gray-100"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <h1 className="text-[22px] font-bold text-[#001b33] tracking-tight leading-none uppercase">Finding your captain...</h1>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">Connecting with drivers nearby</p>
              </div>

              <div className="flex justify-center py-2">
                <div className="flex gap-2.5">
                  {[1, 2, 3, 4].map((dot) => (
                    <motion.div
                      key={dot}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: dot * 0.2 }}
                      className="w-2.5 h-2.5 bg-accent rounded-full shadow-sm shadow-accent/20"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 py-5 border-y border-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-200" />
                  <span className="text-[11px] font-bold text-[#001b33] uppercase tracking-widest leading-none">High Chance</span>
                </div>
                <div className="w-[1.5px] h-4 bg-gray-100" />
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-accent" />
                  <span className="text-[11px] font-bold text-[#001b33] uppercase tracking-widest leading-none">Safety Verified</span>
                </div>
              </div>

              <button
                onClick={() => setShowCancelConfirm(true)}
                className="w-full h-18 text-[12px] font-bold text-gray-400 hover:text-red-500 transition-all uppercase tracking-[2px]"
              >
                Cancel My Search
              </button>
            </motion.div>
          )}

          {/* ---- CAPTAIN ASSIGNED CARD ---- */}
          {isAssigned && (
            <motion.div
              key="assigned-card"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-[#001b33] px-6 py-4 flex items-center gap-3">
                <CheckCircle2 size={22} className="text-accent" strokeWidth={3} />
                <div>
                  <p className="text-white font-bold text-[15px] leading-tight uppercase tracking-tight">Captain Found!</p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-0.5">Waiting for captain to accept your ride</p>
                </div>
                <div className="ml-auto flex gap-1.5">
                  {[1,2,3].map(d => (
                    <motion.div key={d} animate={{ scale:[0.5,1,0.5], opacity:[0.3,1,0.3] }} transition={{ repeat:Infinity, duration:1.2, delay: d*0.25 }}
                      className="w-1.5 h-1.5 rounded-full bg-accent"
                    />
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <div className="w-[74px] h-[74px] rounded-[28px] bg-white overflow-hidden border border-gray-100 p-1.5 shadow-xl">
                      <img
                        src={`https://ui-avatars.com/api/?name=${driver.name.replace(' ', '+')}&background=001b33&color=fff`}
                        className="w-full h-full rounded-[20px] object-cover"
                        alt="Driver"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white px-2 py-1.5 rounded-xl border-2 border-gray-50 flex items-center gap-1 shadow-lg">
                      <Star size={10} className="text-accent fill-accent" />
                      <span className="text-[10px] font-bold text-[#001b33] leading-none">{driver.rating}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[20px] font-bold text-[#001b33] leading-tight truncate">{driver.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-[11px] font-bold bg-accent/10 text-accent px-2 py-0.5 rounded-md uppercase tracking-wider">Arriving in {driver.eta} mins</span>
                       <span className="text-[13px] font-bold text-gray-700">{driver.plate}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => window.open(`tel:${driver.phone}`)} className="flex flex-col items-center justify-center gap-2 bg-gray-50/50 rounded-2xl py-4 transition-all active:scale-95 border border-gray-100">
                    <Phone size={20} className="text-[#001b33]" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Call</span>
                  </button>
                  <button onClick={() => navigate('/ride/chat', { state: { driver } })} className="flex flex-col items-center justify-center gap-2 bg-gray-50/50 rounded-2xl py-4 transition-all active:scale-95 border border-gray-100">
                    <MessageCircle size={20} className="text-[#001b33]" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Chat</span>
                  </button>
                  <button onClick={() => navigate('/support')} className="flex flex-col items-center justify-center gap-2 bg-gray-50/50 rounded-2xl py-4 transition-all active:scale-95 border border-gray-100">
                    <Shield size={20} className="text-[#001b33]" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Safety</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="w-full py-4 text-[11px] font-bold text-gray-300 hover:text-red-400 transition-all uppercase tracking-[2px]"
                >
                  Cancel Ride
                </button>
              </div>
            </motion.div>
          )}

          {/* ---- RIDE ACCEPTED CARD ---- */}
          {isAccepted && (
            <motion.div
              key="accepted-card"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-[#001b33] px-6 py-4 flex items-center gap-3">
                <Navigation size={20} className="text-accent" strokeWidth={3} />
                <div>
                  <p className="text-white font-bold text-[15px] leading-tight uppercase tracking-tight">Ride Accepted!</p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-0.5">Your captain is on the way</p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center gap-5 pb-6 border-b border-gray-50">
                   <div className="w-[74px] h-[74px] rounded-[28px] bg-white overflow-hidden border border-gray-100 p-1.5 shadow-xl">
                      <img src={`https://ui-avatars.com/api/?name=${driver.name.replace(' ', '+')}&background=001b33&color=fff`} className="w-full h-full rounded-[20px] object-cover" alt="Captain" />
                   </div>
                   <div className="flex-1">
                      <h3 className="text-[20px] font-bold text-[#001b33] leading-tight">{driver.name}</h3>
                      <p className="text-[13px] font-bold text-accent uppercase tracking-widest mt-1">Plate: {driver.plate}</p>
                      <p className="text-[11px] font-bold text-gray-300 uppercase mt-0.5">{driver.vehicle}</p>
                   </div>
                </div>

                <div className="bg-gray-50/50 rounded-[32px] p-6 text-center space-y-4 border border-gray-100">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">Share OTP with Captain</h4>
                  <div className="flex justify-center gap-2">
                    {otp.split('').map((digit, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="w-12 h-16 bg-white rounded-2xl border-2 border-accent/20 flex items-center justify-center shadow-xl text-[24px] font-bold text-[#001b33]"
                      >
                        {digit}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[11px] font-bold text-[#001b33]/40 uppercase tracking-widest mt-2">To start your ride</p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg" />
                   <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px]">Ride in Progress</span>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Cancel Confirmation Modal (Enhanced) */}
      <AnimatePresence>
        {showCancelConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelConfirm(false)}
              className="fixed inset-0 bg-[#001b33]/60 backdrop-blur-md z-[100] max-w-lg mx-auto"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm bg-white rounded-[44px] p-10 z-[101] shadow-[0_40px_80px_rgba(0,0,0,0.15)] text-center"
            >
              <div className="w-20 h-20 bg-red-50 rounded-[28px] flex items-center justify-center text-red-500 mx-auto mb-6 shadow-inner">
                <AlertTriangle size={36} strokeWidth={2.5} />
              </div>
              <h3 className="text-[22px] font-bold text-[#001b33] mb-3 uppercase tracking-tight">Cancel ride?</h3>
              <p className="text-[14px] font-bold text-gray-400 mb-10 leading-relaxed uppercase tracking-wide opacity-80">
                {isAssigned
                  ? 'A captain has been assigned. Are you sure you want to cancel?'
                  : "We're still looking for a driver nearby. Are you sure you want to stop?"}
              </p>
              <div className="space-y-4">
                <button
                  onClick={handleCancelSearch}
                  className="w-full h-18 bg-[#001b33] text-white rounded-[24px] text-[13px] font-bold uppercase tracking-[2px] shadow-2xl active:scale-95 transition-all"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="w-full h-14 text-[12px] font-bold text-gray-300 uppercase tracking-widest active:scale-95 transition-all"
                >
                  Keep Searching
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchingDriver;
