import React from "react";
import BaseChart from "../charts/BaseChart";

const TEMP_LINES = [
  { dataKey: "temp", name: "Temperature", stroke: "#0f172a", strokeWidth: 3 },
];
const WIND_LINES = [
  { dataKey: "wind", name: "Wind Speed", stroke: "#3b82f6", strokeWidth: 2 },
];
const AIR_LINES = [
  { dataKey: "pm25", name: "PM2.5", stroke: "#ef4444" },
  { dataKey: "pm10", name: "PM10", stroke: "#f59e0b" },
];
const HUMIDITY_LINES = [
  { dataKey: "humidity", name: "Humidity", stroke: "#6366f1" },
  { dataKey: "visibility", name: "Visibility", stroke: "#10b981" },
];
const UV_LINES = [{ dataKey: "uv", name: "UV Index", stroke: "#f59e0b" }];
const PRECIP_LINES = [
  { dataKey: "precipProb", name: "Precipitation %", stroke: "#3b82f6" },
];

const WeatherCharts = ({ data, isToday }) => {
  const ChartCard = ({ title, children, span = "", delay = "0ms" }) => (
    <div
      style={{ animationDelay: delay }}
      className={`bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm flex flex-col h-[400px] 
      hover:shadow-md hover:border-slate-300 transition-all duration-500 group
      animate-in fade-in slide-in-from-bottom-4 fill-mode-both ${span}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 group-hover:text-slate-600 transition-colors">
          {title}
        </h3>
        {/* Subtle "Data Point" indicator for premium feel */}
        <div className="h-1.5 w-1.5 rounded-full bg-slate-100 group-hover:bg-blue-400 transition-colors" />
      </div>

      <div className="flex-1 min-h-0 w-full relative">
        {data && data.length > 0 ? (
          children
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-slate-300 italic">
              No telemetry available
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      <ChartCard title="Temperature Trend" span="lg:col-span-2" delay="100ms">
        <BaseChart data={data} lines={TEMP_LINES} />
      </ChartCard>

      <ChartCard title="Wind Dynamics" delay="200ms">
        <BaseChart data={data} lines={WIND_LINES} />
      </ChartCard>

      <ChartCard title="Air Quality Index" delay="300ms">
        <BaseChart data={data} lines={AIR_LINES} />
      </ChartCard>

      <ChartCard
        title="Atmospheric Moisture"
        span="lg:col-span-2"
        delay="400ms"
      >
        <BaseChart data={data} lines={HUMIDITY_LINES} />
      </ChartCard>

      {isToday && (
        <>
          <ChartCard title="UV Radiation" delay="500ms">
            <BaseChart data={data} lines={UV_LINES} />
          </ChartCard>
          <ChartCard title="Precipitation Probability" delay="600ms">
            <BaseChart data={data} lines={PRECIP_LINES} />
          </ChartCard>
        </>
      )}
    </div>
  );
};

export default WeatherCharts;
