/**
 * Table — Recent Activity table
 *
 * Props
 * ─────
 * rows  {Array}  Override default sample data
 */

const SAMPLE_ROWS = [
  { initials:"RD", name:"Rafael D.",  role:"Data Analyst", action:"Accessed ChatGPT API",  status:"flagged",   date:"Apr 7, 09:41" },
  { initials:"KL", name:"Kiera L.",   role:"Engineer",     action:"Approved — Onboarding", status:"approved",  date:"Apr 7, 09:15" },
  { initials:"MO", name:"Marcus O.",  role:"HR Manager",   action:"Penalty Assigned",       status:"penalized", date:"Apr 6, 18:02" },
  { initials:"SI", name:"Sofia I.",   role:"Marketing",    action:"New Registration",       status:"pending",   date:"Apr 6, 16:30" },
  { initials:"TW", name:"Tom W.",     role:"DevOps",       action:"AI Tool Misuse Report",  status:"flagged",   date:"Apr 6, 14:55" },
  { initials:"AL", name:"Amy L.",     role:"Designer",     action:"Profile Updated",        status:"resolved",  date:"Apr 6, 11:20" },
];

/* Status badge colour map — light, soft tones only */
const STATUS_STYLES = {
  flagged:   "bg-rose-50   text-rose-500   border border-rose-200",
  approved:  "bg-emerald-50 text-emerald-600 border border-emerald-200",
  penalized: "bg-amber-50  text-amber-600  border border-amber-200",
  pending:   "bg-[#89A1EF]/10 text-[#89A1EF] border border-[#89A1EF]/25",
  resolved:  "bg-gray-100  text-gray-500   border border-gray-200",
};

const COLUMNS = ["User", "Role", "Action", "Status", "Date"];

export default function Table({ rows = SAMPLE_ROWS }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

      {/* ── Card header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
        <button
          className="text-xs text-gray-500 hover:text-[#89A1EF] font-medium border
                     border-gray-200 hover:border-[#89A1EF]/40 rounded-lg px-3 py-1.5
                     transition-all"
        >
          View all
        </button>
      </div>

      {/* ── Scrollable table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className="text-left text-[10px] font-semibold uppercase tracking-widest
                             text-gray-400 px-5 py-3 whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 last:border-none
                           hover:bg-gray-50 transition-colors"
              >
                {/* User */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {/* IMAGE_PLACEHOLDER: AVATAR */}
                    <div
                      className="w-7 h-7 rounded-full bg-[#89A1EF]/10 border border-[#89A1EF]/20
                                 flex items-center justify-center flex-shrink-0"
                    >
                      <span className="text-[9px] font-bold text-[#89A1EF] font-mono">
                        {row.initials}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800 whitespace-nowrap">
                      {row.name}
                    </span>
                  </div>
                </td>

                {/* Role */}
                <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                  {row.role}
                </td>

                {/* Action */}
                <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                  {row.action}
                </td>

                {/* Status badge */}
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full
                                text-[10px] font-semibold font-mono capitalize
                                ${STATUS_STYLES[row.status] ?? STATUS_STYLES.resolved}`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap text-xs font-mono">
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
