import { 
  IoSearchOutline,
  IoCloseOutline,
} from "react-icons/io5";

export function SearchFilter({ searchQuery, setSearchQuery, setFilterPriority, filterPriority }) {

  return(

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

  );

}