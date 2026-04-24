import React from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../../../components/organization/Card";
import { 
  IoShieldCheckmarkOutline, 
  IoInformationCircleOutline,
  IoPulseOutline,
  IoAlertCircleOutline
} from "react-icons/io5";
import { SiGooglegemini } from "react-icons/si";

// Chart.js Imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function MyStatus({ sidebarCollapsed }) {
  const { data: result, isLoading } = useQuery({
    queryKey: ["my-compliance-stats"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/compliance-stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return await response.json();
    },
  });

  const data = result || { logs: [], stats: { total: 0, trust_score: 100, trend: [] } };

  // Chart Configuration
  const chartData = {
    labels: data.stats.trend?.map(d => d.date) || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      fill: true,
      label: 'Personal Trust Score',
      data: data.stats.trend?.map(d => d.score) || [100, 100, 95, 95, 100, 100, 100],
      borderColor: '#89A1EF',
      backgroundColor: 'rgba(137, 161, 239, 0.1)',
      tension: 0.4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { 
      y: { min: 0, max: 100, ticks: { stepSize: 20 } },
      x: { grid: { display: false } }
    }
  };

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <SiGooglegemini className="animate-spin size-8 text-[#89A1EF]" />
    </div>
  );

  return (
    <div className={`mt-16 transition-all duration-300 p-6 min-h-screen ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
      
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Status</h1>
        <p className="text-sm text-gray-500 mt-1">Your personal compliance and safety scorecard.</p>
      </div>

      {/* ── Personal Metrics ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card 
          title="Trust Score" 
          value={`${data.stats.trust_score}%`} 
          icon={<IoShieldCheckmarkOutline className="text-emerald-500" />} 
          sub="Overall safety rating"
        />
        <Card 
          title="My Violations" 
          value={data.stats.total} 
          icon={<IoAlertCircleOutline className="text-amber-500" />} 
          sub="Flagged interactions"
        />
        <Card 
          title="System Health" 
          value="Good" 
          icon={<IoPulseOutline className="text-[#89A1EF]" />} 
          sub="Policy status: Active"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── Left: Trust Score Trend Chart ── */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Trust Score Trend</h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last 7 Days</span>
          </div>
          <div className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* ── Right: Personal Violation Log ── */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h3 className="font-bold text-gray-800">Recent Flags</h3>
          </div>
          <div className="overflow-y-auto max-h-[350px]">
             {data.logs?.length > 0 ? (
               <div className="divide-y divide-gray-50">
                 {data.logs.map((v) => (
                   <div key={v.id} className="p-4 hover:bg-gray-50 transition-colors">
                     <div className="flex justify-between items-start mb-1">
                       <span className="text-xs font-bold text-gray-700">{v.bot_name}</span>
                       <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                         v.severity === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                       }`}>
                         {v.severity}
                       </span>
                     </div>
                     <div className="flex flex-wrap gap-1 mb-2">
                       {v.violation_details?.map((tag, i) => (
                         <span key={i} className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                           {tag}
                         </span>
                       ))}
                     </div>
                     <p className="text-[10px] text-gray-400 font-mono">
                       {new Date(v.created_at).toLocaleDateString()}
                     </p>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="p-10 text-center flex flex-col items-center gap-3">
                 <IoShieldCheckmarkOutline className="size-10 text-emerald-100" />
                 <p className="text-xs text-gray-400 italic">No personal violations recorded.</p>
               </div>
             )}
          </div>
          <div className="mt-auto p-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-start gap-2">
              <IoInformationCircleOutline className="text-[#89A1EF] size-4 shrink-0" />
              <p className="text-[10px] text-gray-500 leading-tight">
                Maintaining a Trust Score above 90% ensures uninterrupted access to advanced AI models.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}