import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  IoClose, 
  IoSend, 
  IoAlertCircle, 
  IoChatbubbleEllipsesOutline,
  IoChevronDownOutline,
  IoTimeOutline
} from "react-icons/io5";

export default function NotifyModal({ isOpen, onClose, employee }) {
  const [comment, setComment] = useState("");
  const [selectedPenalty, setSelectedPenalty] = useState("Select Penalty Type");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ── Fetch Dynamic Categories ──
  const { data: penaltyTypes = [] } = useQuery({
    queryKey: ["violation-categories"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/violation-categories`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const rawData = await res.json(); 

      // ── Cleaning Logic ──
      const cleaned = rawData
        .map(item => {
          try {
            // Parse the string "[\"Title\"]" into a real array ["Title"]
            return JSON.parse(item); 
          } catch (e) {
            return item; // Fallback if it's already a string
          }
        })
        .flat() // Flatten nested arrays into one list
        .filter(item => item && item.length > 0); // Remove empty values or []

      return cleaned;
    },
    enabled: isOpen,
  });

  // ── Auto-fill logic ──
  useEffect(() => {
    if (employee && isOpen) {
      const detected = employee.last_violation?.title;
      if (detected) {
        setSelectedPenalty(detected);
        setComment(`System flagged: ${detected}. Please explain the context of this session.`);
      }
    }
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPenalty === "Select Penalty Type") return alert("Please select a penalty type");

    const token = localStorage.getItem("token");
    
    const payload = {
      employee_id: employee.id,
      violation_category: selectedPenalty,
      comment: comment,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/employees/notify`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        // You could trigger a toast notification here
        console.log("Firebase & MySQL Success:", result);
        onClose();
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-200">
                {employee?.profile_image ? (
                    <img src={employee.profile_image} className="size-full object-cover" alt="" />
                ) : (
                    <div className="size-full flex items-center justify-center bg-[#89A1EF] text-white font-bold text-xs">
                        {employee?.name?.charAt(0)}
                    </div>
                )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 leading-tight">Compliance Notice</h3>
              <p className="text-[11px] text-gray-500">{employee?.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
            <IoClose className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Dynamic Violation Insight (The "Evidence") */}
          {employee?.last_violation && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3">
                  <IoAlertCircle className="text-rose-500 size-5 shrink-0 mt-0.5" />
                  <div>
                      <p className="text-[12px] font-bold text-rose-700">Detected: {employee.last_violation.title}</p>
                      <div className="flex items-center gap-1 text-[10px] text-rose-500 mt-1 uppercase font-bold tracking-tighter">
                          <IoTimeOutline />
                          Flagged {employee.last_violation.timestamp}
                      </div>
                  </div>
              </div>
          )}

          {/* Custom Styled Dropdown */}
          <div className="relative">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Actionable Violation Category
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
                <div className="absolute left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-1 animate-in fade-in zoom-in duration-150 max-h-48 overflow-y-auto custom-scrollbar">
                  {penaltyTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedPenalty(type);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
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
              Admin Message (Sent via Firestore)
            </label>
            <div className="relative">
              <textarea 
                rows="4"
                required
                placeholder="Write a message to the employee..."
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
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] bg-[#89A1EF] hover:bg-[#768bd9] text-white px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#89A1EF]/30 transition-all active:scale-95 cursor-pointer"
            >
              <IoSend className="size-3.5" />
              Notify {employee?.name?.split(' ')[0]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}