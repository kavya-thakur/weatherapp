import React, { useState, useMemo } from "react";
import CurrentWeather from "./pages/CurrentWeather";
import Historical from "./pages/Historical";
import { useLocation } from "./hooks/useLocation";

const App = () => {
  const [page, setPage] = useState("current");
  const { coords } = useLocation();

  const currentView = useMemo(() => <CurrentWeather />, []);
  const historicalView = useMemo(
    () => <Historical coords={coords} />,
    [coords],
  );

  return (
    <div className="min-h-screen bg-[#F6F6F7] text-slate-900 selection:bg-black selection:text-white">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-lg font-bold tracking-tighter uppercase">
            Atmosphere<span className="text-slate-400 font-light">.io</span>
          </h1>

          <nav className="flex items-center gap-1 flex-wrap bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
            <button
              onClick={() => setPage("current")}
              className={`px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                page === "current"
                  ? "bg-white shadow-md text-slate-900"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Current
            </button>

            <button
              onClick={() => setPage("historical")}
              className={`px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 ${
                page === "historical"
                  ? "bg-white shadow-md text-slate-900"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Historical
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className={page === "current" ? "block" : "hidden"}>
          {currentView}
        </div>
        <div className={page === "historical" ? "block" : "hidden"}>
          {historicalView}
        </div>
      </main>
    </div>
  );
};

export default App;
