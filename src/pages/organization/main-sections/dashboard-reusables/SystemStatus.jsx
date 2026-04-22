
/** System status panel */
export function SystemStatus({ SYSTEM_STATUS }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-3">System Status</h2>
      <div className="space-y-0">
        {SYSTEM_STATUS.map((sys, i) => (
          <div
            key={sys.name}
            className={`flex items-center justify-between py-2.5
                        ${i < SYSTEM_STATUS.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <span className="text-xs text-gray-600">{sys.name}</span>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0
                            ${sys.ok
                              ? "bg-emerald-400"
                              : "bg-rose-400 animate-pulse"}`}
              />
              <span
                className={`text-[10px] font-semibold font-mono
                            ${sys.ok ? "text-emerald-500" : "text-rose-400"}`}
              >
                {sys.ok ? "Operational" : "Degraded"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}