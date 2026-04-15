import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
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
  const [isProcessing, setIsProcessing] = useState(false); // Your working overlay state

  // Ref to reliably track pending action, immune to React state timing issues
  const pendingActionRef = useRef(null);

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

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    isDanger: false,
    isSuccess: false,
    ruleId: null 
  });

  // --- THE DEPLOY LOGIC ---
  const handleDeploySync = async () => {
    // 1. Close the confirm modal
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));

    // 2. Trigger the loading overlay (The same one used by Edit/Delete)
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rules_deploy`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json" 
        }
      });

      const data = await response.json();

      if (response.ok) {
        await queryClient.invalidateQueries({ queryKey: ["governance-rules"] });

        // Stop loading
        setIsProcessing(false);

        // Show Success Modal
        setConfirmModal({
          isOpen: true,
          title: "Agent Synchronized",
          message: data.message || "n8n has processed the updates and synchronized the agent core.",
          isDanger: false,
          isSuccess: true,
          ruleId: null
        });
      } else {
        setIsProcessing(false);
        alert(data.message || "Deployment failed.");
      }
    } catch (error) {
      setIsProcessing(false);
      console.error("n8n Sync Error:", error);
    }
  };

  // --- THE DELETE LOGIC ---
  const confirmDelete = async () => {
    const ruleId = confirmModal.ruleId;
    if (!ruleId) return;

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
        setConfirmModal({
          isOpen: true,
          title: "Rule Removed",
          message: "The rule was deleted locally. Remember to click 'Push Changes to Agent'.",
          isDanger: false,
          isSuccess: true,
          ruleId: null
        });
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- BUTTON TRIGGERS ---
  const triggerDeployConfirm = () => {
    // Store the pending action in the ref BEFORE opening the modal
    pendingActionRef.current = 'DEPLOY_ACTION';

    setConfirmModal({
      isOpen: true,
      title: "Push to Agent?",
      message: "This will deploy all pending rules to the SentinelAI core via n8n. Do you want to proceed?",
      isDanger: false,
      isSuccess: false,
      ruleId: 'DEPLOY_ACTION' // This ID is the key
    });
  };

  const handleAction = async (type, rule) => {
    if (type === 'delete') {
      pendingActionRef.current = 'DELETE_ACTION';
      setConfirmModal({
        isOpen: true,
        title: "Delete Rule?",
        message: `Are you sure you want to remove "${rule.name}"?`,
        isDanger: true,
        isSuccess: false,
        ruleId: rule.id 
      });
      return;
    }
    setSelectedRule(rule);
    setModalMode({ isOpen: true, isReadOnly: type === 'view' });
  };

  const handleEditSave = async () => {
    if (!selectedRule) return;
    setIsProcessing(true); 
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rules_edit/${selectedRule.id}`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: selectedRule.name,
          definition: selectedRule.definition,
          type: selectedRule.type,
          status: 'pending'
        })
      });

      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ["governance-rules"] });
        setModalMode({ ...modalMode, isOpen: false });
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // --- THE GLOBAL HANDLER ---
  const handleGlobalConfirm = () => {
    const action = pendingActionRef.current;

    if (action === 'DEPLOY_ACTION') {
        pendingActionRef.current = null; // Clear it
        handleDeploySync();
    } else {
        pendingActionRef.current = null; // Clear it
        confirmDelete();
    }
  };

  return (
    <>
      {/* This is the overlay that you confirmed is working */}
      <Loading_Overlay 
        isLoading={isProcessing} 
        title="Processing Request" 
        subtitle="Updating the security backbone..." 
      />

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
                <IoShieldCheckmarkOutline className="text-[#89A1EF] size-5" />
                Governance Feed
              </h3>
              <p className="text-[11px] text-gray-400 font-medium">Real-time agent policy updates</p>
            </div>
          </div>

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

          <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
            <div className="flex gap-3">
              <IoInformationCircleOutline className="text-[#89A1EF] size-5 shrink-0" />
              <p className="text-[11px] text-gray-500 leading-relaxed italic">
                New rules are marked as <span className="text-amber-600 font-bold">Pending</span> until you deploy them.
              </p>
            </div>
          </div>

          {/* THE DEPLOY BUTTON */}
          <div className="mt-4">
            <button 
              onClick={triggerDeployConfirm}
              className="w-full group flex items-center justify-center gap-2 py-4 bg-[#89A1EF] text-white rounded-2xl text-[15px] font-bold hover:bg-[#768bd9] shadow-xl shadow-[#89A1EF]/30 transition-all active:scale-[0.98] cursor-pointer"
            >
              <IoCloudUploadOutline className="size-5 group-hover:animate-bounce" />
              Push Changes to Agent
            </button>
          </div>
        </div>
      </div>

      <RuleModal 
        isOpen={modalMode.isOpen}
        isReadOnly={modalMode.isReadOnly}
        ruleData={selectedRule}
        setRuleData={setSelectedRule}
        onClose={() => setModalMode({ ...modalMode, isOpen: false })}
        onSave={handleEditSave}
      />

      {/* THE MODAL THAT CALLS THE GLOBAL HANDLER */}
      <Modal 
        modal={confirmModal} 
        setModal={setConfirmModal} 
        onConfirm={handleGlobalConfirm} 
        confirmText={confirmModal.ruleId === 'DEPLOY_ACTION' ? "Deploy Now" : "Delete"} 
      />
    </>
  );
}