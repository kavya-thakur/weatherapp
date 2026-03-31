import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { fetchWeatherRange } from "../services/api";

export const useHistoricalWeather = (coords) => {
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
      } catch {
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

    return data.daily.time.map((date, i) => {
      const max = data.daily.temperature_2m_max?.[i] ?? 0;
      const min = data.daily.temperature_2m_min?.[i] ?? 0;

      return {
        date: date.slice(5),
        maxTemp: max,
        minTemp: min,
        meanTemp: (max + min) / 2,
        precipitation: data.daily.precipitation_sum?.[i] ?? 0,
        wind: data.daily.wind_speed_10m_max?.[i] ?? 0,
      };
    });
  }, [data]);

  const insights = useMemo(() => {
    if (!chartData.length) return null;

    return {
      avgTemp: (
        chartData.reduce((s, d) => s + d.meanTemp, 0) / chartData.length
      ).toFixed(1),
      maxTemp: Math.max(...chartData.map((d) => d.maxTemp)),
      minTemp: Math.min(...chartData.map((d) => d.minTemp)),
      totalRain: chartData.reduce((s, d) => s + d.precipitation, 0).toFixed(1),
    };
  }, [chartData]);

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    chartData,
    insights,
    loading,
    error,
  };
};
