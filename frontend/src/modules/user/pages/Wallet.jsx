import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, History, CreditCard, Gift, Send, Wallet as WalletIcon, TrendingUp, TrendingDown } from 'lucide-react';
import BottomNavbar from '../components/BottomNavbar';

const Wallet = () => {
  const navigate = useNavigate();

  const [showAddMoney, setShowAddMoney] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [isAdding, setIsAdding] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleAddMoney = () => {
    if (!amount) return;
    setIsAdding(true);
    setTimeout(() => {
        setIsAdding(false);
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            setShowAddMoney(false);
            setAmount('');
        }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg-light max-w-lg mx-auto flex flex-col font-sans pb-32">
      {/* ADD MONEY MODAL */}
      <AnimatePresence>
        {showAddMoney && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#001b33]/60 backdrop-blur-md p-4">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white w-full max-w-md rounded-[40px] p-8 pb-12 space-y-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowAddMoney(false)}
                className="absolute top-6 right-6 w-11 h-11 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 active:scale-90 transition-all hover:bg-red-50 hover:text-red-500"
              >
                <Plus size={22} className="rotate-45" />
              </button>

              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-[#001b33] tracking-tight">Refill Wallet</h3>
                <p className="text-[12px] font-bold text-gray-400 tracking-widest uppercase">Increase your liquidity</p>
              </div>

              {isSuccess ? (
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center py-8 gap-5">
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[40px] flex items-center justify-center shadow-xl">
                    <History size={48} strokeWidth={2.5} />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#001b33] leading-none">Success!</p>
                    <p className="text-[13px] font-medium text-gray-400 mt-2">Your balance has been updated</p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  <div className="relative group">
                    <span className="absolute left-7 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-300 group-focus-within:text-accent transition-colors">₹</span>
                    <input 
                       type="number"
                       value={amount}
                       onChange={(e) => setAmount(e.target.value)}
                       placeholder="0.00"
                       className="w-full h-24 bg-gray-50/50 border-2 border-gray-100 rounded-[32px] pl-14 pr-8 text-4xl font-bold text-[#001b33] focus:outline-none focus:border-accent/30 transition-all text-center placeholder:text-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {['100', '500', '1000'].map(val => (
                      <button 
                        key={val}
                        onClick={() => setAmount(val)}
                        className={`py-4 rounded-2xl font-bold text-[14px] border-2 transition-all ${
                          amount === val ? 'bg-accent border-accent text-white shadow-xl shadow-accent/20 scale-105' : 'bg-white border-gray-100 text-gray-400'
                        }`}
                      >
                        +₹{val}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={handleAddMoney}
                    disabled={isAdding || !amount}
                    className={`w-full h-18 rounded-[32px] font-bold text-[16px] uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 ${
                      isAdding ? 'bg-gray-100 text-gray-300' : 'bg-[#001b33] text-white hover:bg-[#003366]'
                    }`}
                  >
                    {isAdding ? 'Processing...' : (
                      <>Refill Now <Plus size={22} strokeWidth={3} /></>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER (Completely Compact) */}
      <header className="bg-[#001b33] px-5 py-4 flex items-center gap-4 sticky top-0 z-40 shadow-2xl border-b border-white/5 shrink-0 overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
         <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center active:scale-95 transition-all text-white border border-white/10 relative z-10">
            <ArrowLeft size={16} strokeWidth={3} />
         </button>
         <div className="relative z-10">
            <h1 className="text-[9px] font-bold text-white/30 uppercase tracking-[2.5px] leading-none mb-1 opacity-80">Security Bank</h1>
            <h2 className="text-[17px] font-bold text-white tracking-tight leading-none uppercase">MY WALLET</h2>
         </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-24">
         {/* BALANCE CARD (Refined & Compact) */}
         <div className="px-4 mt-5">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-gradient-to-br from-[#003366] via-[#001b33] to-[#000d1a] rounded-[36px] p-8 text-white shadow-2xl relative overflow-hidden group border border-white/10"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-1000"></div>
               
               <div className="relative z-10 flex flex-col gap-8">
                  <div className="flex justify-between items-start">
                     <div className="space-y-1.5">
                        <p className="text-white/30 font-bold uppercase tracking-[3px] text-[8px]">Available Liquidity</p>
                        <h2 className="text-4xl font-bold tracking-tight">₹1,250<span className="text-white/20 text-2xl font-medium">.00</span></h2>
                     </div>
                     <div className="bg-white/5 w-10 h-10 rounded-xl backdrop-blur-md border border-white/10 flex items-center justify-center">
                        <WalletIcon className="text-accent" size={20} />
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <button 
                        onClick={() => setShowAddMoney(true)}
                        className="flex-3 bg-accent text-white h-13 rounded-[18px] font-bold text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-accent/20"
                     >
                        <Plus size={16} strokeWidth={3} />
                        Refill
                     </button>
                     <button 
                        onClick={() => navigate('/activity')}
                        className="flex-1 h-13 bg-white/5 border border-white/10 rounded-[18px] flex items-center justify-center text-white active:scale-95 transition-all"
                     >
                        <History size={18} strokeWidth={2.5} />
                     </button>
                  </div>
               </div>
            </motion.div>
         </div>

         {/* QUICK ACTIONS grid (Compact) */}
         <div className="px-4 grid grid-cols-3 gap-3">
            {[
               { icon: <Send size={20} />, label: 'Send', color: 'accent', bg: 'accent/5' },
               { icon: <Plus className="rotate-180" size={20} />, label: 'Receive', color: 'emerald-500', bg: 'emerald-50' },
               { icon: <CreditCard size={20} />, label: 'Cards', color: 'blue-500', bg: 'blue-50', path: '/profile/payments' }
            ].map((action, i) => (
               <div 
                  key={i}
                  onClick={() => action.path && navigate(action.path)}
                  className="bg-white border border-gray-50 rounded-[28px] p-5 flex flex-col items-center justify-center gap-3 shadow-sm cursor-pointer active:scale-95 transition-all group"
               >
                  <div className={`w-11 h-11 bg-${action.bg} text-${action.color} rounded-[14px] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
                     {action.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#001b33] uppercase tracking-wider">{action.label}</span>
               </div>
            ))}
         </div>

         {/* PROMO (Compact) */}
         <div className="px-4">
            <div 
               onClick={() => navigate('/taxi/driver/referral')}
               className="bg-[#001b33] border border-white/5 rounded-[32px] p-5 flex items-center gap-5 cursor-pointer active:scale-[0.98] transition-all shadow-xl relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
               <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-accent border border-white/10 shrink-0">
                  <Gift size={22} strokeWidth={2.5} />
               </div>
               <div className="flex-1">
                  <h4 className="text-[15px] font-bold text-white tracking-tight">Refer & Earn ₹50</h4>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[2px]">Invite and expand</p>
               </div>
               <ArrowLeft size={16} className="rotate-180 text-white/20" />
            </div>
         </div>

         {/* HISTORY LOG (Tighter) */}
         <div className="px-4 pt-2">
            <div className="flex items-center justify-between mb-4 px-2">
               <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.25em]">Transaction History</h3>
               <button onClick={() => navigate('/activity')} className="text-[9px] font-bold text-accent uppercase tracking-widest">See All</button>
            </div>
            <div className="space-y-3">
               {[
                  { title: 'Ride to Airport', time: '10:24 AM', amount: '-₹450', type: 'debit', icon: <TrendingDown size={18} />, color: 'red' },
                  { title: 'Wallet Refilled', time: '04:12 PM', amount: '+₹1,000', type: 'credit', icon: <TrendingUp size={18} />, color: 'emerald' }
               ].map((tx, i) => (
                  <div 
                     key={i}
                     onClick={() => tx.type === 'debit' && navigate('/ride/detail/8231')}
                     className="bg-white rounded-[24px] p-4 border border-gray-50 flex items-center gap-3 cursor-pointer active:scale-[0.99] transition-all"
                  >
                     <div className={`w-10 h-10 rounded-xl bg-${tx.color}-50 text-${tx.color}-500 flex items-center justify-center shrink-0`}>
                        {tx.icon}
                     </div>
                     <div className="flex-1 min-w-0">
                        <h4 className="text-[14px] font-bold text-[#001b33] truncate tracking-tight leading-none">{tx.title}</h4>
                        <p className="text-[9px] font-bold text-gray-300 mt-1.5 uppercase tracking-widest">{tx.time}</p>
                     </div>
                     <div className="text-right">
                        <h4 className={`text-[15px] font-bold ${tx.type === 'credit' ? 'text-emerald-500' : 'text-[#001b33]'} tracking-tight`}>{tx.amount}</h4>
                        <div className={`flex items-center gap-1.5 justify-end mt-1 opacity-40`}>
                           <span className="text-[8px] font-bold uppercase tracking-widest">OK</span>
                           <div className={`w-1 h-1 bg-${tx.color}-500 rounded-full`}></div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Wallet;
