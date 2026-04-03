import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { EmployeeRightside } from './signup3-sections/EmployeeRightside';

export default function SignUpPage3_Employee() {
  return (
    // min-h-screen ensures it covers the viewport even if content is short
    // lg:h-screen locks it to 100vh on desktop
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full bg-white overflow-x-hidden">
      
      {/* LEFT SIDE: Image Panel (60% on desktop, 30vh on mobile) */}
      <div className="relative w-full lg:w-[55%] h-[30vh] lg:h-full flex flex-col justify-end p-8 lg:p-16 text-white">
        {/* Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/imgs/SignUpPage-img-hero3.webp')`,
          }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-2 lg:mb-4">Secure Agentic Gateway</h1>
          <p className="text-base lg:text-xl font-light opacity-90 mb-6 lg:mb-10 max-w-md">
            Govern and protect your enterprise AI data
          </p>
          
          {/* Pagination Indicators - Hidden on small mobile to save space */}
          <div className="hidden sm:flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
            <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 40 }} // 40px is w-10
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-2 rounded-full bg-white"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Form Panel (40% on desktop) */}
      <EmployeeRightside />

    </div>
  );
}