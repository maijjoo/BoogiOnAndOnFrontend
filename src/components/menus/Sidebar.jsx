import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logoOnly.png";
import dataMenu from "../../assets/icons/sidebar/Combo Chart.svg";
import onDataMenu from "../../assets/icons/sidebar/Combo Chart-1.svg";
import workMenu from "../../assets/icons/sidebar/Todo List.svg";
import onWorkMenu from "../../assets/icons/sidebar/Todo List-1.svg";
import memberMenu from "../../assets/icons/sidebar/User Settings.svg";
import onMemberMenu from "../../assets/icons/sidebar/User Settings-1.svg";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, department, workPlace, name } = useAuth();

  const [activeMenu, setActiveMenu] = useState(""); // 클릭된 메뉴 상태 관리
  const [hoverMenu, setHoverMenu] = useState(""); // hover 상태 관리
  const [activeSubMenu, setActiveSubMenu] = useState(""); // 하위 메뉴 클릭 상태 관리

  return (
    <div
      className="w-64 bg-[#014EB6] text-white h-screen flex flex-col justify-between p-4 
    shadow-[0_5px_20px_5px_rgba(0,0,0,0.5)] rounded-r-2xl"
    >
      {/* 상단 로고 및 사용자 정보 */}
      <div className="text-center border-b border-b-white px-1 py-5 mb-5">
        <div className="flex items-start mb-4">
          <Link to={"/adminMain"}>
            <img src={logo} className="w-12 h-12" alt="Logo" />
          </Link>
          <div className="ml-4 text-left justify-between">
            {/* 받아온 사용자 이름을 홍길동 대신 표시 */}
            <span className="text-[12pt] font-semibold">{name}</span>
            <span className="text-[10pt] ">님</span>

            <div className="text-[10pt]">
              {workPlace.replace(" ", "").trim() +
                " " +
                department.replace(" ", "").trim() +
                "과"}
            </div>
          </div>
        </div>
        {/* 하단 마이페이지 및 로그아웃 */}
        <div className="flex justify-center items-center mb-4">
          <Link to={"/"} className="text-white mr-4 text-[10pt]">
            마이페이지
          </Link>
          <div className="text-sm mr-4 text-[10pt]">|</div>
          <div
            onClick={() => logout()}
            className="text-white text-[10pt] cursor-pointer"
          >
            로그아웃
          </div>
        </div>
      </div>
      {/* 메뉴 섹션 */}

      <div className="flex-grow flex flex-col items-center">
        {/* 데이터 분석 메뉴 */}
        <div
          className={`flex flex-col items-start w-52 mb-4 p-5 cursor-pointer ${
            activeMenu === "data" || hoverMenu === "data"
              ? "bg-white rounded-md text-[#014EB6]"
              : "text-[#C5CCD2]"
          } hover:bg-white hover:rounded-md hover:text-[#014EB6]`}
          onClick={() => setActiveMenu("data")}
          onMouseEnter={() => setHoverMenu("data")}
          onMouseLeave={() => setHoverMenu("")}
        >
          <Link to={"/mainTrashDistribution"} className="flex items-center">
            <img
              src={
                activeMenu === "data" || hoverMenu === "data"
                  ? onDataMenu
                  : dataMenu
              }
              className="w-8 h-9 mr-2"
              alt="data menu"
            />
            <h3 className="text-[14pt] mb-0 font-semibold">데이터 분석</h3>
          </Link>
          {/* 하위 메뉴 애니메이션 */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden max-h-0 opacity-0 ${
              activeMenu === "data" || hoverMenu === "data"
                ? "max-h-48 opacity-100"
                : ""
            }`}
          >
            <div className="flex flex-col items-start mt-2 ml-4">
              <Link
                to={"/mainTrashDistribution"}
                className={`text-[#1E1E23] font-semibold my-4 cursor-pointer hover:text-[#014EB6] hover:font-semibold ${
                  activeSubMenu === "new"
                    ? "!text-[#014EB6] !font-semibold"
                    : ""
                }`}
                onClick={() => setActiveSubMenu("new")}
              >
                주요 쓰레기 분포도
              </Link>
              <Link
                to={"/"}
                className={`text-[#1E1E23] font-semibold mb-4 cursor-pointer hover:text-[#014EB6] hover:font-semibold ${
                  activeSubMenu === "view"
                    ? "!text-[#014EB6] !font-semibold"
                    : ""
                }`}
                onClick={() => setActiveSubMenu("view")}
              >
                수거 예측량 분포도
              </Link>
              <Link
                to={"/basicStatistics"}
                className={`text-[#1E1E23] font-semibold mb-4 cursor-pointer hover:text-[#014EB6] hover:font-semibold ${
                  activeSubMenu === "stats"
                    ? "!text-[#014EB6] !font-semibold"
                    : ""
                }`}
                onClick={() => setActiveSubMenu("stats")}
              >
                기초 통계
              </Link>
              <Link
                to={"/"}
                className={`text-[#1E1E23] font-semibold cursor-pointer hover:text-[#014EB6] hover:font-semibold ${
                  activeSubMenu === "ai" ? "!text-[#014EB6] !font-semibold" : ""
                }`}
                onClick={() => setActiveSubMenu("ai")}
              >
                AI 분석
              </Link>
            </div>
          </div>
        </div>

        {/* 작업 관리 메뉴 */}
        <div
          className={`flex flex-col items-start w-52 mb-4 p-5 cursor-pointer ${
            activeMenu === "work" || hoverMenu === "work"
              ? "bg-white rounded-md text-[#014EB6]"
              : "text-[#C5CCD2]"
          } hover:bg-white hover:rounded-md hover:text-[#014EB6]`}
          onClick={() => setActiveMenu("work")}
          onMouseEnter={() => setHoverMenu("work")}
          onMouseLeave={() => setHoverMenu("")}
        >
          <Link to={"/"} className="flex items-center">
            <img
              src={
                activeMenu === "work" || hoverMenu === "work"
                  ? onWorkMenu
                  : workMenu
              }
              className="w-8 h-9 mr-2"
              alt="work menu"
            />
            <div className="text-[14pt] mb-0 font-semibold">작업 관리</div>
          </Link>
          {/* 하위 메뉴 애니메이션 */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden max-h-0 opacity-0 ${
              activeMenu === "work" || hoverMenu === "work"
                ? "max-h-40 opacity-100"
                : ""
            }`}
          >
            <div className="flex flex-col items-start mt-2 ml-4">
              <Link
                to={"/"}
                className={`text-[#1E1E23] font-semibold my-4 cursor-pointer hover:text-[#014EB6] hover:font-semibold ${
                  activeSubMenu === "newWorks"
                    ? "!text-[#014EB6] !font-semibold"
                    : ""
                }`}
                onClick={() => setActiveSubMenu("newWorks")}
              >
                NEW 작업
              </Link>
              <Link
                to={"/"}
                className={`text-[#1E1E23] font-semibold cursor-pointer hover:text-[#014EB6] hover:font-semibold ${
                  activeSubMenu === "workList"
                    ? "!text-[#014EB6] !font-semibold"
                    : ""
                }`}
                onClick={() => setActiveSubMenu("workList")}
              >
                작업 조회
              </Link>
            </div>
          </div>
        </div>

        {/* 회원 관리 메뉴 */}
        <Link
          to={"/"}
          className={`flex items-center w-52 mb-4 p-5 cursor-pointer ${
            activeMenu === "member" || hoverMenu === "member"
              ? "bg-white rounded-md text-[#014EB6]"
              : "text-[#C5CCD2]"
          } hover:bg-white hover:rounded-md hover:text-[#014EB6]`}
          onClick={() => setActiveMenu("member")}
          onMouseEnter={() => setHoverMenu("member")}
          onMouseLeave={() => setHoverMenu("")}
        >
          <img
            src={
              activeMenu === "member" || hoverMenu === "member"
                ? onMemberMenu
                : memberMenu
            }
            className="w-8 h-8 mr-2"
            alt="member menu"
          />
          <h3 className="text-[14pt] mb-0 font-semibold">회원 관리</h3>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
