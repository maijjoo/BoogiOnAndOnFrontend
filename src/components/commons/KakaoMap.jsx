import { Map, MapMarker } from "react-kakao-maps-sdk";
import RedPin from "../../assets/icons/write/ic-location-red.svg";
import BlackPin from "../../assets/icons/write/ic-location-black.svg";

const KakaoMap = ({ myCoords, spots, setDetail, nowView }) => {
  return (
    <Map
      center={{
        lat: myCoords.lat,
        lng: myCoords.lng,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      level={3} // 지도의 확대 레벨
    >
      {spots.map((spot) => {
        const markerImage = {
          size: { width: 35, height: 35 },
          src:
            spot.id === nowView || spot.status === "ASSIGNMENT_ADDED_TO_ROUTE"
              ? RedPin
              : BlackPin,
        };
        return (
          <MapMarker
            key={spot.id}
            position={{ lat: spot.latitude, lng: spot.longitude }}
            title={spot.pickUpPlace}
            image={markerImage}
            onClick={() => {
              setDetail(spot.id);
            }}
          />
        );
      })}
    </Map>
  );
};

export default KakaoMap;
