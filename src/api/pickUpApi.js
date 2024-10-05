import jwtAxios from "../util/jwtUtil";

const prefix = '/api/pick-up';

export const postAdd = async (pickUpobj) => {
  console.log("-------" + pickUpobj.get("json"));

  try {
    const res = await jwtAxios.post(prefix+"/", pickUpobj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error in postAdd:", error);
    throw error;
  }
};