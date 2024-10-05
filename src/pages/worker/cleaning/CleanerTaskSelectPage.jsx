import React, { useEffect } from "react";
import logo from "../../../assets/images/logo_tr.png";
import wave from "../../../assets/images/wave.jpg";
import Button from "../../../components/commons/Button";
import clean from "../../../assets/icons/workerMode/Housekeeping.svg";
import pickup from "../../../assets/icons/workerMode/Trash Pile.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const CleanerTaskSelectPage = () => {
  const { username, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center mt-3">
        <img className="w-52 xl:w-64" src={logo} alt="logo" />
      </div>

      <div className="flex items-center mt-9">
        <p className=" font-bold">이용하실 서비스를 선택해 주세요</p>
      </div>

      <div className="w-full p-6 flex flex-col items-center mt-10">
        <Button
          className="w-full xl:w-1/5 p-2 m-2 flex items-center justify-center md:text-base rounded-md border-2 shadow-md"
          color="white"
          onClick={() => navigate("/cleaningMain")}
        >
          <img className="w-8 xl:w-8 me-1" src={clean} alt="clean" />
          <p className="font-bold ms-1">청소 보고서</p>
        </Button>

        <Button
          className="w-full xl:w-1/5 p-2 m-2 flex items-center justify-center md:text-base rounded-md border-2 shadow-md"
          color="white"
          onClick={() => navigate("/pickUpMain")}
        >
          <img className="w-8 xl:w-8 me-1" src={pickup} alt="pickup" />
          <p className="font-bold ms-1">집하지 등록</p>
        </Button>
      </div>

      <div className="flex items-center mt-4 justify-end">
        <img className="w-full" src={wave} alt="wave" />
      </div>
    </div>
  );
};

export default CleanerTaskSelectPage;
