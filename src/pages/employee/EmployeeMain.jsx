import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Sidebar   from "../../components/employee/Sidebar";
import Topbar    from "../../components/employee/Topbar";

// Import sections
import EmployeeDashboard from "./main-sections/EmployeeDashboard";
import AiTools   from "./main-sections/AiTools"; 
import MyStatus from "./main-sections/MyStatus";
import CompanyGuidelines from "./main-sections/CompanyGuidelines";

export default function EmployeeMain() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Get User Data from LocalStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // State to track if we want to launch a specific bot immediately
  const [preSelectedBot, setPreSelectedBot] = useState(null);

  const handleLaunchBot = (botData) => {
    setPreSelectedBot(botData); // Set the bot info
    setActiveNav("ai-tools");   // Switch to the AI Tools section
  };

  // Define a Title Mapping
  const titles = {
    dashboard: "Dashboard",
    "ai-tools": "AI Chat Management",
    employees: "Employee Overview",
    "my-status": "My Status",
    guidelines: "Company Guidelines",
  };

  const currentSubTitle = titles[activeNav] || "Organization";
  
  // Define a function to decide which section to show
  const renderSection = () => {
    switch (activeNav) {
      case "dashboard":
        return <EmployeeDashboard sidebarCollapsed={sidebarCollapsed} 
                  setActiveNav={setActiveNav} 
                  onLaunchBot={handleLaunchBot}
                  user={user}
                />;
      case "ai-tools":
        return <AiTools 
                sidebarCollapsed={sidebarCollapsed} 
                initialBot={preSelectedBot}
                clearInitialBot={() => setPreSelectedBot(null)}
              />;
      case "my-status":
        return <MyStatus sidebarCollapsed={sidebarCollapsed} />;
      case "guidelines":
        return <CompanyGuidelines sidebarCollapsed={sidebarCollapsed} />;
      default:
        return <EmployeeDashboard sidebarCollapsed={sidebarCollapsed} 
        setActiveNav={setActiveNav} 
        user={user}
      />;
    }
  };
  

  return (
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
  );
}