import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Sidebar   from "../../components/organization/Sidebar";
import Topbar    from "../../components/organization/Topbar";

// Import your sections
import Dashboard from "./main-sections/Dashboard";
import AiTools   from "./main-sections/AiTools"; 
import EmployeeDashboard from "./main-sections/Employee";
import Rules from "./main-sections/Rules";
import Penalties from "./main-sections/Penalties";
import Profile from "./main-sections/Profile";

export default function Main() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Define a Title Mapping
  const titles = {
    dashboard: "Dashboard",
    "ai-tools": "AI Chat Management",
    employees: "Employee Overview",
    rules: "Security Rules",
    penalties: "Compliance Penalties",
  };

  const currentSubTitle = titles[activeNav] || "Organization";

  // 1. Define a function to decide which section to show
  const renderSection = () => {
    switch (activeNav) {
      case "dashboard":
        return <Dashboard sidebarCollapsed={sidebarCollapsed} setActiveNav={setActiveNav} />;
      case "ai-tools":
        return <AiTools sidebarCollapsed={sidebarCollapsed} />;
      case "employees":
        return <EmployeeDashboard sidebarCollapsed={sidebarCollapsed} />;
      case "rules":
        return <Rules sidebarCollapsed={sidebarCollapsed} />;
      case "penalties":
        return <Penalties sidebarCollapsed={sidebarCollapsed} />;
      case "profile":
        return <Profile sidebarCollapsed={sidebarCollapsed} />;
      default:
        return <Dashboard sidebarCollapsed={sidebarCollapsed} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC] text-gray-900">

        {/*The Dynamic Helmet */}
        <Helmet>
          <title>{`SentinelAI | ${currentSubTitle}`}</title>
          <meta name="description" content={`Managing ${titles[activeNav]} for SentinelAI`} />
        </Helmet>

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
    </>
  );
}