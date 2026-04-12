import React, { useState } from "react";
import { 
  IoGridOutline, 
  IoSparklesOutline, 
  IoPeopleOutline, 
  IoShieldCheckmarkOutline, 
  IoDocumentTextOutline, 
  IoAlertCircleOutline, 
  IoFingerPrintOutline,
  IoPersonCircleOutline, 
  IoSettingsOutline, 
  IoLogOutOutline
} from "react-icons/io5";

import { Modal } from "./Modal";

const NAV_SECTIONS = [
  {
    label: "MAIN",
    items: [
      { 
        key: "dashboard", 
        label: "Dashboard", 
        icon: <IoGridOutline />, 
        active: true 
      },
      { 
        key: "ai-tools", 
        label: "AI Tools", 
        icon: <IoSparklesOutline /> 
      },
    ],
  },
  {
    label: "USER MANAGEMENT",
    items: [
      { 
        key: "employees", 
        label: "Employees", 
        icon: <IoPeopleOutline /> 
      },
    ],
  },
  {
    label: "COMPLIANCE",
    items: [
      { 
        key: "rules", 
        label: "Rules", 
        icon: <IoDocumentTextOutline /> 
      },
      { 
        key: "penalties", 
        label: "Penalties", 
        icon: <IoAlertCircleOutline /> 
      },
    ],
  },
];

const USER_ACTIONS = [
  { label: "Profile",  icon: <IoPersonCircleOutline /> },
  { label: "Settings", icon: <IoSettingsOutline />       },
  { label: "Logout",   icon: <IoLogOutOutline />, isDanger: true },
];

/* ── Tiny square icon placeholder ── */
const IconPH = ({ size = "w-4 h-4" }) => (
  <span
    className={`${size} rounded bg-gray-200 inline-flex items-center justify-center
                text-gray-400 text-[10px] font-mono flex-shrink-0`}
    aria-hidden="true"
  >
    ⬡
  </span>
);

export default function Sidebar({ activeNav, setActiveNav, collapsed, setCollapsed }) {

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    isSuccess: false,
    isDanger: false
  });

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here (e.g., auth.signOut())
    setModal({ ...modal, isOpen: false });
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
      console.log(`Navigating to ${item.label}`);
    }
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen z-30 flex flex-col bg-white
                    border-r border-gray-200 transition-all duration-300
                    ${collapsed ? "w-16" : "w-56"}`}
      >
        {/* ── Logo ─────────────────────────────────────── */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 min-h-[64px]">
          {/* IMAGE_PLACEHOLDER: LOGO */}
          <img 
            src="/imgs/SentinelAI_Logo.webp" 
            alt="SentinelAI Secure Gateway" 
            className="w-10 h-12 object-contain flex-shrink-0"
          />

          {!collapsed && (
            <span className="text-gray-900 font-bold text-[15px] tracking-tight whitespace-nowrap">
              SentinelAI
            </span>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md
                      hover:bg-gray-100 cursor-pointer"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
              {collapsed
                ? <polyline points="9,18 15,12 9,6" />
                : <polyline points="15,18 9,12 15,6" />}
            </svg>
          </button>
        </div>

        {/* ── Nav ──────────────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-5">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="text-[10px] font-semibold tracking-widest text-gray-400
                              uppercase px-2 mb-1.5">
                  {section.label}
                </p>
              )}

              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activeNav === item.key;
                  return (
                    <li key={item.key}>
                      <button
                        onClick={() => setActiveNav(item.key)}
                        className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-xl
                                    text-[13.5px] font-medium transition-all duration-150 group relative
                                    ${collapsed ? "justify-center" : ""}
                                    ${isActive
                                      ? "bg-[#89A1EF]/10 text-[#89A1EF]"
                                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"}`}
                      >
                        {/* DYNAMIC ICON: Replaces IconPH */}
                        <div className={`flex items-center justify-center shrink-0 
                          ${collapsed ? "size-5" : "size-5"} 
                          ${isActive ? "text-[#89A1EF]" : "text-gray-400 group-hover:text-gray-900"}`}>
                          {/* We use React.cloneElement to force a specific size on the icon component */}
                          {React.cloneElement(item.icon, { className: "size-full" })}
                        </div>

                        {!collapsed && (
                          <>
                            <span className="flex-1 text-left truncate">{item.label}</span>
                            {item.badge && (
                              <span className="bg-[#89A1EF] text-white text-[10px] font-bold
                                              px-1.5 py-0.5 rounded-full font-mono">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}

                        {/* Tooltip when collapsed */}
                        {collapsed && (
                          <span className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-900
                                          text-white text-xs rounded-lg whitespace-nowrap
                                          opacity-0 pointer-events-none group-hover:opacity-100
                                          transition-opacity z-50 shadow-lg">
                            {item.label}{item.badge ? ` (${item.badge})` : ""}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── Profile / Bottom ────────────────────────── */}
        <div className="border-t border-gray-100 py-3 px-2 space-y-0.5">
          {!collapsed && (
            <div className="flex items-center gap-3 px-2 py-2 mb-1">
              {/* IMAGE_PLACEHOLDER: AVATAR */}
              <div className="w-8 h-8 rounded-full bg-[#89A1EF]/10 border border-[#89A1EF]/25
                              flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-bold text-[#89A1EF] font-mono">AD</span>
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-gray-800 truncate">Admin User</p>
                <p className="text-[10px] text-gray-400 truncate">Super Admin</p>
              </div>
            </div>
          )}

          {USER_ACTIONS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleActionClick(item)}
              className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-xl text-[13px]
                          transition-all duration-150 group relative cursor-pointer
                          ${collapsed ? "justify-center" : ""}
                          ${item.isDanger 
                            ? "text-gray-500 hover:bg-red-50 hover:text-red-600" 
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"}`}
            >
              {/* DYNAMIC ICON */}
              <div className={`size-5 flex items-center justify-center shrink-0 
                ${item.isDanger ? "group-hover:text-red-600" : "group-hover:text-gray-800"}`}>
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
          ))}
        </div>
      </aside>

      {/* Place Modal at the bottom of the fragment */}
      <Modal 
        modal={modal} 
        setModal={setModal} 
        onConfirm={handleLogout} 
      />
    </>
  );
}
