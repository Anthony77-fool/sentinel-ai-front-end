import React, { useState } from "react";
import { 
  IoPeopleOutline, 
  IoSearchOutline, 
  IoFilterOutline, 
  IoEllipsisVertical,
  IoAddOutline,
  IoPulseOutline
} from "react-icons/io5";

import Card from "../../../components/organization/Card";

// Mock Data for Registered Employees
const INITIAL_EMPLOYEES = [
  { id: 1, name: "Anthony Tric", email: "anthony@mmsu.edu.ph", joined: "Oct 12, 2025", status: "Active", risk: "Low", usage: "1.2k req" },
  { id: 2, name: "Jan Doe", email: "jan.d@sentinel.ai", joined: "Jan 05, 2026", status: "Active", risk: "High", usage: "842 req" },
  { id: 3, name: "Maria Santos", email: "m.santos@sentinel.ai", joined: "Mar 10, 2026", status: "Inactive", risk: "Low", usage: "0 req" },
  { id: 4, name: "Liam Reyes", email: "l.reyes@sentinel.ai", joined: "Apr 01, 2026", status: "Active", risk: "Medium", usage: "156 req" },
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Employee Monitoring
            <span className="bg-[#89A1EF]/10 text-[#89A1EF] text-xs px-2 py-0.5 rounded-full border border-[#89A1EF]/20 font-mono">
              {INITIAL_EMPLOYEES.length} Total
            </span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Review account activity and compliance risk levels</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            <input 
              type="text" 
              placeholder="Find employee..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#89A1EF]/20 w-64"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-xl hover:border-[#89A1EF] transition-colors">
            <IoFilterOutline className="size-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* ── Employee Overview ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card 
          title="Registered Accounts"
          value={INITIAL_EMPLOYEES.length.toString()}
          icon={<IoPeopleOutline />}
          trend="+4"
          trendUp={true}
          sub="joined this month"
          sparkData={[10, 15, 12, 20, 25, 30, 35]} // Showing registration growth
        />
        <Card 
          title="Active Now"
          value="2"
          icon={<IoPulseOutline />}
          trend="Steady"
          trendUp={true}
          sub="currently in gateway"
          sparkData={[5, 8, 4, 7, 6, 9, 8]} // Real-time pulse visualization
        />
        <Card 
          title="New Registrations"
          value="1"
          icon={<IoAddOutline />}
          trend="Today"
          trendUp={true}
          sub="automated via signup"
          sparkData={[1, 0, 2, 0, 1, 3, 1]} // Daily sign-up peaks
        />
      </div>

      {/* ── Employee Table ── */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Employee</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Joined Date</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">AI Usage</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">Risk Level</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-gradient-to-tr from-[#89A1EF] to-[#768bd9] flex items-center justify-center text-white font-bold text-xs">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{emp.name}</p>
                      <p className="text-[11px] text-gray-400">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    emp.status === 'Active' ? 'text-emerald-500 bg-emerald-50' : 'text-gray-400 bg-gray-100'
                  }`}>
                    <div className={`size-1.5 rounded-full ${emp.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{emp.joined}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">{emp.usage}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-lg border uppercase tracking-tighter ${
                    emp.risk === 'High' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                    emp.risk === 'Medium' ? 'bg-amber-50 text-amber-500 border-amber-100' :
                    'bg-emerald-50 text-emerald-500 border-emerald-100'
                  }`}>
                    {emp.risk}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-gray-400 hover:text-[#89A1EF] hover:bg-[#89A1EF]/5 rounded-lg transition-all">
                    <IoEllipsisVertical className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Table Footer / Summary */}
        <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[11px] text-gray-400 font-medium italic">
            * Employees are automatically registered via Gateway. Monitoring is real-time.
          </p>
          <button className="text-[12px] font-bold text-[#89A1EF] hover:underline">
            Export Audit Log
          </button>
        </div>
      </div>

    </div>
  );
}