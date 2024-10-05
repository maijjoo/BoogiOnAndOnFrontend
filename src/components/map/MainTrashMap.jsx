import React, { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MainTrashMap = () => {
  return (
    <Map
      center={{
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      level={3} // 지도의 확대 레벨
    ></Map>
  );
};

export default MainTrashMap;
