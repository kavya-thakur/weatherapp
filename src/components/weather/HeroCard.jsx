import React, { useRef } from "react";
import dayjs from "dayjs";
import {
  Calendar,
  Wind,
  Droplets,
  Sun,
  Eye,
  CloudRain,
  Activity,
  Sunrise,
  Sunset,
} from "lucide-react";

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
  air,
  setUnit,
  unit,
  daily,
}) => {
  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    if (dateInputRef.current?.showPicker) {
      dateInputRef.current.showPicker();
    } else {
      dateInputRef.current?.focus();
    }
  };

  // YOUR LOGIC - UNCHANGED
  const metrics = [
    {
      label: "Humidity",
      val: `${humidity ?? 0}%`,
      icon: <Droplets className="w-3.5 h-3.5" />,
      show: true,
    },
    {
      label: "Wind",
      val: `${wind ?? 0} km/h`,
      icon: <Wind className="w-3.5 h-3.5" />,
      show: true,
    },
    {
      label: "UV Index",
      val: uv ?? "0",
      icon: <Sun className="w-3.5 h-3.5" />,
      show: isToday,
    },
    {
      label: "Precip %",
      val: `${precipProb ?? 0}%`,
      icon: <CloudRain className="w-3.5 h-3.5" />,
      show: isToday,
    },
    {
      label: "Visibility",
      val: `${visibility ?? 0} km`,
      icon: <Eye className="w-3.5 h-3.5" />,
      show: isToday,
    },
    {
      label: "PM2.5",
      val: pm25 ?? "--",
      icon: <Activity className="w-3.5 h-3.5" />,
      show: !isToday,
    },
    {
      label: "PM10",
      val: pm10 ?? "--",
      icon: <Activity className="w-3.5 h-3.5" />,
      show: !isToday,
    },
    {
      label: "CO",
      val: air?.hourly?.carbon_monoxide?.[0] ?? "--",
      icon: <Zap className="w-3.5 h-3.5" />,
      show: true,
    },
    {
      label: "NO2",
      val: air?.hourly?.nitrogen_dioxide?.[0] ?? "--",
      icon: <Zap className="w-3.5 h-3.5" />,
      show: true,
    },
    {
      label: "SO2",
      val: air?.hourly?.sulphur_dioxide?.[0] ?? "--",
      icon: <Zap className="w-3.5 h-3.5" />,
      show: true,
    },
    {
      label: "Sunrise",
      val: daily?.sunrise?.[0]
        ? dayjs(daily.sunrise[0]).format("hh:mm A")
        : "--",
      icon: <Sunrise className="w-3.5 h-3.5" />,
      show: true,
    },
    {
      label: "Sunset",
      val: daily?.sunset?.[0] ? dayjs(daily.sunset[0]).format("hh:mm A") : "--",
      icon: <Sunset className="w-3.5 h-3.5" />,
      show: true,
    },
  ].filter((m) => m.show);

  const displayTemp =
    temperature != null
      ? unit === "F"
        ? Math.round((temperature * 9) / 5 + 32)
        : temperature
      : "--";

  return (
    <div className="bg-white border border-slate-200/60 rounded-[3rem] p-8 md:p-12 shadow-sm flex flex-col justify-between min-h-[620px] relative overflow-hidden group font-sans">
      {/* 1. Subtle Background Decor */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-50/50 blur-[100px] rounded-full -z-10" />

      {/* 2. Main Visual Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left Side: Temp & Date */}
        <div className="space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${
              isToday
                ? "bg-emerald-50 text-emerald-600"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {isToday && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            )}
            {isToday ? "Live Now" : "Historical"}
          </div>

          <h1 className="text-9xl md:text-[12rem] font-semibold space-y-2 tracking-[-0.07em] text-slate-900 leading-[0.8] flex items-start">
            {displayTemp}
            <span className="text-slate-200 font-extralight text-5xl md:text-8xl -translate-y-2 md:-translate-y-6 ml-[0.1em]">
              °
            </span>
          </h1>

          <p className="text-2xl font-semibold text-slate-400 mt-4 tracking-tight pl-2">
            {dayjs(selectedDate).format("dddd, MMMM D")}
          </p>
        </div>

        {/* Right Side: Controls (Tucked into the corner) */}
        <div className="flex flex-col gap-4 w-full md:w-auto items-end">
          <div
            onClick={handleDateClick}
            className="group/input flex items-center gap-3 bg-slate-50/80 hover:bg-white border border-slate-100 pl-5  py-3.5 rounded-2xl cursor-pointer transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4 text-slate-400 group-hover/input:text-blue-500 transition-colors" />
            <input
              ref={dateInputRef}
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent font-bold text-xs text-slate-600 outline-none pointer-events-none appearance-none uppercase tracking-widest"
            />
          </div>

          <div className="flex p-1 bg-slate-50/80 border border-slate-100 rounded-xl">
            {["C", "F"].map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-5 py-1.5 text-[14px] font-black tracking-widest rounded-lg transition-all ${unit === u ? "bg-white shadow-sm text-slate-900" : "text-slate-400"}`}
              >
                °{u}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. The Balanced Metrics Grid (Tucked at the bottom) */}
      <div className="mt-12 pt-10 border-t border-slate-100/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-8">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-3 group/metric">
            <div className="flex items-center gap-2">
              <div className="text-slate-300 group-hover/metric:text-blue-500 transition-colors">
                {m.icon}
              </div>
              <span className="text-xs font-medium text-slate-400 capitalize ">
                {m.label}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-slate-700 tabular-nums tracking-tighter">
                {m.val}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple Icon fallback for gases
const Zap = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 L13 2 Z" />
  </svg>
);

export default HeroCard;
