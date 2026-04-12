import {  IoInformationCircleOutline, IoShieldCheckmarkOutline, IoDocumentTextOutline } from "react-icons/io5";
import { UpdatedRuleCard } from "./UpdatedRuleCard";

export function Right_Col() {


  return (

    <>

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

    </>

  );


}