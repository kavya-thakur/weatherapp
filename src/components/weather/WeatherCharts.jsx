import React from "react";
import BaseChart from "../charts/BaseChart";
import ChartCard from "../cards/ChartCard";

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
  {
    dataKey: "precipProb",
    name: "Precipitation %",
    stroke: "#3b82f6",
  },
];

const WeatherCharts = ({ data, isToday }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 auto-rows-fr">
      <ChartCard
        title="Temperature Trend"
        span="lg:col-span-2"
        delay="100ms"
        data={data}
      >
        <BaseChart data={data} lines={TEMP_LINES} />
      </ChartCard>

      <ChartCard title="Wind Dynamics" delay="200ms" data={data}>
        <BaseChart data={data} lines={WIND_LINES} />
      </ChartCard>

      <ChartCard title="Air Quality (PM)" delay="300ms" data={data}>
        <BaseChart data={data} lines={AIR_LINES} />
      </ChartCard>

      <ChartCard
        title="Atmospheric Moisture"
        span="lg:col-span-2"
        delay="400ms"
        data={data}
      >
        <BaseChart data={data} lines={HUMIDITY_LINES} />
      </ChartCard>

      {isToday && (
        <>
          <ChartCard title="UV Radiation" delay="500ms" data={data}>
            <BaseChart data={data} lines={UV_LINES} />
          </ChartCard>

          <ChartCard
            title="Precipitation Probability"
            delay="600ms"
            data={data}
          >
            <BaseChart data={data} lines={PRECIP_LINES} />
          </ChartCard>
        </>
      )}
    </div>
  );
};

export default WeatherCharts;
