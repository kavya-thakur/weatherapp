import { useState } from "react";
import dayjs from "dayjs";
import { useLocation } from "../hooks/useLocation";
import { useWeatherData } from "../hooks/useWeatherData";
import { useCurrentWeatherLogic } from "../hooks/useCurrentWeatherLogic";

import HeroCard from "../components/weather/HeroCard";
import WeatherCharts from "../components/weather/WeatherCharts";
import WeatherSkeleton from "../components/WeatherSkeleton";

const CurrentWeather = () => {
  const { coords, loading, error } = useLocation();
  const [unit, setUnit] = useState("C");
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );
  const {
    data,
    loading: weatherLoading,
    error: weatherError,
  } = useWeatherData(coords, selectedDate);
  const logic = useCurrentWeatherLogic(data, selectedDate);

  if (loading || weatherLoading) return <WeatherSkeleton />;

  if (error || weatherError)
    return (
      <div className="p-20 text-center text-red-500 font-medium bg-red-50/50 rounded-[3rem] border border-red-100 m-4 space-y-4">
        <p>{error || weatherError}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold"
        >
          Retry
        </button>
      </div>
    );

  if (!data) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-1000 ease-out">
      <HeroCard
        {...logic}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        air={data.air}
        unit={unit}
        setUnit={setUnit}
        daily={data.daily}
      />

      <div className="pt-4">
        <div className="flex items-center gap-4 mb-8 px-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">
            Atmospheric Analytics
          </h2>
          <div className="h-[1px] w-full bg-slate-100" />
        </div>

        <WeatherCharts
          data={logic.filteredHourlyData}
          isToday={logic.isToday}
          unit={unit}
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
