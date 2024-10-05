import React from "react";

const BasicStatisticsMonthlyTable = ({ monthlyData }) => {
  console.log("monthlyData:", monthlyData); // 데이터가 제대로 전달되고 있는지 확인

  // 1월부터 12월까지의 월을 정의하는 배열
  const monthes = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  // 항목 키와 한글 이름 매핑 객체
  const columnNames = {
    surveyAreaCount: "해안가 수",
    buoyDebris: "부표류",
    householdWaste: "생활쓰레기류",
    largeDisposalWaste: "대형 투기쓰레기류",
    vegetationWaste: "초목류",
    fishingGearWaste: "폐어구류",
    total: "합계",
  };

  // 특정 월의 데이터를 찾는 함수
  const getMonthData = (month) => {
    if (!Array.isArray(monthlyData)) return {}; // monthlyData가 배열이 아닐 경우 빈 객체 반환
    // 해당 월의 데이터 객체를 monthlyData 배열에서 찾음
    const monthObj = monthlyData.find((data) => data.month === parseInt(month));
    return monthObj || {}; // 월 데이터가 존재하지 않으면 빈 객체 반환
  };

  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-b-gray-200 bg-gray-100">
          <th className="px-4 py-2 border w-44 text-center align-middle">월</th>
          {/* 월 배열을 순회하면서 각 월의 헤더 셀을 생성 */}
          {monthes.map((month) => (
            <th
              key={month}
              className="px-4 py-2 border text-center align-middle"
            >
              {month}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* columnNames 객체의 키를 기반으로 각 항목(행)을 렌더링 */}
        {Object.keys(columnNames).map((key, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border text-center align-middle text-gray-600 font-semibold">
              {columnNames[key]} {/* 항목의 한글 이름 표시 */}
            </td>
            {/* 각 월별 데이터를 렌더링 */}
            {monthes.map((month) => (
              <td
                key={month}
                className="px-4 py-2 border text-center align-middle"
              >
                {getMonthData(month)[key] || "-"}{" "}
                {/* 해당 월의 데이터가 존재하면 값 표시, 없으면 "-" */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BasicStatisticsMonthlyTable;
