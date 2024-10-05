import circle from "../../assets/icons/write/circle.svg";

const YearCondition = ({ onChangeYear }) => {
  const handleYearChange = (event) => {
    onChangeYear(event.target.value); // 부모 컴포넌트로 선택한 연도 전달
  };

  return (
    <div className="flex items-center space-x-2 mt-3">
      <div className="flex items-center">
        <img src={circle} className="w-[5px] h-[5px] mr-2" alt="circle" />
        <div className="mr-3">연도</div>
      </div>
      <div>
        <select
          className="p-2 w-30 border rounded-s border-gray-300 mr-3"
          onChange={handleYearChange} // 연도 선택 시 이벤트 핸들러 호출
        >
          <option value="">선택</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
    </div>
  );
};

export default YearCondition;
