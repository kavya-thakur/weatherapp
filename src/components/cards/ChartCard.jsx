import React from "react";

const ChartCard = ({ title, children, span = "", delay = "0ms", data }) => {
  const hasData = data && data.length > 0;

  return (
    <div
      style={{ animationDelay: delay }}
      className={`bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-sm flex flex-col 
      min-h-[340px] 
      hover:shadow-md hover:border-slate-300 transition-all duration-500 group 
      animate-in fade-in slide-in-from-bottom-4 fill-mode-both ${span}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-300 group-hover:text-slate-500 transition-colors">
          {title}
        </h3>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full relative h-[260px] overflow-x-auto md:overflow-hidden no-scrollbar">
        {hasData ? (
          <div
            className="h-full w-full min-w-[600px] md:min-w-0  outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {children}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-xs text-slate-300 italic">
              No telemetry available
            </span>
          </div>
        )}
      </div>

      {/* Scroll hint */}
      {hasData && (
        <div className="mt-4 flex justify-center shrink-0 md:hidden">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
            Scroll to explore →
          </span>
        </div>
      )}
    </div>
  );
};

export default ChartCard;
