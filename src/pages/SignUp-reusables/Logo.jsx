export function Logo() {

  return (
    <>

      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 lg:mb-12">
        <div className="p-2 rounded-lg shrink-0">
            {/*Logo Picture here */}
            <img className="w-20 h-full lg:w-20 lg:h-full text-white" src="/imgs/SentinelAI_Logo.webp" alt="SentinelAI Logo" />
            
        </div>
        <div className="leading-tight">
          <h2 className="font-bold text-lg lg:text-xl text-[#4b598a] inline-block tracking-tight">SentinelAI</h2>
          <p className="text-xs lg:text-sm text-[#5d6da2] font-medium uppercase tracking-wider">Governance</p>
        </div>
      </div>

    </>
  )

}