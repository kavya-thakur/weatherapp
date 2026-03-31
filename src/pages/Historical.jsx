// import { useState, useEffect, useMemo } from "react";
// import dayjs from "dayjs";
// import BaseChart from "../components/charts/BaseChart";
// import { fetchWeatherRange } from "../services/api";

// // ✅ CRITICAL: Move these OUTSIDE the component.
// // If they stay inside, the "ball" will ALWAYS snap back to 0.
// const TEMP_CHART_CONFIG = [
//   { dataKey: "maxTemp", name: "Max Temp", stroke: "#ef4444" },
//   { dataKey: "minTemp", name: "Min Temp", stroke: "#3b82f6" },
// ];
// const PRECIP_CHART_CONFIG = [
//   { dataKey: "precipitation", name: "Precipitation", stroke: "#10b981" },
// ];
// const WIND_CHART_CONFIG = [
//   { dataKey: "wind", name: "Wind Speed", stroke: "#f59e0b" },
// ];

// const Historical = ({ coords }) => {
//   const [startDate, setStartDate] = useState(
//     dayjs().subtract(10, "day").format("YYYY-MM-DD"),
//   );
//   const [endDate, setEndDate] = useState(
//     dayjs().subtract(1, "day").format("YYYY-MM-DD"),
//   );
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Memoize coords to prevent the effect from firing on every sub-pixel movement
//   const memoCoords = useMemo(
//     () => ({ lat: coords?.lat, lon: coords?.lon }),
//     [coords?.lat, coords?.lon],
//   );

//   useEffect(() => {
//     if (!memoCoords.lat || !memoCoords.lon) return;

//     if (dayjs(endDate).isAfter(dayjs(startDate).add(2, "year"))) {
//       setError("Maximum range is 2 years");
//       setData(null);
//       return;
//     }

//     const load = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const res = await fetchWeatherRange(
//           memoCoords.lat,
//           memoCoords.lon,
//           startDate,
//           endDate,
//         );
//         setData(res);
//       } catch (err) {
//         setError("Failed to load historical data");
//         setData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [memoCoords.lat, memoCoords.lon, startDate, endDate]);

//   const chartData = useMemo(() => {
//     if (!data?.daily?.time) return [];
//     return data.daily.time.map((date, i) => ({
//       date: date.slice(5),
//       maxTemp: data.daily.temperature_2m_max?.[i] ?? 0,
//       minTemp: data.daily.temperature_2m_min?.[i] ?? 0,
//       precipitation: data.daily.precipitation_sum?.[i] ?? 0,
//       wind: data.daily.wind_speed_10m_max?.[i] ?? 0,
//     }));
//   }, [data]);

//   if (!coords)
//     return <p className="text-sm text-gray-500">Getting location...</p>;
//   if (loading)
//     return <p className="text-sm text-gray-500">Loading historical data...</p>;
//   if (error) return <p className="text-sm text-red-500">{error}</p>;

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h2 className="text-xl font-semibold tracking-tight">
//             Historical Trends
//           </h2>
//           <p className="text-sm text-gray-500">
//             Analyze weather patterns over time
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <input
//             type="date"
//             value={startDate}
//             max={endDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="border border-gray-300 px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-400"
//           />
//           <input
//             type="date"
//             value={endDate}
//             min={startDate}
//             max={dayjs().subtract(1, "day").format("YYYY-MM-DD")}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="border border-gray-300 px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-400"
//           />
//         </div>
//       </div>

//       {chartData.length > 0 ? (
//         <div className="grid grid-cols-1 gap-10">
//           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm h-[400px]">
//             <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
//               Temperature Trends (°C)
//             </h3>
//             <BaseChart data={chartData} lines={TEMP_CHART_CONFIG} />
//           </div>

//           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm h-[400px]">
//             <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
//               Precipitation (mm)
//             </h3>
//             <BaseChart data={chartData} lines={PRECIP_CHART_CONFIG} />
//           </div>

//           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm h-[400px]">
//             <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
//               Wind Speed (km/h)
//             </h3>
//             <BaseChart data={chartData} lines={WIND_CHART_CONFIG} />
//           </div>
//         </div>
//       ) : (
//         <p className="text-sm text-gray-500">
//           No data available for selected range
//         </p>
//       )}
//     </div>
//   );
// };

// export default Historical;

import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import BaseChart from "../components/charts/BaseChart";
import { fetchWeatherRange } from "../services/api";

