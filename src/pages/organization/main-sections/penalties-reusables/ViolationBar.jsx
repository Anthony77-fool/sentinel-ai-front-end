
export function ViolationBar({ label, percentage, color }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] font-bold mb-1.5 uppercase tracking-tight">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-900">{percentage}%</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-700`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}