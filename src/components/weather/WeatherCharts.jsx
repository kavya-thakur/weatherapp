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
  const hasData = data && data.length > 0;

  const ChartCard = ({ title, children, span = "", delay = "0ms" }) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    return (
      <div
        style={{ animationDelay: delay }}
        className={`bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm flex flex-col h-[380px] md:h-[450px] 
        hover:shadow-md hover:border-slate-300 transition-all duration-500 group 
        animate-in fade-in slide-in-from-bottom-4 fill-mode-both outline-none focus:ring-0 ${span}`}
        tabIndex="-1"
      >
        <div className="flex justify-between items-center mb-6 shrink-0">
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300 group-hover:text-slate-500 transition-colors">
            {title}
          </h3>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-100 group-hover:bg-blue-400 transition-colors" />
        </div>

        <div className="flex-1 min-h-0 w-full overflow-x-auto no-scrollbar outline-none">
          {hasData ? (
            <div
              className="h-full w-full transition-all duration-300"
              style={{
                minWidth: isMobile
                  ? `${Math.max(data.length * 60, 600)}px`
                  : "100%",
              }}
            >
              {children}
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-[10px] font-bold text-slate-200 uppercase tracking-widest italic">
                Telemetry Offline
              </span>
            </div>
          )}
        </div>

        {isMobile && hasData && (
          <div className="mt-4 flex justify-center shrink-0">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-200">
              Scroll to explore →
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 auto-rows-fr">
      <ChartCard title="Temperature Trend" span="lg:col-span-2" delay="100ms">
        <BaseChart data={data} lines={TEMP_LINES} />
      </ChartCard>

      <ChartCard title="Wind Dynamics" delay="200ms">
        <BaseChart data={data} lines={WIND_LINES} />
      </ChartCard>

      <ChartCard title="Air Quality (PM)" delay="300ms">
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
