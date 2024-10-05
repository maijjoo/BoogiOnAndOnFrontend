import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil.js";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  try {
    const res = await axios.get(
      `/api/member/refresh?refreshToken=${refreshToken}`,
      header
    );
    console.log("Refresh JWT Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error refreshing JWT:", error);
    throw error;
  }
};

//before request
const beforeReq = (config) => {
  console.log("before request.............");
  console.log(config);

  const memberInfo = getCookie("member");

  if (!memberInfo) {
    console.log("Member NOT FOUND");
    return Promise.reject({ response: { data: { error: "REQUIRE_LOGIN" } } });
  }
  const { accessToken } = memberInfo;

  // Authorization 헤더 처리
  config.headers.Authorization = `Bearer ${accessToken}`;

  console.log("after inject header:", config);

  return config;
};

//fail request
const requestFail = (err) => {
  console.log("request error............");
  console.log("err: ", err);

  return Promise.reject(err);
};

//before return response
const beforeRes = async (res) => {
  console.log("before return response...........");
  console.log(res);

  //'ERROR_ACCESS_TOKEN'
  const data = res.data;

  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    console.log("Token refresh needed based on response data");
    try {
      const memberCookieValue = getCookie("member");
      const result = await refreshJWT(
        memberCookieValue.accessToken,
        memberCookieValue.refreshToken
      );
      console.log("refreshJWT RESULT", result);

      memberCookieValue.accessToken = result.accessToken;
      memberCookieValue.refreshToken = result.refreshToken;

      setCookie("member", JSON.stringify(memberCookieValue), 1);

      const originalRequest = res.config;
      originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

      return await jwtAxios(originalRequest);
    } catch (error) {
      console.error("Token refresh failed in beforeRes:", error);
      // 여기서 로그아웃 처리나 로그인 페이지로 리디렉션을 수행할 수 있습니다.
      throw error;
    }
  }

  return res;
};

//fail response
const responseFail = async (err) => {
  console.log("response fail error.............");
  console.log("err: ", err);

  const originalRequest = err.config;

  if (err.response && err.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    console.log("Attempting to refresh token");

    try {
      const memberInfo = getCookie("member");
      const result = await refreshJWT(
        memberInfo.accessToken,
        memberInfo.refreshToken
      );

      setCookie(
        "member",
        JSON.stringify({
          ...memberInfo,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        }),
        1
      );

      jwtAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.accessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${result.accessToken}`;

      return jwtAxios(originalRequest);
    } catch (refreshError) {
      console.error("Token refresh failed:", refreshError);
      // 여기서 로그아웃 처리나 로그인 페이지로 리디렉션을 수행할 수 있습니다.
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);

jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
