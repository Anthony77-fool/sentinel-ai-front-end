import React, { useState } from "react";
import { 
  IoChatbubbleEllipsesOutline, 
  IoSearchOutline, 
  IoFilterOutline, 
  IoChevronDownOutline,
  IoStatsChartOutline,
  IoAddOutline
} from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

const CATEGORIES = ["All Categories", "Internal", "Public-Facing", "Experimental"];

const INITIAL_BOTS = [
  {
    id: "gemini-01",
    name: "Gemini Chatbot",
    category: "Internal",
    description: "Enterprise-grade conversational AI powered by Google Gemini. Optimized for PII protection and rapid document analysis.",
    icon: <SiGooglegemini className="size-6" />,
    status: "Online",
    color: "text-[#89A1EF]",
    bg: "from-[#89A1EF]/10 to-[#89A1EF]/5",
    border: "border-[#89A1EF]/20"
  }
];

export default function AiTools({ sidebarCollapsed }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter Logic
  const filteredBots = INITIAL_BOTS.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || bot.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`transition-all duration-300 mt-16 p-6 min-h-screen ${sidebarCollapsed ? "ml-16" : "ml-56"}`}>
      
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Chatbot Management</h1>
          <p className="text-sm text-gray-500 mt-1">Configure and monitor your SentinelAI chat interfaces</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            <input 
              type="text" 
              placeholder="Search bots..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#89A1EF]/20 transition-all w-56"
            />
          </div>
          
          {/* Working Dropdown Filter */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-[#89A1EF]/50 transition-all cursor-pointer"
            >
              <IoFilterOutline className="size-4" />
              <span className="max-w-[100px] truncate">{selectedCategory}</span>
              <IoChevronDownOutline className={`size-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <>
                {/* Overlay to close dropdown when clicking outside */}
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1 animate-in fade-in zoom-in duration-150">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer
                        ${selectedCategory === cat ? 'bg-[#89A1EF]/10 text-[#89A1EF] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Chatbot Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Gemini Chatbot Card */}
        {filteredBots.map((bot) => (
          <div key={bot.id} className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#89A1EF]/40 transition-all relative overflow-hidden flex flex-col">
            <div className="flex items-start justify-between mb-5">
              <div className={`p-3 bg-gradient-to-br ${bot.bg} rounded-2xl border ${bot.border} ${bot.color}`}>
                {bot.icon}
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {bot.status}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              {bot.name}
              <IoChatbubbleEllipsesOutline className="size-4 text-gray-300" />
            </h3>
            
            <p className="text-xs text-gray-500 mt-2 mb-8 leading-relaxed flex-grow">
              {bot.description}
            </p>

            <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
              <div className="flex items-center gap-2 text-gray-400">
                <IoStatsChartOutline className="size-4" />
                <span className="text-[11px] font-medium font-mono">3.1 Flash Lite</span>
              </div>
              
              <button className="px-5 py-2 bg-[#89A1EF] text-white text-[12px] font-bold rounded-xl hover:bg-[#768bd9] active:scale-95 transition-all shadow-lg shadow-[#89A1EF]/20 cursor-pointer">
                Enter Chat
              </button>
            </div>
          </div>
        ))}

        {/* Create New Bot Placeholder */}
        {searchTerm === "" && selectedCategory === "All Categories" && (
          <button className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-[#89A1EF]/40 hover:bg-[#89A1EF]/5 transition-all group cursor-pointer min-h-[240px]">
            <div className="p-3 bg-gray-50 group-hover:bg-white rounded-xl mb-3 transition-colors border border-transparent group-hover:border-[#89A1EF]/20">
              <IoAddOutline className="size-6 text-gray-400 group-hover:text-[#89A1EF]" />
            </div>
            <p className="text-sm font-bold text-gray-500 group-hover:text-gray-700">Add New Bot</p>
            <p className="text-[11px] text-gray-400 mt-1 max-w-[150px]">Integrate a new LLM or specialized agent</p>
          </button>
        )}
      </div>

      {/* Empty Search Result */}
      {filteredBots.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 opacity-60">
          <IoSearchOutline className="size-12 text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No bots match your search criteria</p>
          <button 
            onClick={() => {setSearchTerm(""); setSelectedCategory("All Categories");}} 
            className="mt-2 text-[#89A1EF] text-sm font-bold hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}