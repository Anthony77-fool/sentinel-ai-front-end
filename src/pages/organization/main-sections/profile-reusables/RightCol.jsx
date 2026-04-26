import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  IoPersonOutline, 
  IoBusinessOutline, 
  IoMailOutline, 
  IoCalendarClearOutline,
  IoLocationOutline,
  IoBriefcaseOutline,
  IoShieldCheckmarkOutline,
  IoInformationCircleOutline,
  IoPencil,
  IoEnterOutline,
} from "react-icons/io5";

import { Modal } from '../../../../components/organization/Modal';

// Helper component for detail rows
const DetailRow = ({ icon: Icon, label, value, isDate, isEditable, onChange }) => {
  const formattedValue = isDate && value 
    ? new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : value;

  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0 group">
      <div className="p-2.5 bg-gray-50 group-hover:bg-[#89A1EF]/10 rounded-xl text-gray-400 group-hover:text-[#89A1EF] transition-colors">
        <Icon className="size-4" />
      </div>
      <div className="flex-1">
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{label}</p>
        
        {/* Conditional Rendering: Input vs Text */}
        {isEditable ? (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full text-sm font-semibold text-gray-800 mt-0.5 bg-gray-50 border border-[#89A1EF]/30 rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-[#89A1EF]"
          />
        ) : (
          <p className="text-sm font-semibold text-gray-800 mt-0.5">{formattedValue || 'Not provided'}</p>
        )}
      </div>
    </div>
  );
};

export function RightCol({ user, organization }) {

  const queryClient = useQueryClient();
  const [isEditingNames, setIsEditingNames] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || ""
  });

  // ── Modal State ──
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    isSuccess: false,
    isDanger: false
  });

  // ── Backend Mutation ──
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile/update`, {
        method: 'POST', // As requested for your store/update logic
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) throw new Error("Update failed");
      return response.json();
    },
    onSuccess: () => {
      // Refresh the profile data across the app
      queryClient.invalidateQueries(["profile-data"]);
      setIsEditingNames(false);
      
      // Show Success Modal
      setModal({
        isOpen: true,
        title: "Profile Updated",
        message: "Your names have been successfully updated in the SentinelAI system.",
        isSuccess: true
      });
    },
    onError: () => {
        setModal({
            isOpen: true,
            title: "Update Error",
            message: "Something went wrong while saving your changes. Please try again.",
            isSuccess: false,
            isDanger: true
        });
    }
  });

  // ── Click Handlers ──
  const handleEditClick = () => {
    if (!isEditingNames) {
      setIsEditingNames(true);
    } else {
      // Trigger Confirmation Modal before sending to backend
      setModal({
        isOpen: true,
        title: "Confirm Changes",
        message: `Are you sure you want to change your name to ${formData.first_name} ${formData.last_name}?`,
        isSuccess: false,
        isDanger: false
      });
    }
  };

  const confirmSave = () => {
    setModal({ ...modal, isOpen: false }); // Close confirmation
    mutation.mutate(formData); // Send to Laravel
  };

  return (

    <>

      <div className="xl:col-span-2 space-y-8">
                  
        {/* Personal Details Card */}
        <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden group/card">
            
          {/* Card Header Container */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#89A1EF]/10 rounded-xl text-[#89A1EF]">
                      <IoPersonOutline className="size-6" />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-800 text-xl tracking-tight">Personal Access Details</h3>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">Your SentinelAI Credentials</p>
                  </div>
              </div>

              {/* ── THE EDIT BUTTON ── */}
              <button 
                onClick={handleEditClick}
                disabled={mutation.isPending}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ... ${
                    isEditingNames ? "bg-[#89A1EF] text-white" : "bg-gray-50 text-gray-500"
                }`}
              >
                <IoPencil className="size-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {mutation.isPending ? "Saving..." : isEditingNames ? "Save Changes" : "Edit Name"}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              <DetailRow 
                  icon={IoPersonOutline} // Add this
                  label="First Name" 
                  value={formData.first_name} 
                  isEditable={isEditingNames} 
                  onChange={(v) => setFormData({...formData, first_name: v})} 
              />
              <DetailRow 
                  icon={IoPersonOutline} // Add this
                  label="Last Name" 
                  value={formData.last_name} 
                  isEditable={isEditingNames} 
                  onChange={(v) => setFormData({...formData, last_name: v})} 
              />
              
              <DetailRow icon={IoMailOutline} label="Email Address" value={user.email} />
              <DetailRow icon={IoBriefcaseOutline} label="Administrative Role" value={'Business Admin'} />
            </div>
          </div>

          {/* Organization Details Card */}
          <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-100">
                      <IoBusinessOutline className="size-6" />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-800 text-xl tracking-tight">Organization Profile</h3>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">Official Corporate Information</p>
                  </div>
              </div>

              <div className="space-y-1">
                  <DetailRow icon={IoBusinessOutline} label="Business Name" value={organization.business_name} />
                  <DetailRow icon={IoEnterOutline} label="Join Code" value={organization.join_code} />
                  <DetailRow icon={IoCalendarClearOutline} label="Founding Date" value={organization.founding_date} isDate />
                  <DetailRow icon={IoShieldCheckmarkOutline} label="Entity Type" value={organization.entity_type} />
                  <DetailRow icon={IoLocationOutline} label="Registered Address" value={organization.address} />
              </div>
          </div>

          {/* System Information Box */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50/80 to-white border border-blue-100/50 rounded-[1.5rem] shadow-inner">
            <div className="flex gap-4">
              <IoInformationCircleOutline className="text-[#89A1EF] size-6 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700 font-bold mb-1">System Record Integrity</p>
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  These records are derived from the master `users` and `organizations` tables. 
                  Last system sync occurred on {new Date().toLocaleTimeString()}. 
                  For security reasons, changing the registered email or organization name requires contacting SentinelAI enterprise support.
                </p>
              </div>
            </div>
          </div>

      </div>

      {/* ── The Modal Component ── */}
      <Modal 
        modal={modal} 
        setModal={setModal} 
        onConfirm={confirmSave} 
        confirmText="Yes, Update" 
      />

    </>

  );

}