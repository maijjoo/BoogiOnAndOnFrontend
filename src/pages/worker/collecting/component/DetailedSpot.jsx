import React, { useEffect, useState, useCallback } from "react";
import Copy from "../../../../assets/icons/write/Copy.svg";
import Cancel from "../../../../assets/icons/write/Cancel.svg";
import Circle from "../../../../assets/icons/write/Circle.svg";
import { getImageByFileName } from "../../../../api/collectApi";
import DefaultImgs from "../../../../assets/icons/write/Add Image.svg";
import Button from "../../../../components/commons/Button.jsx";
import AuthImage from "./AuthImage.jsx";

const DetailedSpot = ({
  spot,
  onClose,
  onAddSpot,
  onClearSpot,
  pickUpSpot,
  fetchAddress,
}) => {
  const [spotInfo, setSpotInfo] = useState({});
  const [address, setAddress] = useState();
  const [spotImgs, setSpotImgs] = useState([]);

  const getSpotInfoBySpotId = async () => {
    const selectedSpot = pickUpSpot.find((spotInfo) => spotInfo.id === spot);
    if (selectedSpot) {
      setSpotInfo(selectedSpot);
      fetchAddress(selectedSpot.latitude, selectedSpot.longitude);
    }
    if (spotInfo && spotInfo.images.length > 0) {
      try {
        const imgUrls = await getImageByFileName(spotInfo.images);
        setSpotImgs(imgUrls);
        console.log("-------------spotImgs: ", spotImgs);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getSpotInfoBySpotId();
    fetchAddress(setAddress, spot.latitude, spot.longitude);
  }, [spot]);

  return (
    <div className="flex flex-col justify-center items-left p-7">
      <div className="flex justify-between mb-3">
        <h1 className="inline font-bold text-red-500 text-2xl">
          {spotInfo.pickUpPlace}
        </h1>
        <img
          className="inline cursor-pointer w-8"
          src={Cancel}
          onClick={() => onClose(false)}
        />
      </div>
      <div className="flex w-full items-center gap-2">
        <label className="inline w-full border border-gray-500 rounded-md my-2 px-3 py-2 text-lg">
          {address ? address : "주소를 불러오는 중..."}
        </label>
        <img
          className="inline cursor-pointer w-12"
          src={Copy}
          onClick={() => {
            // 클립보드 복사 라이브러리
          }}
        />
      </div>
      <div className="w-full overflow-x-auto mt-2">
        <div className="flex p-2 gap-3">
          {spotImgs && spotImgs.length > 0 ? (
            spotImgs.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-40 flex items-center justify-center border border-dashed border-gray-300 rounded-md"
              >
                <img src={img} alt="spotImages" className="w-full h-full" />
              </div>
            ))
          ) : (
            <div className="flex-shrink-0 w-40 h-40 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
              <img src={DefaultImgs} alt="no Image" className="w-full h-full" />
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <div className="flex mt-2 items-center gap-2">
          <img src={Circle} alt="point" className="inline" />
          <label className="inline font-semibold">주요 쓰레기 종류</label>
        </div>
        <div className="flex w-full mt-2">
          <label className="border border-gray-400 rounded-md w-full px-3 py-2">
            {spotInfo.mainTrashType}
          </label>
        </div>
      </div>
      <div className="flex w-full items-center mt-4 gap-3">
        <div className="flex w-1/3 items-center gap-2">
          <img src={Circle} alt="point" className="inline" />
          <label className="inline font-semibold">실제 쓰레기양</label>
        </div>
        <div className="flex w-full gap-2">
          <label className="w-1/2 text-right border border-gray-400 rounded-md px-3 py-2">
            {spotInfo.actualCollectedVolume}
          </label>
          <label className="w-1/2 text-right border border-gray-400 rounded-md px-3 py-2">
            {spotInfo.actualCollectedVolume}
          </label>
        </div>
      </div>
      <div className="w-full flex gap-5 mt-4">
        <Button
          color="white"
          className="w-1/2 rounded-md px-3 py-2 text-lg"
          onClick={() => {
            onAddSpot(spotInfo.id);
            onClose(false);
          }}
        >
          경로 추가
        </Button>
        <Button
          color="blue"
          className="w-1/2 rounded-lg px-4 py-3 text-lg"
          onClick={() => {
            onClearSpot(spotInfo.title);
            onClose(false);
          }}
        >
          수거 완료
        </Button>
      </div>
    </div>
  );
};

export default DetailedSpot;
