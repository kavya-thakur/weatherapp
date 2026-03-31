import React from "react";
import BaseChart from "../components/charts/BaseChart";
import { useHistoricalWeather } from "../hooks/useHistoricalWeather";
import WeatherSkeleton from "../components/WeatherSkeleton";
import HistoricalHeader from "../components/weather/HistoricalHeader";
import HistoricalInsights from "../components/weather/HistoricalInsights";

const TEMP_LINES = [
  { dataKey: "maxTemp", name: "Max", stroke: "#ef4444" },
  { dataKey: "minTemp", name: "Min", stroke: "#3b82f6" },
  { dataKey: "meanTemp", name: "Mean", stroke: "#6366f1" },
];

const PRECIP_LINES = [
  { dataKey: "precipitation", name: "Precipitation", stroke: "#10b981" },
];

const WIND_LINES = [{ dataKey: "wind", name: "Wind Speed", stroke: "#f59e0b" }];

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

  if (!coords) return <div className="p-20 text-center">Loading...</div>;
  if (loading) return <WeatherSkeleton />;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="space-y-12">
      <HistoricalHeader
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {insights && <HistoricalInsights insights={insights} />}

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
        </div>
      ) : (
        <div className="py-20 text-center">
          No telemetry found for selected range
        </div>
      )}
    </div>
  );
};

const ChartSection = ({ title, lines, data }) => (
  <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm h-[480px]">
    <h3 className="text-xs font-bold uppercase text-slate-400 mb-6">{title}</h3>

    <div className="h-[360px] w-full">
      <BaseChart data={data} lines={lines} />
    </div>
  </div>
);

export default Historical;
