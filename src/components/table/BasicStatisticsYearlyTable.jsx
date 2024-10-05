import React from "react";

const BasicStatisticsYearlyTable = ({ yearlyData }) => {
  const years = ["2019", "2020", "2021", "2022", "2023"];

  // 항목 키와 한글 이름 매핑 객체
  const columnNames = {
    beachCount: "해안가 수",
    buoyDebris: "부표류",
    householdWaste: "생활쓰레기류",
    largeDisposalWaste: "대형 투기쓰레기류",
    vegetationWaste: "초목류",
    fishingGearWaste: "폐어구류",
    total: "합계",
  };

  // 특정 해의 데이터를 찾는 함수
  const getYearData = (year) => {
    if (!Array.isArray(yearlyData)) return {};
    const yearObj = yearlyData.find((data) => data.year === parseInt(year));
    return yearObj || {};
  };

  return (
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-b-gray-200 bg-gray-100">
          <th className="px-4 py-2 border w-44 text-center align-middle">
            연도
          </th>
          {years.map((year) => (
            <th
              key={year}
              className="px-4 py-2 border text-center align-middle"
            >
              {year}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* columnNames 객체의 키를 기반으로 데이터 렌더링 */}
        {Object.keys(columnNames).map((key, index) => (
          <tr key={index}>
            <td className="px-4 py-2 border text-center align-middle text-gray-600 font-semibold">
              {columnNames[key]}
            </td>
            {years.map((year) => (
              <td
                key={year}
                className="px-4 py-2 border text-center align-middle"
              >
                {getYearData(year)[key] || "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BasicStatisticsYearlyTable;
