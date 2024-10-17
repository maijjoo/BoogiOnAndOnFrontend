import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/pick-up`;

// 내 관리자 id로 등록된 모든 집하지 리스트 받아옴
export const getSpots = async (adminId) => {
  // console.log(
  //   "-----------pickUp get api called by: managerId( ",
  //   adminId,
  //   " )"
  // );

  const res = await jwtAxios.get(`${prefix}/${adminId}`);

  // console.log("-----------pickUp get api response: ", res);

  return res.data;
};

// 특정 집하지의 state 를 added 로 바꿈
export const updateToAdded = async (spotId) => {
  // console.log("-----------pickUp patch api called by: spotId( ", spotId, " )");

  const res = await jwtAxios.patch(`${prefix}/added-route/${spotId}`);

  // console.log("-----------pickUp patch api response: ", res);

  return res.data;
};

// 특정 집하지의 state 를 completed 로 바꿈
export const updateToCompleted = async (spotId) => {
  // console.log("-----------pickUp patch api called by: spotId( ", spotId, " )");

  const res = await jwtAxios.patch(`${prefix}/completed/${spotId}`);

  // console.log("-----------pickUp patch api response: ", res);

  return res.data;
};

// 특정 집하지의 state 를 needed 로 롤백
export const updateToNeeded = async (spotId) => {
  // console.log("-----------pickUp patch api called by: spotId( ", spotId, " )");

  const res = await jwtAxios.patch(`${prefix}/cancel/${spotId}`);

  // console.log("-----------pickUp patch api response: ", res);

  return res.data;
};

// 하나로 통합
export const updateSpots = async (spotId, func) => {
  // console.log(
  //   "-----------pickUp patch api called by: spotId( ",
  //   spotId,
  //   " ), function( ",
  //   func,
  //   " )"
  // );

  let res;

  try {
    switch (func) {
      case "toAdded":
        res = await jwtAxios.patch(`${prefix}/added-route/${spotId}`);
        break;
      case "toCompleted":
        res = await jwtAxios.patch(`${prefix}/completed/${spotId}`);
        break;
      case "toNeeded":
        res = await jwtAxios.patch(`${prefix}/cancel/${spotId}`);
        break;
      default:
        throw new Error("Invalid function type");
    }
  } catch (error) {
    console.error("API 요청 에러 발생 : ", error);
    throw error;
  }
  return res.data;
};

// 이미지 받아오기
export const getImageByFileName = async (filename) => {
  // console.log(
  //   "-----------pickUp get api called by: imageName( ",
  //   filename,
  //   " )"
  // );

  const res = await jwtAxios.get(`${prefix}/view/${filename}`, {
    responseType: "blob",
  });

  // console.log("-----------pickUp get api response: ", res);

  const url = URL.createObjectURL(res.data);

  // console.log("-----------file to blob: ", url);

  return url;
};
