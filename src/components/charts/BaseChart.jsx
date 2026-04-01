// import React, { useMemo } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Brush,
//   ResponsiveContainer,
//   Legend,
//   CartesianGrid,
// } from "recharts";

// const BaseChart = ({ data, lines }) => {
//   const xKey = useMemo(() => (data?.[0]?.time ? "time" : "date"), [data]);

//   return (
//     <div className="w-full h-full min-h-[250px] flex outline-none select-none">
//       <ResponsiveContainer width="100%" height={250}>
//         <LineChart
//           data={data}
//           margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
//         >
//           {/* Subtle horizontal-only grid */}
//           <CartesianGrid
//             vertical={false}
//             stroke="#f1f5f9"
//             strokeDasharray="8 8"
//           />

//           <XAxis
//             dataKey={xKey}
//             tick={{ fontSize: 9, fontWeight: 700, fill: "#cbd5e1" }}
//             axisLine={false}
//             tickLine={false}
//             dy={10}
//             minTickGap={30}
//           />

//           <YAxis
//             tick={{ fontSize: 9, fontWeight: 700, fill: "#cbd5e1" }}
//             axisLine={false}
//             tickLine={false}
//             width={40}
//             orientation="left"
//           />

//           <Tooltip
//             contentStyle={{
//               backgroundColor: "rgba(255, 255, 255, 0.98)",
//               backdropFilter: "blur(8px)",
//               borderRadius: "16px",
//               border: "1px solid #f1f5f9",
//               boxShadow: "0 12px 24px -6px rgba(0,0,0,0.05)",
//               padding: "12px 16px",
//               fontSize: "11px",
//               fontWeight: "700",
//               color: "#1e293b",
//             }}
//             itemStyle={{ padding: "2px 0" }}
//             cursor={{
//               stroke: "#e2e8f0",
//               strokeWidth: 2,
//               strokeDasharray: "4 4",
//             }}
//           />

//           <Legend
//             verticalAlign="top"
//             align="right"
//             iconType="circle"
//             iconSize={6}
//             wrapperStyle={{
//               fontSize: "9px",
//               fontWeight: 900,
//               textTransform: "uppercase",
//               letterSpacing: "0.15em",
//               paddingBottom: "30px",
//               color: "#94a3b8",
//             }}
//           />

//           {lines.map((line, index) => (
//             <Line
//               key={line.dataKey}
//               type="monotone"
//               dataKey={line.dataKey}
//               stroke={line.stroke || (index === 0 ? "#0f172a" : "#3b82f6")}
//               strokeWidth={line.strokeWidth || 3}
//               dot={false}
//               activeDot={{
//                 r: 5,
//                 strokeWidth: 2,
//                 stroke: "#fff",
//                 fill: line.stroke,
//                 shadow: "0 4px 10px rgba(0,0,0,0.1)",
//               }}
//               animationDuration={1500}
//               name={line.name || line.dataKey}
//             />
//           ))}

//           {/* Cleaned up Brush for a modern feel */}
//           <Brush
//             dataKey={xKey}
//             height={24}
//             stroke="#e2e8f0"
//             fill="#ffffff"
//             gap={10}
//             travellerWidth={6}
//             padding={{ top: 20 }}
//           >
//             {/* Nested line chart inside brush for that "mini-map" look */}
//             <LineChart data={data}>
//               <Line
//                 type="monotone"
//                 dataKey={lines[0]?.dataKey}
//                 stroke="#cbd5e1"
//                 strokeWidth={1}
//                 dot={false}
//               />
//             </LineChart>
//           </Brush>
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default BaseChart;

import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const BaseChart = ({ data, lines }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const xKey = useMemo(() => (data?.[0]?.time ? "time" : "date"), [data]);

  return (
    <div className="w-full h-full min-h-[250px] flex outline-none select-none">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          onClick={(state) => {
            if (isMobile && state?.activeTooltipIndex != null) {
              setActiveIndex(state.activeTooltipIndex);
            }
          }}
        >
          {/* Grid */}
          <CartesianGrid
            vertical={false}
            stroke="#f1f5f9"
            strokeDasharray="8 8"
          />

          {/* X Axis */}
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 9, fontWeight: 700, fill: "#cbd5e1" }}
            axisLine={false}
            tickLine={false}
            dy={10}
            minTickGap={30}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fontSize: 9, fontWeight: 700, fill: "#cbd5e1" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />

          {/* Tooltip (Tap for mobile, hover for desktop) */}
          <Tooltip
            active={isMobile ? activeIndex !== null : undefined}
            payload={
              isMobile && activeIndex !== null
                ? lines.map((line) => ({
                    name: line.name,
                    value: data?.[activeIndex]?.[line.dataKey],
                    color: line.stroke,
                  }))
                : undefined
            }
            label={
              isMobile && activeIndex !== null
                ? data?.[activeIndex]?.[xKey]
                : undefined
            }
            isAnimationActive={false}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              border: "1px solid #f1f5f9",
              boxShadow: "0 12px 24px -6px rgba(0,0,0,0.05)",
              padding: "12px 16px",
              fontSize: "11px",
              fontWeight: "700",
              color: "#1e293b",
            }}
            itemStyle={{ padding: "2px 0" }}
            cursor={{
              stroke: "#e2e8f0",
              strokeWidth: 2,
              strokeDasharray: "4 4",
            }}
          />

          {/* Legend */}
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={6}
            wrapperStyle={{
              fontSize: "9px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              paddingBottom: "30px",
              color: "#94a3b8",
            }}
          />

          {/* Lines */}
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke || (index === 0 ? "#0f172a" : "#3b82f6")}
              strokeWidth={line.strokeWidth || 3}
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                stroke: "#fff",
                fill: line.stroke,
              }}
              animationDuration={1500}
              name={line.name || line.dataKey}
            />
          ))}

          {/* Brush (desktop useful, optional on mobile) */}
          <Brush
            dataKey={xKey}
            height={24}
            stroke="#e2e8f0"
            fill="#ffffff"
            gap={10}
            travellerWidth={6}
            padding={{ top: 20 }}
          >
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey={lines[0]?.dataKey}
                stroke="#cbd5e1"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </Brush>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BaseChart;
