/**
 * Card — reusable stat summary card
 *
 * Props
 * ─────
 * title      {string}   e.g. "Total Employees"
 * value      {string}   e.g. "1,284"
 * trend      {string}   e.g. "+12" or "-4%"
 * trendUp    {boolean}  true → green  /  false → red
 * sub        {string}   e.g. "vs last week"
 * sparkData  {number[]} 7-point mini bar chart values
 */

import React from "react";

/* ── Sparkbar ── */
function SparkBar({ data = [], accent = "#89A1EF" }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-px h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all"
          style={{
            height: `${Math.max(3, (v / max) * 32)}px`,
            backgroundColor:
              i === data.length - 1 ? accent : `${accent}33`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Icon placeholder ── */
const IconPH = () => (
  <span
    className="w-9 h-9 rounded-xl bg-[#89A1EF]/10 border border-[#89A1EF]/20
               inline-flex items-center justify-center text-[#89A1EF] text-xs
               font-mono flex-shrink-0"
    aria-hidden="true"
  >
    ⬡
  </span>
);

/* ── Trend arrow ── */
function TrendArrow({ up }) {
  return (
    <svg
      className={`w-3 h-3 ${up ? "text-emerald-500" : "text-rose-400"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      {up ? (
        <>
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7,7 17,7 17,17" />
        </>
      ) : (
        <>
          <line x1="7" y1="7" x2="17" y2="17" />
          <polyline points="7,17 17,17 17,7" />
        </>
      )}
    </svg>
  );
}

export default function Card({
  title = "Metric",
  value = "—",
  icon = null, // <--- Add this prop
  trend = "+0",
  trendUp = true,
  sub = "vs last week",
  sparkData = [30, 45, 40, 55, 50, 60, 70],
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm
                    hover:shadow-md hover:border-[#89A1EF]/30 transition-all duration-200">
      
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {title}
        </p>
        
        {/* REFINED ICON CONTAINER */}
        <div className="w-9 h-9 rounded-xl bg-[#89A1EF]/10 border border-[#89A1EF]/20
                        flex items-center justify-center text-[#89A1EF] shrink-0">
          {icon ? (
             React.cloneElement(icon, { size: 18 }) 
          ) : (
            <span className="font-mono text-[10px]">⬡</span>
          )}
        </div>
      </div>

      {/* ── Value ── */}
      <p className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
        {value}
      </p>

      {/* ── Footer ── */}
      <div className="flex items-end justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <TrendArrow up={trendUp} />
          <span className={`text-xs font-semibold font-mono
                            ${trendUp ? "text-emerald-500" : "text-rose-400"}`}>
            {trend}
          </span>
          <span className="text-[11px] text-gray-400">{sub}</span>
        </div>

        <SparkBar data={sparkData} />
      </div>
    </div>
  );
}
