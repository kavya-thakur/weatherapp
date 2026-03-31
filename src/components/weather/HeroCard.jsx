// import dayjs from "dayjs";

// const HeroCard = ({ temperature, selectedDate, setSelectedDate }) => {
//   return (
//     <div className="lg:col-span-8 bg-white border rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col justify-between min-h-[420px]">
//       <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
//         <div className="space-y-4">
//           <div className="text-xs font-bold uppercase text-slate-500">
//             Current Temperature
//           </div>

//           <h1 className="text-7xl md:text-9xl font-semibold">
//             {temperature}
//             <span className="text-slate-300">°C</span>
//           </h1>

//           <p className="text-slate-400">
//             {dayjs(selectedDate).format("dddd, MMM D")}
//           </p>
//         </div>

//         <input
//           type="date"
//           value={selectedDate}
//           max={dayjs().format("YYYY-MM-DD")}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           className="bg-slate-50 px-6 py-4 rounded-2xl cursor-pointer"
//         />
//       </div>
//     </div>
//   );
// };

// export default HeroCard;

import React from "react";
import dayjs from "dayjs";

const HeroCard = ({ temperature, selectedDate, setSelectedDate }) => {
  return (
    <div className="lg:col-span-8 bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col justify-between min-h-[420px] transition-none">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Current Temperature
          </div>

          <h1 className="text-7xl md:text-9xl font-semibold tracking-tighter text-slate-900 leading-none">
            {temperature}
            <span className="text-slate-200">°C</span>
          </h1>

          <p className="text-lg font-medium text-slate-400">
            {dayjs(selectedDate).format("dddd, MMM D")}
          </p>
        </div>

        {/* Date Input with stabilized dimensions to prevent layout jitter */}
        <div className="h-fit w-full sm:w-auto">
          <input
            type="date"
            value={selectedDate}
            max={dayjs().format("YYYY-MM-DD")}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 border-none px-6 py-4 rounded-2xl font-bold text-sm focus:ring-4 focus:ring-slate-100 outline-none transition-all cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
