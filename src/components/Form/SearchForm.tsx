import { FormEvent, ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router";

import useSearchKeyword from "../../store/useSearchKeyword";

const SearchForm = () => {
  const searchKeyword = useSearchKeyword((state) => state.keyword);
  const setSearchKeyword = useSearchKeyword((state) => state.setKeyword);
  const fetchData = useSearchKeyword((state) => state.fetchData);

  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetchData();
    if (location.pathname.includes("/word-division")) {
      return navigate(`/word-division?keyword=${searchKeyword}`);
    }
    navigate(`/related?keyword=${searchKeyword}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex justify-center">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative w-80">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          value={searchKeyword}
          onChange={onChange}
          className="block w-full p-4 ps-10 text-sm
                    text-gray-900 border border-gray-300
                      rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="이 곳에 입력 금지"
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5
                    bg-blue-700 hover:bg-blue-800 focus:ring-4
                      focus:outline-none focus:ring-blue-300 font-medium
                      rounded-lg text-sm px-4 py-2 dark:bg-blue-600
                      dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
