import { useState, useRef, useEffect } from "react";
import { 
  IoEllipsisVerticalOutline, 
  IoEyeOutline, 
  IoPencilOutline, 
  IoTrashOutline 
} from "react-icons/io5";

export function UpdatedRuleCard({ title, type, time, status, icon, onAction, rule }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const isActive = status === "Active";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="group relative flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-[#89A1EF]/40 hover:shadow-md transition-all duration-200">
      
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 transform 
        ${isActive ? 'bg-green-500' : 'bg-amber-400'} 
        opacity-0 group-hover:opacity-100`} 
      />

      <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full transition-transform duration-300 group-hover:scale-y-125
        ${isActive ? 'bg-green-500' : 'bg-amber-400 animate-pulse'}`} 
      />

      <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200
        ${isActive ? 'bg-green-50 text-green-600 group-hover:bg-green-100' : 'bg-amber-50 text-amber-600 group-hover:bg-amber-100'}`}>
        {icon}
      </div>

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

      {/* 3-Dots Action Menu Container */}
      <div className="relative" ref={menuRef}>
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            setShowMenu(!showMenu);
          }}
          className="relative z-10 p-1.5 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200 cursor-pointer"
        >
          <IoEllipsisVerticalOutline className="size-4" />
        </button>

        {/* Dropdown Menu - Added z-[100] and absolute positioning adjustments */}
        {showMenu && (
          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-100 rounded-xl shadow-2xl z-[100] py-1 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
            <button 
              onClick={(e) => { e.stopPropagation(); onAction('view', rule); setShowMenu(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-gray-600 hover:bg-blue-50 hover:text-[#89A1EF] transition-colors cursor-pointer"
            >
              <IoEyeOutline className="size-3.5" /> View
            </button>
            <button 
              onClick={() => { onAction('edit', rule); setShowMenu(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-gray-600 hover:bg-blue-50 hover:text-[#89A1EF] transition-colors cursor-pointer"
            >
              <IoPencilOutline className="size-3.5" /> Edit
            </button>
            <hr className="my-1 border-gray-50" />
            <button 
              onClick={() => { onAction('delete', rule); setShowMenu(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <IoTrashOutline className="size-3.5" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}