import React, { useEffect } from "react";

const BasicStatisticsDailyTable = ({ dailyData }) => {
  // 데이터가 제대로 전달되는지 확인
  useEffect(() => {
    console.log("전달된 일별 데이터:", dailyData);
  }, [dailyData]);

  // 1일부터 31일까지의 일(day) 배열 정의
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  // 항목 키와 한글 이름 매핑 객체
  const columnNames = {
    surveyAreaCount: "조사 지역 수",
    buoyDebris: "부표류",
    householdWaste: "생활쓰레기류",
    largeDisposalWaste: "대형 투기쓰레기류",
    vegetationWaste: "초목류",
    fishingGearWaste: "폐어구류",
    total: "합계",
  };

  // 특정 일(day)의 데이터를 찾는 함수
  const getDayData = (day) => {
    if (!Array.isArray(dailyData)) return {}; // dailyData가 배열이 아닐 경우 빈 객체 반환
    // 해당 일의 데이터 객체를 dailyData 배열에서 찾음
    const dayObj = dailyData.find((data) => data.day === parseInt(day));
    return dayObj || {}; // 일 데이터가 존재하지 않으면 빈 객체 반환
  };

  return (
    <table className="w-full text-left border border-gray-300">
      <thead>
        <tr className="bg-gray-200 border-b">
          <th className="px-4 py-2 border text-center">쓰레기 종류</th>
          {/* 항목 배열을 순회하면서 각 항목의 헤더 셀을 생성 */}
          {Object.keys(columnNames).map((key) => (
            <th key={key} className="px-4 py-2 border text-center">
              {columnNames[key]} {/* 항목의 한글 이름 표시 */}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* days 배열을 순회하면서 각 일(행)을 렌더링 */}
        {days.map((day) => {
          const dayData = getDayData(day); // 해당 일의 데이터 객체
          return (
            <tr key={day} className="hover:bg-gray-50">
              <td className="px-4 py-2 border text-center">{day}일</td>
              {/* 각 항목별 데이터를 렌더링 */}
              {Object.keys(columnNames).map((key) => (
                <td key={key} className="px-4 py-2 border text-center">
                  {/* dayData가 존재하면 값을 출력, 없으면 "-" 표시 */}
                  {dayData[key] || "-"}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BasicStatisticsDailyTable;
