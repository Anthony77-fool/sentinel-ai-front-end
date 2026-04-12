export function ActiveRuleItem({ title, type }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="size-8 bg-white rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 shrink-0">
          {type === "File" ? <IoDocumentTextOutline className="size-4" /> : <IoShieldCheckmarkOutline className="size-4" />}
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold text-gray-700 truncate">{title}</p>
          <p className="text-[9px] text-gray-400 font-mono uppercase">{type}</p>
        </div>
      </div>
      <button className="p-1.5 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
        <IoTrashOutline className="size-4" />
      </button>
    </div>
  );
}