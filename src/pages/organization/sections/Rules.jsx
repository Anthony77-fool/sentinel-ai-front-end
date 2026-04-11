import React, { useState } from "react";
import { 
  IoShieldCheckmarkOutline, 
  IoCloudUploadOutline, 
  IoDocumentTextOutline, 
  IoAddOutline,
  IoTrashOutline,
  IoInformationCircleOutline
} from "react-icons/io5";

export default function Rules({ sidebarCollapsed }) {
  const [activeTab, setActiveTab] = useState("text"); // 'text' or 'upload'

  return (
    <div className={`mt-16 transition-all duration-300 p-6 min-h-screen ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
      
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Governance Rules</h1>
        <p className="text-sm text-gray-500 mt-1">Define behavioral constraints and knowledge base for your AI agents.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* ── Left Column: Rule Creation ── */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-100">
              <button 
                onClick={() => setActiveTab("text")}
                className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors
                  ${activeTab === 'text' ? 'text-[#89A1EF] border-b-2 border-[#89A1EF]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <IoDocumentTextOutline className="size-4" />
                Direct Instructions
              </button>
              <button 
                onClick={() => setActiveTab("upload")}
                className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors
                  ${activeTab === 'upload' ? 'text-[#89A1EF] border-b-2 border-[#89A1EF]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <IoCloudUploadOutline className="size-4" />
                Document Upload
              </button>
            </div>

            <div className="p-6">
              {activeTab === "text" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2">Rule Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., PII Redaction Protocol"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#89A1EF]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2">Behavioral Guidance</label>
                    <textarea 
                      rows="6"
                      placeholder="Describe how the agent should behave... (e.g., 'Never reveal internal API keys', 'Always summarize findings in bullet points')"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#89A1EF]/20 resize-none"
                    ></textarea>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-100 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50/30 group hover:border-[#89A1EF]/40 transition-all cursor-pointer">
                  <div className="size-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#89A1EF] mb-4 group-hover:scale-110 transition-transform">
                    <IoCloudUploadOutline className="size-7" />
                  </div>
                  <p className="text-sm font-bold text-gray-700">Upload Policy Documents</p>
                  <p className="text-xs text-gray-400 mt-1">PDF or Word files (Max 10MB)</p>
                  <button className="mt-6 px-6 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-sm">
                    Select Files
                  </button>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-[#89A1EF] text-white rounded-xl text-sm font-bold hover:bg-[#768bd9] shadow-lg shadow-[#89A1EF]/20 transition-all">
                  <IoAddOutline className="size-5" />
                  Deploy Rule
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Newly Updated Rules ── */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <IoShieldCheckmarkOutline className="text-[#89A1EF] size-5" />
                Newly Updated Rules
              </h3>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 uppercase tracking-tight">
                Live Feed
              </span>
            </div>
            
            <div className="space-y-4">
              {/* 1. Example of a newly uploaded PDF */}
              <UpdatedRuleCard 
                title="Company_Handbook.pdf" 
                type="Document" 
                time="Just now" 
                status="Ingested"
                icon={<IoDocumentTextOutline className="size-4" />}
              />

              {/* 2. Example of a newly typed rule */}
              <UpdatedRuleCard 
                title="Privacy Redaction Protocol" 
                type="Direct Text" 
                time="2 mins ago" 
                status="Active"
                icon={<IoShieldCheckmarkOutline className="size-4" />}
              />

              {/* 3. Example of an older rule */}
              <UpdatedRuleCard 
                title="Agent Tone & Voice" 
                type="Direct Text" 
                time="1 hour ago" 
                status="Active"
                icon={<IoShieldCheckmarkOutline className="size-4" />}
              />
            </div>

            {/* Footer Link */}
            <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
              <div className="flex gap-3">
                <IoInformationCircleOutline className="text-blue-500 size-5 shrink-0" />
                <p className="text-[11px] text-blue-700 leading-relaxed">
                  Rules defined here are applied globally across all SentinelAI chatbots. High-priority rules override base model instructions.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function UpdatedRuleCard({ title, type, time, status, icon }) {
  return (
    <div className="relative pl-4 border-l-2 border-[#89A1EF]/30 group hover:border-[#89A1EF] transition-all">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-[#89A1EF] shrink-0">{icon}</span>
          <p className="text-sm font-bold text-gray-800 truncate">{title}</p>
        </div>
        <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase">
          {status}
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <p className="text-[10px] text-gray-400 font-medium">{type}</p>
        <span className="size-1 rounded-full bg-gray-200" />
        <p className="text-[10px] text-gray-400 italic">{time}</p>
      </div>

    </div>
  );
}

function ActiveRuleItem({ title, type }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 group">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="size-8 bg-white rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 shrink-0">
          {type === "File" ? <IoDocumentTextOutline className="size-4" /> : <IoShieldCheckmarkOutline className="size-4" />}
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold text-gray-700 truncate">{title}</p>
          <p className="text-[9px] text-gray-400 font-mono uppercase">{type}</p>
        </div>
      </div>
      <button className="p-1.5 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
        <IoTrashOutline className="size-4" />
      </button>
    </div>
  );
}