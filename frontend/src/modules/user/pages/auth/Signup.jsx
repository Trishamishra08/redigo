import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/AuthLayout';
import { User, Mail, Camera } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'prefer-not-to-say'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/'); // Go back to Home / App main
    }, 1200);
  };

  const handleGenderChange = (gender) => {
    setFormData({ ...formData, gender });
  }

  return (
    <AuthLayout 
      title="Complete your profile" 
      subtitle="Just a few details to get started"
    >
      <form onSubmit={handleSignup} className="space-y-8">
        {/* Avatar Placeholder */}
        <div className="flex flex-col items-center">
            <div className="relative group active:scale-95 transition-all">
                <div className="w-24 h-24 rounded-[40px] bg-accent/10 border-2 border-dashed border-accent/30 flex items-center justify-center overflow-hidden">
                    <User size={40} className="text-secondary opacity-30" />
                </div>
                <div className="absolute bottom-1 right-1 w-9 h-9 bg-[#001b33] rounded-2xl border-2 border-white flex items-center justify-center text-white shadow-xl cursor-pointer hover:bg-accent transition-colors">
                    <Camera size={16} />
                </div>
            </div>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-4">Personalize your profile</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-[12px] font-bold text-[#001b33] uppercase tracking-widest ml-1">Full Name *</label>
            <div className="bg-gray-50/50 rounded-3xl p-5 border-2 border-gray-100 focus-within:border-accent/30 focus-within:bg-white transition-all flex items-center gap-4">
              <User size={20} className="text-gray-300" />
              <input 
                type="text" 
                placeholder="Enter your name"
                className="w-full bg-transparent border-none text-[16px] font-bold text-[#001b33] placeholder:text-gray-300 focus:outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[12px] font-bold text-[#001b33] uppercase tracking-widest ml-1">Email Address (Optional)</label>
            <div className="bg-gray-50/50 rounded-3xl p-5 border-2 border-gray-100 focus-within:border-accent/30 focus-within:bg-white transition-all flex items-center gap-4">
              <Mail size={20} className="text-gray-300" />
              <input 
                type="email" 
                placeholder="Ex: hello@domain.com"
                className="w-full bg-transparent border-none text-[16px] font-bold text-[#001b33] placeholder:text-gray-300 focus:outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
             <label className="text-[12px] font-bold text-[#001b33] uppercase tracking-widest ml-1">Gender</label>
             <div className="flex gap-3">
                {['Male', 'Female', 'Other'].map((g) => (
                    <button
                        key={g}
                        type="button"
                        onClick={() => handleGenderChange(g.toLowerCase())}
                        className={`flex-1 py-4 rounded-2xl text-[13px] font-bold border-2 transition-all duration-300 ${
                            formData.gender === g.toLowerCase() 
                            ? 'border-accent bg-accent/5 text-[#001b33] shadow-md scale-105' 
                            : 'border-gray-50 bg-gray-50/50 text-gray-400 hover:bg-gray-100'
                        }`}
                    >
                        {g}
                    </button>
                ))}
             </div>
          </div>
        </div>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!formData.name || loading}
          className={`w-full h-18 rounded-[32px] text-lg font-bold shadow-2xl transition-all flex items-center justify-center gap-3 mt-6 ${
            formData.name && !loading
            ? 'bg-gradient-to-r from-[#003366] to-[#001b33] text-white shadow-[#001b33]/20' 
            : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'
          }`}
        >
          {loading ? (
            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            <span>Genesis Account</span>
          )}
        </motion.button>

        <div className="text-center mt-6">
            <button 
                type="button"
                onClick={() => navigate('/')} 
                className="text-gray-400 font-bold hover:text-[#001b33] transition-colors text-sm underline underline-offset-8 decoration-gray-200"
            >
                Skip for now
            </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
