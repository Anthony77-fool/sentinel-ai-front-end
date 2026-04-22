
/** Alert banner — left accent border, pale blue background */
export function AlertBanner() {
  return (
    <div
      className="flex items-start gap-3 bg-[#89A1EF]/5 border border-[#89A1EF]/20
                 border-l-4 border-l-[#89A1EF] rounded-2xl px-4 py-3.5 mb-6"
    >
      {/* ICON_PLACEHOLDER: WARNING */}
      <span className="text-[#89A1EF] mt-0.5 flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0
                   1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#89A1EF]">
          High AI misuse activity detected
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          23 % spike in flagged tool usage this week — 5 employees require immediate review.
        </p>
      </div>
      <button
        className="flex-shrink-0 text-xs font-semibold bg-[#89A1EF] text-white
                   px-3 py-1.5 rounded-lg hover:bg-[#7b93e8] transition-colors shadow-sm"
      >
        Review Now
      </button>
    </div>
  );
}