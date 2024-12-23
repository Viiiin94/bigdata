import React from "react";

interface ArticleProps {
  selectArticle: string;
  onChangeArticle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ArticleBox = ({ selectArticle, onChangeArticle }: ArticleProps) => {
  return (
    <>
      <div>
        <span className="mr-4 font-bold">접속 url 목록</span>
        <label
          htmlFor="news"
          className={`text-sm cursor-pointer ${
            selectArticle === "news" ? "font-bold text-black" : "text-gray-500"
          }`}
        >
          뉴스
        </label>
        <input
          type="radio"
          id="news"
          value="news"
          name="social"
          className="hidden"
          onChange={onChangeArticle}
        />{" "}
        |{" "}
        <label
          htmlFor="blog"
          className={`text-sm cursor-pointer ${
            selectArticle === "blog" ? "font-bold text-black" : "text-gray-500"
          }`}
        >
          블로그
        </label>
        <input
          type="radio"
          id="blog"
          value="blog"
          name="social"
          className="hidden"
          onChange={onChangeArticle}
        />
      </div>
      <div>
        <ul className="flex flex-col overflow-y-auto h-[12.5rem] border-b">
          <li className="w-full p-1 rounded-lg bg-[#E4EAF2] mb-2 px-2 text-base">
            뉴스 기사 url 제목 API 1
            <span className="float-right text-sm text-zinc-600">
              2024-12-21 00:00
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ArticleBox;
