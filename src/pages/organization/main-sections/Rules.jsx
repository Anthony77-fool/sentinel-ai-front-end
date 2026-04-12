import React from "react";

import { Left_Col } from "./rules-reusables/Left_Col";
import { Right_Col } from "./rules-reusables/Right_Col";

export default function Rules({ sidebarCollapsed }) {

  return (
    <div className={`mt-16 transition-all duration-300 p-6 min-h-screen ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
      
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Governance Rules</h1>
        <p className="text-sm text-gray-500 mt-1">Define behavioral constraints and knowledge base for your AI agents.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* ── Left Column: Rule Creation ── */}
        <Left_Col />

        {/* ── Right Column: Newly Updated Rules ── */}
        <Right_Col />

      </div>
    </div>
  );
}