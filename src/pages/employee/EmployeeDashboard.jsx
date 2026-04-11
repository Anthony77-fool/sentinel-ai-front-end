import React from "react";
import { 
  IoChatbubblesOutline, 
  IoShieldCheckmarkOutline, 
  IoDocumentLockOutline, 
  IoInformationCircleOutline,
  IoRocketOutline
} from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

export default function EmployeeDashboard({ sidebarCollapsed }) {
  // We can simulate a "New Account" state to show a welcome banner
  const isNewUser = true; 

  return (
    <div className={`mt-16 transition-all duration-300 p-6 min-h-screen ${sidebarCollapsed ? "ml-16" : "ml-56"}`}>
      
      {/* ── Welcome Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back, Anthony!
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Your secure gateway to organization-approved AI tools.
        </p>
      </div>

      {/* ── New Account Onboarding Banner ── */}
      {isNewUser && (
        <div className="mb-8 bg-gradient-to-r from-[#89A1EF] to-[#768bd9] rounded-2xl p-6 text-white shadow-lg shadow-[#89A1EF]/20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                <IoRocketOutline className="size-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Getting Started with SentinelAI</h2>
                <p className="text-white/80 text-sm max-w-md">
                  Your account is active. You can now use the Gemini Chatbot securely. SentinelAI automatically masks sensitive data to keep our company safe.
                </p>
              </div>
            </div>
            <button className="px-6 py-2.5 bg-white text-[#89A1EF] font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap">
              Take a Tour
            </button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -right-10 -bottom-10 size-40 bg-white/10 rounded-full blur-3xl" />
        </div>
      )}

      {/* ── Quick Stats Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatTile 
          icon={<IoChatbubblesOutline />} 
          label="My Chat Sessions" 
          value="12" 
          sub="Total this month" 
        />
        <StatTile 
          icon={<IoShieldCheckmarkOutline />} 
          label="Security Status" 
          value="Protected" 
          sub="PII Masking Active" 
          isStatus 
        />
        <StatTile 
          icon={<IoDocumentLockOutline />} 
          label="Compliance Score" 
          value="98%" 
          sub="Good standing" 
        />
      </div>

      {/* ── Main Layout: Tools & Recent Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Available Chatbots */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Your AI Workspaces</h3>
            <button className="text-xs font-bold text-[#89A1EF] hover:underline">View All</button>
          </div>

          {/* Gemini Card for Employee */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:border-[#89A1EF]/40 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#89A1EF]/10 rounded-xl text-[#89A1EF] border border-[#89A1EF]/10">
                <SiGooglegemini className="size-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Gemini Pro Chat</h4>
                <p className="text-xs text-gray-400">Policy-compliant assistant</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-50 text-gray-600 font-bold text-xs rounded-xl group-hover:bg-[#89A1EF] group-hover:text-white transition-all cursor-pointer">
              Open Chat
            </button>
          </div>
        </div>

        {/* Security & Monitoring Info (The "Monitor" Aspect) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-[#89A1EF]">
            <IoInformationCircleOutline className="size-5" />
            <h3 className="font-bold text-gray-800 text-sm">Monitoring Notice</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            To maintain digital integrity, your interactions with AI tools are monitored for sensitive data leakage (PII). 
          </p>
          <ul className="space-y-3">
            <MonitorItem label="Data Anonymization" status="Enabled" />
            <MonitorItem label="Interaction Logging" status="Enabled" />
            <MonitorItem label="Policy Violation Check" status="Real-time" />
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components for cleaner code ── */

function StatTile({ icon, label, value, sub, isStatus }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">{icon}</div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold ${isStatus ? "text-emerald-500" : "text-gray-900"}`}>{value}</span>
        <span className="text-[10px] text-gray-400 font-medium">{sub}</span>
      </div>
    </div>
  );
}

function MonitorItem({ label, status }) {
  return (
    <li className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
      <span className="text-[11px] font-medium text-gray-600">{label}</span>
      <span className="text-[10px] font-bold text-[#89A1EF]">{status}</span>
    </li>
  );
}