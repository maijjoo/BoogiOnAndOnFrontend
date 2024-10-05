import React, { useEffect, useState } from "react";

import logo from "../../assets/images/logo_tr.png";
import wave from "../../assets/images/wave.jpg";
import research from "../../assets/icons/workerMode/Analyze.svg";
import clean from "../../assets/icons/workerMode/Housekeeping.svg";
import collect from "../../assets/icons/workerMode/GarbageTruck.svg";
import collectInactive from "../../assets/icons/workerMode/GarbageTruckInactive.svg";
import Button from "../../components/commons/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const WorkerMainPage = () => {
  const navigate = useNavigate();
  const [hasRegisteredCar, setHasRegisteredCar] = useState(false);
  const { isLoggedIn, isDriver } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    } else {
      setHasRegisteredCar(isDriver);
    }
  }, []);

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
          onClick={() => navigate("/researchMain")}
        >
          <img className="w-8 xl:w-8 me-1" src={research} alt="research" />
          <p className="font-bold ms-1">조사</p>
        </Button>

        <Button
          className="w-full xl:w-1/5 p-2 m-2 flex items-center justify-center md:text-base rounded-md border-2 shadow-md"
          color="white"
          onClick={() => navigate("/cleaningSelect")}
        >
          <img className="w-8 xl:w-8 me-1" src={clean} alt="research" />
          <p className="font-bold ms-1">청소</p>
        </Button>

        <Button
          className="w-full xl:w-1/5 p-2 m-2 flex items-center justify-center md:text-base rounded-md border-2 shadow-md"
          color={hasRegisteredCar ? "white" : "gray"}
          onClick={() => navigate("/collectingMain")}
          disabled={!hasRegisteredCar}
        >
          <img
            className="w-8 xl:w-8 me-1"
            src={hasRegisteredCar ? collect : collectInactive}
            alt="research"
          />
          <p className="font-bold ms-1">수거</p>
        </Button>
      </div>

      <div className="flex items-center mt-4 justify-end">
        <img className="w-full" src={wave} alt="wave" />
      </div>
    </div>
  );
};

export default WorkerMainPage;
