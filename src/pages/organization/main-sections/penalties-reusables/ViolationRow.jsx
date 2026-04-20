import { IoPersonOutline } from "react-icons/io5";

export function ViolationRow({ v, currentUser }) {
  return (
    <tr className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {v.user_id === currentUser?.id ? (
              <span className="text-sm font-bold text-[#89A1EF] flex items-center gap-1">
                <IoPersonOutline /> Me
              </span>
          ) : (
              <p className="text-sm font-bold text-gray-800">
                {v.user ? `${v.user.first_name} ${v.user.last_name}` : 'Unknown User'}
              </p>
          )}
        </div>
        <p className="text-[10px] text-gray-400 truncate max-w-[150px]">{v.bot_name}</p>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {v.violation_details?.map((title, i) => (
              <span key={i} className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                  {title}
              </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          v.severity === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
        }`}>
          {v.severity || "Medium"}
        </span>
      </td>
      <td className="px-6 py-4 text-right text-[10px] text-gray-400 font-mono">
        {new Date(v.created_at).toLocaleDateString()}
      </td>
    </tr>
  );
}