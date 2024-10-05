import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BasicStatisticsDailyChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} tick={{ fontSize: 16 }} />

        <YAxis />
        <Tooltip />
        <Legend />
        {/* 각 Line에 지정된 색상 적용 */}
        <Line
          type="monotone"
          dataKey="합계"
          stroke="#b0b0b0  "
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="폐어구류"
          stroke="#4a90e2"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="초목류"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="대형투기쓰레기류"
          stroke="#82ca9d"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="생활쓰레기류"
          stroke="#ffc658"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="부표류"
          stroke="#ff8c42"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BasicStatisticsDailyChart;
