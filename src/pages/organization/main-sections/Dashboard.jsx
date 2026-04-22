import { useQuery } from "@tanstack/react-query";
import React from "react";
import { 
  IoPeopleOutline, 
  IoShieldCheckmarkOutline, 
  IoFlashOutline, 
  IoWarningOutline, 
  IoBanOutline,
  IoSparklesOutline
} from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

const QUICK_ACTIONS = [
  { label:"Approve Accounts", sub:"7 pending",    icon:"✓" },
  { label:"Review Reports",   sub:"12 new",        icon:"⚑" },
  { label:"Assign Penalty",   sub:"3 unresolved",  icon:"⚖" },
  { label:"Open AI Tools",    sub:"Monitor usage", icon:<IoSparklesOutline /> },
];

const SYSTEM_STATUS = [
  { name:"AI Monitor",    ok:true  },
  { name:"Report Engine", ok:true  },
  { name:"Auth Service",  ok:true  },
  { name:"Audit Logger",  ok:false },
];

/* ─────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────── */
import { AlertBanner } from "./dashboard-reusables/AlertBanner";
import { ChartCard } from "./dashboard-reusables/ChatCard";
import { QuickActions } from "./dashboard-reusables/QuickActions";
import { SystemStatus } from "./dashboard-reusables/SystemStatus";
import Card from "../../../components/organization/Card";
import Table from "../../../components/organization/Table";

/* ─────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────── */
export default function Dashboard({ sidebarCollapsed = false, setActiveNav }) {
  const leftClass = sidebarCollapsed ? "ml-16" : "ml-56";

  //backend api to get all the data from index
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/dashboard-stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    }
  });

  const stats = data?.stats;
  const trends = data?.trends || [0, 0, 0, 0, 0, 0, 0];

  const STAT_CARDS = [
    { 
      title: "Monitored Employees", 
      value: stats?.total_employees || "0", 
      icon: <IoPeopleOutline />, 
      trend: "+2", trendUp: true, sub: "new this week", 
      sparkData: trends // Real data from backend!
    },
    { 
      title: "Active Interceptions", 
      value: stats?.active_sessions || "0", 
      icon: <IoShieldCheckmarkOutline />, 
      trend: "Live", trendUp: true, sub: "Last 60 mins", 
      sparkData: [5, 10, 8, 15, 12, 20, stats?.active_sessions || 0] 
    },
    { 
      title: "Total AI Requests", 
      value: stats?.total_usage || "0", 
      icon: <IoFlashOutline />, 
      trend: "+14%", trendUp: true, sub: "Across all bots", 
      sparkData: trends 
    },
    { 
      title: "Policy Violations", 
      value: stats?.total_violations || "0", 
      icon: <IoWarningOutline />, 
      trend: "-2", trendUp: true, sub: "Flagged by AI", 
      sparkData: [2, 5, 3, 8, 4, 2, stats?.total_violations || 0] 
    },
    { 
      title: "Critical Redlines", 
      value: stats?.critical_count || "0", 
      icon: <IoBanOutline />, 
      trend: "Stable", trendUp: true, sub: "Urgent review", 
      sparkData: [1, 0, 2, 1, 0, 0, stats?.critical_count || 0] 
    },
  ];

  const usageChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "AI Requests",
        data: data?.charts?.usage || [0, 0, 0, 0, 0, 0, 0], // Live data from backend
        fill: true,
        borderColor: "#89A1EF",
        backgroundColor: "rgba(137, 161, 239, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const reportChartData = {
    labels: data?.charts?.reports?.labels || ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Reports",
        data: data?.charts?.reports?.data || [],
        backgroundColor: "#89A1EF",
        borderRadius: 6,
      },
      {
        label: "Resolved",
        data: data?.charts?.reports?.resolved || [],
        backgroundColor: "#94A3B8",
        borderRadius: 6,
      },
    ],
  };

  const violationChartData = {
    labels: data?.charts?.violations?.labels || [],
    datasets: [
      {
        data: data?.charts?.violations?.values || [],
        backgroundColor: ["#89A1EF", "#FCA5A5", "#94A3B8", "#64748B"],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  };

  // ── IMPLEMENTATION OF ISLOADING ──
  if (isLoading) return (
    <div className={`${leftClass} mt-16 h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50`}>
       <div className="flex flex-col items-center gap-3">
        <SiGooglegemini className="animate-spin size-10 text-[#89A1EF]" />
        <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase animate-pulse">
          Initializing Sentinel Node...
        </p>
      </div>
    </div>
  );

  return (
    <main
      className={`${leftClass} mt-16 min-h-[calc(100vh-64px)] bg-[#F8FAFC]
                  p-6 transition-all duration-300`}
    >
      {/* ── Alert ── */}
      <AlertBanner />

      {/* ── Stat cards ── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5
                   gap-3 mb-6"
      >
        {STAT_CARDS.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-6">
        <ChartCard 
          title="AI Usage Over Time" 
          type="LINE" 
          period="Weekly" 
          chartData={usageChartData} 
        />
        <ChartCard 
          title="Reports vs Resolved" 
          type="BAR" 
          period="Monthly" 
          chartData={reportChartData} 
        />
        <ChartCard 
          title="Violation Types" 
          type="PIE" 
          period="All time" 
          chartData={violationChartData} 
        />
      </div>

      {/* ── Table + side panels ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_272px] gap-3">
        <Table setActiveNav={setActiveNav} />
        <div className="flex flex-col gap-3">
          <QuickActions QUICK_ACTIONS={QUICK_ACTIONS} />
          <SystemStatus SYSTEM_STATUS={SYSTEM_STATUS} />
        </div>
      </div>
    </main>
  );
}
