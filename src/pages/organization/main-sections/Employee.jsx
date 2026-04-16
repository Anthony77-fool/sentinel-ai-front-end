import React, { useState } from "react";

import { Employee_Overview } from "./employee-reusables/Employee_Overview";
import { Employee_Table } from "./employee-reusables/Employee_Table";
import { Employee_Header } from "./employee-reusables/Employee_Header";

// Mock Data for Registered Employees
const INITIAL_EMPLOYEES = [
  { id: 1, name: "Anthony Tric", email: "anthony@mmsu.edu.ph", joined: "Oct 12, 2025", status: "Active", risk: "Low", usage: "1.2k req" },
  { id: 2, name: "Jan Doe", email: "jan.d@sentinel.ai", joined: "Jan 05, 2026", status: "Active", risk: "High", usage: "842 req" },
  { id: 3, name: "Maria Santos", email: "m.santos@sentinel.ai", joined: "Mar 10, 2026", status: "Inactive", risk: "Low", usage: "0 req" },
  { id: 4, name: "Liam Reyes", email: "l.reyes@sentinel.ai", joined: "Apr 01, 2026", status: "Active", risk: "Medium", usage: "156 req" },
  { id: 5, name: "Liam Reyes", email: "l.reyes@sentinel.ai", joined: "Apr 01, 2026", status: "Active", risk: "Medium", usage: "156 req" },
];

export default function Employees({ sidebarCollapsed }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = INITIAL_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`mt-16 transition-all duration-300 p-6 min-h-screen ${sidebarCollapsed ? "ml-16" : "ml-56"}`}>
      
      {/* ── Header ── */}
      <Employee_Header INITIAL_EMPLOYEES={INITIAL_EMPLOYEES} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* ── Employee Overview ── */}
      <Employee_Overview INITIAL_EMPLOYEES={INITIAL_EMPLOYEES} />

      {/* ── Employee Table ── */}
      <Employee_Table filteredEmployees={filteredEmployees} />

    </div>
  );
}