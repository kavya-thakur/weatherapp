const WeatherMetrics = ({
  humidity,
  wind,
  visibility,
  pm25,
  pm10,
  uv,
  precipProb,
  isToday,
}) => {
  const metrics = [
    { label: "Humidity", val: `${humidity}%` },
    { label: "Wind", val: `${wind} km/h` },

    ...(isToday
      ? [
          { label: "Visibility", val: `${visibility} km` },
          { label: "UV Index", val: uv ?? "--" },
          { label: "Precip %", val: `${precipProb ?? "--"}%` },
        ]
      : []),

    { label: "PM2.5", val: pm25 },
    { label: "PM10", val: pm10 },
  ];

  return (
    <div className="flex lg:grid lg:grid-cols-5 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className="p-6 bg-slate-50 rounded-3xl">
          <p className="text-xs text-slate-400">{m.label}</p>
          <p className="text-xl font-bold">{m.val}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherMetrics;

// import React from "react";
// import { Droplets, Wind, Eye, Sun, CloudRain, Activity } from "lucide-react";

// const WeatherMetrics = ({
//   humidity,
//   wind,
//   visibility,
//   pm25,
//   pm10,
//   uv,
//   precipProb,
//   isToday,
// }) => {
//   // Define metrics with icons for a "Living" UI
//   const metrics = [
//     {
//       label: "Humidity",
//       val: `${humidity ?? 0}%`,
//       icon: <Droplets className="w-4 h-4 text-blue-500" />,
//     },
//     {
//       label: "Wind",
//       val: `${wind ?? 0} km/h`,
//       icon: <Wind className="w-4 h-4 text-slate-400" />,
//     },
//     {
//       label: "PM2.5",
//       val: pm25 ?? "--",
//       icon: <Activity className="w-4 h-4 text-rose-500" />,
//     },

//     ...(isToday
//       ? [
//           {
//             label: "Visibility",
//             val: `${visibility ?? 0} km`,
//             icon: <Eye className="w-4 h-4 text-indigo-400" />,
//           },
//           {
//             label: "UV Index",
//             val: uv ?? "0",
//             icon: <Sun className="w-4 h-4 text-amber-500" />,
//           },
//           {
//             label: "Precip %",
//             val: `${precipProb ?? 0}%`,
//             icon: <CloudRain className="w-4 h-4 text-sky-400" />,
//           },
//         ]
//       : [
//           {
//             label: "PM10",
//             val: pm10 ?? "--",
//             icon: <Activity className="w-4 h-4 text-orange-400" />,
//           },
//         ]),
//   ];

//   return (
//     <div className="w-full overflow-x-auto no-scrollbar pb-2">
//       <div className="flex lg:grid lg:grid-cols-6 gap-4 min-w-max lg:min-w-full">
//         {metrics.map((m, i) => (
//           <div
//             key={m.label}
//             className="group relative overflow-hidden p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 min-w-[160px] flex-1"
//           >
//             {/* Subtle Hover Glow */}
//             <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-slate-50 rounded-full group-hover:scale-[3] transition-transform duration-700 opacity-50" />

//             <div className="relative z-10 flex flex-col gap-4">
//               <div className="flex items-center justify-between">
//                 <span className="p-2 bg-slate-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-colors">
//                   {m.icon}
//                 </span>
//                 <div className="h-1 w-1 rounded-full bg-slate-200" />
//               </div>

//               <div>
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">
//                   {m.label}
//                 </p>
//                 <p className="text-xl font-bold text-slate-900 tracking-tight">
//                   {m.val}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
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

// export default WeatherMetrics;
