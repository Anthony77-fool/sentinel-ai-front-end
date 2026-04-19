import React, { useState, useEffect } from "react";
import Card from "../../../components/organization/Card";
import { 
  IoAlertCircleOutline, 
  IoWarningOutline, 
  IoBanOutline, 
  IoStatsChartOutline,
  IoTrendingDownOutline,
  IoPersonOutline
} from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

export default function Penalties({ sidebarCollapsed }) {
  const [data, setData] = useState({ 
    logs: [], 
    stats: { total: 0, critical: 0, distribution: {}, most_violated: "N/A" } 
  });
  const [isLoading, setIsLoading] = useState(true);

  // Get current user to handle "Me" vs "Employee Name" labels
  const userString = localStorage.getItem("user");
  const currentUser = userString ? JSON.parse(userString) : null;
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    const fetchComplianceData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/compliance-stats`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json' 
          }
        });
        const result = await response.json();
        // If backend sends an error, don't set it to state
        if (result.error) {
          console.error("Backend Error:", result.error);
        } else {
          setData(result);
        }
      } catch (error) {
        console.error("Compliance Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplianceData();
  }, []);

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
        
        {/* ── Left: Violation Log ── */}
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
                  <tr key={v.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {v.user_id === currentUser?.id ? (
                            <span className="text-sm font-bold text-[#89A1EF] flex items-center gap-1">
                              <IoPersonOutline /> Me
                            </span>
                        ) : (
                            <p className="text-sm font-bold text-gray-800">
                              {/* FIXED: Using first_name and last_name from your schema */}
                              {v.user ? `${v.user.first_name} ${v.user.last_name}` : 'Unknown User'}
                            </p>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 truncate max-w-[150px]">{v.bot_name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {/* FIXED: Changed from v.penaliceTitles to v.violation_details */}
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

function ViolationBar({ label, percentage, color }) {
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