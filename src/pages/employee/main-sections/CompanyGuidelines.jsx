import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  IoInformationCircleOutline, 
  IoShieldCheckmarkOutline, 
  IoSearchOutline,
  IoCloseOutline,
  IoFlashOutline
} from "react-icons/io5";

import { UpdatedRuleCard } from "./guidlines-reusables/UpdatedRuleCard";
import { RuleModal } from "../../../components/employee/RuleModal";

export default function CompanyGuidelines({ sidebarCollapsed }) {
  const [selectedRule, setSelectedRule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all"); // all, high, medium, low

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
    refetchInterval: 60000,
  });

  // ── Search & Priority Filter Logic ──
  const filteredRules = useMemo(() => {
    return rules
      .filter(rule => rule.status.toLowerCase() !== 'pending')
      .filter(rule => {
        const matchesSearch = rule.name.toLowerCase().includes(searchQuery.toLowerCase());
        // Using 'severity' or 'priority' field from your DB
        const matchesPriority = filterPriority === "all" || rule.severity?.toLowerCase() === filterPriority;
        return matchesSearch && matchesPriority;
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [rules, searchQuery, filterPriority]);

  const handleAction = (type, rule) => {
    setSelectedRule(rule);
    setIsModalOpen(true);
  };

  return (
    <div className={`mt-16 transition-all duration-300 p-8 min-h-screen bg-gray-50/50 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Governance Center</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            SentinelAI active compliance framework and behavioral policies.
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center gap-2">
            <IoFlashOutline className="text-[#89A1EF]" />
            <div>
              <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest leading-none">Active Rules</p>
              <p className="text-lg font-black text-[#89A1EF]">{filteredRules.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl space-y-6">
        {/* ── Search and Priority Filter Bar ── */}
        <div className="flex flex-wrap items-center gap-4 bg-white/60 backdrop-blur-md border border-white p-2 rounded-2xl shadow-sm">
          <div className="relative flex-1 min-w-[280px]">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
            <input 
              type="text" 
              placeholder="Search policies by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#89A1EF]/20 focus:border-[#89A1EF] transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <IoCloseOutline className="size-5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 p-1 bg-gray-100/50 rounded-xl">
            {['all', 'high', 'medium', 'low'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterPriority(level)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                  filterPriority === level 
                  ? "bg-white text-[#89A1EF] shadow-sm ring-1 ring-black/5" 
                  : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main Feed Content ── */}
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
      </div>

      <RuleModal 
        isOpen={isModalOpen}
        isReadOnly={true}
        ruleData={selectedRule}
        setRuleData={() => {}}
        onClose={() => setIsModalOpen(false)}
        onSave={() => {}}
      />
    </div>
  );
}