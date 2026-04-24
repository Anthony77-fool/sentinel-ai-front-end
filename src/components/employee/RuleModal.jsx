import { IoDocumentTextOutline, IoCloseOutline, IoSaveOutline } from "react-icons/io5";

export function RuleModal({ isOpen, onClose, ruleData, setRuleData, onSave, isReadOnly = false, isLoading = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-gray-100 transform animate-in zoom-in-95 duration-200">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#89A1EF]">
              <IoDocumentTextOutline className="size-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                {isReadOnly ? "View Rule Details" : "Edit Governance Rule"}
              </h3>
              <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">SentinelAI Protocol</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <IoCloseOutline className="size-6" />
          </button>
        </div>

        {/* Form Fields Section */}
        <div className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2 ml-1">Rule Name</label>
            <input 
              type="text" 
              value={ruleData?.name || ""}
              onChange={(e) => setRuleData({ ...ruleData, name: e.target.value })}
              readOnly={isReadOnly}
              placeholder="e.g., PII Redaction Protocol"
              className={`w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#89A1EF]/20 transition-all
                ${isReadOnly ? 'bg-gray-50 text-gray-500 cursor-default border-transparent' : 'bg-white text-slate-700'}`}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2 ml-1">Behavioral Guidance</label>
            <textarea 
              rows="6"
              value={ruleData?.definition || ""}
              onChange={(e) => setRuleData({ ...ruleData, definition: e.target.value })}
              readOnly={isReadOnly}
              placeholder="Explain exactly what this rule does..."
              className={`w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#89A1EF]/20 resize-none transition-all
                ${isReadOnly ? 'bg-gray-50 text-gray-500 cursor-default border-transparent' : 'bg-white text-slate-700'}`}
            ></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          {isReadOnly ? (
            <button 
              onClick={onClose}
              className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all active:scale-[0.98] cursor-pointer"
            >
              Close View
            </button>
          ) : (
            <>
              <button 
                onClick={onClose}
                className="flex-1 py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={onSave}
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center gap-2 py-4 bg-[#89A1EF] text-white font-bold rounded-2xl hover:bg-[#768bd9] shadow-xl shadow-[#89A1EF]/20 transition-all active:scale-[0.98] cursor-pointer
                  ${isLoading ? 'opacity-70 grayscale cursor-not-allowed' : ''}`}
              >
                <IoSaveOutline className="size-5" />
                {isLoading ? "Saving..." : "Update Rule"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}