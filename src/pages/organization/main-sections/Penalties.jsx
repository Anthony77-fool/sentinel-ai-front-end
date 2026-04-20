import React from "react"; // Removed useState, useEffect
import { useQuery } from "@tanstack/react-query";
import Card from "../../../components/organization/Card";
import { 
  IoAlertCircleOutline, 
  IoWarningOutline, 
  IoBanOutline, 
  IoStatsChartOutline,
  IoTrendingDownOutline,
} from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

import { ViolationBar } from "./penalties-reusables/ViolationBar";
import { ViolationRow } from "./penalties-reusables/ViolationRow";

export default function Penalties({ sidebarCollapsed }) {
  // ── Get current user to handle "Me" vs "Employee Name" labels ──
  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;
  const isAdmin = currentUser?.role === 'admin';

  // ── TanStack Query Implementation ──
  const { data: result, isLoading } = useQuery({
    queryKey: ["compliance-stats"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/compliance-stats`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json' 
        }
      });
      const json = await response.json();
      if (json.error) throw new Error(json.error);
      return json;
    },
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 mins
  });

  // Default data structure if result is null
  const data = result || { 
    logs: [], 
    stats: { total: 0, critical: 0, distribution: {}, most_violated: "N/A" } 
  };

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <SiGooglegemini className="animate-spin size-8 text-[#89A1EF]" />
    </div>
  );

  return (
    <div className={`mt-16 transition-all duration-300 p-6 min-h-screen ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
      
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Compliance & Penalties</h1>
        <p className="text-sm text-gray-500 mt-1">
            {isAdmin ? "Global oversight of organizational data integrity." : "Your personal compliance and safety scorecard."}
        </p>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card 
          title="Total Violations" 
          value={data?.stats?.total || 0} 
          icon={<IoAlertCircleOutline />} 
          sub="Recorded instances"
        />
        <Card 
          title="Critical Breaches" 
          value={data?.stats?.critical || 0} 
          icon={<IoBanOutline />} 
          sub="Requires immediate review"
        />
        <Card 
          title="Most Violated Rule" 
          value={data?.stats?.most_violated || "N/A"} 
          icon={<IoWarningOutline />} 
          sub="System-wide frequency"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── Left: Violation Log (De-structured via local mapping) ── */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Violation History</h3>
            <button className="text-xs font-bold text-[#89A1EF] hover:underline">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 uppercase text-[10px] font-bold text-gray-400 tracking-widest">
                <tr>
                  <th className="px-6 py-4">Context</th>
                  <th className="px-6 py-4">Rule Details</th>
                  <th className="px-6 py-4 text-center">Severity</th>
                  <th className="px-6 py-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.logs?.length > 0 ? data.logs.map((v) => (
                  <ViolationRow key={v.id} v={v} currentUser={currentUser} />
                )) : (
                    <tr>
                        <td colSpan="4" className="text-center py-10 text-gray-400 text-sm italic">No violations recorded. System healthy.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right: Distribution Visuals ── */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <IoStatsChartOutline className="text-[#89A1EF]" />
              Threat Distribution
            </h3>
            
            <div className="space-y-6">
              {data.stats?.distribution && Object.entries(data.stats.distribution).map(([label, percentage]) => (
                <ViolationBar 
                    key={label} 
                    label={label} 
                    percentage={percentage} 
                    color={percentage > 50 ? "bg-red-400" : "bg-[#89A1EF]"} 
                />
              ))}
            </div>

            {isAdmin && data.stats?.total > 15 && (
                <div className="mt-8 pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                        <IoTrendingDownOutline className="text-red-500 size-5 shrink-0" />
                        <p className="text-[11px] text-red-700 leading-tight">
                        <strong>High Risk Alert:</strong> Organizational compliance is dropping below 85% this week.
                        </p>
                    </div>
                </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}