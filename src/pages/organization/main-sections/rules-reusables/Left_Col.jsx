import { useQueryClient } from "@tanstack/react-query"; 
import { useState } from "react";
import { 
  IoCloudUploadOutline, 
  IoDocumentTextOutline, 
  IoAddOutline
} from "react-icons/io5";
import { Modal } from "../../../../components/organization/Modal";

export function Left_Col() {
    // Senior Comment: Initializing the query client to handle cache invalidation
    const queryClient = useQueryClient();

    const [activeTab, setActiveTab] = useState("text");
    const [isLoading, setIsLoading] = useState(false);
    
    // Form States
    const [ruleName, setRuleName] = useState("");
    const [behavioralGuidance, setBehavioralGuidance] = useState("");

    // Senior Comment: Centralized modal state for handling success, errors, and confirmations
    const [modal, setModal] = useState({
      isOpen: false,
      title: "",
      message: "",
      isSuccess: false,
      isDanger: false
    });

    const handleAddRule = async () => {
      // Senior Comment: Validation check using the custom Modal instead of alert
      if (!ruleName.trim() || !behavioralGuidance.trim()) {
        setModal({
          isOpen: true,
          title: "Missing Information",
          message: "Please provide both a rule name and behavioral guidance before proceeding.",
          isSuccess: false,
          isDanger: false
        });
        return;
      }
      
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const payload = {
        name: ruleName, 
        definition: behavioralGuidance, 
        type: activeTab === 'text' ? 'text' : 'document', 
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rules_add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
          // Senior Comment: Triggering a background re-fetch of the governance feed
          queryClient.invalidateQueries({ queryKey: ["governance-rules"] });

          // Senior Comment: Clear form first to provide immediate visual feedback
          setRuleName("");
          setBehavioralGuidance("");
          
          setModal({
            isOpen: true,
            title: "Rule Staged",
            message: "Governance rule has been successfully pushed to the pending feed for deployment.",
            isSuccess: true,
            isDanger: false
          });
          console.log("SentinelAI Log: Rule successfully pushed.");
        } else {
          // Senior Comment: Pass backend error messages directly to the Modal
          setModal({
            isOpen: true,
            title: "Submission Failed",
            message: data.message || "The server rejected the governance rule. Please check your inputs.",
            isSuccess: false,
            isDanger: false
          });
        }
      } catch (error) {
        setModal({
          isOpen: true,
          title: "Network Error",
          message: "Could not connect to the SentinelAI security backbone. Please check your connection.",
          isSuccess: false,
          isDanger: false
        });
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="xl:col-span-2 space-y-6">
      {/* Senior Comment: Render Modal at the top level of the component */}
      <Modal modal={modal} setModal={setModal} />

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setActiveTab("text")}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors
              ${activeTab === 'text' ? 'text-[#89A1EF] border-b-2 border-[#89A1EF]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <IoDocumentTextOutline className="size-4" />
            Direct Instructions
          </button>
          <button 
            onClick={() => setActiveTab("upload")}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors
              ${activeTab === 'upload' ? 'text-[#89A1EF] border-b-2 border-[#89A1EF]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <IoCloudUploadOutline className="size-4" />
            Document Upload
          </button>
        </div>

        <div className="p-6">
          {activeTab === "text" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2">Rule Name</label>
                <input 
                  type="text" 
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  placeholder="e.g., PII Redaction Protocol"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#89A1EF]/20"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2">Behavioral Guidance</label>
                <textarea 
                  rows="6"
                  value={behavioralGuidance}
                  onChange={(e) => setBehavioralGuidance(e.target.value)}
                  placeholder="Explain exactly what this rule does..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#89A1EF]/20 resize-none"
                ></textarea>
              </div>
            </div>
          ) : (
            /* Document Upload UI */
            <div className="border-2 border-dashed border-gray-100 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50/30 group hover:border-[#89A1EF]/40 transition-all cursor-pointer">
              <div className="size-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#89A1EF] mb-4 group-hover:scale-110 transition-transform">
                <IoCloudUploadOutline className="size-7" />
              </div>
              <p className="text-sm font-bold text-gray-700">Upload Policy Documents</p>
              <p className="text-xs text-gray-400 mt-1">PDF or Word files (Max 10MB)</p>
              <button className="mt-6 px-6 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-sm">
                Select Files
              </button>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleAddRule}
              disabled={isLoading}
              className={`flex items-center gap-2 px-6 py-2.5 bg-[#89A1EF] text-white rounded-xl text-sm font-bold hover:bg-[#768bd9] shadow-lg shadow-[#89A1EF]/20 transition-all cursor-pointer 
              ${isLoading ? 'opacity-70 grayscale cursor-not-allowed' : ''}`}
            >
              <IoAddOutline className="size-5" />
              {isLoading ? "Processing..." : "Add Rule"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}