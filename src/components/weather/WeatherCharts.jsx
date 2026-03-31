// import BaseChart from "../charts/BaseChart";

// const WeatherCharts = ({ data, isToday }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       <BaseChart data={data} lines={[{ dataKey: "temp" }]} />
//       <BaseChart data={data} lines={[{ dataKey: "wind" }]} />
//       <BaseChart
//         data={data}
//         lines={[{ dataKey: "pm25" }, { dataKey: "pm10" }]}
//       />
//       <BaseChart
//         data={data}
//         lines={[{ dataKey: "humidity" }, { dataKey: "visibility" }]}
//       />

//       {isToday && (
//         <>
//           <BaseChart data={data} lines={[{ dataKey: "uv" }]} />
//           <BaseChart data={data} lines={[{ dataKey: "precipProb" }]} />
//         </>
//       )}
//     </div>
//   );
// };

// export default WeatherCharts;

import React, { useMemo } from "react";
import BaseChart from "../charts/BaseChart";

// ✅ CRITICAL: Defined outside the component so they are STATIC.
// This is the only way to stop the "snapping ball" bug for good.
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
  // We wrap the charts in a stylized container to maintain visual hierarchy
  const ChartCard = ({ title, children, span = "" }) => (
    <div
      className={`bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm flex flex-col h-[380px] ${span}`}
    >
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
        {title}
      </h3>
      <div className="flex-1 min-h-0 w-full">{children}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ChartCard title="Temperature Trend" span="lg:col-span-2">
        <BaseChart data={data} lines={TEMP_LINES} />
      </ChartCard>

      <ChartCard title="Wind Dynamics">
        <BaseChart data={data} lines={WIND_LINES} />
      </ChartCard>

      <ChartCard title="Air Quality Index">
        <BaseChart data={data} lines={AIR_LINES} />
      </ChartCard>

      <ChartCard title="Atmospheric Moisture" span="lg:col-span-2">
        <BaseChart data={data} lines={HUMIDITY_LINES} />
      </ChartCard>

      {isToday && (
        <>
          <ChartCard title="UV Radiation">
            <BaseChart data={data} lines={UV_LINES} />
          </ChartCard>
          <ChartCard title="Precipitation Probability">
            <BaseChart data={data} lines={PRECIP_LINES} />
          </ChartCard>
        </>
      )}
    </div>
  );
};

export default WeatherCharts;
