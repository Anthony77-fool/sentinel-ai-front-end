import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  IoFlashOutline
} from "react-icons/io5";
//imports
import { RuleModal } from "../../../components/employee/RuleModal";
import { SearchFilter } from "./guidlines-reusables/SearchFilter";
import { MainFeedContent } from "./guidlines-reusables/MainFeedContent";

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
        <SearchFilter 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          setFilterPriority={setFilterPriority} 
          filterPriority={filterPriority} 
        />

        {/* ── Main Feed Content ── */}
        <MainFeedContent 
          isLoading={isLoading} 
          filteredRules={filteredRules} 
          handleAction={handleAction} 
        />
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