import React from "react";
import dayjs from "dayjs";
import { Calendar } from "lucide-react"; // Highly recommended for UX

const HeroCard = ({
  temperature,
  selectedDate,
  setSelectedDate,
  humidity,
  wind,
  visibility,
  pm25,
  pm10,
  uv,
  precipProb,
  isToday,
}) => {
  // UX IMPROVEMENT: Stable Grid Logic
  // We define a fixed set of slots so the layout never "jumps"
  const metrics = [
    { label: "Humidity", val: `${humidity ?? 0}%`, show: true },
    { label: "Wind", val: `${wind ?? 0} km/h`, show: true },
    { label: "UV Index", val: uv ?? "0", show: isToday },
    { label: "Precip %", val: `${precipProb ?? 0}%`, show: isToday },
    { label: "Visibility", val: `${visibility ?? 0} km`, show: isToday },
    { label: "PM2.5", val: pm25 ?? "--", show: !isToday },
    { label: "PM10", val: pm10 ?? "--", show: !isToday },
  ].filter((m) => m.show);

  return (
    <div className="bg-white border border-slate-200/60 rounded-[3rem] p-8 md:p-14 shadow-sm flex flex-col justify-between min-h-[520px] relative overflow-hidden group">
      {/* 1. Improved Background Animation */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50/40 blur-[120px] rounded-full -z-10 group-hover:bg-blue-100/60 group-hover:scale-110 transition-all duration-1000" />

      <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            {/* UX: Added a "Live" or "Archive" tag */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isToday ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}
            >
              {isToday && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              )}
              {isToday ? "Live Telemetry" : "Historical Archive"}
            </div>

            <h1 className="text-9xl md:text-[12rem] font-bold tracking-[-0.07em] text-slate-900 leading-[0.8] flex items-start animate-in fade-in slide-in-from-left-4 duration-1000">
              {temperature ?? "--"}
              <span className="text-slate-200 font-extralight text-6xl md:text-8xl mt-4 md:mt-8 select-none">
                °
              </span>
            </h1>

            <p className="text-2xl font-medium text-slate-400/80 tracking-tight italic pl-2">
              {dayjs(selectedDate).format("dddd, MMMM D")}
            </p>
          </div>
        </div>

        {/* 2. Enhanced Date Picker UX */}
        <div className="w-full md:w-auto">
          <div className="relative group/input flex items-center">
            <Calendar className="absolute left-6 w-4 h-4 text-slate-400 z-20 pointer-events-none group-hover/input:text-blue-500 transition-colors" />
            <input
              type="date"
              value={selectedDate}
              max={dayjs().format("YYYY-MM-DD")}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="relative w-full md:w-auto bg-slate-50/50 hover:bg-white border border-slate-100 pl-14 pr-8 py-5 rounded-2xl font-bold text-sm text-slate-700 outline-none shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer appearance-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Stable Metrics Grid */}
      <div className="mt-16 pt-10 border-t border-slate-100/80">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-2 group/metric">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] group-hover/metric:text-blue-500 transition-colors">
                {m.label}
              </span>
              <span className="text-2xl font-bold text-slate-700 tabular-nums tracking-tight">
                {m.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
