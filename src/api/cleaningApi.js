import { API_SERVER_HOST } from "./commonApi";
import jwtAxios from "../util/jwtUtil";

const prefix = `${API_SERVER_HOST}/api/clean`;

export const postAdd = async (cleaningObj) => {
  const res = await jwtAxios.post(`${prefix}/`, cleaningObj, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("----------", res);

  return res.data;
};
