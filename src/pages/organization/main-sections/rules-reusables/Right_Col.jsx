import {  
  IoInformationCircleOutline, 
  IoShieldCheckmarkOutline, 
  IoDocumentTextOutline, 
  IoCloudUploadOutline   } from "react-icons/io5";

import { UpdatedRuleCard } from "./UpdatedRuleCard";

export function Right_Col() {

  return (

    <>

      {/* ── Right Column: Newly Updated Rules ── */}
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col h-full">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                <IoShieldCheckmarkOutline className="text-[#89A1EF] size-5" />
                Governance Feed
              </h3>
              <p className="text-[11px] text-gray-400 font-medium">Real-time agent policy updates</p>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Live</span>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            {/* State: Pending / Newly Added */}
            <UpdatedRuleCard 
              title="Privacy Redaction Protocol" 
              type="Direct Text" 
              time="Just now" 
              status="Pending"
              icon={<IoShieldCheckmarkOutline className="size-4" />}
            />

            {/* State: Active / Ingested */}
            <UpdatedRuleCard 
              title="Company_Handbook.pdf" 
              type="Document" 
              time="2 mins ago" 
              status="Active"
              icon={<IoDocumentTextOutline className="size-4" />}
            />

            <UpdatedRuleCard 
              title="Agent Tone & Voice" 
              type="Direct Text" 
              time="1 hour ago" 
              status="Active"
              icon={<IoShieldCheckmarkOutline className="size-4" />}
            />
          </div>

          {/* Information Context */}
          <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
            <div className="flex gap-3">
              <IoInformationCircleOutline className="text-[#89A1EF] size-5 shrink-0" />
              <p className="text-[11px] text-gray-500 leading-relaxed italic">
                New rules are marked as <span className="text-amber-600 font-bold">Pending</span> until you deploy them to the SentinelAI core.
              </p>
            </div>
          </div>

          {/* The Deploy Button */}
          <div className="mt-4">
            <button className="w-full group flex items-center justify-center gap-2 py-4 bg-[#89A1EF] text-white rounded-2xl text-[15px] font-bold hover:bg-[#768bd9] shadow-xl shadow-[#89A1EF]/30 transition-all active:scale-[0.98] cursor-pointer">
              <IoCloudUploadOutline className="size-5 group-hover:animate-bounce" />
              Push Changes to Agent
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-3 font-medium">
              Last deployment: Today at 2:30 PM
            </p>
          </div>

        </div>
      </div>

    </>

  );


}