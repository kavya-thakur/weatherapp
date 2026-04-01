import React from "react";
import { Thermometer, ArrowUp, ArrowDown, Droplets } from "lucide-react";

const HistoricalInsights = ({ insights }) => {
  const items = [
    {
      label: "Average",
      val: insights.avgTemp,
      unit: "°",
      icon: <Thermometer className="w-3.5 h-3.5 text-slate-400" />,
    },
    {
      label: "Peak",
      val: insights.maxTemp,
      unit: "°",
      icon: <ArrowUp className="w-3.5 h-3.5 text-rose-500" />,
    },
    {
      label: "Low",
      val: insights.minTemp,
      unit: "°",
      icon: <ArrowDown className="w-3.5 h-3.5 text-blue-500" />,
    },
    {
      label: "Rainfall",
      val: insights.totalRain,
      unit: "mm",
      icon: <Droplets className="w-3.5 h-3.5 text-emerald-500" />,
    },
  ];

  return (
    <div className="bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-2 md:p-3">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-white border border-slate-100/50 rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 group hover:shadow-sm transition-all duration-500"
          >
            {/* Header: Icon + Label */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-500 transition-colors">
                  {item.label}
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-100 group-hover:bg-blue-400 transition-colors" />
            </div>

            {/* Content: Big Value + Small Unit */}
            <div className="flex items-start gap-1">
              <span className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter tabular-nums leading-none">
                {item.val ?? "0"}
              </span>

              <span
                className={`
      font-black text-slate-300 uppercase tracking-widest group-hover:text-slate-300 transition-colors
      ${
        item.unit === "°"
          ? "text-xl md:text-2xl -translate-y-1 md:-translate-y-2" // Lifts the degree symbol
          : "text-[10px] md:text-xs self-end mb-1" // Anchors 'mm' to the bottom
      }
    `}
              >
                {item.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalInsights;
