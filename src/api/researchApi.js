import jwtAxios from "../util/jwtUtil";

const prefix = "/api/research"

export const postAdd = async (researchObj) => {
  console.log("-------" + researchObj.get("json"));

  try {
    const res = await jwtAxios.post(prefix+"/", researchObj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("----------res.header: ", res.headers);

    return res.data;
  } catch (error) {
    console.error("Error in postAdd:", error);
    throw error; // 에러를 상위로 전파
  }
};
