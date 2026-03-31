// import axios from "axios";

// const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
// const ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive";

// // Optional but good practice
// axios.defaults.timeout = 5000;

// // ✅ Current + future
// export const fetchWeather = async (lat, lon) => {
//   const res = await axios.get(FORECAST_URL, {
//     params: {
//       latitude: lat,
//       longitude: lon,
//       current: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m"],
//       hourly: [
//         "temperature_2m",
//         "relative_humidity_2m",
//         "precipitation",
//         "wind_speed_10m",
//         "visibility",
//         "pm10",
//         "pm2_5",
//         "precipitation_probability_max", // ✅ NEW
//         "uv_index_max", // ✅ NEW
//       ],
//       daily: ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset"],
//       timezone: "auto",
//     },
//   });

//   return res.data;
// };

// // ✅ Single date (Page 1)
// export const fetchWeatherByDate = async (lat, lon, date) => {
//   const res = await axios.get(ARCHIVE_URL, {
//     params: {
//       latitude: lat,
//       longitude: lon,
//       start_date: date,
//       end_date: date,
//       hourly: [
//         "temperature_2m",
//         "relative_humidity_2m",
//         "precipitation",
//         "wind_speed_10m",
//         "visibility",
//         "pm10",
//         "pm2_5",
//       ],
//       daily: ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset"],
//       timezone: "auto",
//     },
//   });

//   return res.data;
// };

// // ✅ Date range (Page 2 - VERY IMPORTANT)
// export const fetchWeatherRange = async (lat, lon, startDate, endDate) => {
//   try {
//     const res = await axios.get(ARCHIVE_URL, {
//       params: {
//         latitude: lat,
//         longitude: lon,
//         start_date: startDate,
//         end_date: endDate,
//         daily: [
//           "temperature_2m_max",
//           "temperature_2m_min",
//           "precipitation_sum",
//           "wind_speed_10m_max",
//           "wind_direction_10m_dominant", // ✅ NEW
//           "sunrise",
//           "sunset",
//         ],
//         timezone: "auto",
//       },
//     });

//     console.log("API SUCCESS:", res.data); // 👈 DEBUG

//     return res.data; // ✅ MUST return this
//   } catch (err) {
//     console.error("API ERROR:", err);
//     return null; // ✅ prevent undefined
//   }
// };

// export const fetchAirQuality = async (lat, lon) => {
//   const res = await axios.get(
//     "https://air-quality-api.open-meteo.com/v1/air-quality",
//     {
//       params: {
//         latitude: lat,
//         longitude: lon,
//         // hourly: ["pm10", "pm2_5"],
//         hourly: [
//           "pm10",
//           "pm2_5",
//           "carbon_monoxide",
//           "nitrogen_dioxide",
//           "sulphur_dioxide",
//         ],
//         timezone: "auto",
//       },
//     },
//   );

//   return res.data;
// };

import axios from "axios";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive";

axios.defaults.timeout = 5000;

// ✅ Current + future
export const fetchWeather = async (lat, lon) => {
  const res = await axios.get(FORECAST_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current: ["temperature_2m", "relative_humidity_2m", "wind_speed_10m"],

      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "precipitation",
        "wind_speed_10m",
        "visibility",
        "pm10",
        "pm2_5",
        "uv_index",
        "precipitation_probability",
      ],

      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "sunrise",
        "sunset",
        "precipitation_probability_max",
        "uv_index_max",
      ],

      timezone: "auto",
    },
  });

  return res.data;
};

// ✅ Single date (archive)
export const fetchWeatherByDate = async (lat, lon, date) => {
  const res = await axios.get(ARCHIVE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      start_date: date,
      end_date: date,

      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "precipitation",
        "wind_speed_10m",
        "visibility",
        "pm10",
        "pm2_5",
      ],

      daily: ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset"],

      timezone: "auto",
    },
  });

  return res.data;
};

// ✅ Date range (historical)
export const fetchWeatherRange = async (lat, lon, startDate, endDate) => {
  try {
    const res = await axios.get(ARCHIVE_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        start_date: startDate,
        end_date: endDate,

        daily: [
          "temperature_2m_max",
          "temperature_2m_min",
          "precipitation_sum",
          "wind_speed_10m_max",
          "wind_direction_10m_dominant",
          "sunrise",
          "sunset",
        ],

        timezone: "auto",
      },
    });

    return res.data;
  } catch (err) {
    console.error("API ERROR:", err);
    return null;
  }
};

// ✅ Air Quality
export const fetchAirQuality = async (lat, lon) => {
  const res = await axios.get(
    "https://air-quality-api.open-meteo.com/v1/air-quality",
    {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: [
          "pm10",
          "pm2_5",
          "carbon_monoxide",
          "nitrogen_dioxide",
          "sulphur_dioxide",
        ],
        timezone: "auto",
      },
    },
  );

  return res.data;
};
