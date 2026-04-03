import React from 'react';
import { Link } from 'react-router-dom';
import { IoBusinessOutline, IoLocationOutline, IoCalendarOutline, IoLayersOutline } from "react-icons/io5";
import { MapControlsExample } from '../../components/MapControls';
import { Logo } from '../SignUp-reusables/Logo';

export function OrganizationRightside() {

  return (
    <>

      <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-24 bg-white overflow-y-auto">
        
        {/* Logo */}
        <Logo />
        
        {/* Form Container */}
        <div className="max-w-md w-full mx-auto lg:mx-0">
          <h3 className="text-3xl lg:text-4xl font-bold inline-block text-gray-700">Organization Details</h3>
          <p className="text-gray-400 text-base lg:text-lg mt-2 mb-8 lg:mb-10">Registering your institution's profile</p>

          <form className="space-y-4">

            {/* Name Group (First & Last Name) */}
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

            {/* Business / Organization Name */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <IoBusinessOutline className="w-5 h-5" />
              </span>
              <input 
                type="text" 
                placeholder="Business / Organization / Institution Name"
                className="w-full pl-11 pr-4 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all"
              />
            </div>

            {/* Date and Entity Type Group */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Date Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <IoCalendarOutline className="w-5 h-5" />
                </span>
                <input 
                  type="date" 
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all text-gray-500"
                />
              </div>

              {/* Entity Type Dropdown */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                  <IoLayersOutline className="w-5 h-5" />
                </span>
                <select className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all text-gray-500 appearance-none">
                  <option value="" disabled selected>Entity Type</option>
                  <option value="government">Government</option>
                  <option value="private">Private</option>
                  <option value="ngo">Non-Profit (NGO)</option>
                  <option value="educational">Educational</option>
                </select>
              </div>
            </div>

            {/* Interactive Map Container */}
            <MapControlsExample />

            {/* Submit Button */}
            <button className="group relative w-full bg-[#89A1EF] text-white font-bold py-3.5 lg:py-4 rounded-xl mt-4 lg:mt-6 flex items-center justify-center hover:bg-[#768bd9] active:scale-[0.98] transition-all shadow-lg shadow-[#89A1EF]/20 cursor-pointer">
              <span>Continue</span>
              <div className="absolute right-6 flex items-center justify-center">
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
          </form>

          {/* Login Footer */}
          <p className="text-center mt-6 lg:mt-8 text-gray-600 font-medium">
            Already have an account? <Link to="/login" className="text-[#89A1EF] font-bold hover:text-[#6282eb] ml-1 cursor-pointer">Login</Link>
          </p>
        </div>

      </div>

    </>

  );

}