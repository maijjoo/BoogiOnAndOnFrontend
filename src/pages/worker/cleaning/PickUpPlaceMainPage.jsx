import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckBoxWithLabel from "../../../components/commons/CheckboxWithLabel";
import Button from "../../../components/commons/Button.jsx";
import PickUpCameraController from "../../../components/commons/PickUpCameraController.jsx";
import MobileHeader from "../../../components/menus/MobileHeader.jsx";
import MobileFooter from "../../../components/menus/MobileFooter.jsx";
import { MainTrashList } from "../../../datas/MainTrashList.js";
import { postAdd } from "../../../api/pickUpApi.js";
import "../../../App.css";
import { useAuth } from "../../../hooks/useAuth.js";

const PickUpPlaceMainPage = () => {
  const navigate = useNavigate();
  const { username, isLoggedIn } = useAuth();

  // State 관리
  const [pickUpPlace, setPickUpPlace] = useState(""); // 집하지 위치
  const [actualCollectedVolume, setActualCollectedVolume] = useState(""); // 50L 마대 수량
  const [mainTrashType, setMainTrashType] = useState(""); // 주요 쓰레기 타입
  const [photos, setPhotos] = useState([]); // 사진 리스트
  const [startCoords, setStartCoords] = useState(); // 좌표 정보
  const [result, setResult] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // 등록하기 버튼 상태 관리

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
    if (result === "success") {
      alert("등록 완료");
      navigate("/cleaningSelect", { replace: true });
    }
  }, [isLoggedIn, result, navigate]);

  // Handle Photo Upload
  const handlePhotoUpload = (newPhotos) => {
    if (photos.length + newPhotos.length > 3) {
      alert("사진은 최대 3장까지 등록할 수 있습니다.");
      return;
    }
  };

  // 총 쓰레기양 계산
  const calculateTotalWasteVolume = () => {
    return actualCollectedVolume * 50;
  };

  // 마대 갯수 => 쓰레기 양
  const replaceCountToL = () => {
    return actualCollectedVolume * 50;
  };

  // input태그에서 빈 값이거나 0보다 큰 숫자만 상태에 반영

  const handleInput = (e) => {
    const value = e.target.value;
    //
    if (value === "" || Number(value) > 0) {
      setActualCollectedVolume(value);
    }
  };

  // Handle Trash Type Change
  const handleTrashTypeChange = (type) => {
    setMainTrashType(type);
  };

  // Form Submission Handler
  const handleFormSubmit = () => {
    if (
      !pickUpPlace ||
      !mainTrashType ||
      calculateTotalWasteVolume() === 0 ||
      (photos.length < 1 && photos.length > 4)
    ) {
      alert("모든 필드를 올바르게 입력해 주세요.");
      return;
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setStartCoords([pos.coords.latitude, pos.coords.longitude]);
        },
        (error) => {
          alert("위치 정보를 가져오는데 실패했습니다: " + error.message);
        }
      );

      const pickUpRequestDto = {
        pickUpPlace: pickUpPlace,
        actualCollectedVolume: calculateTotalWasteVolume(),
        mainTrashType: mainTrashType,
        latitude: startCoords[0],
        longitude: startCoords[1],
        submitterUsername: username,
      };
      const files = photos;
      const formData = new FormData();

      if (files !== null && files.length !== 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }
      formData.append("submitterUsername", pickUpRequestDto.submitterUsername);
      formData.append("pickUpPlace", pickUpRequestDto.pickUpPlace);
      formData.append(
        "actualCollectedVolume",
        pickUpRequestDto.actualCollectedVolume
      );
      formData.append("mainTrashType", pickUpRequestDto.mainTrashType);
      formData.append("latitude", pickUpRequestDto.latitude);
      formData.append("longitude", pickUpRequestDto.longitude);

      postAdd(formData).then((data) => {
        setResult(data.result);
        console.log("-----------data.result");
        console.log(data.result);
      });
    }
  };

  useEffect(() => {
    if (
      pickUpPlace.trim() !== "" &&
      mainTrashType.trim() !== "" &&
      actualCollectedVolume > 0 &&
      photos.length > 0 &&
      photos.length <= 3
    ) {
      setIsSubmitDisabled(false); // 모든 조건을 만족하면 버튼 활성화
    } else {
      setIsSubmitDisabled(true); // 조건을 만족하지 않으면 비활성화
    }
  }, [pickUpPlace, mainTrashType, actualCollectedVolume, photos]);

  return (
    <div className="w-full max-h-full flex flex-col items-center px-3">
      {/* 헤더 */}
      <MobileHeader>집하지 등록</MobileHeader>

      <div className="w-full xl:w-1/3  border border-stone-300 rounded-md mt-4 mb-2 shadow-md flex flex-col items-center">
        {/* 집하지 위치 입력 */}
        <div className="w-full mt-4 mb-2 px-3">
          <label className="block font-bold mb-2">· 집하지</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={pickUpPlace}
            onChange={(e) => setPickUpPlace(e.target.value)}
          />

          <span className="block text-xs text-gray-500">
            (예시) 해운대 경찰서 앞
          </span>
        </div>

        {/* 사진 첨부 */}
        <div className="w-full mt-4 mb-2 px-3">
          <label className="block font-bold mb-2">· 집하지 사진</label>
          <PickUpCameraController setSource={setPhotos} />
          <p className="text-xs text-gray-600 mt-2">
            사진은 최대 3장까지 첨부 가능합니다.
          </p>
        </div>

        {/* 실제 쓰레기양 입력 */}
        <div className="w-full mt-4 mb-2 px-3">
          <label className="block font-bold mb-2">· 실제 쓰레기양</label>
          <div className="flex items-center justify-between">
            <label className="me-2 w-full">50L 마대</label>
            <input
              type="number"
              onInput={(e) => handleInput(e)}
              value={actualCollectedVolume === 0 ? "" : actualCollectedVolume}
              onChange={(e) => setActualCollectedVolume(Number(e.target.value))}
              className="border border-stone-300 rounded-md p-1 w-1/2 me-1 no-spinner"
            />{" "}
            개
            <input
              type="number"
              className="border border-stone-300 rounded-md p-1 w-1/2 me-1 ms-3 no-spinner"
              value={replaceCountToL()}
            />
            L
          </div>
        </div>

        {/* 주요 쓰레기 종류 선택 */}
        <div className="w-full mt-4 mb-2 px-3">
          <label className="block font-bold">· 주요 쓰레기 종류 (택 1)</label>
          <div className="flex flex-col">
            {MainTrashList.map((trash, index) => (
              <CheckBoxWithLabel
                key={index}
                checked={mainTrashType === trash.type}
                onChange={() => handleTrashTypeChange(trash.type)}
              >
                {trash.type}{" "}
                <span className="text-sm">{trash.description}</span>
              </CheckBoxWithLabel>
            ))}
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="w-full xl:w-1/3 mt-3">
        <div className="w-full mt-3 flex">
          <div className="w-1/2 m-1">
            <Button
              className="w-full py-3 rounded-lg"
              color="blue"
              onClick={() => alert("임시 저장되었습니다.")}
            >
              임시저장
            </Button>
          </div>
          <div className="w-1/2 m-1">
            <Button
              className={`w-full py-3 rounded-lg ${
                isSubmitDisabled
                  ? "bg-gray-300 cursor-default hover:bg-gray-300"
                  : "bg-blue-700 text-white hover:bg-blue-900"
              }`}
              color="blue"
              onClick={handleFormSubmit}
              disabled={isSubmitDisabled}
            >
              등록하기
            </Button>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 바 */}
      <MobileFooter homeroot="/workerMain" />
    </div>
  );
};

export default PickUpPlaceMainPage;
