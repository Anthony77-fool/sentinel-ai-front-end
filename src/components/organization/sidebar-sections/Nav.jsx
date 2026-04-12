import React from "react";
import {
  IoGridOutline, 
  IoSparklesOutline, 
  IoPeopleOutline, 
  IoShieldCheckmarkOutline, 
  IoDocumentTextOutline, 
  IoAlertCircleOutline, 
  IoFingerPrintOutline,
} from "react-icons/io5";

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

export function Nav ({ collapsed, activeNav, setActiveNav}){

  return (

    <>  

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

    </>

  );

}