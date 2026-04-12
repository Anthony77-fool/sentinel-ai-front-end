import { IoEllipsisVerticalOutline } from "react-icons/io5";

export function UpdatedRuleCard({ title, type, time, status, icon }) {
  const isActive = status === "Active";

  return (
    <div className="group relative flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-[#89A1EF]/40 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden">
      
      {/* ── THE ACCENT LINE ── */}
      {/* This line is hidden slightly off-left and slides/fades in on hover */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 transform 
        ${isActive ? 'bg-green-500' : 'bg-amber-400'} 
        opacity-0 group-hover:opacity-100`} 
      />

      {/* Status indicator pill (Small version of your previous logic) */}
      <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full transition-transform duration-300 group-hover:scale-y-125
        ${isActive ? 'bg-green-500' : 'bg-amber-400 animate-pulse'}`} 
      />

      {/* Icon Section */}
      <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200
        ${isActive ? 'bg-green-50 text-green-600 group-hover:bg-green-100' : 'bg-amber-50 text-amber-600 group-hover:bg-amber-100'}`}>
        {icon}
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-[13px] font-bold text-gray-800 truncate group-hover:text-gray-900 transition-colors">{title}</h4>
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider
            ${isActive ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {status}
          </span>
        </div>
        <p className="text-[10px] text-gray-400 mt-0.5 font-medium">{type} • {time}</p>
      </div>

      {/* 3-Dots Action Menu */}
      <button className="relative z-10 p-1.5 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200 cursor-pointer">
        <IoEllipsisVerticalOutline className="size-4" />
      </button>
    </div>
  );
}