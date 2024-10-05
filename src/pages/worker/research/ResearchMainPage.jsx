import React, { useEffect, useState } from "react";
import dot from "../../../assets/icons/write/Circle.svg";
import plus from "../../../assets/icons/write/Plus.svg";
import cancel from "../../../assets/icons/write/Cancel.svg";
import { useNavigate } from "react-router-dom";
import MobileHeader from "../../../components/menus/MobileHeader.jsx";
import MobileFooter from "../../../components/menus/MobileFooter.jsx";
import { NaturalDisasterList } from "../../../datas/NaturalDisasterList.js";
import { BeachNameList } from "../../../datas/BeachNameList.js";
import CheckBoxWithLabel from "../../../components/commons/CheckboxWithLabel.jsx";
import CameraController from "../../../components/commons/CameraController.jsx";
import Button from "../../../components/commons/Button.jsx";
import FormSub from "../../../components/commons/FormSub.jsx";
import { MatchUsername } from "../../../datas/MatchUsername.js";
import { postAdd } from "../../../api/researchApi.js";
import { useAuth } from "../../../hooks/useAuth.js";

// dto 구조 참고용
// 개발 완료되면 지우기
const initState = {
  researcherUsername: "",
  beachName: "",
  totalBeachLength: "",
  expectedTrashAmount: "",
  weather: "",
  specialNote: "",
  researchSubList: [
    {
      beachNameWithIndex: "",
      startLatitude: "",
      startLongitude: "",
      endLatitude: "",
      endLongitude: "",
      mainTrashType: "",
    },
  ],
};

