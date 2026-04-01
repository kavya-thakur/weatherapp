import { Calendar, ArrowRight, Activity } from "lucide-react";

const HistoricalHeader = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-100 pb-8 md:pb-10">
      <div className="space-y-2 md:space-y-2">
        <div className="flex items-center gap-4">
          <Activity className="w-3.5 h-3.5 text-blue-500" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">
            Historical Archive
          </h2>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
          Temporal Insights
        </h1>
      </div>

      <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100 gap-1 sm:gap-0">
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start">
          <DateInput value={startDate} onChange={setStartDate} />

          <ArrowRight className="w-4 h-4 text-slate-300 mx-1 sm:mx-2 shrink-0" />

          <DateInput value={endDate} onChange={setEndDate} />
        </div>
      </div>
    </div>
  );
};

const DateInput = ({ value, onChange }) => (
  <div className="relative group flex-1 sm:flex-none">
    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-blue-500 pointer-events-none" />
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent pl-10 pr-3 py-2.5 text-[13px] sm:text-sm font-bold text-slate-700 outline-none cursor-pointer appearance-none min-w-[130px]"
    />
  </div>
);

export default HistoricalHeader;
