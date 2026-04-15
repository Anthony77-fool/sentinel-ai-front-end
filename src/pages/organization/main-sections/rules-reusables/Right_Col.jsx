import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { 
 IoInformationCircleOutline, 
 IoShieldCheckmarkOutline, 
 IoDocumentTextOutline, 
 IoCloudUploadOutline } from "react-icons/io5";
import { UpdatedRuleCard } from "./UpdatedRuleCard";
import { RuleModal } from "../../../../components/organization/RuleModal";
import { Loading_Overlay } from "../../../../components/Loading_Overlay";
import { Modal } from "../../../../components/organization/Modal";

export function Right_Col() {
  const queryClient = useQueryClient();
  const [selectedRule, setSelectedRule] = useState(null);
  const [modalMode, setModalMode] = useState({ isOpen: false, isReadOnly: false });
  const [isProcessing, setIsProcessing] = useState(false); // Local state for overlay

  const { data: rules = [], isLoading } = useQuery({
    queryKey: ["governance-rules"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rules_get`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
      const result = await response.json();
      return result.data || [];
    },
    refetchInterval: 30000, 
  });

  // Initial state for the custom confirmation modal
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    isDanger: false,
    isSuccess: false,
    ruleId: null // Store the ID of the rule we want to delete
  });

  const confirmDelete = async () => {
    const ruleId = confirmModal.ruleId;
    if (!ruleId) return;

    // Close the confirmation modal and show the processing overlay
    setConfirmModal({ ...confirmModal, isOpen: false });
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rules_delete/${ruleId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ["governance-rules"] });

        // Trigger the Success Reminder
        setConfirmModal({
          isOpen: true,
          title: "Rule Removed",
          message: "The rule was deleted locally. Remember to click 'Push Changes to Agent' to apply this update to the SentinelAI core.",
          isDanger: false, // This will switch the button to the "Got it" style
          isSuccess: true, // This shows the green checkmark icon
          ruleId: null
        });

      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAction = async (type, rule) => {
    if (type === 'delete') {
      // Open custom modal instead of window.confirm
      setConfirmModal({
        isOpen: true,
        title: "Delete Rule?",
        message: `Are you sure you want to remove "${rule.name}"? This action cannot be undone.`,
        isDanger: true,
        isSuccess: false,
        ruleId: rule.id // Pass the ID here so onConfirm knows what to delete
      });
      return;
    }

    setSelectedRule(rule);
    setModalMode({ isOpen: true, isReadOnly: type === 'view' });
  };

  const handleEditSave = async () => {
    if (!selectedRule) return;

    setIsProcessing(true); // Start Loading
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rules_edit/${selectedRule.id}`, {
        method: "PUT", // Use PUT as we discussed for restful edit
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: selectedRule.name,
          definition: selectedRule.definition,
          type: selectedRule.type,
          status: 'pending' //always be changed to pending if edited
        })
      });

      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ["governance-rules"] });
        setModalMode({ ...modalMode, isOpen: false });
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update rule.");
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsProcessing(false); // Stop Loading
    }
  };

  return (
    <>
      {/* Dynamic Overlay for Delete/Edit actions */}
      <Loading_Overlay 
        isLoading={isProcessing} 
        title="Processing Request" 
        subtitle="Updating the security backbone..." 
      />

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                <IoShieldCheckmarkOutline className="text-[#89A1EF] size-5" />
                Governance Feed
              </h3>
              <p className="text-[11px] text-gray-400 font-medium">Real-time agent policy updates</p>
            </div>
            {/* Live Indicator ... */}
          </div>

          {/* List Area */}
          <div className="space-y-3 flex-1 overflow-y-auto h-[300px] min-h-[300px] pr-2 custom-scrollbar">
            {isLoading ? (
                <p className="text-center text-xs text-gray-400 py-10">Loading feed...</p>
            ) : rules.length > 0 ? (
              rules.map((rule) => (
                <UpdatedRuleCard 
                  key={rule.id}
                  rule={rule}
                  title={rule.name} 
                  type={rule.type === 'text' ? 'Direct Text' : 'Document'} 
                  time={rule.created_at_human || "Recently"} 
                  status={rule.status}
                  onAction={handleAction}
                  icon={rule.type === 'text' ? <IoShieldCheckmarkOutline className="size-4" /> : <IoDocumentTextOutline className="size-4" />}
                />
              ))
            ) : (
              <p className="text-center text-xs text-gray-400 py-10">No rules found.</p>
            )}
          </div>

          {/* Information Context */}
          <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
            <div className="flex gap-3">
              <IoInformationCircleOutline className="text-[#89A1EF] size-5 shrink-0" />
              <p className="text-[11px] text-gray-500 leading-relaxed italic">
                New rules are marked as <span className="text-amber-600 font-bold">Pending</span> until you deploy them to the SentinelAI core.
              </p>
            </div>
          </div>

          {/* The Deploy Button */}
          <div className="mt-4">
            <button className="w-full group flex items-center justify-center gap-2 py-4 bg-[#89A1EF] text-white rounded-2xl text-[15px] font-bold hover:bg-[#768bd9] shadow-xl shadow-[#89A1EF]/30 transition-all active:scale-[0.98] cursor-pointer">
              <IoCloudUploadOutline className="size-5 group-hover:animate-bounce" />
              Push Changes to Agent
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-3 font-medium">
              Last deployment: Today at 2:30 PM
            </p>
          </div>

        </div>
      </div>

      {/* The Rule Modal */}
      <RuleModal 
        isOpen={modalMode.isOpen}
        isReadOnly={modalMode.isReadOnly}
        ruleData={selectedRule}
        setRuleData={setSelectedRule} // Crucial: so the modal can update the state before saving
        onClose={() => setModalMode({ ...modalMode, isOpen: false })}
        onSave={handleEditSave}
      />

      {/* Custom Confirmation Modal */}
      <Modal 
        modal={confirmModal} 
        setModal={setConfirmModal} 
        onConfirm={confirmDelete}
        confirmText="Delete" 
      />

    </>
  );
}