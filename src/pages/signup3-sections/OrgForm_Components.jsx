import React, { useState, useRef, useEffect } from 'react';
import { format } from "date-fns";
import { Calendar } from "../../components/ui/calendar";
import { MapControlsExample } from '../../components/MapControls';
import { IoCalendarOutline, IoLayersOutline } from "react-icons/io5";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

//Components for Founding Date Dropdown
export function Founding_Date({ onDateChange }) {

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
    <>

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
                onDateChange(selectedDate); // Pass selected date to parent
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

    </>
  );

}

//Components for Entity Type Dropdown
export function Entity_Type({ onTypeChange }) {

  const [entityType, setEntityType] = useState("");

  return (

    <>

    {/* Entity type SELECT */}
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 z-10 pointer-events-none">
        <IoLayersOutline className="w-5 h-5" />
      </span>
      <Select onValueChange={(value) => {
        setEntityType(value);
        onTypeChange(value); // Pass selected type to parent
      }} defaultValue={entityType}
      >
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

    </>

  );

}

//Component for MapCDN
export function MapCDN ({ onLocationChange }) {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState("Click the map to pin a location"); // New state for text address

  useEffect(() => {
    if (location.lat && location.lng) {
      setAddress("Locating address..."); // Show loading state

      // Free Reverse Geocoding API to turn Lat/Lng into a real address
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.display_name) {
            console.log("Found Address:", data.display_name);
            setAddress(data.display_name);
            // This ensures you pass the exact coordinates and the formatted address string back to the parent componenty
            onLocationChange({ lat: location.lat, lng: location.lng }, data.display_name);
          } else {
            setAddress("Address not found for this location.");
          }
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
          setAddress("Error locating address.");
        });
    }
  }, [location]);

  return (
    <>
      <div className="space-y-2 w-full">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 block">
          Pin Location
        </label>
        
        {/* Address Display Box */}
        <div className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 mb-2 shadow-sm">
          <span className="font-semibold text-slate-700">Selected Address: </span> 
          {address}
        </div>

        <div className="relative block w-full h-[400px] rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
          <MapControlsExample onLocationSelect={(data) => {
            setLocation(data);
          }} />
        </div>
      </div>
    </>
  );
}

//Component for Modal
export function Modal({ modal, setModal }) {

  return(

    <>

      {/* Custom Tailored Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-gray-100 transform animate-in zoom-in-95 duration-200">
            {/* Flex container to put Icon and Title beside each other */}
            <div className="flex items-center gap-4 mb-4"> 
              
              {/* Icon Div - Removed mb-4 */}
              <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center ${modal.isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {modal.isSuccess ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                )}
              </div>

              {/* Title - Vertical alignment handled by items-center above */}
              <h3 className="text-xl font-bold text-slate-800 leading-tight">{modal.title}</h3>
              
            </div>
              
            <p className="text-slate-500 mt-2 text-sm leading-relaxed text-center">{modal.message}</p>
            
            {!modal.isSuccess && (
              <button 
                onClick={() => setModal({ ...modal, isOpen: false })}
                className="w-full mt-6 py-3 bg-[#89A1EF] text-white font-semibold rounded-xl hover:bg-[#768bd9] transition-colors shadow-lg shadow-[#89A1EF]/20 cursor-pointer"
              >
                Got it
              </button>
            )}
          </div>
        </div>
      )}

    </>

  );

}