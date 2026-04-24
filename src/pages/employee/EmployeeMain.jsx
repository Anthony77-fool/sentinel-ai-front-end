import { useState } from "react";
import Sidebar   from "../../components/employee/Sidebar";
import Topbar    from "../../components/employee/Topbar";

// Import your sections

import EmployeeDashboard from "./main-sections/EmployeeDashboard";
import AiTools   from "./main-sections/AiTools"; /*
import EmployeeDashboard from "./main-sections/Employee";
import Rules from "./main-sections/Rules";
import Penalties from "./main-sections/Penalties";
*/

export default function EmployeeMain() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // 1. Define a function to decide which section to show
  const renderSection = () => {
    switch (activeNav) {
      case "dashboard":
        return <EmployeeDashboard sidebarCollapsed={sidebarCollapsed} setActiveNav={setActiveNav} />;
      case "ai-tools":
        return <AiTools sidebarCollapsed={sidebarCollapsed} />;
      case "my-status":
        return <MyStatus sidebarCollapsed={sidebarCollapsed} />;
      case "guidelines":
        return <CompanyGuidelines sidebarCollapsed={sidebarCollapsed} />;
      default:
        return <EmployeeDashboard sidebarCollapsed={sidebarCollapsed} />;
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