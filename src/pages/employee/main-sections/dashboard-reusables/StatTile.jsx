
export function StatTile({ icon, label, value, sub, isStatus }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">{icon}</div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${isStatus ? "text-emerald-500" : "text-gray-900"}`}>{value}</span>
        <span className="text-[10px] text-gray-400 font-medium">{sub}</span>
      </div>
    </div>
  );
}