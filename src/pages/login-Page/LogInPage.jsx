export function LogInPage() {
  return (
    /* 1. GLOBAL WRAPPER: Fixed 100vh height and hidden horizontal overflow */
    <div className="relative h-screen w-full flex overflow-hidden bg-neutral-950 font-sans">
      
      {/* BACKGROUND IMAGE LAYER (Global) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/imgs/beauty-digital-art-through-immersive-experiences.jpg" 
          alt="Futuristic Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Slightly heavier overlay for better form contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* 2. MAIN SPLIT CONTAINER: 50/50 Split, Exact 100vh */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
        
        {/* LEFT SIDE: Login Form (Solid White, Refined Minimalist Design) */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center p-6 md:px-12 lg:p-20 bg-white shadow-xl z-20">
          <div className="max-w-md w-full pt-14 xl:pt-0">
            
            {/* 1. LOGO & HEADER: Matching the Sleeknote layout */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-xl mb-6 shadow-md">
                {/* Using your 'S' logo concept with updated colors */}
                <span className="text-white font-bold text-2xl tracking-tighter">S</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Welcome Back</h1>
            </div>

            {/* 2. GOOGLE LOGIN: White background, subtle border like the sample */}
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all mb-8 shadow-sm">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" className="w-5 h-5" alt="Google" />
              Log in with Google
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
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 ml-1">Password</label>
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                />
              </div>

              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-700 transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  Keep me logged in
                </label>
                <a href="#" className="text-pink-500 font-semibold hover:text-pink-600 transition-colors">Forgot your password?</a>
              </div>

              {/* 5. SUBMIT BUTTON: Matching the indigo/violet tone from Sleeknote */}
              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-200 mt-4"
              >
                Log in
                <span className="group-hover:translate-x-1 transition-transform opacity-70">→</span>
              </button>
            </form>

            <p className="text-center mt-12 text-sm text-slate-500">
              Don't have an account? 
              <a href="#" className="text-pink-500 font-bold hover:text-pink-600 ml-1">Sign up</a>
            </p>

          </div>
        </div>
        
        {/* RIGHT SIDE: THE REFINED IMAGE CARD WITH MARGINS */}
        <div className="md:flex w-1/2 h-full p-6 md:p-10 lg:py-12 lg:px-20 items-center justify-center bg-black/10 backdrop-blur-lg">
          
          {/* THE CARD: Floating with rounding and inner shadow */}
          <div className="w-full h-full relative rounded-[1rem] overflow-hidden border border-white/10 shadow-2xl">
            
            {/* Sharp version of image inside the card */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/imgs/beauty-digital-art-through-immersive-experiences.jpg" 
                alt="SentinelAI Identity"
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Glassmorphism Text Block inside the card */}
            {/* RIGHT SIDE CONTENT WRAPPER: Removed padding (p-8 lg:p-12) to kill the margin */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end">
              
              {/* THE GLASS BLOCK: 
                  - Changed rounded-[2rem] to rounded-t-[2.5rem] (matches card top) 
                  - Removed margin bottom 
                  - Kept backdrop-blur and bg for that inner feel 
              */}
              <div className="relative rounded-t-[1.5rem] bg-black/30 backdrop-blur-xs p-10 lg:p-3 border-t border-x border-white/30 shadow-2xl text-center">
                <h2 className="font-serif text-white text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-4">
                  Smart Access <br /> 
                  <span className="text-2xl lg:text-3xl opacity-70 italic font-sans">by SentinelAI</span>
                </h2>
                <p className="text-neutral-300 text-base lg:text-lg font-light leading-relaxed max-w-sm mx-auto">
                  Securely bridging the gap between enterprise data and agentic intelligence.
                </p>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}