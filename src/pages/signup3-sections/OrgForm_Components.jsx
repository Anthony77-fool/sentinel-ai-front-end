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
export function Founding_Date() {

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
export function Entity_Type() {

  const [entityType, setEntityType] = useState("");

  return (

    <>

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

    </>

  );

}

//Component for MapCDN
export function MapCDN () {
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