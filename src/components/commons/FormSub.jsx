import React, { useState } from "react";
import CheckBoxWithLabel from "./CheckboxWithLabel";
import Button from "./Button.jsx";
import dot from "../../assets/icons/write/Circle.svg";
import { MainTrashList } from "../../datas/MainTrashList.js";

const FormSub = ({
  beachName,
  subIdx,
  setSubs = null,
  setAmount,
  startcoord,
  isCollapsed,
  _trashAmount,
  mainTrashIndex,
  onComplete,
  deleteSub = null,
  setCollapse = null,
}) => {
  const [selectedTrash, setSelectedTrash] = useState(null);

  const [trashAmount, setTrashAmount] = useState(0);

  const isComplete = selectedTrash !== null && trashAmount > 0;

  const subindex = subIdx !== 0 ? Number(subIdx) + 1 : 1;

  const handleTrashChange = (index) => {
    setSelectedTrash(selectedTrash === index ? null : index);
  };

  const handleComplete = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const subData = {
        startLatitude: startcoord[0],
        startLongitude: startcoord[1],
        endLatitude: position.coords.latitude,
        endLongitude: position.coords.longitude,
        beachNameWithIndex: `${beachName}${subindex}`,
        mainTrashType: selectedTrash,
      };

      setAmount((prevAmount) => prevAmount + Number(trashAmount));

      setSubs((prevSubs) => [
        ...prevSubs,
        { data: subData, isCollapsed: true, trashAmount: trashAmount },
      ]);
      onComplete?.();
    } catch (error) {
      console.error("위치 정보 획득 실패:", error);
      alert("위치 정보를 가져오는데 실패했습니다. GPS 설정을 확인해주세요.");
    }
  };

  if (isCollapsed) {
    return (
      <div className="w-full border border-gray-600 rounded-md p-3 mb-2">
        <div className="flex justify-between">
          <h1 className="w-full text-left font-bold">{`${beachName}${subindex}`}</h1>
          <div
            className="w-full xl:w-1/3 flex justify-end cursor-pointer"
            onClick={() => setCollapse()}
          >
            <p>{isCollapsed ? "펴기▼" : "접기▲"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full border border-gray-600 rounded-md p-3">
        <div className="flex justify-between">
          <h1 className="w-full text-left font-bold">{`${beachName}${subindex}`}</h1>
          {isCollapsed !== undefined && (
            <div
              className="w-full xl:w-1/3 flex justify-end cursor-pointer"
              onClick={() => setCollapse()}
            >
              <p>{isCollapsed ? "펴기▼" : "접기▲"}</p>
            </div>
          )}
        </div>

        <div className="w-full flex justify-between my-2 pt-2">
          <label className="inline">
            <img src={dot} alt="dot" className="w-1 me-2 inline" />
            쓰레기 예측량(L)
          </label>
          {isCollapsed === undefined ? (
            <input
              type="number"
              value={trashAmount}
              onChange={(e) => setTrashAmount(e.target.value)}
              className="p-1 text-right border border-black rounded-md"
            />
          ) : (
            <label className="w-1/4 p-1 text-right border border-black rounded-md">
              {_trashAmount}
            </label>
          )}
        </div>
        <div className="w-full flex flex-col justify-start">
          <label className="inline">
            <img src={dot} alt="dot" className="w-1 me-2 inline" />
            주요 쓰레기 종류(택 1)
          </label>
        </div>
        {isCollapsed === undefined ? (
          <ul className="items-center">
            {MainTrashList.map((trash, index) => (
              <li key={index} className="text-start">
                <CheckBoxWithLabel
                  checked={selectedTrash === index}
                  onChange={() => handleTrashChange(index)}
                >
                  {trash.type}
                  <p className="inline text-sm">{trash.description}</p>
                </CheckBoxWithLabel>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center mt-3">
            <label className="font-bold">
              {MainTrashList[mainTrashIndex].type}
            </label>
            <p className="inline text-sm">
              {MainTrashList[mainTrashIndex].description}
            </p>
          </div>
        )}

        <div className="w-full mt-3">
          <Button
            className="w-full py-4 rounded-lg"
            color={
              isCollapsed !== undefined ? "blue" : isComplete ? "blue" : "gray"
            }
            disabled={isCollapsed !== undefined ? false : !isComplete}
            onClick={
              deleteSub === null
                ? handleComplete
                : () => {
                    if (confirm("삭제하시겠습니다?")) {
                      deleteSub();
                    }
                  }
            }
          >
            {deleteSub === null ? "조사 완료" : "삭제"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormSub;
