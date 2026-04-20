import { 
  IoSearchOutline, 
  IoFilterOutline, 
} from "react-icons/io5";

export function Employee_Header({ totalCount, searchTerm, setSearchTerm }) {

  return (

    <>

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Employee Monitoring
            <span className="bg-[#89A1EF]/10 text-[#89A1EF] text-xs px-2 py-0.5 rounded-full border border-[#89A1EF]/20 font-mono">
              {totalCount} Total
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

    </>

  );

}