import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { IoCodeSlashOutline } from "react-icons/io5";
import { Modal } from './OrgForm_Components';

export function Employee_Form() {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the passed data safely
  const { firstName, lastName, email, password, role, firebaseUid } = location.state || {};

  // --- MODAL STATE ---
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", isSuccess: false });

  // Form States
  const [joinCode, setJoinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmployeeRegistration = async (e) => {
    e.preventDefault();

    // --- Check for Required Fields ---
    if (!firstName || !lastName || !joinCode) {
      setModal({
        isOpen: true,
        title: "Missing Fields",
        message: "Please ensure your name is filled out and you have entered an organization join code.",
        isSuccess: false
      });
      return;
    }

    try {
      // STEP 1: Verify the Join Code and get the organization_id
      const checkRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/check-organization/${joinCode}`);
      const orgData = await checkRes.json();

      if (!orgData.exists) {
        setModal({
          isOpen: true,
          title: "Invalid Code",
          message: "The organization code you entered does not exist. Please verify it with your administrator.",
          isSuccess: false
        });
        setIsLoading(false);
        return;
      }

      // STEP 2: Register the Employee using the found organization_id
      const registrationPayload = {
        firstName,
        lastName,
        email,
        firebaseUid,
        organization_id: orgData.organization_id, // Link established here!
        role,
        password
      };

      // Make the registration API call
      const regRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register-employee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(registrationPayload)
      });

      if (regRes.status === 201) {
        setModal({
          isOpen: true,
          title: "Account Created",
          message: `Success! You have joined ${orgData.business_name}. Redirecting to login...`,
          isSuccess: true
        });
        setTimeout(() => navigate('/login'), 2500);
      } else {
        const errorData = await regRes.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Error",
        message: error.message || "Something went wrong. Please check your connection.",
        isSuccess: false
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleEmployeeRegistration}>

        {/* Name Group (Two columns on larger screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              <IoPersonOutline className="w-5 h-5" />
            </span>
            <input 
              type="text" 
              placeholder="First Name" 
              defaultValue={firstName || ""} 
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all" 
            />
          </div>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Last Name" 
              defaultValue={lastName || ""} 
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all" 
            />
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
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())} // Auto-uppercase
            className="w-full pl-11 pr-4 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89A1EF] focus:border-transparent transition-all"
          />
        </div>

        {/* Submit Button */}
        <button disabled={isLoading} className="group relative w-full bg-[#89A1EF] text-white font-bold py-3.5 lg:py-4 rounded-xl mt-4 lg:mt-6 flex items-center justify-center hover:bg-[#768bd9] active:scale-[0.98] transition-all shadow-lg shadow-[#89A1EF]/20 cursor-pointer">

          {/* The Text stays centered because of the flex/justify-center on the parent */}
          <span>{isLoading ? 'Verifying...' : 'Create Account'}</span>

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

      {/* Modal outside the form */}
      <Modal modal={modal} setModal={setModal} />
    </>
  );
}