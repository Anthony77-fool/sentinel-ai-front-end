import React, { useState } from "react";
import { 
  IoPersonCircleOutline, 
  IoSettingsOutline, 
  IoLogOutOutline
} from "react-icons/io5";

import { Modal } from "../Modal";
import { Loading_Overlay } from "../../Loading_Overlay";

const USER_ACTIONS = [
  { label: "Profile",  icon: <IoPersonCircleOutline /> },
  { label: "Settings", icon: <IoSettingsOutline />       },
  { label: "Logout",   icon: <IoLogOutOutline />, isDanger: true },
];

export function UserActions ({ collapsed, activeNav, setActiveNav }){
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState({
      isOpen: false,
      title: "",
      message: "",
      isSuccess: false,
      isDanger: false
    });
    
    // for handling the logout button
    const handleLogout = async () => {
      // Close Modal and start Loading
      setModal(prev => ({ ...prev, isOpen: false }));
      setIsLoading(true);

      try {
        const token = localStorage.getItem("token");

        // 1. Native Fetch Request
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // If the server returns 401 (Unauthorized), it's already "logged out"
          console.warn("Server-side logout issue, proceeding with local cleanup.");
        }

      } catch (error) {
        console.error("Network error during logout:", error);
      } finally {
        // 2. Clear Local Data (Always do this)
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // 3. Close the modal
        setModal((prev) => ({ ...prev, isOpen: false }));

        // 4. Hard Redirect to clear state and ensure Protected Routes catch them
        window.location.href = "/login";
      }
    };
  
    const handleActionClick = (item) => {
      if (item.label === "Logout") {
        setModal({
          isOpen: true,
          title: "Confirm Logout",
          message: "Are you sure you want to log out of your account?",
          isSuccess: false,
          isDanger: true, // Custom flag for our button logic
        });
      } else {
        // Handle Profile or Settings navigation
        setActiveNav(item.label.toLowerCase());
        console.log(`Navigating to ${item.label}`);
      }
    };

  return (

    <>  

      {/* Loading Overlay with Dynamic Props */}
      <Loading_Overlay 
        isLoading={isLoading} 
        title="Signing Out..." 
        subtitle="Securely ending your SentinelAI session" 
      />

      {/* ── Nav ──────────────────────────────────────── */}
      {USER_ACTIONS.map((item) => {
        // SYNTAX FIX: This logic needs curly braces + return
        const isActive = activeNav === item.label.toLowerCase();

        return (
          <button
            key={item.label}
            onClick={() => handleActionClick(item)}
            className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-xl text-[13px]
                        transition-all duration-150 group relative cursor-pointer
                        ${collapsed ? "justify-center" : ""}
                        ${item.isDanger 
                          ? "text-gray-500 hover:bg-red-50 hover:text-red-600" 
                          : isActive 
                            ? "bg-[#89A1EF]/10 text-[#89A1EF] font-bold" // HIGHLIGHT IF ACTIVE
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"}`}
          >
            {/* DYNAMIC ICON */}
            <div className={`size-5 flex items-center justify-center shrink-0 
              ${item.isDanger ? "group-hover:text-red-600" : "group-hover:text-gray-800"}
              ${isActive && !item.isDanger ? "text-[#89A1EF]" : ""}`}>
              {React.cloneElement(item.icon, { className: "size-full" })}
            </div>

            {!collapsed && <span>{item.label}</span>}

            {collapsed && (
              <span className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-900 text-white
                               text-xs rounded-lg whitespace-nowrap opacity-0 pointer-events-none
                               group-hover:opacity-100 transition-opacity z-50 shadow-lg">
                {item.label}
              </span>
            )}
          </button>
        ); // End of return
      })}
      
      {/* Place Modal at the bottom of the fragment */}
      <Modal 
        modal={modal} 
        setModal={setModal} 
        onConfirm={handleLogout} 
      />

    </>

  );

}