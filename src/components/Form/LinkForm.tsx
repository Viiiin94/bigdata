import { FormEvent, ChangeEvent } from "react";

import useSearchYoutube from "../../store/useSearchYoutube";

const LinkForm = () => {
  const searchLink = useSearchYoutube((state) => state.link);
  const setSearchLink = useSearchYoutube((state) => state.setLink);
  const fetchData = useSearchYoutube((state) => state.fetchData);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchLink(e.target.value);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetchData();
  };
  return (
    <form onSubmit={onSubmit} className="flex justify-center mb-4">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative w-full">
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
          value={searchLink}
          onChange={onChange}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300
                    rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white"
          placeholder="Search"
          required
        />
        <button
          type="submit"
          className="text-black absolute end-2.5 bottom-2.5
                    bg-[#fed430] hover:bg-[#fed530b9] focus:ring-4
                      focus:outline-none focus:ring-[#fed430] font-semibold
                      rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default LinkForm;