const ResearchMainPage = () => {
  const navigate = useNavigate();
  const { username, isLoggedIn } = useAuth();

  // 등록요청 성공시 리렌더링하기 위함
  const [result, setResult] = useState(false);

  // 임시저장 모달을 띄우기 위한 state
  // const [isTempExists, setIsTempExists] = useState(false);

  // 서브조사리스트
  const [subs, setSubs] = useState([]);
  // 이미지 등록을 위한 파일 배열
  const [formImgs, setFormImgs] = useState([]);
  const [trashAmount, setTrashAmount] = useState(0);
  // 서브폼이 작성중일때 등록버튼 못누르게
  const [isSubOnWrite, setIsSubOnWrite] = useState(false);
  // 서브폼 시작좌표
  const [startCoords, setStartCoords] = useState();
  //메인폼 접기, undefined는 메인폼 작성중일때
  const [isMainFormCollapsed, setIsMainFormCollapsed] = useState(undefined);
  // 해안명 입력값
  const [beachName, setBeachName] = useState("");
  // 해안명 자동완성 드랍다운
  const [beachNameOptions, setBeachNameOptions] = useState([]);
  // 팀원이름 입력값
  const [inputName, setInputName] = useState("");
  // 팀원이름 자동완성 드랍다운
  const [inputNameOptions, setInputNameOptions] = useState([]);
  // 조사시작 여부 파악하는 state
  const [isResearching, setIsResearching] = useState(false);
  // 팀원 리스트 state
  const [teamList, setTeamList] = useState([]);
  // 체크박스 관리 state
  const [selected, setSelected] = useState(null);

  // 로그인 판별, 등록 성공시 수행
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
    if (result === "success") {
      initializeAllStates();
    }
  }, [result, isLoggedIn, navigate]);

  // 등록요청 성공시 초기화
  const initializeAllStates = () => {
    alert("등록완료");
    setSubs([]);
    setFormImgs([]);
    setTeamList([]);
    setTrashAmount(0);
    setStartCoords();
    setIsMainFormCollapsed(undefined);
    setSelected(null);
    setBeachName("");
    setInputName("");
    setIsSubOnWrite(false);
    setIsResearching(false);
    setResult(false);
  };

  const handleBeachNameChange = (e) => {
    const beachname = e.target.value.trim();
    setBeachName(beachname);

    const filtered = BeachNameList.filter((option) =>
      option.toLowerCase().includes(beachname.toLowerCase())
    );
    setBeachNameOptions(filtered);
  };

  const handleInputNameChange = (e) => {
    const inputname = e.target.value.trim();
    setInputName(inputname);

    const filtered = MatchUsername.filter((option) =>
      option.toLowerCase().includes(inputname.toLowerCase())
    );
    setInputNameOptions(filtered);
  };

  const handleCheckboxChange = (index) => {
    setSelected(selected === index ? null : index);
  };

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

  const isMainFormComplete =
    beachName.trim() !== "" && teamList.length > 0 && selected !== null;

  const hasActiveSubForm = isSubOnWrite;

  const canSubmitForm =
    subs.length > 0 &&
    !hasActiveSubForm &&
    formImgs.length >= 3 &&
    formImgs.length <= 30;

  const handleStartResearch = () => {
    setIsResearching(true);
    setIsMainFormCollapsed(true);
    setIsSubOnWrite(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStartCoords([pos.coords.latitude, pos.coords.longitude]);
      },
      (error) => {
        alert("위치 정보를 가져오는데 실패했습니다: " + error.message);
      }
    );
  };

  const handleAddNewSubForm = () => {
    setIsSubOnWrite(true);
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
      const main = {
        researcherUsername: username, // 작성자
        beachName: beachName, //beachName
        totalBeachLength: "", //각 sub의 위경도로 길이 구한 총합 빈값으로 보내도됨
        expectedTrashAmount: trashAmount, // 각 sub의 trashAmount 총합
        weather: "", // api 로 따와서 넘김
        specialNote: NaturalDisasterList[selected], // 재연재해 값
        researchSubList: subs.data, //서브조사 리스트
      };

      console.log("----요청 전송--------------");

      const formData = new FormData();

      // 이미지 ref 로 연결하기
      const files = formImgs;

      if (files !== null && files.length !== 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
      }
      console.log("---------formData", formData.get("files"));
      formData.append("json", JSON.stringify(main));

      postAdd(formData).then((data) => {
        setResult(data.result);
        console.log("-----------data.result");
        console.log(data.result);
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="w-full overflow-hidden h-dvh flex flex-col items-center p-3">
      <MobileHeader>조사 보고서</MobileHeader>

      {/* 메인 폼 */}
      <div className="absolute top-14 bottom-32 overflow-y-auto w-full p-3">
        <div className="w-full xl:w-1/3 border border-black rounded-md mb-2 p-6">
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
                  조사 인원
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

        {isResearching && <CameraController setSource={setFormImgs} />}

        {/* subs 의 길이에 따라 formsub 렌더링, 있는건 데이터 가져와서 렌더링, 마지막에 빈거 한개 렌더링 */}
        {isResearching && (
          <div className="w-full xl:w-1/3 mt-2">
            {/* 완료된 서브 폼들 (접힌 상태로 표시) */}
            {subs.map((sub, index) => (
              <FormSub
                key={index}
                beachName={beachName}
                subIdx={index}
                isCollapsed={sub.isCollapsed}
                setCollapse={() =>
                  setSubs((prevSubs) => {
                    return prevSubs.map((sub, i) => {
                      if (i === index) {
                        return {
                          ...sub,
                          isCollapsed: !sub.isCollapsed,
                        };
                      }
                      return sub;
                    });
                  })
                }
                deleteSub={() =>
                  setSubs((prevSubs) => prevSubs.filter((_, i) => i !== index))
                }
                _trashAmount={sub.trashAmount}
                mainTrashIndex={sub.data.mainTrashType}
              />
            ))}

            {/* 현재 작성 중인 서브 폼 */}
            {isSubOnWrite && (
              <FormSub
                beachName={beachName}
                subIdx={subs.length}
                setSubs={setSubs}
                setSubWrite={setIsSubOnWrite}
                startcoord={startCoords}
                setAmount={setTrashAmount}
                isCollapsed={undefined}
                onComplete={() => {
                  setIsSubOnWrite(false);
                }}
              />
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-14 left-0 w-full xl:w-1/3 mt-3 flex flex-col justify-center">
        <div className="w-full mt-3 flex items-center p-2">
          {!isResearching && isMainFormComplete && (
            <Button
              className="w-full py-3 rounded-lg"
              color="blue"
              onClick={handleStartResearch}
            >
              조사시작
            </Button>
          )}

          {isResearching && !isSubOnWrite && (
            <Button
              className="w-full py-3 rounded-lg"
              color="blue"
              onClick={handleAddNewSubForm}
            >
              구역 추가
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

export default ResearchMainPage;
