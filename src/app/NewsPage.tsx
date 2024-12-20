import { ChangeEvent, useState, useRef, FormEvent } from "react";

import NewsContainer from "../components/Container/NewsContainer";

import { fetchSearchArticle } from "../apis/fetchArticle";
import type { preNewsType } from "../utils/type";

const NewsPage = () => {
  const [text, setText] = useState<string>("");
  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const [preArticle, setPreArticle] = useState<preNewsType | null>(null);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetchSearchArticle(text);

      if (response) {
        setPreArticle(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResizeHeight = () => {
    const current = textArea.current;
    if (current) {
      current.style.height = "auto";
      const newHeight = current.scrollHeight;
      current.style.height = newHeight > 500 ? "500px" : `${newHeight}px`;
      current.style.overflowY = newHeight > 500 ? "scroll" : "hidden";
    }
  };

  return (
    <section className="min-h-[85vh] w-[1280px]">
      <article className="grid grid-cols-2 w-full gap-4">
        <NewsContainer title="기사 입력 하기">
          <div className="w-full h-full">
            <form onSubmit={onSubmit} className="flex flex-col">
              <div className="p-6 border-b border-[#333] h-[35rem]">
                <textarea
                  className="w-full outline-none text-xl resize-none"
                  placeholder="기사 내용 넣기"
                  ref={textArea}
                  rows={1}
                  onInput={handleResizeHeight}
                  value={text}
                  onChange={onChange}
                ></textarea>
              </div>
              <div className="h-[4.8rem] flex place-content-center bg-[#42d392] rounded-b-xl">
                <button className="text-2xl font-extrabold text-white">
                  기사 분석하기
                </button>
              </div>
            </form>
          </div>
        </NewsContainer>
        <NewsContainer title="기사 분석 결과">
          <div className="h-fit flex flex-col">
            <div className="p-6 h-[40rem] text-start">
              <h2 className="text-xl font-bold mb-2">기사요약</h2>
              <div className="text-sm overflow-y-scroll mb-4">
                {preArticle ? (
                  preArticle.summation_article
                ) : (
                  <p className="text-gray-400">기사요약</p>
                )}
              </div>
              <h2 className="text-xl font-bold mb-2">예측 카테고리</h2>
              <div className="text-sm mb-4">
                {preArticle ? (
                  preArticle.category
                ) : (
                  <p className="text-gray-400">ex. 경제, 문화, 정치</p>
                )}
              </div>
              <h2 className="text-xl font-bold mb-2">핵심 키워드</h2>
              <div className="mb-4">
                <ul className="flex flex-row flex-wrap">
                  {preArticle &&
                    preArticle.w2v.map((item, index) => (
                      <li
                        key={`${index}_${item.prediction}`}
                        className=" text-white bg-black border border-white rounded-3xl py-2 px-4 mr-2 mb-2"
                      >
                        {item.prediction}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </NewsContainer>
      </article>
    </section>
  );
};

export default NewsPage;
