import React, { useEffect, useState } from "react";
import Sidebar from "../components/menus/Sidebar";
import hideMenu from "../assets/icons/sidebar/hideMenu.png";
import showMenu from "../assets/icons/sidebar/showMenu.png";

const SidebarLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false); // 사이드바 열기/닫기 상태

  return (
    <div className="relative">
      {/* 사이드바 열기 버튼 */}
      {!openSidebar && (
        <img
          src={showMenu}
          onClick={() => setOpenSidebar(true)}
          className="absolute top-3 left-2 w-6 h-6 z-50 cursor-pointer"
          alt="showMenu"
        />
      )}

      {/* 사이드바 열려 있을 때만 표시 */}
      {openSidebar && (
        <div className="fixed top-0 left-0 w-64 h-full z-40 bg-white">
          <Sidebar />
          {/* 사이드바 닫기 버튼 */}
          <img
            src={hideMenu}
            onClick={() => setOpenSidebar(false)}
            className="absolute top-3 right-3 w-6 h-6 z-50 cursor-pointer"
            alt="hideMenu"
          />
        </div>
      )}

      {/* 사이드바 외의 콘텐츠 */}
      <div
        className={`transition-all duration-300 ${
          openSidebar ? "ml-64" : "ml-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
