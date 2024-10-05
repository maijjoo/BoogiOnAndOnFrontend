import jwtAxios from "../util/jwtUtil";

const prefix = `/api/pick-up`;

export const getSearched = async (searchParam) => {
  console.log(
    "---trash distribution get api called with: {year: ",
    searchParam.year,
    ", month: ",
    searchParam.month,
    ", start: ",
    searchParam.startDate,
    ", end: ",
    searchParam.endDate,
    "}---"
  );

  const res = await jwtAxios.get(`${prefix}/trash-distribution`, {
    params: searchParam,
  });

  console.log("-----------trash distribution get api response: ", res);

  return res;
};
