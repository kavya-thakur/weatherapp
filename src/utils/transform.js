// export const transformHourlyData = (data) => {
//   if (!data?.hourly?.time) return [];

//   return data.hourly.time.map((time, i) => {
//     const dateObj = new Date(time);

//     const visibilityRaw = data.hourly.visibility?.[i];

//     return {
//       time: `${String(dateObj.getHours()).padStart(2, "0")}:${String(
//         dateObj.getMinutes(),
//       ).padStart(2, "0")}`,

//       temp: data.hourly.temperature_2m?.[i] ?? 0,
//       humidity: data.hourly.relative_humidity_2m?.[i] ?? 0,
//       precipitation: data.hourly.precipitation?.[i] ?? 0,
//       wind: data.hourly.wind_speed_10m?.[i] ?? 0,

//       // ✅ FIX: keep NUMBER (not string)
//       visibility:
//         visibilityRaw != null && visibilityRaw > 0
//           ? Number((visibilityRaw / 1000).toFixed(1))
//           : null,

//       // ✅ SAFE AIR DATA (aligned already from hook)
//       pm10: data.air?.hourly?.pm10?.[i] ?? null,
//       pm25: data.air?.hourly?.pm2_5?.[i] ?? null,

//       // ✅ NEW (assignment requirement)
//       co: data.air?.hourly?.carbon_monoxide?.[i] ?? null,
//       no2: data.air?.hourly?.nitrogen_dioxide?.[i] ?? null,
//       so2: data.air?.hourly?.sulphur_dioxide?.[i] ?? null,

//       // ✅ AQI proxy
//       aqi: data.air?.hourly?.ozone?.[i] ?? null,

//       // ⚠️ Only works for TODAY (API limitation)
//       uv: data.hourly.uv_index?.[i] ?? null,
//       precipProb: data.hourly.precipitation_probability?.[i] ?? null,
//     };
//   });
// };

export const transformHourlyData = (data) => {
  if (!data?.hourly?.time) return [];

  return data.hourly.time.map((time, i) => {
    const dateObj = new Date(time);

    return {
      time: `${String(dateObj.getHours()).padStart(2, "0")}:${String(
        dateObj.getMinutes(),
      ).padStart(2, "0")}`,

      temp: data.hourly.temperature_2m?.[i] ?? 0,
      humidity: data.hourly.relative_humidity_2m?.[i] ?? 0,
      precipitation: data.hourly.precipitation?.[i] ?? 0,
      wind: data.hourly.wind_speed_10m?.[i] ?? 0,

      visibility:
        Array.isArray(data.hourly.visibility) &&
        data.hourly.visibility[i] != null &&
        data.hourly.visibility[i] > 0
          ? (data.hourly.visibility[i] / 1000).toFixed(1)
          : null,

      pm10: data.air?.hourly?.pm10?.[i] ?? 0,
      pm25: data.air?.hourly?.pm2_5?.[i] ?? 0,

      uv: data.hourly.uv_index?.[i] ?? null,
      precipProb: data.hourly.precipitation_probability?.[i] ?? null,

      // ✅ ONLY ADD THESE (missing features)
      co: data.air?.hourly?.carbon_monoxide?.[i] ?? null,
      no2: data.air?.hourly?.nitrogen_dioxide?.[i] ?? null,
      so2: data.air?.hourly?.sulphur_dioxide?.[i] ?? null,
    };
  });
};
