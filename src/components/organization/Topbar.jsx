import { useProfile } from "../../utils/useProfile";

export default function Topbar({ sidebarCollapsed = false }) {
  const leftClass = sidebarCollapsed ? "left-16" : "left-56";

  //Get User Data from LocalStorage
  const { data: user, isLoading } = useProfile();

  // Helper to get Initials (e.g., "Marck Sabado" -> "MS")
  const getInitials = () => {
    // Note: using user.first_name because we fixed the hook to return result.user
    if (!user) return "??";
    const f = user.first_name?.charAt(0) || "";
    const l = user.last_name?.charAt(0) || "";
    return (f + l).toUpperCase();
  };

  return (
    <header
      className={`fixed top-0 right-0 ${leftClass} h-16 z-20 flex items-center gap-4 px-6
                  bg-white border-b border-gray-200 transition-all duration-300`}
    >
      {/* ── Page title ── */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-gray-400
                         font-medium bg-gray-100 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#89A1EF]" />
          Live
        </span>
      </div>

      {/* ── Search bar ── */}
      {/* INPUT_PLACEHOLDER: SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200
                      rounded-xl px-3 py-2 focus-within:border-[#89A1EF]/50
                      focus-within:ring-2 focus-within:ring-[#89A1EF]/10 transition-all">
        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none"
             stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent text-sm text-gray-700 placeholder-gray-400
                     outline-none w-44 font-sans"
        />
      </div>

      {/* ── Notification bell ── */}
      <div className="relative">
        {/* ICON_PLACEHOLDER: NOTIFICATION BELL */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50
                     border border-gray-200 text-gray-500 hover:border-[#89A1EF]/40
                     hover:text-[#89A1EF] hover:bg-[#89A1EF]/5 transition-all"
          aria-label="Notifications"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"
               viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        {/* Badge */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#89A1EF] text-white text-[9px]
                         font-bold rounded-full flex items-center justify-center font-mono
                         border-2 border-white shadow-sm">
          3
        </span>
      </div>

      {/* IMAGE_PLACEHOLDER: USER AVATAR */}
      {/* ── User avatar ── */}
      <div className="w-9 h-9 rounded-full bg-[#89A1EF]/10 border-2 border-[#89A1EF]/25
                      flex items-center justify-center cursor-pointer overflow-hidden
                      hover:border-[#89A1EF]/60 transition-colors shadow-sm relative">
        
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
    </header>
  );
}
