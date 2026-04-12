import { 
  IoPeopleOutline, 
  IoShieldCheckmarkOutline, 
  IoFlashOutline, 
  IoWarningOutline, 
  IoHammerOutline,
  IoSparklesOutline
} from "react-icons/io5";

import Card from "../../../components/organization/Card";
import Table from "../../../components/organization/Table";

/* ─────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────── */
const STAT_CARDS = [
  { 
    title: "Total Employees", 
    value: "1,284", 
    icon: <IoPeopleOutline />, 
    trend: "+12", trendUp: true, sub: "vs last week", 
    sparkData: [40, 55, 45, 60, 52, 65, 70] 
  },
  { 
    title: "Pending Approvals", 
    value: "47", 
    icon: <IoShieldCheckmarkOutline />, 
    trend: "+7", trendUp: false, sub: "vs last week", 
    sparkData: [20, 35, 28, 42, 38, 44, 47] 
  },
  { 
    title: "AI Tool Usage", 
    value: "8,932", 
    icon: <IoFlashOutline />, 
    trend: "+23%", trendUp: true, sub: "vs last week", 
    sparkData: [50, 60, 58, 72, 68, 80, 90] 
  },
  { 
    title: "Misuse Reports", 
    value: "136", 
    icon: <IoWarningOutline />, 
    trend: "+18", trendUp: false, sub: "vs last week", 
    sparkData: [25, 30, 40, 35, 50, 60, 65] 
  },
  { 
    title: "Penalties Issued", 
    value: "28", 
    icon: <IoHammerOutline />, 
    trend: "-4", trendUp: true, sub: "vs last week", 
    sparkData: [45, 50, 40, 38, 35, 30, 28] 
  },
];

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

/** Alert banner — left accent border, pale blue background */
function AlertBanner() {
  return (
    <div
      className="flex items-start gap-3 bg-[#89A1EF]/5 border border-[#89A1EF]/20
                 border-l-4 border-l-[#89A1EF] rounded-2xl px-4 py-3.5 mb-6"
    >
      {/* ICON_PLACEHOLDER: WARNING */}
      <span className="text-[#89A1EF] mt-0.5 flex-shrink-0">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
             viewBox="0 0 24 24">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0
                   1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#89A1EF]">
          High AI misuse activity detected
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          23 % spike in flagged tool usage this week — 5 employees require immediate review.
        </p>
      </div>
      <button
        className="flex-shrink-0 text-xs font-semibold bg-[#89A1EF] text-white
                   px-3 py-1.5 rounded-lg hover:bg-[#7b93e8] transition-colors shadow-sm"
      >
        Review Now
      </button>
    </div>
  );
}

/** Single chart placeholder card */
function ChartCard({ title, type, period, wide = false }) {
  const labels = { LINE:"— LINE CHART —", BAR:"▪ BAR CHART ▪", PIE:"◉ PIE CHART ◉" };
  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col
                  ${wide ? "col-span-2" : ""}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <span className="text-[10px] text-gray-400 font-medium bg-gray-100
                         px-2 py-0.5 rounded-full uppercase tracking-wider">
          {period}
        </span>
      </div>
      {/* CHART_PLACEHOLDER */}
      <div
        className="flex-1 min-h-[148px] rounded-xl border-2 border-dashed border-gray-200
                   bg-gray-50 flex flex-col items-center justify-center gap-1.5"
      >
        <span className="text-[11px] font-mono text-gray-300 tracking-widest">
          {labels[type]}
        </span>
        <span className="text-[10px] font-mono text-gray-300">
          [CHART_PLACEHOLDER: {type}]
        </span>
        <span className="text-[10px] text-gray-300">{title}</span>
      </div>
    </div>
  );
}

/** Quick action buttons */
function QuickActions() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-2">
        {QUICK_ACTIONS.map((qa) => (
          <button
            key={qa.label}
            className="flex flex-col items-start gap-1.5 p-3 rounded-xl
                       bg-[#89A1EF] hover:bg-[#7b93e8] active:bg-[#6e86e7]
                       text-white transition-colors shadow-sm text-left"
          >
            {/* ICON_PLACEHOLDER */}
            <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center
                              justify-center text-sm font-mono">
              {qa.icon}
            </span>
            <span className="text-xs font-semibold leading-tight">{qa.label}</span>
            <span className="text-[10px] text-white/70 font-mono">{qa.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** System status panel */
function SystemStatus() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-3">System Status</h2>
      <div className="space-y-0">
        {SYSTEM_STATUS.map((sys, i) => (
          <div
            key={sys.name}
            className={`flex items-center justify-between py-2.5
                        ${i < SYSTEM_STATUS.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <span className="text-xs text-gray-600">{sys.name}</span>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0
                            ${sys.ok
                              ? "bg-emerald-400"
                              : "bg-rose-400 animate-pulse"}`}
              />
              <span
                className={`text-[10px] font-semibold font-mono
                            ${sys.ok ? "text-emerald-500" : "text-rose-400"}`}
              >
                {sys.ok ? "Operational" : "Degraded"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────── */
export default function Dashboard({ sidebarCollapsed = false }) {
  const leftClass = sidebarCollapsed ? "ml-16" : "ml-56";

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
        <ChartCard title="AI Usage Over Time"  type="LINE" period="Weekly" />
        <ChartCard title="Reports vs Resolved" type="BAR"  period="Monthly" />
        <ChartCard title="Violation Types"     type="PIE"  period="All time" />
      </div>

      {/* ── Table + side panels ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_272px] gap-3">
        <Table />
        <div className="flex flex-col gap-3">
          <QuickActions />
          <SystemStatus />
        </div>
      </div>
    </main>
  );
}
