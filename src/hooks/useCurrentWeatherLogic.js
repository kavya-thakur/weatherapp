import { useMemo } from "react";
import dayjs from "dayjs";
import { transformHourlyData } from "../utils/transform";

export const useCurrentWeatherLogic = (data, selectedDate) => {
  const isToday = selectedDate === dayjs().format("YYYY-MM-DD");

  const hourlyData = useMemo(() => {
    if (!data) return [];
    return transformHourlyData(data);
  }, [data]);

  const filteredHourlyData = useMemo(() => {
    if (!hourlyData.length) return [];

    if (!isToday) return hourlyData;

    const today = new Date();

    return hourlyData.filter((_, i) => {
      const time = new Date(data.hourly.time[i]);

      return (
        time.getFullYear() === today.getFullYear() &&
        time.getMonth() === today.getMonth() &&
        time.getDate() === today.getDate()
      );
    });
  }, [hourlyData, isToday, data]);

  const temperature =
    data?.current?.temperature_2m ?? data?.daily?.temperature_2m_max?.[0];

  const humidity =
    data?.current?.relative_humidity_2m ??
    data?.hourly?.relative_humidity_2m?.[0] ??
    "--";

  const wind =
    data?.current?.wind_speed_10m ?? data?.hourly?.wind_speed_10m?.[0] ?? "--";

  const visibility =
    filteredHourlyData
      ?.map((d) => d.visibility)
      .find((v) => v !== null && v !== undefined) ?? "--";

  const pm25 = data?.air?.hourly?.pm2_5?.[0] ?? "--";
  const pm10 = data?.air?.hourly?.pm10?.[0] ?? "--";

  const uv = isToday ? data?.hourly?.uv_index?.find((v) => v > 0) : null;

  const precipProb = isToday
    ? data?.hourly?.precipitation_probability?.find((v) => v > 0)
    : null;

  return {
    isToday,
    temperature,
    humidity,
    wind,
    visibility,
    pm25,
    pm10,
    uv,
    precipProb,
    filteredHourlyData,
  };
};
