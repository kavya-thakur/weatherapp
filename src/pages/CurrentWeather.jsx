// import { useLocation } from "../hooks/useLocation";
// import { useWeatherData } from "../hooks/useWeatherData";
// import BaseChart from "../components/charts/BaseChart";
// import { transformHourlyData } from "../utils/transform";
// import { useMemo, useState } from "react";
// import dayjs from "dayjs";

// const CurrentWeather = () => {
//   const {
//     coords,
//     loading: locationLoading,
//     error: locationError,
//   } = useLocation();

//   const [selectedDate, setSelectedDate] = useState(
//     dayjs().format("YYYY-MM-DD"),
//   );
//   const isToday = selectedDate === dayjs().format("YYYY-MM-DD");

//   const { data, loading, error } = useWeatherData(coords, selectedDate);

//   const hourlyData = useMemo(() => {
//     if (!data) return [];
//     return transformHourlyData(data);
//   }, [data]);

//   const filteredHourlyData = useMemo(() => {
//     if (!hourlyData.length) return [];

//     if (!isToday) return hourlyData;

//     const today = new Date();

//     return hourlyData.filter((_, i) => {
//       const time = new Date(data.hourly.time[i]);

//       return (
//         time.getFullYear() === today.getFullYear() &&
//         time.getMonth() === today.getMonth() &&
//         time.getDate() === today.getDate()
//       );
//     });
//   }, [hourlyData, isToday, data]);
//   if (locationLoading || loading) return <WeatherSkeleton />;
//   if (locationError || error)
//     return (
//       <div className="p-10 text-center text-red-500">
//         {locationError || error}
//       </div>
//     );
//   if (!coords || !data) return null;

//   // --- LOGIC PRESERVED EXACTLY FROM YOUR ORIGINAL ---
//   const temperature =
//     data.current?.temperature_2m ?? data.daily.temperature_2m_max[0];

//   const humidity =
//     data.current?.relative_humidity_2m ??
//     data.hourly?.relative_humidity_2m?.[0] ??
//     "--";

//   const wind =
//     data.current?.wind_speed_10m ?? data.hourly?.wind_speed_10m?.[0] ?? "--";

//   console.log("VISIBILITY ARRAY:", data.hourly?.visibility);
//   const visibility =
//     filteredHourlyData
//       ?.map((d) => d.visibility)
//       .find((v) => v !== null && v !== undefined) ?? "--";

//   const pm25 = data.air?.hourly?.pm2_5?.[0] ?? "--";
//   const pm10 = data.air?.hourly?.pm10?.[0] ?? "--";
//   const uv = isToday
//     ? data.hourly?.uv_index?.find((v) => v !== null && v !== undefined && v > 0)
//     : null;

//   const precipProb = isToday
//     ? data.hourly?.precipitation_probability?.find(
//         (v) => v !== null && v !== undefined && v > 0,
//       )
//     : null;

//   return (
//     <div className="w-full max-w-[1440px] mx-auto space-y-6 lg:space-y-10 antialiased">
//       {/* --- GRID 1: HERO & CONTEXT --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Main Temperature Card */}
//         <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col justify-between min-h-[420px]">
//           <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
//             <div className="space-y-4">
//               <div className="inline-flex items-center px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
//                 Current Temperature
//               </div>
//               <h1 className="text-7xl md:text-9xl font-semibold tracking-tighter text-slate-900 leading-none">
//                 {temperature}
//                 <span className="text-slate-200">°C</span>
//               </h1>
//               <p className="text-lg font-medium text-slate-400">
//                 {dayjs(selectedDate).format("dddd, MMM D")}
//               </p>
//             </div>

//             <input
//               type="date"
//               value={selectedDate}
//               max={dayjs().format("YYYY-MM-DD")}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="w-full sm:w-auto bg-slate-50 border-none px-6 py-4 rounded-2xl font-bold text-sm focus:ring-4 focus:ring-slate-100 outline-none transition-all cursor-pointer"
//             />
//           </div>

//           {/* Metrics Tray: Horizontal scroll on mobile, grid on desktop */}
//           <div className="mt-12 -mx-8 px-8 lg:mx-0 lg:px-0 overflow-x-auto no-scrollbar">
//             <div className="flex lg:grid lg:grid-cols-5 gap-4 min-w-max lg:min-w-full">
//               {[
//                 { label: "Humidity", val: `${humidity}%` },
//                 { label: "Wind", val: `${wind} km/h` },

//                 ...(isToday
//                   ? [
//                       { label: "Visibility", val: `${visibility} km` },
//                       { label: "UV Index", val: uv },
//                       { label: "Precip %", val: `${precipProb}%` },
//                     ]
//                   : []),
//                 { label: "PM2.5", val: pm25 },
//                 { label: "PM10", val: pm10 },
//               ].map((m, i) => (
//                 <div
//                   key={i}
//                   className="bg-slate-50/50 border border-slate-100 p-6 rounded-3xl flex-1 min-w-[140px]"
//                 >
//                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
//                     {m.label}
//                   </p>
//                   <p className="text-xl font-bold text-slate-900">{m.val}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {!isToday && (
//             <p className="text-xs text-slate-400 mt-2">
//               visibility available for current date only
//             </p>
//           )}
//         </div>

