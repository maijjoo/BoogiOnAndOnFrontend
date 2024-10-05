import React, { useEffect } from "react";
import write from "../../assets/icons/nav/Hand With Pen.svg";
import myPage from "../../assets/icons/nav/User.svg";
import home from "../../assets/icons/nav/Home.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MobileFooter = ({ homeroot, writeroot }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  });

  return (
    <div className="w-full fixed bottom-0 left-0 h-12 xl:h-14 z-10 flex border-t-2 border-t-slate-200 justify-center">
      <div className="w-1/3 flex justify-center p-3 cursor-pointer">
        <img
          src={myPage}
          alt="my Page"
          onClick={() => {
            // 임시로 로그아웃으로 연결해놨음
            logout();
          }}
        />
      </div>
      <div
        className="w-1/3 flex justify-center p-3 cursor-pointer"
        onClick={() => navigate(homeroot)}
      >
        <img src={home} alt="go home" />
      </div>
      <div className="w-1/3 flex justify-center p-3">
        <img src={write} alt="write" onClick={() => {}} />
      </div>
    </div>
  );
};

export default MobileFooter;
