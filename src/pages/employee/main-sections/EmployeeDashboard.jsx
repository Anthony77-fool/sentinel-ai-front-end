import React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  IoChatbubblesOutline, 
  IoShieldCheckmarkOutline, 
  IoDocumentLockOutline, 
  IoInformationCircleOutline,
  IoRocketOutline,
  IoChevronForwardOutline
} from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

//subcomponents
import { StatTile } from "./dashboard-reusables/StatTile";
import { MonitorItem } from "./dashboard-reusables/MonitorItem";

export default function EmployeeDashboard({ sidebarCollapsed, user }) {
  // ── Fetch only THIS employee's stats ──
  const { data: stats } = useQuery({
    queryKey: ["employee-stats"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/employee/dashboard-stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
    }
  });

  return (
    <div className={`mt-16 transition-all duration-300 p-6 min-h-screen ${sidebarCollapsed ? "ml-16" : "ml-56"}`}>
      
      {/* ── Welcome Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back, {user?.first_name || "User"}!
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Your secure gateway to organization-approved AI tools.
        </p>
      </div>

      {/* ── Welcome Banner ── */}
      <div className="mb-8 bg-gradient-to-r from-[#89A1EF] to-[#768bd9] rounded-2xl p-6 text-white shadow-lg shadow-[#89A1EF]/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
              <IoRocketOutline className="size-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Safe AI Usage Active</h2>
              <p className="text-white/80 text-sm max-w-md">
                You are currently in **Protected Mode**. Every interaction is automatically scrubbed of sensitive data before reaching the AI model.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-xs rounded-xl transition-all">
              Guidelines
            </button>
            <button className="px-5 py-2 bg-white text-[#89A1EF] font-bold text-xs rounded-xl hover:shadow-lg transition-all">
              Launch Gemini
            </button>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 size-40 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatTile 
          icon={<IoChatbubblesOutline />} 
          label="My Active Sessions" 
          value={stats?.total_sessions || "0"} 
          sub="Logs generated" 
        />
        <StatTile 
          icon={<IoShieldCheckmarkOutline />} 
          label="Security Status" 
          value="Secured" 
          sub="Auto-Masking On" 
          isStatus 
        />
        <StatTile 
          icon={<IoDocumentLockOutline />} 
          label="Compliance Score" 
          value={`${stats?.compliance_score || "100"}%`} 
          sub="Health rating" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main: Workspace & Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          <section>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              Approved Workspaces
            </h3>
            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#89A1EF]/10 rounded-xl text-[#89A1EF]">
                  <SiGooglegemini className="size-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Sentinel Gemini Interface</h4>
                  <p className="text-xs text-gray-400">Enterprise Edition • v3.1</p>
                </div>
              </div>
              <IoChevronForwardOutline className="text-gray-300 group-hover:text-[#89A1EF] transition-all" />
            </div>
          </section>

          {/* User's Own Recent Activity (Filtered just for them) */}
          <section>
            <h3 className="font-bold text-gray-800 mb-4">Your Recent Interactions</h3>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              {/* Overflow Wrapper */}
              <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Workspace</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security Status</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {stats?.recent_activity?.length > 0 ? (
                      stats.recent_activity.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="size-2 rounded-full bg-[#89A1EF]" />
                              <span className="text-sm font-medium text-gray-700">{log.bot}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${
                              log.status === 'flagged' 
                                ? 'bg-rose-50 text-rose-500 border-rose-100' 
                                : 'bg-emerald-50 text-emerald-500 border-emerald-100'
                            }`}>
                              {log.status === 'flagged' ? 'Flagged (PII Detected)' : 'Cleared'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                            {log.date}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="p-12 text-center text-gray-400 text-xs italic">
                          No recent activity found. Start a conversation to see your logs.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#89A1EF]">
              <IoInformationCircleOutline className="size-5" />
              <h3 className="font-bold text-gray-800 text-sm">Security Policy</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              SentinelAI prevents accidental leaks of PII (Names, Emails, Passwords). All data remains within organization bounds.
            </p>
            <ul className="space-y-3">
              <MonitorItem label="Anonymization" status="Active" />
              <MonitorItem label="Session ID" status={`#${user?.id || '000'}`} />
              <MonitorItem label="Audit Visibility" status="Restricted" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}