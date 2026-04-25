import { 
  IoRocketOutline,
} from "react-icons/io5";

export function WelcomeBanner({ setActiveNav }) {

  return (

    <div className="mb-8 bg-gradient-to-r from-[#89A1EF] to-[#768bd9] rounded-2xl p-6 text-white shadow-lg shadow-[#89A1EF]/20 relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
            <IoRocketOutline className="size-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Safe AI Usage Active</h2>
            <p className="text-white/80 text-sm max-w-md">
              You are currently in **Protected Mode**. Every interaction is automatically scrubbed of sensitive data before reaching the AI model.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveNav('guidelines')}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Guidelines
          </button>
          <button 
            onClick={() => setActiveNav("ai-tools")}
            className="px-5 py-2 bg-white text-[#89A1EF] font-bold text-xs rounded-xl hover:shadow-lg transition-all cursor-pointer"
          >
            Launch AI Tools
          </button>
        </div>
      </div>
      <div className="absolute -right-10 -bottom-10 size-40 bg-white/10 rounded-full blur-3xl" />
    </div>

  );

}