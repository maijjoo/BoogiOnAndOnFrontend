import jwtAxios from "../util/jwtUtil";

const prefix = `/api/pick-up`;

export const getSpots = async (adminId) => {
  console.log(
    "-----------pickUp get api called by: managerId( ",
    adminId,
    " )"
  );

  const res = await jwtAxios.get(`${prefix}/${adminId}`);

  console.log("-----------pickUp get api response: ", res);

  return res.data;
};
