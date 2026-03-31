import { Calendar, ArrowRight, Activity } from "lucide-react";

const HistoricalHeader = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-10">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-500" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            Historical Archive
          </h2>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
          Temporal Insights
        </h1>
      </div>

      <div className="flex items-center bg-slate-50 p-2 rounded-2xl border border-slate-100">
        <DateInput value={startDate} onChange={setStartDate} />
        <ArrowRight className="w-4 h-4 text-slate-300 mx-2" />
        <DateInput value={endDate} onChange={setEndDate} />
      </div>
    </div>
  );
};

const DateInput = ({ value, onChange }) => (
  <div className="relative group">
    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500" />
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent pl-11 pr-4 py-2 text-sm font-bold text-slate-700 outline-none cursor-pointer"
    />
  </div>
);

export default HistoricalHeader;
