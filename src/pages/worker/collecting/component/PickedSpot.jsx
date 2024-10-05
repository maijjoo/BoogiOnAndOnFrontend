import React, { useEffect, useState } from "react";
import Circle from "../../../../assets/icons/write/Circle.svg";
import Button from "../../../../components/commons/Button";

const PickedSpot = ({
  key,
  spot,
  index,
  fetchAddress,
  onDrop,
  onClearSpot,
}) => {
  const [address, setAddress] = useState();
  console.log(spot);

  useEffect(() => {
    fetchAddress(setAddress, spot.latitude, spot.longitude);
  });

  return (
    <div className="flex flex-col justify-center items-left p-5 mt-5 border border-gray-600 rounded-md">
      <div className="flex justify-between mb-1">
        <p>경로 {index}</p>
        <h1 className="inline font-bold text-red-500 text-2xl">
          {spot.pickUpPlace}
        </h1>
      </div>
      <div className="flex w-full items-center gap-2">
        <label className="inline w-full border border-gray-500 rounded-md my-2 px-3 py-2 text-lg">
          {address ? address : "주소를 불러오는 중..."}
        </label>
      </div>

      <div className="w-full">
        <div className="flex mt-2 items-center gap-2">
          <img src={Circle} alt="point" className="inline" />
          <label className="inline font-semibold">주요 쓰레기 종류</label>
        </div>
        <div className="flex w-full mt-2">
          <label className="border border-gray-400 rounded-md w-full px-3 py-2">
            {spot.mainTrashType}
          </label>
        </div>
      </div>
      <div className="flex w-full items-center mt-4 gap-3">
        <div className="flex w-1/3 items-center gap-2">
          <img src={Circle} alt="point" className="inline" />
          <label className="inline font-semibold">실제 쓰레기양</label>
        </div>
        <div className="flex w-full gap-1">
          <label className="w-1/2 text-right border border-gray-400 rounded-md px-3 py-2">
            {Math.floor(spot.actualCollectedVolume)}
          </label>
          <label className="w-1/2 text-right border border-gray-400 rounded-md px-3 py-2">
            {Math.floor(spot.actualCollectedVolume)}
          </label>
        </div>
      </div>
      <div className="w-full flex gap-5 mt-4">
        <Button
          color="white"
          className="w-1/2 rounded-md px-3 py-2 text-lg"
          onClick={() => {
            onDrop(spot.id);
          }}
        >
          경로 삭제
        </Button>
        <Button
          color="blue"
          className="w-1/2 rounded-lg px-4 py-3 text-lg"
          onClick={() => {
            if (confirm("'" + spot.pickUpPlace + "' 을 수거하셨습니까?")) {
              onClearSpot(spot.id);
            }
          }}
        >
          수거 완료
        </Button>
      </div>
    </div>
  );
};

export default PickedSpot;
