import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

// 1. Register the ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

export function ChartCard({ title, type, period, chartData, wide = false }) {
  // 2. Global Options for the "Sentinel" look
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: type === "PIE", // Show legend only for Pie charts
        position: "bottom",
        labels: { boxWidth: 12, font: { size: 10, weight: 'bold' }, padding: 20 }
      },
    },
    scales: type !== "PIE" ? {
      x: { grid: { display: false }, ticks: { font: { size: 10 } } },
      y: { grid: { color: "#F1F5F9" }, ticks: { font: { size: 10 } } }
    } : {}
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-col h-[300px] ${wide ? "col-span-2" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800 tracking-tight">{title}</h3>
        <span className="text-[10px] text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
          {period}
        </span>
      </div>

      <div className="flex-1 min-h-0">
        {/* 3. Logic check: If chartData exists, render. Else show "No Data" */}
        {chartData ? (
          <>
            {type === "LINE" && <Line data={chartData} options={options} />}
            {type === "BAR" && <Bar data={chartData} options={options} />}
            {type === "PIE" && <Pie data={chartData} options={options} />}
          </>
        ) : (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl">
             <p className="text-gray-300 text-xs italic font-mono uppercase tracking-widest">No Stream Data</p>
          </div>
        )}
      </div>
    </div>
  );
}