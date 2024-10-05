import React from "react";

const ConditionTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center justify-center space-x-4 h-16 me-10">
      {/* 버튼 탭: 클릭 시 setActiveTab 함수 호출하여 activeTab 상태 변경 */}
      <button
        className={`w-24 h-12 px-4 py-2 ${
          activeTab === "year"
            ? "bg-blue-700 text-white" // 활성화된 탭
            : "bg-white text-blue-700 border-2 border-blue-700" // 비활성화된 탭
        } text-[12pt] rounded-lg transition-colors duration-200`}
        onClick={() => setActiveTab("year")}
      >
        연도별
      </button>
      <button
        className={`w-24 h-12 px-4 py-2 ${
          activeTab === "month"
            ? "bg-blue-700 text-white" // 활성화된 탭
            : "bg-white text-blue-700 border-2 border-blue-700" // 비활성화된 탭
        } text-[12pt] rounded-lg transition-colors duration-200`}
        onClick={() => setActiveTab("month")}
      >
        월별
      </button>
      <button
        className={`w-24 h-12 px-4 py-2 ${
          activeTab === "day"
            ? "bg-blue-700 text-white" // 활성화된 탭
            : "bg-white text-blue-700 border-2 border-blue-700" // 비활성화된 탭
        } text-[12pt] rounded-lg transition-colors duration-200`}
        onClick={() => setActiveTab("day")}
      >
        일별
      </button>
    </div>
  );
};

export default ConditionTabs;
