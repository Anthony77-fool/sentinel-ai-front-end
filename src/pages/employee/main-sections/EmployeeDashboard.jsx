import React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  IoChatbubblesOutline, 
  IoShieldCheckmarkOutline, 
  IoDocumentLockOutline, 
  IoChevronForwardOutline
} from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

//subcomponents
import { StatTile } from "./dashboard-reusables/StatTile";
import { SideBarInfo } from "./dashboard-reusables/SideBarInfo";
import { UserActivities } from "./dashboard-reusables/UserActivities";
import { WelcomeBanner } from "./dashboard-reusables/WelcomeBanner";

export default function EmployeeDashboard({ sidebarCollapsed, setActiveNav , onLaunchBot, user }) {
  // ── Fetch only THIS employee's stats ──
  const { data: stats } = useQuery({
    queryKey: ["employee-stats"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/employee/dashboard-stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
    }
  });

  return (
    <div className={`mt-16 transition-all duration-300 p-6 min-h-screen ${sidebarCollapsed ? "ml-16" : "ml-56"}`}>
      
      {/* ── Welcome Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back, {user ? `${user.firstName}` : "Guest User"}!
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Your secure gateway to organization-approved AI tools.
        </p>
      </div>

      {/* ── Welcome Banner ── */}
      <WelcomeBanner setActiveNav={setActiveNav} />

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatTile 
          icon={<IoChatbubblesOutline />} 
          label="My Active Sessions" 
          value={stats?.total_sessions || "0"} 
          sub="Logs generated" 
        />
        <StatTile 
          icon={<IoShieldCheckmarkOutline />} 
          label="Security Status" 
          value="Secured" 
          sub="Auto-Masking On" 
          isStatus 
        />
        <StatTile 
          icon={<IoDocumentLockOutline />} 
          label="Compliance Score" 
          value={`${stats?.compliance_score || "100"}%`} 
          sub="Health rating" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main: Workspace & Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          <section>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              Approved Workspaces
            </h3>
            <div 
              onClick={() => onLaunchBot({ name: "Gemini Chatbot", id: "gemini-01" })}
              className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#89A1EF]/10 rounded-xl text-[#89A1EF]">
                  <SiGooglegemini className="size-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Sentinel Gemini Interface</h4>
                  <p className="text-xs text-gray-400">Enterprise Edition • v3.1</p>
                </div>
              </div>
              <IoChevronForwardOutline className="text-gray-300 group-hover:text-[#89A1EF] transition-all" />
            </div>
          </section>

          {/* User's Own Recent Activity (Filtered just for them) */}
          <UserActivities stats={stats} />
        </div>

        {/* Sidebar Info */}
        <SideBarInfo user={user} />

      </div>
    </div>
  );
}