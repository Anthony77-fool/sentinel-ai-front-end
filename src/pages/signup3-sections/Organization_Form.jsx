import React, { useState, useRef, useEffect } from 'react';
import { IoBusinessOutline, IoPersonOutline } from "react-icons/io5";
import { Founding_Date, Entity_Type, MapCDN } from './OrgForm_Components';

export function Organization_Form() {

  return (
    <form className="space-y-5">
      {/* Name Group - FName and LName */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <IoPersonOutline className="w-5 h-5" />
          </span>
          <input type="text" placeholder="First Name" className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#89A1EF] outline-none transition-all" />
        </div>
        <div className="relative">
          <input type="text" placeholder="Last Name" className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#89A1EF] outline-none transition-all" />
        </div>
      </div>

      {/* Business Name */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <IoBusinessOutline className="w-5 h-5" />
        </span>
        <input type="text" placeholder="Business / Organization Name" className="w-full pl-11 pr-4 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#89A1EF] outline-none transition-all" />
      </div>

      {/* Founding Date of the Institution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Founding Date of the Institution */}
        <Founding_Date />

        {/* Entity type SELECT */}
        <Entity_Type />

      </div>

      {/* Map Section */}
      <MapCDN />

      {/* Submit Button */}
      <button 
        type="button"
        className="group relative w-full bg-[#89A1EF] text-white font-bold py-4 rounded-xl mt-6 flex items-center justify-center hover:bg-[#768bd9] active:scale-[0.98] transition-all shadow-lg shadow-[#89A1EF]/20"
      >
        <span>Continue</span>
        <div className="absolute right-6">
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </button>
    </form>
  );
}