import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { CiUnlock, CiLock  } from "react-icons/ci";
import { Logo } from '../SignUp-reusables/Logo';

export function ResetPasswordRightSide() {

  return (

    <>

      {/* RIGHT SIDE: Form Panel (40% on desktop) */}
      <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-24 bg-white overflow-y-auto">
        
        {/* Logo */}
        <Logo />
        
        {/* Form Container */}
        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h3 className="text-3xl lg:text-4xl font-bold inline-block text-gray-700">Forgot your password?</h3>
          <p className="text-gray-400 text-base lg:text-lg mt-2 mb-8 lg:mb-10">We'll send you a link to reset your password.</p>

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

            {/* Password Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <CiUnlock className="w-5 h-5" />
              </span>
              <input type="password" placeholder="Password" className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all" />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <CiLock className="w-5 h-5" />
              </span>
              <input type="password" placeholder="Confirm Password" className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all" />
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

    </>

  )

}