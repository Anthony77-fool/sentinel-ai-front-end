import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { IoCodeSlashOutline } from "react-icons/io5";

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
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/imgs/SignUpPage-img-hero3.jpg')`,
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
      <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-24 bg-white overflow-y-auto">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 lg:mb-12">
          <div className="bg-[#89A1EF] p-2 rounded-lg shrink-0">
              {/*Logo Picture here */}
             <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
             </svg>
          </div>
          <div className="leading-tight">
            <h2 className="font-bold text-lg lg:text-xl text-[#4b598a] inline-block tracking-tight">SentinelAI</h2>
            <p className="text-xs lg:text-sm text-[#5d6da2] font-medium uppercase tracking-wider">Governance</p>
          </div>
        </div>
        
        {/* Form Container */}
        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h3 className="text-3xl lg:text-4xl font-bold inline-block text-gray-700">User Credentials</h3>
          <p className="text-gray-400 text-base lg:text-lg mt-2 mb-8 lg:mb-10">Securely identifying your account</p>

          <form className="space-y-4">

            {/* Email Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <MdOutlineEmail className="w-5 h-5" />
              </span>
              <input 
                type="email" 
                placeholder="Email"
                className="w-full pl-11 pr-4 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all"
              />
            </div>

            {/* Name Group (Two columns on larger screens) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                <input type="text" placeholder="First Name" className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all" />
              </div>

              <div className="relative">
                <input type="text" placeholder="Last Name" className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all" />
              </div>
            </div>

            {/* Business Code Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <IoCodeSlashOutline className="w-5 h-5" />
              </span>
              <input 
                type="text" 
                placeholder="Organizations Unique Code"
                className="w-full pl-11 pr-4 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <button className="group relative w-full bg-[#89A1EF] text-white font-bold py-3.5 lg:py-4 rounded-xl mt-4 lg:mt-6 flex items-center justify-center hover:bg-[#768bd9] active:scale-[0.98] transition-all shadow-lg shadow-[#89A1EF]/20 cursor-pointer">
  
              {/* The Text stays centered because of the flex/justify-center on the parent */}
              <span>Continue</span>            {/* Verify first then changed to continue */}

              {/* The Icon is locked to the right side */}
              <div className="absolute right-6 flex items-center justify-center">
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 lg:my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-400">or</span></div>
          </div>

          {/* Login Footer */}
          <p className="text-center mt-6 lg:mt-8 text-gray-600 font-medium">
            Already have an account? <Link to="/login" className="text-[#89A1EF] font-bold hover:text-[#6282eb] ml-1 cursor-pointer">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}