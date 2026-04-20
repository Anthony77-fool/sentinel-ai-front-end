import React from "react";

//section imports
import { Logo } from "./sidebar-sections/Logo";
import { Nav } from "./sidebar-sections/Nav";
import { UserActions } from "./sidebar-sections/UserActions";

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

  // 1. Get User Data from LocalStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // 2. Helper to get Initials (e.g., "Marck Sabado" -> "MS")
  const getInitials = () => {
    if (!user) return "??";
    const f = user.firstName?.charAt(0) || "";
    const l = user.lastName?.charAt(0) || "";
    return (f + l).toUpperCase();
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen z-30 flex flex-col bg-white
                    border-r border-gray-200 transition-all duration-300
                    ${collapsed ? "w-16" : "w-56"}`}
      >
        {/* ── Logo ─────────────────────────────────────── */}
        <Logo collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* ── Nav ──────────────────────────────────────── */}
        <Nav collapsed={collapsed} activeNav={activeNav} setActiveNav={setActiveNav} />

        {/* ── Profile / Bottom ────────────────────────── */}
        <div className="border-t border-gray-100 py-3 px-2 space-y-0.5">
          {!collapsed && (
            <div className="flex items-center gap-3 px-2 py-2 mb-1">
              {/* IMAGE_PLACEHOLDER: AVATAR */}
              <div className="w-8 h-8 rounded-full bg-[#89A1EF]/10 border border-[#89A1EF]/25
                              flex items-center justify-center flex-shrink-0">
                {/* DYNAMIC INITIALS */}
                <span className="text-[10px] font-bold text-[#89A1EF] font-mono">{getInitials()}</span>
              </div>
              <div className="overflow-hidden">
                {/* DYNAMIC NAME */}
                <p className="text-xs font-semibold text-gray-800 truncate">
                  {user ? `${user.firstName} ${user.lastName || ""}` : "Guest User"}
                </p>
                {/* DYNAMIC ROLE */}
                <p className="text-[10px] text-gray-400 truncate">
                  Business Admin
                </p>
              </div>
            </div>
          )}

          {/* ── User Actions ─────────────────────────────────────── */}
          <UserActions collapsed={collapsed} />
        </div>
      </aside>
    </>
  );
}
