import { Activity, Droplets, Thermometer } from "lucide-react";

const HistoricalInsights = ({ insights }) => {
  const items = [
    {
      label: "Avg Temp",
      val: `${insights.avgTemp}°`,
      icon: <Thermometer className="text-slate-400" />,
    },
    {
      label: "Peak Temp",
      val: `${insights.maxTemp}°`,
      icon: <Activity className="text-rose-500" />,
    },
    {
      label: "Low Temp",
      val: `${insights.minTemp}°`,
      icon: <Activity className="text-blue-500" />,
    },
    {
      label: "Total Rain",
      val: `${insights.totalRain}mm`,
      icon: <Droplets className="text-emerald-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm group hover:border-slate-300 transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-slate-50 rounded-xl">{item.icon}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-100 group-hover:bg-blue-400 transition-colors" />
          </div>

          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">
            {item.label}
          </p>

          <p className="text-3xl font-bold text-slate-800 tabular-nums">
            {item.val}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HistoricalInsights;
