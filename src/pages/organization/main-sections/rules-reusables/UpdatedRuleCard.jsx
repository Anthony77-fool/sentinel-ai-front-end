export function UpdatedRuleCard({ title, type, time, status, icon }) {
  return (
    <div className="relative pl-4 border-l-2 border-[#89A1EF]/30 group hover:border-[#89A1EF] transition-all">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-[#89A1EF] shrink-0">{icon}</span>
          <p className="text-sm font-bold text-gray-800 truncate">{title}</p>
        </div>
        <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase">
          {status}
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <p className="text-[10px] text-gray-400 font-medium">{type}</p>
        <span className="size-1 rounded-full bg-gray-200" />
        <p className="text-[10px] text-gray-400 italic">{time}</p>
      </div>

    </div>
  );
}