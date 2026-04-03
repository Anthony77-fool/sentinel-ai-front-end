import React, { useState, useRef, useEffect } from 'react';
import { IoBusinessOutline, IoCalendarOutline, IoLayersOutline, IoPersonOutline } from "react-icons/io5";
import { MapControlsExample } from '../../components/MapControls';
import { format } from "date-fns";
import { Calendar } from "../../components/ui/calendar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function Organization_Form() {
  const [entityType, setEntityType] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [date, setDate] = useState();
  
  // NEW: State and Ref for the custom calendar dropdown
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form className="space-y-5">
      {/* Name Group */}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* CUSTOM DATE PICKER (Replaced Popover) */}
        <div className="relative" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className={`w-full flex items-center text-left pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] transition-all ${
              !date ? "text-gray-400" : "text-gray-700 font-medium"
            }`}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <IoCalendarOutline className="w-5 h-5" />
            </span>
            {date ? format(date, "PPP") : <span>Founding Date</span>}
          </button>

          {isCalendarOpen && (
            <div className="absolute z-50 mt-2 p-2 bg-white border border-gray-200 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200 origin-top">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setIsCalendarOpen(false);
                }}
                showWeekNumber
                initialFocus
                className="rounded-lg"
              />
            </div>
          )}
          <input type="hidden" name="dob" value={date?.toISOString() || ""} />
        </div>

        {/* Entity type SELECT */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 z-10 pointer-events-none">
            <IoLayersOutline className="w-5 h-5" />
          </span>
          <Select onValueChange={setEntityType} defaultValue={entityType}>
            <SelectTrigger className="w-full pl-11 py-3.5 lg:py-4 h-auto bg-white border-gray-200 rounded-xl text-gray-500 focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all leading-none">
              <SelectValue placeholder="Entity Type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
              <SelectItem value="government" className="cursor-pointer">Government</SelectItem>
              <SelectItem value="private" className="cursor-pointer">Private</SelectItem>
              <SelectItem value="ngo" className="cursor-pointer">NGO</SelectItem>
              <SelectItem value="educational" className="cursor-pointer">Educational</SelectItem>
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
        onClick={() => console.log("Final Registration Data:", { entityType, location, date })}
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