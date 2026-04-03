import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../SignUp-reusables/Logo';
import { Organization_Form } from './Organization_Form';

export function OrganizationRightside() {
  return (
    <>
      {/* Parent Container: 
        - h-screen: fixed height to allow internal scrolling
        - overflow-y-auto: makes the right side scrollable if the form is long
        - py-12: adds breathing room at the top and bottom so text isn't "stuck" to the edge
      */}
      <div className="w-full lg:w-[45%] h-screen flex flex-col items-center bg-white overflow-y-auto py-12 px-6 sm:px-12 lg:px-16 xl:px-24">
        
        <div className="max-w-md w-full">
          {/* Logo - Margin bottom to separate from heading */}
          <div className="mb-10">
            <Logo />
          </div>
          
          {/* Heading Section */}
          <header className="mb-8 lg:mb-10">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-700 leading-tight">
              Organization Details
            </h3>
            <p className="text-gray-400 text-base lg:text-lg mt-2">
              Registering your institution's profile
            </p>
          </header>

          {/* Form Section */}
          <Organization_Form />

          {/* Footer */}
          <footer className="mt-10 pb-6 text-center">
            <p className="text-gray-600 font-medium">
              Already have an account? 
              <Link to="/login" className="text-[#89A1EF] font-bold hover:underline ml-1">Login</Link>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}