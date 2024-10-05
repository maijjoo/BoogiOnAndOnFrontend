import circle from "../../assets/icons/write/circle.svg";

const YearAndMonthCondition = () => {
  return (
    <div className="flex justify-between items-center mt-3">
      {/* 년 / 월 셀렉트 */}
      <div className="flex items-center">
        <img src={circle} className="w-[5px] h-[5px] mr-2" alt="circle" />
        <div className="mr-3">년 / 월</div>
        <div>
          <select className="p-2 w-30 border rounded-s border-gray-300 mr-3">
            <option>선택</option>
            <option>2023년</option>
            <option>2022년</option>
            <option>2021년</option>
            <option>2020년</option>
          </select>
          <select className="p-2 w-30 border rounded-s border-gray-300">
            <option>선택</option>
            <option>1월</option>
            <option>2월</option>
            <option>3월</option>
            <option>4월</option>
            <option>5월</option>
            <option>6월</option>
            <option>7월</option>
            <option>8월</option>
            <option>9월</option>
            <option>10월</option>
            <option>11월</option>
            <option>12월</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default YearAndMonthCondition;
