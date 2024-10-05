import circle from "../../assets/icons/write/circle.svg";

const PeriodCondition = () => {
  return (
    <div className="flex justify-between items-center">
      {/* 년 / 월 셀렉트 */}
      <div className="flex items-center">
        <img src={circle} className="w-[5px] h-[5px] mr-2" alt="circle" />
        <div className="mr-3">기간</div>
        <div>
          <input
            type="date"
            className="p-2 w-44 border rounded-s border-gray-300 mr-3"
          />
          ~
          <input
            type="date"
            className="p-2 w-44 border rounded-s border-gray-300 ml-3 mr-3"
          />
        </div>
      </div>
    </div>
  );
};

export default PeriodCondition;
