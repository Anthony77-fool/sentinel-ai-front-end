
/** Single chart placeholder card */
export function ChartCard({ title, type, period, wide = false }) {
  const labels = { LINE:"— LINE CHART —", BAR:"▪ BAR CHART ▪", PIE:"◉ PIE CHART ◉" };
  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col
                  ${wide ? "col-span-2" : ""}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <span className="text-[10px] text-gray-400 font-medium bg-gray-100
                         px-2 py-0.5 rounded-full uppercase tracking-wider">
          {period}
        </span>
      </div>
      {/* CHART_PLACEHOLDER */}
      <div
        className="flex-1 min-h-[148px] rounded-xl border-2 border-dashed border-gray-200
                   bg-gray-50 flex flex-col items-center justify-center gap-1.5"
      >
        <span className="text-[11px] font-mono text-gray-300 tracking-widest">
          {labels[type]}
        </span>
        <span className="text-[10px] font-mono text-gray-300">
          [CHART_PLACEHOLDER: {type}]
        </span>
        <span className="text-[10px] text-gray-300">{title}</span>
      </div>
    </div>
  );
}