//dynamic Loading Overlay

export function Loading_Overlay({ isLoading, title, subtitle }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex flex-col items-center p-8">
        {/* Modern Spinner */}
        <div className="w-12 h-12 border-4 border-[#89A1EF]/30 border-t-[#89A1EF] rounded-full animate-spin mb-4"></div>
        
        {/* Dynamic Text */}
        <h3 className="text-white font-bold text-lg tracking-wide">{title}</h3>
        <p className="text-slate-200 text-sm mt-1">{subtitle}</p>
      </div>
    </div>
  );
}