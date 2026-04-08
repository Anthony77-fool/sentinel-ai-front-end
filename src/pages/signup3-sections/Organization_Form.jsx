import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { IoBusinessOutline, IoPersonOutline } from "react-icons/io5";
import { Founding_Date, Entity_Type, MapCDN } from './OrgForm_Components';

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

  // Specifically log the state (where your user data lives)
  //console.log("📦 State Content:", location.state);

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

  // --- VALIDATION LOGIC ---
  const handleCreateAccount = () => {
    // Check for empty strings or null coordinates
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

    if (!isFormComplete || !isLocationSet) {
      alert("Please fill in all fields and pin your location on the map.");
      return;
    }

    // If valid, proceed to backend
    console.log("🚀 Validation Passed! Sending to backend:", formData);
    // YOUR BACKEND FETCH CALL HERE
  };

  return (
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
  );
}