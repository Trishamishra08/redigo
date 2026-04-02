import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/AuthLayout';
import { ChevronDown, Phone } from 'lucide-react';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidPhone = phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidPhone) return;

    setLoading(true);
    // Mock API Call
    setTimeout(() => {
      setLoading(false);
      navigate('/verify-otp', { state: { phone: phoneNumber } });
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Enter your mobile number" 
      subtitle="Fast. Affordable. Local rides."
    >
      <form onSubmit={handleLogin} className="space-y-8">
        <div className="space-y-4">
          <label htmlFor="phone" className="text-[12px] font-bold text-[#001b33] uppercase tracking-widest ml-1">
            Mobile Number
          </label>
          <div className="flex items-center gap-3 bg-gray-50/50 rounded-3xl p-5 border-2 border-gray-100 focus-within:border-accent/30 focus-within:bg-white transition-all shadow-sm">
            <div className="flex items-center gap-2 pr-4 border-r border-gray-100 group cursor-pointer">
               <img src="https://flagcdn.com/w40/in.png" alt="India" className="w-6 h-4 object-cover rounded-sm shadow-sm" />
               <span className="text-[16px] font-bold text-[#001b33]">+91</span>
               <ChevronDown size={14} className="text-gray-300 group-hover:text-accent transition-colors" />
            </div>
            <div className="flex-1 flex items-center gap-4">
               <input 
                  type="tel" 
                  id="phone"
                  autoFocus
                  maxLength={10}
                  placeholder="Enter contact number"
                  className="w-full bg-transparent border-none text-[18px] font-bold text-[#001b33] placeholder:text-gray-300 focus:outline-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
               />
            </div>
          </div>
        </div>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          disabled={!isValidPhone || loading}
          className={`w-full h-18 rounded-[32px] text-lg font-bold shadow-2xl transition-all flex items-center justify-center gap-3 ${
            isValidPhone && !loading
            ? 'bg-gradient-to-r from-[#003366] to-[#001b33] text-white shadow-[#001b33]/20' 
            : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Authenticating...</span>
            </div>
          ) : (
            <span>Continue</span>
          )}
        </motion.button>

        <p className="text-[12px] text-gray-300 font-medium text-center leading-relaxed px-4 mt-10">
           By continuing, you agree to our 
           <a href="#" className="font-bold text-accent hover:underline ml-1">Terms</a> & 
           <a href="#" className="font-bold text-accent hover:underline ml-1">Privacy Policy</a>
        </p>
      </form>

      {/* Language Toggle */}
      <div className="mt-14 pt-10 border-t border-gray-50 flex justify-center gap-8">
        <button className="text-[11px] font-bold text-[#001b33] border-b-2 border-accent pb-1 uppercase tracking-widest">EN - ENGLISH</button>
        <button className="text-[11px] font-bold text-gray-300 hover:text-[#001b33] transition-colors uppercase tracking-widest">HI - हिंदी</button>
      </div>
    </AuthLayout>
  );
};

export default Login;
