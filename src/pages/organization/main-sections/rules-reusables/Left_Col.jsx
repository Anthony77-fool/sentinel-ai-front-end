import { useState } from "react";
import { 
  IoCloudUploadOutline, 
  IoDocumentTextOutline, 
  IoAddOutline
} from "react-icons/io5";

export function Left_Col() {
    const [activeTab, setActiveTab] = useState("text"); // 'text' or 'upload'

  return (

    <>

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

    </>

  );


}