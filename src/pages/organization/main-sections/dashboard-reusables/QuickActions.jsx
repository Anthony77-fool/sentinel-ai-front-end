

/** Quick action buttons */
export function QuickActions({ QUICK_ACTIONS }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-2">
        {QUICK_ACTIONS.map((qa) => (
          <button
            key={qa.label}
            className="flex flex-col items-start gap-1.5 p-3 rounded-xl
                       bg-[#89A1EF] hover:bg-[#7b93e8] active:bg-[#6e86e7]
                       text-white transition-colors shadow-sm text-left"
          >
            {/* ICON_PLACEHOLDER */}
            <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center
                              justify-center text-sm font-mono">
              {qa.icon}
            </span>
            <span className="text-xs font-semibold leading-tight">{qa.label}</span>
            <span className="text-[10px] text-white/70 font-mono">{qa.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}