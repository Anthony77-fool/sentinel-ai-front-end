export function Logo() {

  return (
    <>

      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 lg:mb-12">
        <div className="bg-[#89A1EF] p-2 rounded-lg shrink-0">
            {/*Logo Picture here */}
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        </div>
        <div className="leading-tight">
          <h2 className="font-bold text-lg lg:text-xl text-[#4b598a] inline-block tracking-tight">SentinelAI</h2>
          <p className="text-xs lg:text-sm text-[#5d6da2] font-medium uppercase tracking-wider">Governance</p>
        </div>
      </div>

    </>
  )

}