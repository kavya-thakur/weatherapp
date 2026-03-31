import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
