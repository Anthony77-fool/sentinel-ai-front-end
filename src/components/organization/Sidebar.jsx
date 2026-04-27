import React from "react";

//section imports
import { Logo } from "./sidebar-sections/Logo";
import { Nav } from "./sidebar-sections/Nav";
import { UserActions } from "./sidebar-sections/UserActions";

import { useProfile } from "../../utils/useProfile";

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

  // 1. Just call the hook. No need for fetchUserProfile here anymore!
  const { data: user, isLoading } = useProfile();

  console.log("Current User Object:", user);

  // 2. Updated Helper to use snake_case from your DB
  const getInitials = () => {
    if (!user?.user) return "??"; // Access the nested 'user' key
    const f = user.user.first_name?.charAt(0) || "";
    const l = user.user.last_name?.charAt(0) || "";
    return (f + l).toUpperCase();
  };

  if (isLoading) return null; // Or a small skeleton loader

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
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#89A1EF]/25 flex items-center justify-center bg-gray-50">
                <img 
                  src={
                    user?.user?.profile_image 
                      ? user.user.profile_image 
                      : `https://ui-avatars.com/api/?name=${user?.user?.first_name}+${user?.user?.last_name}`
                  } 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // If the path breaks, use the initials as a last resort
                    e.target.src = `https://ui-avatars.com/api/?name=${user?.first_name}+${user?.last_name}`;
                  }}
                />
              </div>
              <div className="overflow-hidden">
                {/* DYNAMIC NAME */}
                <p className="text-xs font-semibold text-gray-800 truncate">
                  {user?.user ? `${user.user.first_name} ${user.user.last_name}` : "Guest User"}
                </p>
                {/* ROLE */}
                <p className="text-[10px] text-gray-400 truncate">
                  Business Admin
                </p>
              </div>
            </div>
          )}

          {/* ── User Actions ─────────────────────────────────────── */}
          <UserActions collapsed={collapsed} activeNav={activeNav} setActiveNav={setActiveNav} />
        </div>
      </aside>
    </>
  );
}
