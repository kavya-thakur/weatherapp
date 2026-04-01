import React from "react";
import BaseChart from "../components/charts/BaseChart";
import { useHistoricalWeather } from "../hooks/useHistoricalWeather";
import WeatherSkeleton from "../components/WeatherSkeleton";
import HistoricalHeader from "../components/weather/HistoricalHeader";
import HistoricalInsights from "../components/weather/HistoricalInsights";
import dayjs from "dayjs";
import { Sunrise, Sunset } from "lucide-react";

const TEMP_LINES = [
  { dataKey: "maxTemp", name: "Max", stroke: "#ef4444" },
  { dataKey: "minTemp", name: "Min", stroke: "#3b82f6" },
  { dataKey: "meanTemp", name: "Mean", stroke: "#6366f1" },
];

const PRECIP_LINES = [
  { dataKey: "precipitation", name: "Precipitation", stroke: "#10b981" },
];

const WIND_LINES = [{ dataKey: "wind", name: "Wind Speed", stroke: "#f59e0b" }];

const PM_LINES = [
  { dataKey: "pm10", name: "PM10", stroke: "#ef4444" },
  { dataKey: "pm25", name: "PM2.5", stroke: "#f59e0b" },
];

const Historical = ({ coords }) => {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    chartData,
    insights,
    loading,
    error,
  } = useHistoricalWeather(coords);

  if (!coords || loading || !chartData?.length) return <WeatherSkeleton />;
  if (error)
    return <div className="p-10 text-red-500 font-semibold">{error}</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-12 pb-20">
      <HistoricalHeader
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {insights && <HistoricalInsights insights={insights} />}

      <div className="w-full overflow-hidden">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6 ml-2">
          Solar Cycle
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
          {chartData.map((d) => (
            <div
              key={d.date}
              className="bg-white border border-slate-100 rounded-[2rem] p-6 min-w-[170px] shadow-sm hover:shadow-md transition-all duration-500 snap-start group"
            >
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">
                {d.date}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <Sunrise className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-sm font-bold tracking-tight tabular-nums text-slate-700">
                    {d.sunrise ? dayjs(d.sunrise).format("hh:mm A") : "--"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Sunset className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-sm font-bold tracking-tight tabular-nums text-slate-700">
                    {d.sunset ? dayjs(d.sunset).format("hh:mm A") : "--"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CHARTS--- */}
      {chartData.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          <ChartSection
            title="Temperature Variations"
            lines={TEMP_LINES}
            data={chartData}
          />
          <ChartSection
            title="Precipitation Depth"
            lines={PRECIP_LINES}
            data={chartData}
          />
          <ChartSection
            title="Wind Velocity"
            lines={WIND_LINES}
            data={chartData}
          />
          <ChartSection
            title="Air Quality Trends"
            lines={PM_LINES}
            data={chartData}
          />
        </div>
      ) : (
        <div className="py-24 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">
            No telemetry found for selected range
          </p>
        </div>
      )}
    </div>
  );
};

const ChartSection = ({ title, lines, data }) => (
  <div
    className="bg-white p-8 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col min-h-[520px] outline-none focus:outline-none focus:ring-0"
    tabIndex="-1"
  >
    <div className="flex justify-between items-center mb-10">
      <h3 className="text-[10px] md:text-xs font-black uppercase text-slate-300 tracking-[0.25em]">
        {title}
      </h3>
      <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
    </div>

    {/* Scrollable container to prevent chart distortion on high data points */}
    <div className="flex-grow w-full overflow-x-auto no-scrollbar">
      <div className="h-full" style={{ minWidth: `${data.length * 55}px` }}>
        <BaseChart data={data} lines={lines} />
      </div>
    </div>
  </div>
);

export default Historical;
