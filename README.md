# 🌦️ Weather Dashboard (React + Open-Meteo)

A modern, high-performance weather dashboard built using **ReactJS** and the **Open-Meteo API**.  
The application provides real-time weather insights, historical data analysis, and interactive charts with a strong focus on **UX, performance, and responsiveness**.

---

## 🚀 Live Demo
🔗 https://weatherapp-azure-zeta.vercel.app/

---

## 📌 Features

### 📍 Automatic Location Detection
- Uses browser GPS to fetch user’s latitude & longitude
- Displays location-specific weather data instantly

---

## 📄 Page 1 — Current Weather & Single Date

### 🌡️ Weather Metrics
- Temperature (Min, Max, Current)
- Relative Humidity
- Wind Speed
- UV Index
- Precipitation Probability
- Visibility
- Sunrise & Sunset

### 🌫️ Air Quality
- PM10
- PM2.5
- Carbon Monoxide (CO)
- Nitrogen Dioxide (NO2)
- Sulphur Dioxide (SO2)

---

### 📊 Hourly Charts (Scrollable)
Each parameter is visualized in dedicated charts:
- Temperature (°C/°F toggle)
- Humidity
- Precipitation
- Visibility
- Wind Speed
- PM10 & PM2.5 (combined)

#### ✨ Chart Features
- Horizontal scrolling (mobile-first)
- Tap-based tooltip (mobile optimized)
- Hover tooltip (desktop)
- Smooth animations

---

## 📄 Page 2 — Historical Data (Date Range)

### 📅 Select Range (Max 2 Years)
- Analyze long-term weather trends

### 📊 Visualizations
- Temperature (Min, Max, Mean)
- Precipitation
- Wind Speed
- Air Quality (PM10, PM2.5)
- Sunrise & Sunset trends

### 📈 Insights
- Average temperature
- Total rainfall
- Max/Min values

---

## 🎨 UX & Design Highlights

- Fully responsive (mobile-first)
- Modern UI with soft shadows & rounded layouts
- Skeleton loaders for better perceived performance
- Smooth animations & transitions
- Clean typography and spacing

---

## 📱 Mobile Optimization

- Horizontal scroll charts for dense data
- Tap-based tooltip interaction (avoids gesture conflict)
- Scroll hint indicators for better discoverability

---

## ⚡ Performance

- Optimized API calls using `useMemo`
- Reduced unnecessary re-renders
- Lighthouse Score: **~90 Performance**
- Data renders within ~500ms (as required)

---

## 🛠️ Tech Stack

- **ReactJS**
- **Recharts** (for charts)
- **Day.js** (date handling)
- **Tailwind CSS**
- **Open-Meteo API**

---

## 📦 Installation

```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
npm install
npm run dev
