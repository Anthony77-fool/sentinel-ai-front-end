
export function MonitorItem({ label, status }) {
  return (
    <li className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
      <span className="text-[11px] font-medium text-gray-600">{label}</span>
      <span className="text-[10px] font-bold text-[#89A1EF]">{status}</span>
    </li>
  );
}