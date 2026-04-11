import React from "react";
import Card from "../../../components/organization/Card";
import { 
  IoAlertCircleOutline, 
  IoWarningOutline, 
  IoBanOutline, 
  IoStatsChartOutline,
  IoTrendingDownOutline
} from "react-icons/io5";

// Mock Data for Violations
const VIOLATIONS = [
  { id: 1, employee: "Jan Doe", rule: "Financial Privacy", severity: "High", date: "Apr 11, 2026", detail: "Attempted to export credit card list" },
  { id: 2, employee: "Liam Reyes", rule: "Tone of Voice", severity: "Low", date: "Apr 10, 2026", detail: "Used unprofessional language in chat" },
  { id: 3, employee: "Jan Doe", rule: "PII Redaction", severity: "High", date: "Apr 09, 2026", detail: "Shared internal employee ID" },
];

export default function Penalties({ sidebarCollapsed }) {
  return (
    <div className={`mt-16 transition-all duration-300 p-6 min-h-screen ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
      
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Compliance & Penalties</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time tracking of policy violations across all AI interactions.</p>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card 
          title="Total Violations" 
          value="24" 
          icon={<IoAlertCircleOutline />} 
          trend="+5" 
          trendUp={false} // Red because increase in penalties is bad
          sub="since yesterday"
          sparkData={[10, 15, 8, 12, 20, 18, 24]} 
        />
        <Card 
          title="Critical Breaches" 
          value="3" 
          icon={<IoBanOutline />} 
          trend="-2" 
          trendUp={true} // Green because decrease in criticals is good
          sub="vs last week"
          sparkData={[8, 6, 9, 5, 4, 3, 3]} 
        />
        <Card 
          title="Most Violated Rule" 
          value="PII Policy" 
          icon={<IoWarningOutline />} 
          trend="42%" 
          trendUp={false} 
          sub="of all penalties"
          sparkData={[30, 35, 40, 38, 42, 45, 42]} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── Left: Violation Log ── */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Violation History</h3>
            <button className="text-xs font-bold text-[#89A1EF] hover:underline">Export Report</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 uppercase text-[10px] font-bold text-gray-400 tracking-widest">
                <tr>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Rule Violated</th>
                  <th className="px-6 py-4 text-center">Severity</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {VIOLATIONS.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-800">{v.employee}</p>
                      <p className="text-[10px] text-gray-400 truncate max-w-[180px]">{v.detail}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                        {v.rule}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        v.severity === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {v.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-gray-400 font-mono">
                      {v.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right: Visualization / Hotspots ── */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <IoStatsChartOutline className="text-[#89A1EF]" />
              Violation Distribution
            </h3>
            
            <div className="space-y-6">
              <ViolationBar label="PII Data Leakage" percentage={65} color="bg-red-400" />
              <ViolationBar label="Unprofessional Tone" percentage={20} color="bg-amber-400" />
              <ViolationBar label="Financial Privacy" percentage={10} color="bg-[#89A1EF]" />
              <ViolationBar label="Other" percentage={5} color="bg-gray-300" />
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                <IoTrendingDownOutline className="text-red-500 size-5 shrink-0" />
                <p className="text-[11px] text-red-700 leading-tight">
                  <strong>High Risk Alert:</strong> Jan Doe has reached the penalty threshold (3+ violations).
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Custom Horizontal Bar Component
function ViolationBar({ label, percentage, color }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] font-bold mb-1.5">
        <span className="text-gray-500 uppercase tracking-tight">{label}</span>
        <span className="text-gray-900">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}