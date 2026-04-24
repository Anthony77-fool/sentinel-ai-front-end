import { 
  IoInformationCircleOutline, 
  IoShieldCheckmarkOutline, 
  IoSearchOutline,
} from "react-icons/io5";
import { UpdatedRuleCard } from "./UpdatedRuleCard";

export function MainFeedContent({ isLoading, filteredRules, handleAction }){

  return (

    <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#89A1EF]/5 rounded-full blur-3xl -mr-32 -mt-32" />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#89A1EF]/10 rounded-xl">
            <IoShieldCheckmarkOutline className="text-[#89A1EF] size-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-xl tracking-tight">Active Policies</h3>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">Verified & Enforced</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-[550px] pr-2 custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="size-10 border-4 border-[#89A1EF]/20 border-t-[#89A1EF] rounded-full animate-spin" />
            <p className="text-xs text-gray-400 font-mono tracking-widest">SYNCING ENGINE...</p>
          </div>
        ) : filteredRules.length > 0 ? (
          filteredRules.map((rule) => (
            <UpdatedRuleCard 
              key={rule.id}
              rule={rule}
              title={rule.name} 
              // Pass severity as the type display
              type={`${rule.severity || 'Standard'} Priority`} 
              time={rule.created_at_human || "Recently"} 
              status={rule.status} 
              onAction={handleAction}
              icon={<IoShieldCheckmarkOutline className="size-4" />}
            />
          ))
        ) : (
          <div className="text-center py-24 bg-gray-50/50 border border-dashed border-gray-200 rounded-[2rem]">
            <div className="bg-white size-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <IoSearchOutline className="text-gray-300 size-8" />
            </div>
            <h4 className="text-gray-900 font-bold">No results found</h4>
            <p className="text-sm text-gray-400 mt-1 max-w-[200px] mx-auto">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="mt-8 p-6 bg-gradient-to-br from-blue-50/80 to-white border border-blue-100/50 rounded-[1.5rem]">
        <div className="flex gap-4">
          <IoInformationCircleOutline className="text-[#89A1EF] size-6 shrink-0" />
          <div>
            <p className="text-sm text-gray-700 font-bold mb-1">Standard Operating Procedure</p>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              These guidelines are synced with the SentinelAI core. Interactions failing to meet these 
              standards are flagged and may impact your individual trust score.
            </p>
          </div>
        </div>
      </div>
    </div>

  );

}