import searchIcon from "../../assets/icons/write/Search.png";
const Search = () => {
  return (
    <button
      className="px-4 py-2 w-24 h-12 bg-blue-700 text-white rounded-md flex items-center justify-center ml-5"
      onClick={() => {}}
    >
      <img src={searchIcon} alt="searchIcon" className="w-5 h-5" />
      <div>검색</div>
    </button>
  );
};

export default Search;
