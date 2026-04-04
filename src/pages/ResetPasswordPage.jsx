import { Helmet } from 'react-helmet-async';
import React from 'react';
import { ResetPasswordRightSide } from './resetpassword-sections/ResetPasswordRightSide';

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta
          name="description"
          content="Reset your password to access your account."
        />
      </Helmet>

      {/*/ min-h-screen ensures it covers the viewport even if content is short */}
      {/* lg:h-screen locks it to 100vh on desktop */}
      <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full bg-white overflow-x-hidden">
        
        {/* LEFT SIDE: Image Panel (60% on desktop, 30vh on mobile) */}
        <div className="relative w-full lg:w-[55%] h-[30vh] lg:h-full flex flex-col justify-end p-8 lg:p-16 text-white">
          {/* Background Image with Dark Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/imgs/Forgot-pass-img-hero.webp')`,
            }}
          />
          
          {/* Content Overlay */}
          <div className="relative z-10">
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-2 lg:mb-4">Secure Your Account</h1>
            <p className="text-base lg:text-xl font-light opacity-90 mb-6 lg:mb-10 max-w-md">
              AI powered insights to protect your digital world. Reset your password and regain control.
            </p>
            
          </div>
        </div>

        {/* RIGHT SIDE: Form Panel (40% on desktop) */}
        <ResetPasswordRightSide />
        
      </div>
    </>
  );
}