import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { CiUnlock, CiLock  } from "react-icons/ci";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase-config/Firebase";
import { Modal } from "../signup3-sections/OrgForm_Components";

export function LogInPage_Left(){

  async function signIn(){
    await signInWithPopup(auth, googleProvider);
  }

  const navigate = useNavigate();
  
  // States for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State for your existing Modal component
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", isSuccess: false });

  // Handle form submission for Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      //data json, coming from backend
      const data = await response.json();

      if (response.ok) {
        // 1. Store the token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // 2. Redirect based on role or to dashboard
        data.user.role === 'employee' 
          ? navigate("/employee/dashboard") 
          : navigate("/organization/dashboard");
        
      } else {
        // Show error modal
        setModal({
          isOpen: true,
          title: "Login Failed",
          message: data.message || "Invalid credentials.",
          isSuccess: false
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Network Error",
        message: "Could not connect to the server.",
        isSuccess: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <>
      {/* LEFT SIDE: Login Form (Solid White, Refined Minimalist Design) */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-6 md:px-12 lg:p-20 bg-white shadow-xl z-20">
        <div className="max-w-md w-full pt-14 xl:pt-0">
          
          {/* 1. LOGO & HEADER: Matching the Sleeknote layout */}
          <div className="flex flex-col justify-center items-center mb-5">
            <div className="flex items-center gap-3 mb-8 lg:mb-0">
              <div className="p-2 rounded-lg shrink-0">
                  {/*Logo Picture here */}
                  <img className="w-20 h-full lg:w-20 lg:h-full text-white" src="/imgs/SentinelAI_Logo.webp" alt="SentinelAI Logo" />
                  
              </div>
              <div className="leading-tight">
                <h2 className="font-bold text-lg lg:text-xl text-[#4b598a] inline-block tracking-tight">SentinelAI</h2>
                <p className="text-xs lg:text-sm text-[#5d6da2] font-medium uppercase tracking-wider">Governance</p>
              </div>
            </div>
            <h1 className="text-4xl font-medium text-slate-700 inline-block tracking-wide">
              Welcome Back
            </h1>
          </div>

          {/* 2. GOOGLE LOGIN: White background, subtle border like the sample */}
          <button className="relative w-full flex items-center justify-center bg-white border border-slate-200 rounded-lg px-4 py-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all mb-8 shadow-sm cursor-pointer group"
          onClick={signIn}
          >

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
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <MdOutlineEmail className="w-5 h-5" />
              </span>
              <input 
                type="email" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                <CiUnlock className="w-5 h-5" />
              </span>
              <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password" 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all" />
            </div>

            {/* Show Password Checkbox & Forgot Password Link */}
            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-700 transition-colors">
                <input 
                  type="checkbox" 
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="
                    w-4 h-4 rounded 
                    border border-slate-300 bg-white /* <--- Added border and bg-white */
                    appearance-none 
                    checked:bg-[#89A1EF] checked:border-[#89A1EF]
                    focus:ring-2 focus:ring-[#89A1EF] focus:ring-offset-2
                    cursor-pointer transition-all relative
                    
                    /* White checkmark SVG */
                    checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%223%22%20d%3D%22m6%2010%203%203%206-6%22%2F%3E%3C%2Fsvg%3E')]
                    bg-center bg-no-repeat bg-[length:100%_100%]
                  " 
                />
                Show Password
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
              disabled={isLoading}
              className="w-full bg-[#89A1EF] text-white font-bold py-4 px-6 rounded-lg hover:bg-[#768bd9] transition-all flex items-center justify-between group shadow-lg shadow-indigo-200 mt-4 cursor-pointer"
            >
              {/* Empty span to balance the flex-spacing so 'Log in' stays centered */}
              <span className="w-5"></span> 
              
              <span>{isLoading ? "Authenticating..." : "Log in"}</span>
              
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

      {/* Your Modal Component */}
      <Modal modal={modal} setModal={setModal} />

    </>

  )

}