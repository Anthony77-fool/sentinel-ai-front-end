import React from "react";
import { IoCloudUploadOutline, IoImageOutline } from "react-icons/io5";

export function ImageUploadModal({ modal, setModal, onConfirm, selectedImage, isUploading }) {
  if (!modal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border border-gray-100 transform animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-[#89A1EF]/10 text-[#89A1EF] flex items-center justify-center">
            <IoImageOutline className="size-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 leading-tight">{modal.title}</h3>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Media Update</p>
          </div>
        </div>

        {/* Image Preview Area */}
        <div className="relative aspect-square w-full bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center group">
          {selectedImage ? (
            <img 
              src={URL.createObjectURL(selectedImage)} 
              alt="Preview" 
              className="w-full h-full object-cover animate-in fade-in zoom-in-90 duration-300"
            />
          ) : (
            <div className="text-center p-6">
              <IoCloudUploadOutline className="size-12 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400 font-medium">No image selected</p>
            </div>
          )}
          
          {/* Uploading Overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in">
              <div className="size-8 border-4 border-[#89A1EF]/20 border-t-[#89A1EF] rounded-full animate-spin mb-3" />
              <p className="text-xs font-bold text-[#89A1EF] uppercase tracking-widest">Uploading...</p>
            </div>
          )}
        </div>

        <p className="text-slate-500 mt-6 text-sm leading-relaxed text-center px-4">
          {modal.message}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <button 
            disabled={isUploading}
            onClick={() => setModal({ ...modal, isOpen: false })}
            className="flex-1 py-4 bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          
          <button 
            disabled={!selectedImage || isUploading}
            onClick={onConfirm}
            className="flex-1 py-4 bg-[#89A1EF] text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-[#768bd9] transition-all shadow-lg shadow-[#89A1EF]/20 disabled:grayscale disabled:opacity-50"
          >
            {isUploading ? "Processing..." : "Upload Photo"}
          </button>
        </div>
      </div>
    </div>
  );
}