import React, { useEffect, useState, useRef } from "react";
import dot from "../../../assets/icons/write/Circle.svg";
import plus from "../../../assets/icons/write/Plus.svg";
import cancel from "../../../assets/icons/write/Cancel.svg";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../../../components/menus/MobileHeader.jsx";
import MobileFooter from "../../../components/menus/MobileFooter.jsx";
import { NaturalDisasterList } from "../../../datas/NaturalDisasterList.js";
import { BeachNameList } from "../../../datas/BeachNameList.js";
import CheckBoxWithLabel from "../../../components/commons/CheckboxWithLabel.jsx";
import CleaningCameraController from "../../../components/commons/CleaningCameraController.jsx";
import CleaningAfterCameraController from "../../../components/commons/CleaningAfterCameraController.jsx";

import Button from "../../../components/commons/Button.jsx";
import CleaningFormSub from "../../../components/commons/CleaningFormSub.jsx";
import { MatchUsername } from "../../../datas/MatchUsername.js";
import { postAdd } from "../../../api/cleaningApi.js";
import { useAuth } from "../../../hooks/useAuth.js";

const CleaningMainPage = () => {
  const navigate = useNavigate();
  const { username, isLoggedIn } = useAuth();

  const [result, setResult] = useState(false);
  const [isMainFormComplete, setIsMainFormComplete] = useState(false);
  const [isComplete, setIsComplete] = useState();

  const [startCoords, setStartCoords] = useState();
  const [endCoords, setEndCoords] = useState();
  const [subData, setSubData] = useState({});
  const [isMainFormCollapsed, setIsMainFormCollapsed] = useState(undefined);

  const [bsource, setBSource] = useState([]);
  const [asource, setASource] = useState([]);

  // 해안명 관리 state
  const [beachName, setBeachName] = useState("");
  // 해안명 자동완성 드랍다운
  const [beachNameOptions, setBeachNameOptions] = useState([]);

  const handleBeachNameChange = (e) => {
    const beachname = e.target.value.trim();
    setBeachName(beachname);

    const filtered = BeachNameList.filter((option) =>
      option.toLowerCase().includes(beachname.toLowerCase())
    );
    setBeachNameOptions(filtered);
  };

  const [inputName, setInputName] = useState("");
  // 팀원 입력 input 자동완성 렌더링을 위한 state
  const [inputNameOptions, setInputNameOptions] = useState([]);

  const handleInputNameChange = (e) => {
    const inputname = e.target.value.trim();
    setInputName(inputname);

    const filtered = MatchUsername.filter((option) =>
      option.toLowerCase().includes(inputname.toLowerCase())
    );
    setInputNameOptions(filtered);
  };

  // 조사 시작 여부 파악하는 state
  const [isCleaning, setIsCleaning] = useState(false);
  // 팀원 리스트 state
  const [teamList, setTeamList] = useState([]);
  // 체크박스 관리 state
  const [selected, setSelected] = useState(null);

  const handleCheckboxChange = (index) => {
    setSelected(selected === index ? null : index);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
    if (result === "success") {
      alert("등록완료");
      navigate("/cleaningSelect", { replace: true });
    }
  }, [result, isLoggedIn, navigate]);

  useEffect(() => {
    setIsMainFormComplete(
      beachName.trim() !== "" && teamList.length > 0 && selected !== null
    );
  }, [beachName, teamList, selected]);

  const canSubmitForm = isMainFormComplete && isComplete;

  const handleValidTeam = (username) => {
    if (username.trim() !== "") {
      setTeamList((prevTeam) => [...prevTeam, username]);
      setInputName("");
    }
  };

  const handleDeleteTeam = (username) => {
    // 팀원 지우기
    setTeamList((prevTeam) => prevTeam.filter((team) => team !== username));
  };

  const handleStartCleaning = () => {
    setIsCleaning(true);
    setIsMainFormCollapsed(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStartCoords([pos.coords.latitude, pos.coords.longitude]);
      },
      (error) => {
        alert("위치 정보를 가져오는데 실패했습니다: " + error.message);
      }
    );
  };

  const onMainFormSubmit = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setEndCoords([pos.coords.latitude, pos.coords.longitude]);
        },
        (error) => {
          alert("위치 정보를 가져오는데 실패했습니다: " + error.message);
        }
      );

      // const main = {
      //   cleanerUsername: username, // 작성자
      //   beachName: beachName, //beachName
      //   totalBeachLength: "", //각 sub의 위경도로 길이 구한 총합 빈값으로 보내도됨
      //   realTrashAmount: subData.realTrashAmount,
      //   mainTrashType: subData.mainTrashType,
      //   startLatitude: startCoords[0], //  청소 시작 위치 위도
      //   startLongitude: startCoords[1], // 청소 시작 위치 경도
      //   endLatitude: endCoords[0], //  청소 끝 위치 위도
      //   endLongitude: endCoords[1], // 청소 끝 위치 경도
      //   specialNote: NaturalDisasterList[selected], // 재연재해 값
      // };
      console.log("----요청 전송--------------");

      const formData = new FormData();

      const beforeFiles = bsource;
      const afterFiles = asource;

      if (beforeFiles !== null && beforeFiles.length !== 0) {
        for (let i = 0; i < beforeFiles.length; i++) {
          formData.append("beforeFiles", beforeFiles[i]);
        }
      }

      if (afterFiles !== null && afterFiles.length !== 0) {
        for (let i = 0; i < afterFiles.length; i++) {
          formData.append("afterFiles", afterFiles[i]);
        }
      }

      formData.append("cleanerUsername", username); // 작성자
      formData.append("beachName", beachName); // 해안명
      formData.append("totalBeachLength", ""); // 총 길이 (빈 값)
      formData.append("realTrashAmount", subData.realTrashAmount); // 실제 수거량
      formData.append("mainTrashType", subData.mainTrashType); // 주요 쓰레기 유형
      formData.append("startLatitude", startCoords[0]); // 청소 시작 위치 위도
      formData.append("startLongitude", startCoords[1]); // 청소 시작 위치 경도
      formData.append("endLatitude", endCoords[0]); // 청소 끝 위치 위도
      formData.append("endLongitude", endCoords[1]); // 청소 끝 위치 경도
      formData.append("specialNote", NaturalDisasterList[selected]); // 재연재해 값

      console.log("-------after inject main at form data---------" + formData);

      // 나중에 바꿔야함
      postAdd(formData).then((data) => {
        setResult(data.result);
        console.log("---------result----------: ", data.result);
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col items-center p-3">
      <MobileHeader>청소 보고서</MobileHeader>

      {/* 메인 폼 */}
      <div className="w-full xl:w-1/3 mt-12 xl:mt-14 border border-black rounded-md p-3">
        {isMainFormCollapsed ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-full flex flex-col mb-2">
              <div className="flex w-full justify-between">
                <label className="w-full">
                  <img src={dot} alt="dot" className="w-1 me-2 inline" />
                  해안명
                </label>
                <div
                  className="w-full xl:w-1/3 flex justify-end cursor-pointer"
                  onClick={() => {
                    setIsMainFormCollapsed((prev) => !prev);
                  }}
                >
                  <p>
                    {isMainFormCollapsed !== undefined
                      ? isMainFormCollapsed
                        ? "펴기▼"
                        : "접기▲"
                      : null}
                  </p>
                </div>
              </div>
              <div className="w-full mt-3">
                <label className="block p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 w-full">
                  {beachName}
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="w-full flex flex-col mb-2">
              <div className="flex w-full justify-between">
                <label className="w-full">
                  <img src={dot} alt="dot" className="w-1 me-2 inline" />
                  해안명
                </label>
                {isMainFormCollapsed !== undefined && (
                  <div
                    className="w-full xl:w-1/3 flex justify-end cursor-pointer"
                    onClick={() => {
                      setIsMainFormCollapsed((prev) => !prev);
                    }}
                  >
                    <p>
                      {isMainFormCollapsed !== undefined
                        ? isMainFormCollapsed
                          ? "펴기▼"
                          : "접기▲"
                        : null}
                    </p>
                  </div>
                )}
              </div>
              <div className="w-full mt-3">
                <input
                  value={beachName}
                  onChange={handleBeachNameChange}
                  className="block p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 w-full"
                  list="beachoptions"
                  placeholder="해안명을 입력하세요"
                />
                <datalist id="beachoptions">
                  {beachNameOptions.map((option, index) => (
                    <option key={index} value={option} />
                  ))}
                </datalist>
              </div>
              {/* 이쁘게 바꾸기 */}
            </div>
            <div className="w-full flex flex-col justify-start mb-2">
              <label className="inline mb-2">
                <img src={dot} alt="dot" className="w-1 me-2 inline" />
                청소 인원
              </label>
              <div className="flex items-center justify-between">
                <input
                  value={inputName}
                  onChange={handleInputNameChange}
                  className="p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600 focus:outline-none focus:border-blue-950 inline w-full me-10"
                  list="nameoptions"
                />
                <datalist id="nameoptions">
                  {inputNameOptions.map((option, index) => (
                    <option key={index} value={option} />
                  ))}
                </datalist>
                <div className="ml-2">
                  <img
                    src={plus}
                    alt="plus"
                    className="inline w-8 cursor-pointer"
                    onClick={() => {
                      handleValidTeam(inputName);
                    }}
                  />
                </div>
              </div>

              {teamList.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {teamList.map((team, index) => (
                    <li key={index} className="my-1 me-1 flex items-center">
                      <div className="flex items-center justify-between p-1 border-solid border rounded-md border-stone-300 bg-white text-stone-600">
                        <span>{team}</span>
                        <img
                          src={cancel}
                          alt="cancel"
                          className="inline w-5 ms-1 cursor-pointer"
                          onClick={() => handleDeleteTeam(team)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="w-full flex flex-col justify-start mb-2">
              <label className="inline mb-1">
                <img src={dot} alt="dot" className="w-1 me-2 inline" />
                자연재해 유무
              </label>
              <p className="text-xs">
                최근 5일 이내 발생한 자연재해를 선택해 주세요
              </p>
            </div>
            <div className="w-full">
              <ul className="items-center">
                {NaturalDisasterList.map((list, index) => (
                  <li key={index} className="text-start">
                    <CheckBoxWithLabel
                      checked={selected === index}
                      onChange={() => handleCheckboxChange(index)}
                    >
                      {list}
                    </CheckBoxWithLabel>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {isCleaning && <CleaningCameraController setSource={setBSource} />}
      {isCleaning && <CleaningAfterCameraController setSource={setASource} />}

      {isCleaning && (
        <div className="w-full xl:w-1/3 mt-2">
          <CleaningFormSub
            subData={setSubData}
            setIsComplete={setIsComplete} // 상태 전달
          />
        </div>
      )}

      <div className="fixed bottom-14 left-0 w-full xl:w-1/3 mt-3 flex flex-col justify-center">
        <div className="w-full mt-3 flex items-center p-2">
          {!isCleaning && isMainFormComplete && (
            <Button
              className="w-full py-3 rounded-lg"
              color="blue"
              onClick={handleStartCleaning}
            >
              청소시작
            </Button>
          )}
        </div>

        <div className="w-full mt-1 flex items-center p-2 gap-2">
          <div className="w-1/2">
            <Button className="w-full py-3 rounded-lg" color="blue">
              임시저장
            </Button>
          </div>
          <div className="w-1/2">
            <Button
              className="w-full py-3 rounded-lg"
              color={canSubmitForm ? "blue" : "gray"}
              disabled={!canSubmitForm}
              onClick={onMainFormSubmit}
            >
              제출하기
            </Button>
          </div>
        </div>
      </div>
      <MobileFooter homeroot="/workerMain" />
    </div>
  );
};

export default CleaningMainPage;
