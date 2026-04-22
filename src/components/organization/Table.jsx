import { useQuery } from "@tanstack/react-query";
import React from "react";

/* Status badge colour map — light, soft tones only */
const STATUS_STYLES = {
  active:   "bg-emerald-50 text-emerald-600 border border-emerald-200",
  flagged:  "bg-rose-50   text-rose-500   border border-rose-200",
  pending:  "bg-[#89A1EF]/10 text-[#89A1EF] border border-[#89A1EF]/25",
  inactive: "bg-gray-100   text-gray-500   border border-gray-200",
};

const COLUMNS = ["User", "Role", "Email", "Status", "Joined"];

export default function Table({ setActiveNav }) {
  // ── TanStack Query Implementation ──
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  // Handle Loading State
  if (isLoading) return (
    <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center gap-3">
      <div className="w-6 h-6 border-2 border-[#89A1EF] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Fetching Personnel...</p>
    </div>
  );

  // Handle Error State
  if (isError) return (
    <div className="bg-white border border-rose-200 rounded-2xl p-6 text-center">
      <p className="text-sm text-rose-500 font-medium">Failed to load activity data.</p>
    </div>
  );

  // Use dynamic data from backend or empty array
  const rows = data?.employees || data || [];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* ── Card header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
        <button 
        onClick={() => setActiveNav("employees")}
        className="text-xs text-gray-500 hover:text-[#89A1EF] font-medium border border-gray-200 hover:border-[#89A1EF]/40 rounded-lg px-3 py-1.5 transition-all cursor-pointer">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {COLUMNS.map((col) => (
                <th key={col} className="text-left text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-5 py-3 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((user, i) => {
              // Extract initials from first and last name
              const initials = `${user.name.split(' ').map(n => n[0]).join('')}`;
              
              return (
                <tr key={user.id || i} className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors">
                  {/* User */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#89A1EF]/10 border border-[#89A1EF]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-bold text-[#89A1EF] font-mono">{initials || "???"}</span>
                      </div>
                      <span className="font-medium text-gray-800 whitespace-nowrap">
                        {user.first_name} {user.last_name}
                      </span>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap capitalize">
                    {user.role || "Employee"}
                  </td>

                  {/* Email (Mapped to Action column space) */}
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                    {user.email}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono capitalize ${STATUS_STYLES[user.status] ?? STATUS_STYLES.inactive}`}>
                      {user.status || "active"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap text-xs font-mono">
                    {user.joined}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}