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
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100/80">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <h1 className="text-xs md:text-sm font-black tracking-[0.2em] uppercase text-slate-900">
                Atmosphere
                <span className="text-slate-300 font-light lowercase tracking-normal">
                  .io
                </span>
              </h1>
            </div>

            <nav className="flex items-center p-1 bg-slate-50/50 border border-slate-200/40 rounded-xl md:rounded-2xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] min-w-0 max-w-full">
              {[
                { id: "current", label: "Current" },
                { id: "historical", label: "History" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setPage(btn.id)}
                  className={`
              relative px-4 md:px-8 py-2 md:py-2.5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] rounded-lg md:rounded-xl transition-all duration-500
              ${
                page === btn.id
                  ? "bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.08)] text-slate-900"
                  : "text-slate-400 hover:text-slate-600"
              }
            `}
                >
                  {btn.label}
                </button>
              ))}
            </nav>
          </div>
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
