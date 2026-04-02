import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-bg-light flex flex-col lg:flex-row font-sans selection:bg-accent/20 selection:text-secondary overflow-hidden">
      {/* Left side (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#003366] via-[#001b33] to-[#000d1a] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-10 left-10 z-20">
          <div className="text-3xl font-bold text-white tracking-[0.2em] uppercase drop-shadow-2xl">NAMMATAXI</div>
        </div>
        
        <div className="relative z-10 text-center max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl font-black text-white leading-none mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
              FAST.<br/>FLAWLESS.<br/><span className="text-accent underline decoration-white/20 underline-offset-8">LOCAL.</span>
            </h2>
            <p className="text-white/50 text-xl font-medium mb-12 tracking-wide">
              Reliable transport and logistics for the modern city.
            </p>
          </motion.div>
          
          <img 
            src="/1_Log In Anytime. Earn Anytime.jpg" 
            alt="Redigo Promo" 
            className="w-full max-w-sm mx-auto shadow-[0_40px_80px_rgba(0,0,0,0.5)] rounded-[48px] mt-6 transform hover:scale-105 transition-transform duration-700 border border-white/5"
          />
        </div>
        
        {/* Abstract shapes for luxury feel */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[120px] -ml-24 -mb-24"></div>
      </div>

      {/* Right side (Mobile-first login card) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative bg-bg-light">
        {/* Mobile Header (Visible only on small screens) */}
        <div className="lg:hidden absolute top-8 left-0 right-0 flex flex-col items-center">
            <h1 className="text-2xl font-black text-[#001b33] tracking-[0.15em]">NAMMATAXI</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2 border-t border-gray-100 pt-1">Premium Mobility & Logistics</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg bg-white rounded-[44px] p-8 md:p-14 shadow-[0_30px_100px_rgba(0,27,51,0.08)] border border-gray-50 mt-12 lg:mt-0"
        >
          {title && (
            <div className="mb-10 text-center lg:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-[#001b33] leading-tight tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-400 text-[15px] font-medium mt-3 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </motion.div>
        
        {/* Helper footer link */}
        <div className="absolute bottom-10 text-center w-full max-w-md">
            <p className="text-gray-300 text-sm font-medium">
               Experiencing issues? <a href="#" className="text-accent font-bold hover:underline ml-1">Get Support</a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
