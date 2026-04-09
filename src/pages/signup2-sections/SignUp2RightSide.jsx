import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import { MdOutlineEmail } from "react-icons/md";
import { CiUnlock, CiLock } from "react-icons/ci";
import { Logo } from "../SignUp-reusables/Logo";

export function SignUp2RightSide() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Access data from SignUp1
  const { email, firstName, lastName, firebaseUid } = location.state || {};

  // Form State
  const [role, setRole] = useState("employee");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Logic to check if button should be enabled
  const isPasswordValid = password.length >= 8; // Basic length check (can be enhanced)
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleContinue = (e) => {
    e.preventDefault(); // Prevent page reload

    if (!passwordsMatch) return;

    // Determine target URL based on toggle
    const targetUrl = role === "employee" 
      ? "/signup3-employee" 
      : "/signup3-organization";

    // Navigate and append/pass all data to the next step
    navigate(targetUrl, {
      state: {
        email,
        firstName,
        lastName,
        firebaseUid,
        password, // Pass password to save in MySQL later
        role      // Pass selected role
      }
    });
  };

  return (
    <>
      <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-24 bg-white overflow-y-auto">
        <Logo />
        
        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h3 className="text-3xl lg:text-4xl font-bold inline-block text-gray-700">Account Setup</h3>
          <p className="text-gray-400 text-base lg:text-lg mt-2 mb-8 lg:mb-10">Establishing your secure gateway access</p>

          <form className="space-y-4" onSubmit={handleContinue}>
            
            {/* Email Input (Read Only) */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <MdOutlineEmail className="w-5 h-5" />
              </span>
              <input 
                type="email" 
                value={email || ""} 
                readOnly 
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed outline-none" 
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <CiUnlock className="w-5 h-5" />
              </span>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  password && !isPasswordValid 
                    ? "border-red-400 focus:ring-red-400" 
                    : "border-gray-200 focus:ring-[#89A1EF]"
                }`}
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <CiLock className="w-5 h-5" />
              </span>
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  confirmPassword && !passwordsMatch ? "border-red-400 focus:ring-red-400" : "border-gray-200 focus:ring-[#89A1EF]"
                }`}
              />
            </div>

            {/* Role Toggle */}
            <div className="relative p-1 bg-gray-100 rounded-xl flex items-center mt-2 w-full">
              <motion.div
                initial={false}
                animate={{ x: role === "employee" ? "0%" : "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-1/2 h-[calc(100%-8px)] bg-white rounded-lg shadow-sm z-0"
              />

              <button
                type="button"
                onClick={() => setRole("employee")}
                className={`cursor-pointer relative z-10 flex-1 py-2 text-sm font-semibold transition-colors duration-200 ${
                  role === "employee" ? "text-slate-700" : "text-slate-400"
                }`}
              >
                Employee
              </button>

              <button
                type="button"
                onClick={() => setRole("business_admin")}
                className={`cursor-pointer relative z-10 flex-1 py-2 text-sm font-semibold transition-colors duration-200 ${
                  role === "business_admin" ? "text-slate-700" : "text-slate-400"
                }`}
              >
                Organization Admin
              </button>
            </div>

            {/* Submit Button (Disabled logic added) */}
            <button 
              type="submit"
              disabled={!passwordsMatch}
              className={`group relative w-full font-bold py-3.5 lg:py-4 rounded-xl mt-4 lg:mt-6 flex items-center justify-center transition-all shadow-lg 
                ${passwordsMatch && isPasswordValid
                  ? "bg-[#89A1EF] text-white hover:bg-[#768bd9] active:scale-[0.98] shadow-[#89A1EF]/20 cursor-pointer" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                }`}
            >
              <span>Continue</span>
              <div className="absolute right-6 flex items-center justify-center">
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <p className="text-center mt-6 lg:mt-8 text-gray-600 font-medium">
            Already have an account? <Link to="/login" className="text-[#89A1EF] font-bold hover:text-[#6282eb] ml-1 cursor-pointer">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}