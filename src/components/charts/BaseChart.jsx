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
  const xKey = data?.[0]?.time ? "time" : "date";

  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          onMouseMove={undefined} // ✅ add this
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#f1f5f9"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          {/* <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
          /> */}
          <Tooltip
            shared={false} // ✅ add this
            isAnimationActive={false} // ✅ add this
            cursor={{ stroke: "#cbd5e1", strokeWidth: 1 }} // ✅ add this
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              paddingBottom: "20px",
            }}
          />
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
              stroke={line.stroke || (index === 0 ? "#0f172a" : "#3b82f6")}
              name={line.name || line.dataKey}
            />
          ))}
          <Brush
            dataKey={xKey}
            height={20}
            stroke="#e2e8f0"
            fill="#fff"
            travellerWidth={10}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BaseChart;
