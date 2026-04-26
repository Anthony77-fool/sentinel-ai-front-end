import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Add this
import { 
  IoBusinessOutline, 
  IoTimeOutline,
  IoKeyOutline,
  IoPencil,
} from "react-icons/io5";
import { ImageUploadModal } from "../../../../components/organization/ImageModal";

export function LeftCol({ user, organization }){
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // 1. Define the Modal State
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  // 2. Define the Mutation for the image upload
  const mutation = useMutation({
    mutationFn: async (file) => {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("profile_image", file);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile/image`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          // Note: Don't set Content-Type header when sending FormData; 
          // the browser does it automatically with the boundary string.
        },
        body: formData
      });
      if (!response.ok) throw new Error("Upload failed");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile-data"]);
      setModal({ ...modal, isOpen: false });
      setSelectedFile(null);
    }
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setModal({
        isOpen: true,
        title: "Update Profile Picture",
        message: "Does this look correct? Your new photo will be visible to everyone in the organization."
      });
    }
  };

  const handleConfirmUpload = () => {
    if (selectedFile) {
      mutation.mutate(selectedFile);
    }
  };

  const handlePencilClick = () => {
    fileInputRef.current.click();
  };

  return (

    <>

      <div className="xl:col-span-1 space-y-8 sticky top-24">
        <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#89A1EF]/5 rounded-full blur-3xl -mr-20 -mt-20" />
            
          <div className="relative group mb-6">
            <img 
              src={user.profile_image} 
              alt={`${user.first_name} ${user.last_name}`} 
              className="size-32 rounded-full border-4 border-white shadow-xl shadow-[#89A1EF]/20 object-cover ring-2 ring-[#89A1EF]/10"
            />
            
            {/* The Hidden Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*" 
            />

            {/* 5. The Trigger Button */}
            <button 
              onClick={handlePencilClick}
              className="absolute bottom-1 right-1 bg-[#89A1EF] text-white p-2 rounded-full shadow-lg hover:bg-[#768bd9] transition-all cursor-pointer border-2 border-white"
            >
                <IoPencil className="size-4"/>
            </button>
          </div>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {`${user.first_name} ${user.last_name}`}
          </h2>
          
          <div className="inline-flex items-center gap-2 mt-2 px-3.5 py-1.5 bg-[#89A1EF] text-white rounded-full">
            <IoKeyOutline className="size-3.5" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest">
              Business Admin
            </span>
          </div>

          <hr className="w-full border-gray-100 my-8" />

          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider text-left pl-1">Primary Organization</p>
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 w-full">
                <div className="p-3 bg-white rounded-xl text-[#89A1EF] shadow-sm border border-gray-100">
                    <IoBusinessOutline className="size-6" />
                </div>
                <div className="text-left flex-1 min-w-0">
                    <p className="font-bold text-gray-800 truncate">{organization.business_name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{organization.entity_type}</p>
                </div>
            </div>
          </div>
        </div>
        
        {/* Metadata Pill */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-inner bg-gray-50/50">
            <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5">
                <IoTimeOutline/> Account Created:
            </p>
            <p className="text-[10px] text-gray-600 font-mono font-bold">
                {user.created_at ? new Date(user.created_at).toLocaleDateString('en-CA') : '---'}
            </p>
        </div>
      </div>

      {/* RENDER THE MODAL HERE */}
      <ImageUploadModal 
        modal={modal}
        setModal={setModal}
        selectedImage={selectedFile}
        onConfirm={handleConfirmUpload}
        isUploading={mutation.isPending}
      />

    </>

  );

}