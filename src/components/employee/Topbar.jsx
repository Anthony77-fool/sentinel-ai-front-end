import { useState, useEffect } from "react";
import { useProfile } from "../../utils/useProfile";
import { db } from "../../firebase-config/Firebase";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  deleteDoc, 
  orderBy 
} from "firebase/firestore";
import NotificationModal from "./NotificationModal";

export default function Topbar({ sidebarCollapsed = false }) {
  const leftClass = sidebarCollapsed ? "left-16" : "left-56";

  // Get User Data from LocalStorage/Hook
  const { data: user, isLoading } = useProfile();
  
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 1. Listen to Firestore in real-time
  useEffect(() => {
    // Note: Ensuring we have the ID before attempting to query
    if (!user?.user?.id) return;

    // Filter by receiver_id matching logged-in user
    // We use String() because the PHP backend sends IDs as strings to Firestore
    const q = query(
      collection(db, "notifications"),
      where("receiver_id", "==", String(user.user.id)),
      orderBy("timestamp", "desc")
    );

    // This listener automatically updates the 'notifications' state whenever Firestore changes
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(docs);
    }, (error) => {
      // Common cause for empty display: Missing composite index
      console.error("Firestore Listener Error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  // 2. Handlers
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notifications", id));
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  const handleView = (notif) => {
    // Redirects to the specific compliance notice detail
    console.log("Navigating to notice:", notif.mysql_id);
    // window.location.href = `/compliance/notice/${notif.mysql_id}`;
  };

  // Helper to get Initials (e.g., "Marck Sabado" -> "MS")
  const getInitials = () => {
    if (!user?.user) return "??";
    const f = user.user.first_name?.charAt(0) || "";
    const l = user.user.last_name?.charAt(0) || "";
    return (f + l).toUpperCase();
  };

  return (
    <header
      className={`fixed top-0 right-0 ${leftClass} h-16 z-20 flex items-center gap-4 px-6
                  bg-white border-b border-gray-200 transition-all duration-300`}
    >
      {/* ── Page title ── */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <h1 className="text-[17px] font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-gray-400
                         font-medium bg-gray-100 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#89A1EF]" />
          Live
        </span>
      </div>

      {/* ── Search bar ── */}
      <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200
                      rounded-xl px-3 py-2 focus-within:border-[#89A1EF]/50
                      focus-within:ring-2 focus-within:ring-[#89A1EF]/10 transition-all">
        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none"
             stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent text-sm text-gray-700 placeholder-gray-400
                     outline-none w-44 font-sans"
        />
      </div>

      {/* ── Notification bell ── */}
      <div className="relative">
        <button
          onClick={() => setShowModal(!showModal)}
          className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all 
            ${showModal ? 'border-[#89A1EF] bg-[#89A1EF]/10 text-[#89A1EF]' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-[#89A1EF]/40 hover:text-[#89A1EF] hover:bg-[#89A1EF]/5'}`}
          aria-label="Notifications"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        {/* Dynamic Badge - Only show if count > 0 */}
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#89A1EF] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm font-mono">
            {notifications.length}
          </span>
        )}

        {/* The Modal Component */}
        {showModal && (
          <NotificationModal 
            notifications={notifications}
            onClose={() => setShowModal(false)}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
      </div>

      {/* ── User avatar ── */}
      <div className="w-9 h-9 rounded-full bg-[#89A1EF]/10 border-2 border-[#89A1EF]/25
                      flex items-center justify-center cursor-pointer overflow-hidden
                      hover:border-[#89A1EF]/60 transition-colors shadow-sm relative">
        <img 
          src={
            user?.user?.profile_image 
              ? user.user.profile_image 
              : `https://ui-avatars.com/api/?name=${user?.user?.first_name}+${user?.user?.last_name}`
          } 
          alt="Profile" 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to UI Avatars if image path fails
            e.target.src = `https://ui-avatars.com/api/?name=${user?.user?.first_name}+${user?.user?.last_name}`;
          }} 
        />
      </div>
    </header>
  );
}