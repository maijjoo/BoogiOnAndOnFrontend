import SidebarLayout from "../../layouts/SidebarLayout";
import ConditionTabs from "../../components/searchCondition/ConditionTabs";
import YearAndMonthCondition from "../../components/searchCondition/YearAndMonthCondition";
import YearCondition from "../../components/searchCondition/YearCondition";
import Search from "../../components/searchCondition/Search";
import PeriodCondition from "../../components/searchCondition/PeriodCondition";
import MainTrashMap from "../../components/map/MainTrashMap";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { replace, useNavigate } from "react-router-dom";

const MainTrashDistributionPage = () => {
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();
  const [condition, setCondition] = useState("year");

  useEffect(() => {
    if (!isLoggedIn || role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  });

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-28">
        <h1 className="text-xl font-bold mb-2 text-blue-700">
          주요 쓰레기 분포
        </h1>
        {/* 조건 선택 탭 */}
        <div className="bg-white rounded-lg shadow px-14 py-4 mb-8 h-24">
          <div className="flex items-center justify-between w-full">
            {/* ConditionTabs와 YearCondition, Search 사이에 간격 추가 */}
            {
              <ConditionTabs
                setActiveTab={setCondition}
                activeTab={condition}
                className="m-0"
              />
            }

            <div className="flex items-center space-x-4">
              {condition === "year" ? (
                <YearCondition />
              ) : condition === "month" ? (
                <YearAndMonthCondition />
              ) : (
                <PeriodCondition />
              )}
              <Search />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-14 py-14 mb-8 h-[700px]">
          <MainTrashMap />
        </div>
      </div>
    </SidebarLayout>
  );
};

export default MainTrashDistributionPage;
