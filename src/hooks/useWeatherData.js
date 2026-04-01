import { useEffect, useState } from "react";
import dayjs from "dayjs";

import {
  fetchWeather,
  fetchWeatherByDate,
  fetchAirQuality,
} from "../services/api";

export const useWeatherData = (coords, selectedDate) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const coordKey = coords ? `${coords.lat},${coords.lon}` : null;
  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    if (!coordKey || !selectedDate) return;

    const [lat, lon] = coordKey.split(",");

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const isToday = dayjs(selectedDate).isSame(dayjs(), "day");
        const isFuture = dayjs(selectedDate).isAfter(dayjs(), "day");

        if (isFuture) {
          setError("Future dates are not supported");
          setData(null);
          return;
        }

        const [weatherRes, airRes] = await Promise.all([
          isToday
            ? fetchWeather(lat, lon)
            : fetchWeatherByDate(lat, lon, selectedDate),
          fetchAirQuality(lat, lon),
        ]);

        setData({ ...weatherRes, air: airRes });
      } catch (err) {
        setError("Failed to load weather data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [coordKey, selectedDate]);

  return { data, loading, error };
};
