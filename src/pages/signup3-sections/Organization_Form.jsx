import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoBusinessOutline, IoPersonOutline } from "react-icons/io5";
import { Founding_Date, Entity_Type, MapCDN } from './OrgForm_Components';
import { Modal } from './OrgForm_Components';
import { generateBusinessCode } from '../../utils/generateBusinessCode';

export function Organization_Form() {
  const location = useLocation();

  // Access the passed data safely
  const { 
    firstName: initialFname, 
    lastName: initialLname, 
    email, 
    password, 
    role,
    firebaseUid
  } = location.state || {};

  // --- NEW STATE MANAGEMENT to be passed on the backend ---
  const [formData, setFormData] = useState({
    firstName: initialFname || "", // <--- Added / can be edited here
    lastName: initialLname || "", // <--- Added / can be edited here
    email: email || "",       // <--- Added
    password: password || "", // <--- Added
    role: role || "",         // <--- Added
    firebaseUid: firebaseUid || "", // <--- Added
    businessName: "",
    foundingDate: "",
    entityType: "",
    locationCoords: { lat: null, lng: null },
    address: ""
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  // ----------------------------

  // --- MODAL STATE ---
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", isSuccess: false });

  // --- VALIDATION LOGIC ---
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // This function will be called when the user clicks "Create Account"
  const handleCreateAccount = async () => {
    setIsLoading(true);

    //Fields to be passed to the backend for registration
    const requiredFields = [
      formData.firstName,
      formData.lastName,
      formData.businessName,
      formData.foundingDate,
      formData.entityType,
      formData.address
    ];

    const isFormComplete = requiredFields.every(field => field && field.toString().trim() !== "");
    const isLocationSet = formData.locationCoords.lat !== null;

    //Valudation Checks
    if (!isFormComplete || !isLocationSet) {
      setModal({
        isOpen: true,
        title: "Incomplete Information",
        message: "Please ensure all fields are filled and the organization location is pinned on the map.",
        isSuccess: false
      });
      setIsLoading(false); // Make sure to turn off loading if validation fails
      return;
    }

    // Generate the unique join code
    const orgJoinCode = generateBusinessCode();
    
    // SUCCESS CASE
    console.log("🚀 SentinelAI Registration Payload:", formData);

    // Prepare the final payload (including the code and formatted date)
    const registrationPayload = {
      ...formData,
      joinCode: orgJoinCode, // Adding the new unique code
      foundingDate: formData.foundingDate 
        ? new Date(formData.foundingDate).toISOString().split('T')[0] 
        : null
    };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register-organization`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(registrationPayload), // 4. Send the updated payload
      });

      const result = await response.json();

      if (response.status === 201) {
        setModal({
          isOpen: true,
          title: "Registration Successful",
          message: `Account created! Your Organization Join Code is: ${orgJoinCode}. Redirecting...`,
          isSuccess: true
        });
        setTimeout(() => navigate('/login'), 4000); // Longer delay so they see the code
      } else {
        setModal({
          isOpen: true,
          title: "Registration Failed",
          message: result.message || "Something went wrong.",
          isSuccess: false
        });
      }
    } catch (error) {
      setModal({
        isOpen: true,
        title: "Connection Error",
        message: "Check if your Laravel server is running.",
        isSuccess: false
      });
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <>
    
      <form className="space-y-5">
        {/* Name Group - FName and LName */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <IoPersonOutline className="w-5 h-5" />
            </span>
            <input 
              type="text" 
              placeholder="First Name" 
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#89A1EF] outline-none transition-all" 
              defaultValue={formData.firstName}
              onChange={(e) => updateField('firstName', e.target.value)} 
            />
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Last Name" 
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#89A1EF] outline-none transition-all" 
              defaultValue={formData.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
            />
          </div>
        </div>

        {/* Business Name */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <IoBusinessOutline className="w-5 h-5" />
          </span>
          <input 
            type="text" 
            placeholder="Business / Organization Name" 
            className="w-full pl-11 pr-4 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#89A1EF] outline-none transition-all" 
            onChange={(e) => updateField('businessName', e.target.value)}
          />
        </div>

        {/* Founding Date of the Institution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pass update function as a prop to children */}
          <Founding_Date onDateChange={(val) => updateField('foundingDate', val)} />

          {/* Entity type SELECT */}
          <Entity_Type onTypeChange={(val) => updateField('entityType', val)} />
        </div>

        {/* Map Section */}
        <MapCDN onLocationChange={(coords, addr) => {
          updateField('locationCoords', coords);
          updateField('address', addr);
        }} />

        {/* Submit Button */}
        <button 
          type="button"
          onClick={handleCreateAccount}
          className="group relative w-full bg-[#89A1EF] text-white font-bold py-4 rounded-xl mt-6 flex items-center justify-center hover:bg-[#768bd9] active:scale-[0.98] transition-all shadow-lg shadow-[#89A1EF]/20 cursor-pointer"
        >
          <span>Create Account</span>
          <div className="absolute right-6">
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </button>
      </form>

      {/* Modal for feedback */}
      <Modal modal={modal} setModal={setModal} />

    </>
  );
}