// Chart configs
const TEMP_CHART_CONFIG = [
  { dataKey: "maxTemp", name: "Max Temp", stroke: "#ef4444" },
  { dataKey: "minTemp", name: "Min Temp", stroke: "#3b82f6" },
];

const PRECIP_CHART_CONFIG = [
  { dataKey: "precipitation", name: "Precipitation", stroke: "#10b981" },
];

const WIND_CHART_CONFIG = [
  { dataKey: "wind", name: "Wind Speed", stroke: "#f59e0b" },
];

const Historical = ({ coords }) => {
  const [startDate, setStartDate] = useState(
    dayjs().subtract(10, "day").format("YYYY-MM-DD"),
  );
  const [endDate, setEndDate] = useState(
    dayjs().subtract(1, "day").format("YYYY-MM-DD"),
  );

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const memoCoords = useMemo(
    () => ({ lat: coords?.lat, lon: coords?.lon }),
    [coords?.lat, coords?.lon],
  );

  useEffect(() => {
    if (!memoCoords.lat || !memoCoords.lon) return;

    if (dayjs(endDate).isAfter(dayjs(startDate).add(2, "year"))) {
      setError("Maximum range is 2 years");
      setData(null);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchWeatherRange(
          memoCoords.lat,
          memoCoords.lon,
          startDate,
          endDate,
        );

        setData(res);
      } catch (err) {
        setError("Failed to load historical data");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [memoCoords.lat, memoCoords.lon, startDate, endDate]);

  const chartData = useMemo(() => {
    if (!data?.daily?.time) return [];

    return data.daily.time.map((date, i) => ({
      date: date.slice(5),
      maxTemp: data.daily.temperature_2m_max?.[i] ?? 0,
      minTemp: data.daily.temperature_2m_min?.[i] ?? 0,
      precipitation: data.daily.precipitation_sum?.[i] ?? 0,
      wind: data.daily.wind_speed_10m_max?.[i] ?? 0,
    }));
  }, [data]);

  // ✅ NEW: Insights (THIS FIXES UX CONFUSION)
  const insights = useMemo(() => {
    if (!chartData.length) return null;

    const avgTemp =
      chartData.reduce((sum, d) => sum + d.maxTemp, 0) / chartData.length;

    const maxTemp = Math.max(...chartData.map((d) => d.maxTemp));
    const minTemp = Math.min(...chartData.map((d) => d.minTemp));

    const totalRain = chartData.reduce((sum, d) => sum + d.precipitation, 0);

    return {
      avgTemp: avgTemp.toFixed(1),
      maxTemp,
      minTemp,
      totalRain: totalRain.toFixed(1),
    };
  }, [chartData]);

  if (!coords)
    return <p className="text-sm text-gray-500">Getting location...</p>;

  if (loading)
    return <p className="text-sm text-gray-500">Loading historical data...</p>;

  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Historical Trends
          </h2>
          <p className="text-sm text-gray-500">
            Understand temperature, rainfall and wind trends over selected dates
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-400"
          />
          <input
            type="date"
            value={endDate}
            min={startDate}
            max={dayjs().subtract(1, "day").format("YYYY-MM-DD")}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      {/* ✅ INSIGHTS (BIG UX WIN) */}
      {insights && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-400 uppercase">Avg Temp</p>
            <p className="text-lg font-semibold">{insights.avgTemp}°C</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-400 uppercase">Max Temp</p>
            <p className="text-lg font-semibold">{insights.maxTemp}°C</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-400 uppercase">Min Temp</p>
            <p className="text-lg font-semibold">{insights.minTemp}°C</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-400 uppercase">Total Rain</p>
            <p className="text-lg font-semibold">{insights.totalRain} mm</p>
          </div>
        </div>
      )}

      {/* Charts */}
      {chartData.length > 0 ? (
        <div className="grid grid-cols-1 gap-10">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm h-[400px]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
              Temperature Trends (°C)
            </h3>
            <BaseChart data={chartData} lines={TEMP_CHART_CONFIG} />
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm h-[400px]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
              Precipitation (mm)
            </h3>
            <BaseChart data={chartData} lines={PRECIP_CHART_CONFIG} />
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm h-[400px]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
              Wind Speed (km/h)
            </h3>
            <BaseChart data={chartData} lines={WIND_CHART_CONFIG} />
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          No data available for selected range
        </p>
      )}
    </div>
  );
};

export default Historical;
