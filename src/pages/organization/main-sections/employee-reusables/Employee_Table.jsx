import { IoEllipsisVertical } from "react-icons/io5";

export function Employee_Table({ filteredEmployees }) {
  return (
    <>
      {/* ── Employee Table Container ── */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
        
        {/* Wrapper for the scrollable area.
            max-h-[400px] roughly fits 5-6 rows. 
            'overflow-y-auto' adds the scrollbar only when content exceeds the height.
        */}
        <div className="overflow-y-auto max-h-[400px] custom-scrollbar">
          <table className="w-full text-left border-collapse relative">
            {/* 'sticky top-0' keeps the header visible while you scroll */}
            <thead className="sticky top-0 z-10 bg-gray-50 border-b border-gray-100 shadow-sm">
              <tr className="">
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
                      <div className="size-9 rounded-full bg-gradient-to-tr from-[#89A1EF] to-[#768bd9] flex items-center justify-center text-white font-bold text-xs shrink-0">
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
                  {/*<td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-[#89A1EF] hover:bg-[#89A1EF]/5 rounded-lg transition-all cursor-pointer">
                      <IoEllipsisVertical className="size-4" />
                    </button>
                  </td>*/}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer / Summary - Stays pinned at the bottom */}
        <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex items-center justify-between z-20">
          <p className="text-[11px] text-gray-400 font-medium italic">
            * Employees are automatically registered via Gateway. Monitoring is real-time.
          </p>
          <button className="text-[12px] font-bold text-[#89A1EF] hover:underline cursor-pointer">
            Export Audit Log
          </button>
        </div>
      </div>
    </>
  );
}