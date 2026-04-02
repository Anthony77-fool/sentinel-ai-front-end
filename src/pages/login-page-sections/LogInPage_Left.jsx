import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export function LogInPage_Left(){

  return (

    <>
      {/* LEFT SIDE: Login Form (Solid White, Refined Minimalist Design) */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-6 md:px-12 lg:p-20 bg-white shadow-xl z-20">
        <div className="max-w-md w-full pt-14 xl:pt-0">
          
          {/* 1. LOGO & HEADER: Matching the Sleeknote layout */}
          <div className="flex flex-col justify-center items-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-[#89A1EF] rounded-xl mb-6 shadow-md">
              {/* Using your 'S' logo concept with updated colors */}
              <span className="text-white font-bold text-2xl tracking-tighter">S</span>
            </div>
            <h1 className="text-4xl font-medium text-slate-700 inline-block tracking-wide">
              Welcome Back
            </h1>
          </div>

          {/* 2. GOOGLE LOGIN: White background, subtle border like the sample */}
          <button className="relative w-full flex items-center justify-center bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all mb-8 shadow-sm cursor-pointer group">

            {/* Icon positioned at the start (left) */}
            <div className="absolute left-4 flex items-center text-xl">
              <FcGoogle />
            </div>

            {/* Centered Text */}
            <span>Log in with Google</span>
            
          </button>

          {/* 3. DIVIDER */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400 uppercase tracking-widest text-[10px] font-bold">Or login with email</span>
            </div>
          </div>

          {/* 4. FORM: Clean inputs with subtle borders and labels */}
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-[#89A1EF] focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">Password</label>
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-[#89A1EF] focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
              />
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-700 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                Keep me logged in
              </label>
              <Link 
                to="/forgotpassword" 
                className="text-[#89A1EF] font-semibold hover:text-[#6282eb] transition-all"
              >
                Forgot your password?
              </Link>
            </div>

            {/* 5. SUBMIT BUTTON: Matching the indigo/violet tone from Sleeknote */}
            <button 
              type="submit" 
              className="w-full bg-[#89A1EF] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#768bd9] transition-all flex items-center justify-between group shadow-lg shadow-indigo-200 mt-4 cursor-pointer"
            >
              {/* Empty span to balance the flex-spacing so 'Log in' stays centered */}
              <span className="w-5"></span> 
              
              <span>Log in</span>
              
              <span className="w-5 group-hover:translate-x-1 transition-transform opacity-70 text-xl">→</span>
            </button>
          </form>

          <p className="text-center mt-12 text-sm text-slate-500">
            Don't have an account? 
            <Link 
              to="/signup1" 
              className="text-[#89A1EF] font-bold hover:text-[#6282eb] transition-all ml-1"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </>

  )

}