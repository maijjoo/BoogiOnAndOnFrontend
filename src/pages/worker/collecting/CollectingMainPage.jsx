import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { replace, useNavigate } from "react-router-dom";
import MobileHeader from "../../../components/menus/MobileHeader";
import KakaoMap from "../../../components/commons/KakaoMap";
import DetailedSpot from "./component/DetailedSpot.jsx";
import {
  getSpots,
  updateToAdded,
  updateToNeeded,
  updateToCompleted,
} from "../../../api/collectApi.js";
import FooterInfo from "./component/FooterInfo.jsx";

const CollectingMainPage = () => {
  const { isLoggedIn, isDriver, memberInfo, id } = useAuth();
  const navigate = useNavigate();
  // 지도 중심좌표로 보낼 현재 위치 좌표
  const [myCoords, setMyCoords] = useState({ lat: 0, lng: 0 });

  const [pickUpSpot, setPickUpSpot] = useState([]);
  // 수거경로 추가한 집하지
  const [pickedSpots, setPickedSpots] = useState([]);
  // 마커 클릭 시 상세정보로 출력되는 집하지
  const [detailedSpot, setDetailedSpot] = useState();

  const [onDetail, setOnDetail] = useState(false);
  const [onList, setOnList] = useState(false);

  const getAddress = useCallback((lat, lng) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const coord = new window.kakao.maps.LatLng(lat, lng);

      const callback = function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(result[0].address.address_name);
        } else {
          reject(new Error("Failed to get address."));
        }
      };

      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    });
  }, []);

  const fetchAddress = async (setAddress, lat, lng) => {
    try {
      const address = await getAddress(lat, lng);
      console.log(address);

      setAddress(address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
    if (!isDriver) {
      alert("수거작업은 차량을 등록해야 진행할 수 있습니다.");
      navigate("/workerMain", { replace: true });
    }
  }, [isLoggedIn, isDriver, navigate]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setMyCoords({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          },
          (error) => {
            alert("위치 정보를 가져오는데 실패했습니다: " + error.message);
          }
        );
      } catch (error) {
        console.error("위치 정보 가져오기 에러: ", error);
      }
    };

    const fetchData = async () => {
      const adminId = memberInfo.managerId;
      console.log("managerId: ", adminId, ", Id: ", id);

      try {
        const res = await getSpots(adminId);
        console.log("----------------resdata: ", res);
        res.map((data) => {
          if (data.status !== "ASSIGNMENT_COMPLETED") {
            setPickUpSpot((prevState) => [...prevState, data]);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    getLocation();
    fetchData();
    loadPickedSpots();
  }, []);

  // 자기가 경로 추가한 구역만 할꺼?
  // 지금은 그냥 나랑 같은 관리자로 등록된 모든글 중
  // 상태가 added_to_route 인걸 가져옴
  const loadPickedSpots = () => {
    setPickedSpots(
      pickUpSpot.filter((spot) => spot.status === "ASSIGNMENT_ADDED_TO_ROUTE")
    );
    console.log("=====================loadPickedSpots : ", pickedSpots);
  };

  const onSpotDetail = (spotId) => {
    setOnDetail(true);
    setOnList(false);
    setDetailedSpot(spotId);
  };

  const onAddSpot = async (id) => {
    const spotExists = pickedSpots.some((spot) => spot === id);

    if (!spotExists) {
      try {
        const add = await updateToAdded(id);
        console.log("update needed -> added at spot id: ", id);
        console.log("-----------res: ", add);
        alert("집하지가 수거목록에 추가되었습니다.");
        setPickedSpots((prevState) => [...prevState, id]);
      } catch (error) {
        console.error(error);
      }
    } else {
      // 구역이 이미 있을 경우
      console.log("already added at spot id: ", id);
      alert("이미 추가된 집하지입니다.");
    }

    setOnDetail(false);
    setDetailedSpot();
  };

  const onDropAdded = async (id) => {
    try {
      const drop = await updateToNeeded(id);
      console.log("update added -> needed at spot id: ", id);
      console.log("-----------res: ", drop);

      alert("집하지가 수거목록에서 제거되었습니다.");
      setPickedSpots((prevState) =>
        prevState.filter((prevId) => prevId !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 수거완료 버튼 클릭시
  const onCompletePickUp = async (spotId) => {
    // post("api/pickUp/id")로 상태변경해서 보내기
    // 요청 성공시 pickedSpots 에서 지우기
    try {
      const drop = await updateToCompleted(spotId);
      console.log("update added -> complete at spot id: ", spotId);
      console.log("-----------res: ", drop);
      loadPickedSpots();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-50">
      <div className="w-full fixed top-0 z-40">
        <MobileHeader>집하지 지도</MobileHeader>

        {/** 디테일은 여기서 해야될듯? 지도 크기 줄이고 DetailedSpot 컴포넌트 ㄱㄱ */}
      </div>
      <div className="w-full mt-12 mb-14 flex-1">
        <div
          className="w-full transition-all duration-500"
          style={{ height: onDetail ? "200px" : "566px" }}
        >
          <KakaoMap
            myCoords={myCoords}
            spots={pickUpSpot}
            setDetail={onSpotDetail}
            nowView={detailedSpot}
          />
        </div>
      </div>
      <div
        className={`w-full fixed z-40 bg-white rounded-t-3xl shadow-lg transition-all duration-500 ease-out`}
        style={{
          top: onDetail ? "calc(100vh - 530px)" : "100vh",
          height: "360px",
          transform: onList ? "translateY(-100vh)" : "translateY(0)",
        }}
      >
        {onDetail && (
          <div
            className="w-full bg-gray-300 rounded-full mb-4"
            style={{ height: "430px" }}
          >
            <DetailedSpot
              fetchAddress={fetchAddress}
              pickUpSpot={pickUpSpot}
              spot={detailedSpot}
              onClose={setOnDetail}
              onAddSpot={onAddSpot}
              onClearSpot={onCompletePickUp}
            />
          </div>
        )}
      </div>

      <FooterInfo
        pickedSpot={pickedSpots}
        loadSpots={loadPickedSpots}
        onList={onList}
        setOnList={setOnList}
        fetchAddress={fetchAddress}
        onDrop={onDropAdded}
        onClearSpot={onCompletePickUp}
      />
    </div>
  );
};

export default CollectingMainPage;
