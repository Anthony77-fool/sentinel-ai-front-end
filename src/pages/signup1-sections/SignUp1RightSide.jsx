import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { Logo } from '../SignUp-reusables/Logo';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase-config/Firebase";
import { SignUp_Modal } from '../SignUp-reusables/SignUp_Modal';

export function SignUp1RightSide() {

  const navigate = useNavigate(); // Initialize navigate

  // --- MODAL STATE ---
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", isSuccess: false });

  // --- EMAIL VERIFICATION REMINDER ---
  const handleVerifyEmail = (e) => {
    e.preventDefault(); // Prevent page refresh
    
    setModal({
      isOpen: true,
      title: "Action Required",
      message: "Please verify your email address to continue. Check your inbox for the verification link.",
      isSuccess: false
    });
  };

  //for the Google Sign In
  async function signIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 3. Extract information
      // Google usually provides 'displayName' (Full Name)
      const fullName = user.displayName || "";
      const email = user.email;

      // Simple split logic for First and Last name
      const nameArray = fullName.split(" ");
      const firstName = nameArray[0] || "";
      const lastName = nameArray.slice(1).join(" ") || "";

      // 4. Navigate to /signup2 and pass the data
      navigate('/signup2', { 
        state: { 
          email: email,
          firstName: firstName,
          lastName: lastName,
          firebaseUid: user.uid // Good to have for your MySQL bridge later
        } 
      });

    } catch (error) {
      console.error("Google Sign-In Error:", error);
      // You could add an alert here if the user closes the popup
    }
  }

  return (

    <>

      {/* RIGHT SIDE: Form Panel (40% on desktop) */}
      <div className="w-full lg:w-[45%] h-full flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-24 bg-white overflow-y-auto">
        
        {/* Logo */}
        <Logo />
        
        {/* Form Container */}
        <div className="max-w-md w-full mx-auto lg:mx-0 mb-20">
          <h3 className="text-3xl lg:text-4xl font-bold inline-block text-gray-700">Verify your email</h3>
          <p className="text-gray-400 text-base lg:text-lg mt-2 mb-8 lg:mb-10">Ensuring you're really you</p>

          <form className="space-y-4" onSubmit={handleVerifyEmail}>

            {/* Google Button */}
            <button className="relative w-full flex items-center justify-center gap-3 border border-gray-200 py-3.5 lg:py-4 rounded-xl font-bold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
            onClick={signIn}
            >
              
              {/* Icon positioned at the start */}
              <div className="absolute left-6 flex items-center justify-center">
                <FcGoogle className="text-xl lg:text-3xl" /> 
              </div>

              {/* Button Text */}
              <span className="text-gray-500 lg:text-md">Sign Up with Google</span>
            </button>

          </form>

          {/* Divider */}
          <div className="relative my-6 lg:my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-400">or</span></div>
          </div>

          {/* Login Footer */}
          <p className="text-center mt-6 lg:mt-8 text-gray-600 font-medium">
            Already have an account? <Link to="/login" className="text-[#89A1EF] font-bold hover:text-[#6282eb] ml-1 cursor-pointer">Login</Link>
          </p>
        </div>
      </div>

      {/* ADD THE MODAL */}
      <SignUp_Modal modal={modal} setModal={setModal} />

    </>

  )

}