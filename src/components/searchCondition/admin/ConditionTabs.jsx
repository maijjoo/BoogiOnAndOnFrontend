const ConditionTabs = ({
  activeTab,
  setActiveTab,
  initSearchParam,
  tabNames, // 각 탭의 이름을 배열 형태로 받습니다
  tabKeys, // 각 탭의 key를 배열로 받습니다 (예: ["research", "clean"])
  searchParams = {
    beachName: "",
  }, // 기본값 설정
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 h-16 me-10">
      {/* 첫 번째 버튼 탭 */}
      <button
        className={`w-28 h-12 px-4 py-2 ${
          activeTab === tabKeys[0]
            ? "bg-blue-700 text-white" // 활성화된 탭
            : "bg-white text-blue-700 border-2 border-blue-700" // 비활성화된 탭
        } text-[12pt] rounded-lg text-bold transition-colors duration-200`}
        onClick={() => {
          setActiveTab(tabKeys[0]);
          initSearchParam(searchParams); // 전달된 searchParams 사용
        }}
      >
        {tabNames[0]} {/* 첫 번째 탭 이름 */}
      </button>

      {/* 두 번째 버튼 탭 */}
      <button
        className={`w-28 h-12 px-4 py-2 ${
          activeTab === tabKeys[1]
            ? "bg-blue-700 text-white" // 활성화된 탭
            : "bg-white text-blue-700 border-2 border-blue-700" // 비활성화된 탭
        } text-[12pt] rounded-lg text-bold transition-colors duration-200`}
        onClick={() => {
          setActiveTab(tabKeys[1]);
          initSearchParam(searchParams); // 전달된 searchParams 사용
        }}
      >
        {tabNames[1]} {/* 두 번째 탭 이름 */}
      </button>
    </div>
  );
};

export default ConditionTabs;