//         {/* Side Info Card */}
//         <div className="lg:col-span-4 bg-slate-900 text-white rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden">
//           <div className="z-10 space-y-4">
//             <h3 className="text-2xl font-medium tracking-tight leading-tight">
//               Environmental <br />
//               Conditions
//             </h3>
//             <p className="text-slate-400 text-sm leading-relaxed">
//               Detailed air quality and visibility metrics for your current
//               location based on real-time sensor data.
//             </p>
//           </div>
//           <div className="z-10 pt-8 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono tracking-widest text-slate-500 uppercase">
//             <span>System Active</span>
//             <span>Ref: 2026-X</span>
//           </div>
//           <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 blur-[100px]" />
//         </div>
//       </div>

//       {/* --- GRID 2: CHARTS --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Main Trend: Spans 2 cols on Desktop */}
//         <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm">
//           <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">
//             Hourly Trends
//           </h3>
//           <div className="h-72 w-full overflow-hidden">
//             <BaseChart
//               title="Temperature (°C)"
//               data={filteredHourlyData}
//               lines={[
//                 {
//                   dataKey: "temp",
//                   name: "Temperature",
//                   stroke: "#000",
//                   strokeWidth: 3,
//                 },
//               ]}
//             />
//           </div>
//         </div>

//         <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm">
//           <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">
//             Wind Speed
//           </h3>
//           <div className="h-72 w-full overflow-hidden">
//             <BaseChart
//               data={filteredHourlyData}
//               lines={[{ dataKey: "wind", stroke: "#3b82f6", strokeWidth: 2 }]}
//             />
//           </div>
//         </div>

//         <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm">
//           <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">
//             Air Quality
//           </h3>
//           <div className="h-60 w-full overflow-hidden">
//             <BaseChart
//               data={filteredHourlyData}
//               lines={[
//                 { dataKey: "pm25", name: "PM2.5", stroke: "#ef4444" },
//                 { dataKey: "pm10", name: "PM10", stroke: "#f59e0b" },
//               ]}
//             />
//           </div>
//         </div>

//         <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm">
//           <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">
//             Humidity & Visibility
//           </h3>
//           <div className="h-60 w-full overflow-hidden">
//             <BaseChart
//               data={filteredHourlyData}
//               lines={[
//                 { dataKey: "humidity", stroke: "#6366f1" },
//                 { dataKey: "visibility", stroke: "#10b981" },
//               ]}
//             />
//           </div>
//         </div>
//         <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm">
//           <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">
//             UV INDEX
//           </h3>
//           <div className="h-60 w-full overflow-hidden">
//             <BaseChart
//               data={filteredHourlyData}
//               lines={[{ dataKey: "uv", name: "UV Index", stroke: "#f97316" }]}
//             />
//           </div>
//         </div>
//         <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm">
//           <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">
//             PRECIPITAION
//           </h3>
//           <div className="h-60 w-full overflow-hidden">
//             <BaseChart
//               data={filteredHourlyData}
//               lines={[
//                 {
//                   dataKey: "precipProb",
//                   name: "Precip %",
//                   stroke: "#06b6d4",
//                 },
//               ]}
//             />
//           </div>
//         </div>
//       </div>

//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `,
//         }}
//       />
//     </div>
//   );
// };

// const WeatherSkeleton = () => (
//   <div className="w-full max-w-[1440px] mx-auto animate-pulse space-y-6">
//     <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//       <div className="lg:col-span-8 h-[420px] bg-slate-200 rounded-[2.5rem]" />
//       <div className="lg:col-span-4 h-[420px] bg-slate-100 rounded-[2.5rem]" />
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <div className="h-80 bg-slate-50 rounded-[2.5rem] md:col-span-2" />
//       <div className="h-80 bg-slate-50 rounded-[2.5rem]" />
//     </div>
//   </div>
// );

// export default CurrentWeather;

import { useState } from "react";
import dayjs from "dayjs";
import { useLocation } from "../hooks/useLocation";
import { useWeatherData } from "../hooks/useWeatherData";
import { useCurrentWeatherLogic } from "../hooks/useCurrentWeatherLogic";

import HeroCard from "../components/weather/HeroCard";
import WeatherMetrics from "../components/weather/WeatherMetrics";
import WeatherCharts from "../components/weather/WeatherCharts";

const CurrentWeather = () => {
  const { coords, loading, error } = useLocation();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );

  const { data, loading: weatherLoading } = useWeatherData(
    coords,
    selectedDate,
  );

  const logic = useCurrentWeatherLogic(data, selectedDate);

  if (loading || weatherLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return null;

  return (
    <div className="space-y-8">
      <HeroCard
        temperature={logic.temperature}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <WeatherMetrics {...logic} />

      <WeatherCharts data={logic.filteredHourlyData} isToday={logic.isToday} />
    </div>
  );
};

export default CurrentWeather;
