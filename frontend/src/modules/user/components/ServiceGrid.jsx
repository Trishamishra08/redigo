import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServiceItem = ({ icon, label, path }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      whileTap={{ scale: 0.95 }}
      onClick={() => path && navigate(path)}
      className="flex flex-col items-center gap-3 cursor-pointer group"
    >
      <div className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] bg-white rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center justify-center p-4 transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/10 group-hover:-translate-y-1">
        <img src={icon} alt={label} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
      </div>
      <span className="text-[13px] font-bold text-[#001b33] tracking-tight transition-colors group-hover:text-accent">{label}</span>
    </motion.div>
  );
};

const ServiceGrid = () => {
  const services = [
    { icon: '/1_Bike.png', label: 'Ride', path: '/ride/select-location' },
    { icon: '/5_Parcel.png', label: 'Delivery', path: '/parcel/type' },
    { icon: '/2_AutoRickshaw.png', label: 'Rental', path: '/rental' },
    { icon: '/4_Taxi.png', label: 'Outstation', path: '/intercity' },
  ];

  return (
    <div className="px-5 mb-8 mt-10">
      <h2 className="text-[20px] font-bold text-[#001b33] mb-5 ml-1 tracking-tight">Explore our Services</h2>
      <div className="flex justify-between items-center gap-3">
        {services.map((service, index) => (
          <ServiceItem key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
