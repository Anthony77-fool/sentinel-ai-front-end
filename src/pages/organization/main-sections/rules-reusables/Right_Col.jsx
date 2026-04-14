import { useQuery } from "@tanstack/react-query";
import { 
 IoInformationCircleOutline, 
 IoShieldCheckmarkOutline, 
 IoDocumentTextOutline, 
 IoCloudUploadOutline } from "react-icons/io5";
import { UpdatedRuleCard } from "./UpdatedRuleCard";

export function Right_Col() {

  const { data: rules = [], isLoading } = useQuery({
    queryKey: ["governance-rules"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rules_get`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
      const result = await response.json();
      return result.data || [];
    },
    // Optional: Auto-refresh every 30 seconds to keep it "Live"
    refetchInterval: 30000, 
  });

  return (
    <>
      {/* ── Right Column: Newly Updated Rules ── */}
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col h-full">
          
          {/* Header Part */}
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

          {/* Senior Comment: h-[300px] ensures only 3 rules show; overflow-y-auto enables the scroll */}
          <div className="space-y-3 flex-1 overflow-y-auto h-[300px] min-h-[300px] max-h-[300px] pr-2 custom-scrollbar">
            {isLoading ? (
                <p className="text-center text-xs text-gray-400 py-10">Loading feed...</p>
            ) : rules.length > 0 ? (
              rules.map((rule) => (
                <UpdatedRuleCard 
                  key={rule.id}
                  title={rule.name} 
                  type={rule.type === 'text' ? 'Direct Text' : 'Document'} 
                  time={rule.created_at_human || "Recently"} 
                  status={rule.status.charAt(0).toUpperCase() + rule.status.slice(1)}
                  icon={
                    rule.type === 'text' 
                    ? <IoShieldCheckmarkOutline className="size-4" /> 
                    : <IoDocumentTextOutline className="size-4" />
                  }
                />
              ))
            ) : (
              <p className="text-center text-xs text-gray-400 py-10">No rules found.</p>
            )}
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