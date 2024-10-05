import jwtAxios from "../util/jwtUtil";

const prefix = `/api/basic-statistics`;

export const getBasicStatisticsApi = async (
  tapCondition,
  year = null,
  month = null,
  beachName = null
) => {
  try {
    // URL에 쿼리스트링을 추가하는 방식으로 요청
    const params = {
      tapCondition: tapCondition, // 필수 파라미터
      year: year || undefined, // year는 선택적 파라미터 (null일 경우 undefined로 처리)
      month: month || undefined, // month는 선택적 파라미터
      beachName: beachName || undefined, // beachName도 선택적 파라미터
    };

    const res = await jwtAxios.get(`${prefix}`, {
      params, // 쿼리스트링으로 파라미터를 전달
      headers: {
        "Content-Type": "application/json", // multipart/form-data 대신 일반 JSON 사용
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching basic statistics:", error);
    throw error;
  }
};
