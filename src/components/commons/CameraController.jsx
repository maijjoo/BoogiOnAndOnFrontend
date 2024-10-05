import React, { useRef, useState } from "react";
import addImage from "../../assets/icons/write/Add Image.svg";
import dot from "../../assets/icons/write/Circle.svg";

const CameraController = ({ setSource }) => {
  const [sources, setSources] = useState([]);
  const fileInputRef = useRef(null);

  const handleCapture = (target) => {
    if (target.files && target.files.length !== 0) {
      const file = target.files[0];

      setSource((prevSrc) => [...prevSrc, file]);

      const newUrl = URL.createObjectURL(file);
      setSources((prevSources) => [...prevSources, newUrl]);
    }
  };

  const handleSvgClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="w-full xl:w-1/3 h-fit p-3 mt-3 flex flex-col border border-gray-600 rounded-md shadow-md">
      <div className="my-2">
        <label>
          <img src={dot} alt="dot" className="w-1 me-2 inline" />
          해안가 사진
        </label>
      </div>
      <div className="border border-black rounded-md w-full overflow-x-auto">
        <div className="flex p-2">
          <div
            onClick={sources.length >= 30 ? null : handleSvgClick}
            className="flex-shrink-0 w-24 h-24 flex items-center justify-center cursor-pointer border border-dashed border-gray-300 rounded-md"
          >
            <img src={addImage} alt="add Image" className="w-8 h-8" />
          </div>
          {sources.map((source, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-24 h-24 mr-2 cursor-pointer"
              onClick={() => {
                if (confirm("사진을 삭제하시겠습니까?")) {
                  setSources(
                    (prevSources) => prevSources.filter((_, i) => i !== index) // 현재 인덱스를 제외한 새로운 배열 생성
                  );
                }
              }}
            >
              <img
                src={source}
                alt={`snap-${index}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <p
          className={`${sources.length < 3 ? "text-red-600" : "text-gray-500"}`}
        >
          {sources.length < 3
            ? "사진을 3장 이상 첨부해주세요"
            : `${sources.length}/30`}
        </p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={(e) => handleCapture(e.target)}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default CameraController;
