
export function UserActivities({ stats }) {

  return (

    <section>
      <h3 className="font-bold text-gray-800 mb-4">Your Recent Interactions</h3>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Overflow Wrapper */}
        <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Workspace</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security Status</th>
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats?.recent_activity?.length > 0 ? (
                stats.recent_activity.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-[#89A1EF]" />
                        <span className="text-sm font-medium text-gray-700">{log.bot}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${
                        log.status === 'flagged' 
                          ? 'bg-rose-50 text-rose-500 border-rose-100' 
                          : 'bg-emerald-50 text-emerald-500 border-emerald-100'
                      }`}>
                        {log.status === 'flagged' ? 'Flagged (PII Detected)' : 'Cleared'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                      {log.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-12 text-center text-gray-400 text-xs italic">
                    No recent activity found. Start a conversation to see your logs.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>

  );

}