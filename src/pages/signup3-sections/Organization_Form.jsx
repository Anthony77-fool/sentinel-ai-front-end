import React, { useState } from 'react';
import { IoBusinessOutline, IoCalendarOutline, IoLayersOutline } from "react-icons/io5";
import { MapControlsExample } from '../../components/MapControls';

// Import Shadcn Select components (assuming they are in your ui folder)
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function Organization_Form() {
  // State to hold form data - Important for your BSIT documentation!
  const [entityType, setEntityType] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });

  return (
    <form className="space-y-5">
      {/* Name Group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
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
        <input type="text" placeholder="Business /Organization / Institution Name" className="w-full pl-11 pr-4 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#89A1EF] outline-none transition-all" />
      </div>

      {/* Date and Custom Select Group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <IoCalendarOutline className="w-5 h-5" />
          </span>
          <input type="date" className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-500 focus:ring-2 focus:ring-[#89A1EF] outline-none" />
        </div>

        {/* REFINED SHADCN SELECT */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 z-10 pointer-events-none">
            <IoLayersOutline className="w-5 h-5" />
          </span>
          
          <Select onValueChange={setEntityType} defaultValue={entityType}>
            {/* Changed py-6 to py-3.5 lg:py-4 to match your Business Name input perfectly.
              Added h-auto and leading-none to prevent text-alignment shifts.
            */}
            <SelectTrigger className="w-full pl-11 py-3.5 lg:py-4 h-auto bg-white border-gray-200 rounded-xl text-gray-500 focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all leading-none">
              <SelectValue placeholder="Entity Type" />
            </SelectTrigger>
            
            <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
              <SelectItem value="government" className="focus:bg-[#89A1EF]/10 focus:text-[#89A1EF] cursor-pointer">Government</SelectItem>
              <SelectItem value="private" className="focus:bg-[#89A1EF]/10 focus:text-[#89A1EF] cursor-pointer">Private</SelectItem>
              <SelectItem value="ngo" className="focus:bg-[#89A1EF]/10 focus:text-[#89A1EF] cursor-pointer">NGO</SelectItem>
              <SelectItem value="educational" className="focus:bg-[#89A1EF]/10 focus:text-[#89A1EF] cursor-pointer">Educational</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map Section */}
      <div className="space-y-2 w-full">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 block">
          Pin Location
        </label>
        <div className="relative block w-full h-[400px] rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
          <MapControlsExample onLocationSelect={setLocation} />
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="button"
        onClick={() => console.log("Final Registration Data:", { entityType, location })}
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