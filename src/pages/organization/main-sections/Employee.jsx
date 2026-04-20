import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Employee_Overview } from "./employee-reusables/Employee_Overview";
import { Employee_Table } from "./employee-reusables/Employee_Table";
import { Employee_Header } from "./employee-reusables/Employee_Header";
import { SiGooglegemini } from "react-icons/si";

export default function Employees({ sidebarCollapsed }) {
  const [searchTerm, setSearchTerm] = useState("");

  // ── TanStack Query Implementation ──
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // ── Loading State (The Preloader) ──
  // Using isLoading from useQuery makes this much cleaner than manual state
  if (isLoading) return (
    <div className={`mt-16 transition-all duration-300 h-[80vh] flex items-center justify-center ${sidebarCollapsed ? "ml-16" : "ml-56"}`}>
      <div className="flex flex-col items-center gap-3">
        <SiGooglegemini className="animate-spin size-10 text-[#89A1EF]" />
      </div>
    </div>
  );

  // Extract data with fallbacks
  const employees = data?.employees || [];
  const stats = data?.stats || { total: 0, active_now: 0, new_today: 0 };

  // ── Search Logic ──
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`mt-16 transition-all duration-300 p-6 min-h-screen ${sidebarCollapsed ? "ml-16" : "ml-56"}`}>
      
      {isError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold flex items-center gap-2">
          <div className="size-2 bg-rose-500 rounded-full animate-ping" />
          Connection Error: Failed to fetch live employee metrics.
        </div>
      )}

      {/* ── Header ── */}
      <Employee_Header 
        totalCount={employees.length} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      {/* ── Employee Overview ── */}
      <Employee_Overview stats={stats} />

      {/* ── Employee Table ── */}
      <Employee_Table filteredEmployees={filteredEmployees} />

    </div>
  );
}