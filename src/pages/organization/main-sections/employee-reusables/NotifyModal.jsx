import React, { useState } from "react";
import { 
  IoClose, 
  IoSend, 
  IoAlertCircle, 
  IoChatbubbleEllipsesOutline,
  IoChevronDownOutline 
} from "react-icons/io5";

// This would eventually come from your DB
const PENALTY_TYPES = [
  "PII Data Leakage", 
  "Malware Execution", 
  "Unauthorized Prompting", 
  "Policy Bypass Attempt",
  "General Conduct"
];

export default function NotifyModal({ isOpen, onClose, employee }) {
  const [comment, setComment] = useState("");
  const [selectedPenalty, setSelectedPenalty] = useState("Select Penalty Type");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPenalty === "Select Penalty Type") return alert("Please select a penalty type");
    
    console.log("Notifying:", employee.name, "Type:", selectedPenalty, "Comment:", comment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-500">
              <IoAlertCircle className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Issue Compliance Notice</h3>
              <p className="text-[11px] text-gray-500">Notifying: {employee?.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
            <IoClose className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Custom Styled Dropdown (Matched to AiTools) */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Violation Category
            </label>
            
            <button 
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center justify-between w-full px-4 py-3 bg-white border rounded-xl text-sm transition-all cursor-pointer ${
                isDropdownOpen ? 'border-[#89A1EF] ring-2 ring-[#89A1EF]/10' : 'border-gray-200 text-gray-600'
              }`}
            >
              <span className={selectedPenalty === "Select Penalty Type" ? "text-gray-400" : "font-medium text-gray-800"}>
                {selectedPenalty}
              </span>
              <IoChevronDownOutline className={`size-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1 animate-in fade-in zoom-in duration-150">
                  {PENALTY_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedPenalty(type);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer
                        ${selectedPenalty === type ? 'bg-[#89A1EF]/10 text-[#89A1EF] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Comment Area */}
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Admin Instructions
            </label>
            <div className="relative">
              <textarea 
                rows="4"
                required
                placeholder="e.g. Please proceed to the HR office immediately to discuss your recent interactions."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#89A1EF]/20 focus:border-[#89A1EF] outline-none transition-all resize-none placeholder:text-gray-300"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <IoChatbubbleEllipsesOutline className="absolute bottom-3 right-3 text-gray-300 size-5" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
            >
              Dismiss
            </button>
            <button
              type="submit"
              className="flex-[2] bg-[#89A1EF] hover:bg-[#768bd9] text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#89A1EF]/30 transition-all active:scale-95 cursor-pointer"
            >
              <IoSend className="size-3.5" />
              Notify Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}