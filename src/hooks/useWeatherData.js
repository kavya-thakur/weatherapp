import { useEffect, useState } from "react";
import {
  fetchWeather,
  fetchWeatherByDate,
  fetchAirQuality,
} from "../services/api";

export const useWeatherData = (coords, selectedDate) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use a string key for the coordinates so the object reference doesn't break the chart
  const coordKey = coords ? `${coords.lat},${coords.lon}` : null;

  useEffect(() => {
    if (!coordKey || !selectedDate) return;

    const today = new Date().toISOString().split("T")[0];
    const [lat, lon] = coordKey.split(",");

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const [weatherRes, airRes] = await Promise.all([
          selectedDate === today
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
    // Dependency is now a string, NOT an object. This stops the snap.
  }, [coordKey, selectedDate]);

  return { data, loading, error };
};
