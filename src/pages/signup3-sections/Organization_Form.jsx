import { IoBusinessOutline, IoCalendarOutline, IoLayersOutline } from "react-icons/io5";
import { MapControlsExample } from '../../components/MapControls';

export function Organization_Form(){

  return (

    <>

      <form className="space-y-5">
        {/* Name Group: Stacked on mobile, 2-columns on LG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="First Name" 
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#89A1EF] outline-none transition-all" 
            />
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Last Name" 
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#89A1EF] outline-none transition-all" 
            />
          </div>
        </div>

        {/* Business / Organization Name */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <IoBusinessOutline className="w-5 h-5" />
          </span>
          <input 
            type="text" 
            placeholder="Business / Institution Name"
            className="w-full pl-11 pr-4 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#89A1EF] outline-none transition-all"
          />
        </div>

        {/* Date and Entity Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <IoCalendarOutline className="w-5 h-5" />
            </span>
            <input 
              type="date" 
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-500 focus:ring-2 focus:ring-[#89A1EF] outline-none"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
              <IoLayersOutline className="w-5 h-5" />
            </span>
            <select className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-500 appearance-none focus:ring-2 focus:ring-[#89A1EF] outline-none">
              <option value="" disabled selected>Entity Type</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
              <option value="ngo">NGO</option>
              <option value="educational">Educational</option>
            </select>
          </div>
        </div>

        {/* Map Section: Added a label for better accessibility */}
        <div className="space-y-2 w-full">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 block">
            Pin Location
          </label>

          {/* The Container:
            - relative: keeps map controls anchored inside
            - block: ensures it takes up its own 'line' in the layout
            - h-[250px]: gives it a physical height so it MUST push elements below it
          */}
          <div className="relative block w-full h-[400px] sm:h-[400px] rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
            <MapControlsExample />
          </div>
          
          {/* Helper text to verify spacing */}
          <p className="text-[10px] text-gray-400 ml-1 italic">
            * Please ensure the pin is at your exact office/campus entrance.
          </p>
        </div>

        {/* Submit Button */}
        <button className="group relative w-full bg-[#89A1EF] text-white font-bold py-4 rounded-xl mt-6 flex items-center justify-center hover:bg-[#768bd9] active:scale-[0.98] transition-all shadow-lg shadow-[#89A1EF]/20">
          <span>Continue</span>
          <div className="absolute right-6">
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </button>
      </form>

    </>

  );

}