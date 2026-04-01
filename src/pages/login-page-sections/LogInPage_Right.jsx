import { FcGoogle } from "react-icons/fc";

export function LogInPage_Right(){

  return (

    <>
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
    </>

  )

}