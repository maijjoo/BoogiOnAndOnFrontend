import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BasicStatisticsYearlyChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data} // 부모 컴포넌트에서 받은 데이터로 차트를 렌더링
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 5,
        }}
        barCategoryGap="10%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend wrapperStyle={{ paddingLeft: "40px" }} />
        <Bar dataKey="폐어구류" stackId="a" fill="#4a90e2" barSize={80} />
        <Bar dataKey="초목류" stackId="a" fill="#8884d8" barSize={80} />
        <Bar
          dataKey="대형 투기쓰레기류"
          stackId="a"
          fill="#82ca9d"
          barSize={80}
        />
        <Bar dataKey="생활쓰레기류" stackId="a" fill="#ffc658" barSize={80} />
        <Bar dataKey="부표류" stackId="a" fill="#ff8c42" barSize={80} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BasicStatisticsYearlyChart;
