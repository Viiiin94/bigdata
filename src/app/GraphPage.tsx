import { FormEvent, useState, ChangeEvent } from "react";

import LineChart from "../components/LineChart";
import DonutChart from "../components/DonutChart";

import {
  fetchSearchCounting,
  fetchSearchRelatedWords,
} from "../apis/fetchKeyword";
import type { GraphData } from "../utils/type";
import ForceGraph2D from "../components/ForceGraph2D";

interface CategoryType {
  category?: string;
  news?: string;
  searchCount: number;
}

function GraphPage() {
  const [text, setText] = useState("");
  const [relatedWords, setRelatedWords] = useState<GraphData>();
  const [category, setCategory] = useState<CategoryType[] | undefined>();
  const [news, setNews] = useState<CategoryType[] | undefined>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const searchResponse = await fetchSearchCounting(text);
      const forceResponse = await fetchSearchRelatedWords(text);
      if (searchResponse || forceResponse) {
        const resultCategory = searchResponse?.category;
        const resultNews = searchResponse?.news;
        const resultForceGraph2D = forceResponse?.d3Keywords;

        setCategory(resultCategory);
        setNews(resultNews);
        setRelatedWords(resultForceGraph2D);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex justify-center mb-8">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative w-[720px]">
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
            value={text}
            onChange={onChange}
            className="block w-full p-4 ps-10 text-sm
                    text-gray-900 border border-gray-300
                      rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
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
      <div className="flex place-items-center justify-center">
        {relatedWords && <ForceGraph2D relatedWords={relatedWords} />}
      </div>
      <div className="flex flex-row mt-8">
        {news && (
          <LineChart
            lineDataKey={news?.map((line) => line.news) as string[]}
            lineDataValue={news?.map((line) => line.searchCount)}
          />
        )}
        {category && (
          <DonutChart
            donutDataKey={category?.map((cate) => cate.category) as string[]}
            donutDataValue={category?.map((cate) => cate.searchCount)}
          />
        )}
      </div>
    </>
  );
}

export default GraphPage;
