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
          <li className="flex place-items-center w-full rounded-lg bg-[#E4EAF2] mb-2 py-1 px-2 text-base relative">
            <img
              src="http://www.google.com/s2/favicons?domain=https://www.nike.com/kr/t/%ED%82%AC%EC%83%B7-2-%EB%82%A8%EC%84%B1-%EC%8B%A0%EB%B0%9C-T0VRB81C/IF0671-700"
              alt="favicon"
              className="mr-2 h-fit min-w-4 inline-block"
            />
            뉴스 기사 url 제목 API 1
            <span className="text-sm text-zinc-600 absolute right-2">
              2024-12-21 00:00
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ArticleBox;
