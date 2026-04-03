import { IoPersonOutline } from "react-icons/io5";
import { IoCodeSlashOutline } from "react-icons/io5";

export function Employee_Form() {

  return (

    <>

      <form className="space-y-4">

        {/* Name Group (Two columns on larger screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              <IoPersonOutline className="w-5 h-5" />
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

    </>

  );

}