import { FcGoogle } from "react-icons/fc";

export function LogInPage_Right(){

  return (

    <>
      {/* RIGHT SIDE: THE REFINED VIDEO HERO */}
      <div className="relative hidden md:flex flex-1 h-full overflow-hidden bg-neutral-900">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/video/login-hero-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Optional: Subtle Overlay Gradient to make it look "Sentinel" style */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent z-10" />
        
        {/* Optional: Add your Branding/Text over the video if needed */}
        <div className="relative z-20 m-auto text-center px-10">
          <h2 className="text-white text-2xl font-light tracking-widest uppercase opacity-80">
            Secure <span className='lowercase font-extralight'>your</span> <span className="font-bold">Gateway</span>
          </h2>
          <h2 className="text-white text-xl font-light tracking-widest opacity-80">
            <span className='uppercase'>With</span> <span className="font-bold">SentinelAI</span>
          </h2>
        </div>
      </div>
    </>

  )

}