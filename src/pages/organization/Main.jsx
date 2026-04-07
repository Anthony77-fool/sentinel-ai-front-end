import { useState } from "react";
import Sidebar   from "./Sidebar";
import Topbar    from "./Topbar";
import Dashboard from "./Dashboard";

export default function Main() {
  const [activeNav,        setActiveNav]        = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        /* Sidebar manages its own collapsed state internally.
           To lift it here, add a collapsed + setCollapsed prop
           to Sidebar and call setSidebarCollapsed in the toggle. */
      />

      <Topbar sidebarCollapsed={sidebarCollapsed} />

      <Dashboard sidebarCollapsed={sidebarCollapsed} />
    </div>
  );
}
