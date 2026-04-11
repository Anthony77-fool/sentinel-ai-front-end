import { useState } from "react";
import Sidebar   from "../../components/organization/Sidebar";
import Topbar    from "../../components/organization/Topbar";

// Import your sections
import Dashboard from "./sections/Dashboard";
import AiTools   from "./sections/AiTools"; 
import EmployeeDashboard from "./sections/Employee";
import Rules from "./sections/Rules";
import Penalties from "./sections/Penalties";

export default function Main() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 1. Define a function to decide which section to show
  const renderSection = () => {
    switch (activeNav) {
      case "dashboard":
        return <Dashboard sidebarCollapsed={sidebarCollapsed} />;
      case "ai-tools":
        return <AiTools sidebarCollapsed={sidebarCollapsed} />;
      case "employees":
        return <EmployeeDashboard sidebarCollapsed={sidebarCollapsed} />;
      case "rules":
        return <Rules sidebarCollapsed={sidebarCollapsed} />;
      case "penalties":
        return <Penalties sidebarCollapsed={sidebarCollapsed} />;
      default:
        return <Dashboard sidebarCollapsed={sidebarCollapsed} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        /* To sync the toggle with the Topbar/Dashboard, 
           make sure your Sidebar component calls:
           setSidebarCollapsed(!sidebarCollapsed) 
           whenever its internal toggle button is clicked.
        */
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <Topbar sidebarCollapsed={sidebarCollapsed} />

      {/* 2. Call the function here to render the active section */}
      {renderSection()}
    </div>
  );
}