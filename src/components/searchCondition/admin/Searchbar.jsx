import { useState } from "react";

const Searchbar = ({ onSearchInputChange, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchInputChange(value); // 부모 컴포넌트로 검색어 전달
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchValue); // 엔터키를 누르면 검색 실행
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-full p-2 w-96 h-12 focus-within:border-2 focus-within:border-gray-700 hover:border-gray-700">
      <input
        type="text"
        placeholder="해안명을 입력하세요"
        className="outline-none flex-grow text-gray-700 px-4 mr-4"
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // 엔터키 감지
      />
    </div>
  );
};

export default Searchbar;