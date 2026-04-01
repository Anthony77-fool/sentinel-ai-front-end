import { LogInPage_Left } from "./login-page-sections/LogInPage_Left";
import { LogInPage_Right } from "./login-page-sections/LogInPage_Right";

export function LogInPage() {
  return (
    /* 1. GLOBAL WRAPPER: Fixed 100vh height and hidden horizontal overflow */
    <div className="relative h-screen w-full flex overflow-hidden bg-neutral-950 font-sans">

      {/* 2. MAIN SPLIT CONTAINER: 50/50 Split, Exact 100vh */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
        
        {/* LEFT SIDE: Login Form (Solid White, Refined Minimalist Design) */}
        <LogInPage_Left />

        {/* RIGHT SIDE: THE REFINED IMAGE CARD WITH MARGINS */}
        <LogInPage_Right />

      </div>
    </div>
  );
}