
export function Logo ({ collapsed, setCollapsed }){

  return (
    <>

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

    </>

  );

}