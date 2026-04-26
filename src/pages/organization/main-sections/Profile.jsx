import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { SiGooglegemini } from "react-icons/si";

import { LeftCol } from "./profile-reusables/LeftCol";
import { RightCol } from "./profile-reusables/RightCol";

export default function Profile({ sidebarCollapsed }) {
  // ── TanStack Query Implementation ──
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile-data"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json' 
        }
      });
      if (!response.ok) throw new Error("Failed to fetch profile");
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });

  // Loading State
  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <SiGooglegemini className="animate-spin size-8 text-[#89A1EF]" />
    </div>
  );

  // Fallback data if API returns empty
  const user = profile?.user || {};
  const organization = profile?.organization || { 
    business_name: "No Organization Linked", 
    entity_type: "N/A" 
  };

  return (
    <>
      <Helmet>
        <title>SentinelAI | My Profile</title>
      </Helmet>

      <div className={`mt-16 transition-all duration-300 p-8 min-h-screen bg-gray-50/50 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        
        {/* ── Page Header ── */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Organization Profile</h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Manage your personal administrative details and organization settings.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
              <div className="size-2 rounded-full bg-green-500 animate-pulse"/>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">System Active</span>
          </div>
        </div>

        <div className="max-w-7xl grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          
          {/* ── LEFT COLUMN: Admin Image & organization Summary ── */}
          <LeftCol user={user} organization={organization} />

          {/* ── RIGHT COLUMN: Detailed Information ── */}
          <RightCol user={user} organization={organization} />
        </div>
      </div>
    </>
  );
}