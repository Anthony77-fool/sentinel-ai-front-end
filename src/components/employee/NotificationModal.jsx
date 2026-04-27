import React from "react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationModal({ notifications, onClose, onDelete, onView }) {
  return (
    <>
      {/* Backdrop to close modal when clicking outside */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      <div className="absolute top-14 right-0 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
          <span className="text-[10px] bg-[#89A1EF]/10 text-[#89A1EF] px-2 py-0.5 rounded-full font-bold">
            {notifications.length} New
          </span>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-xs text-gray-400">No new notifications</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id} 
                className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors group relative"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-[#89A1EF] uppercase tracking-wider">
                      {notif.type?.replace('_', ' ')}
                    </span>
                    <button 
                      onClick={() => onDelete(notif.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <h4 className="text-xs font-semibold text-gray-800">{notif.title}</h4>
                  <p className="text-[11px] text-gray-500 line-clamp-2">{notif.message}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-gray-400 italic">
                      {notif.timestamp ? formatDistanceToNow(new Date(notif.timestamp)) + ' ago' : ''}
                    </span>
                    <button 
                      onClick={() => onView(notif)}
                      className="text-[10px] font-bold text-[#89A1EF] hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
          <button className="text-[11px] font-bold text-gray-500 hover:text-[#89A1EF]">
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
}