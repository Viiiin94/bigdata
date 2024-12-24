import { ChangeEvent, useState, useRef, FormEvent } from "react";
import Container from "../components/Container/Container";
import AsideContainer from "../components/Container/AsideContainer";
import ArticleContainer from "../components/Container/ArticleContainer";

import { fetchSearchArticle } from "../apis/fetchArticle";
import type { preNewsType } from "../utils/type";

const SummaryPredictionPage = () => {
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
      current.style.height = newHeight > 637 ? "637px" : `${newHeight}px`;
      current.style.overflowY = newHeight > 637 ? "scroll" : "hidden";
    }
  };
  return (
    <Container>
      <AsideContainer>
        <h2 className="text-2xl font-bold mb-8">기사 및 SNS 분석</h2>
        <div className="w-full h-full">
          <form onSubmit={onSubmit} className="flex flex-col">
            <div className="border-b border-[#333] h-[70vh]">
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
      </AsideContainer>
      <ArticleContainer>
        <div className="w-full h-[20%] bg-white rounded-lg mb-8 p-4">
          <h2 className="text-2xl font-bold mb-4">요약</h2>
          <p className="overflow-y-auto h-[74px]">
            {preArticle && preArticle.summation_article}
          </p>
        </div>
        <div className="w-full h-[42%] bg-white rounded-lg mg-8 p-4">
          <h2 className="text-2xl font-bold mb-4">핵심키워드</h2>
        </div>
      </ArticleContainer>
    </Container>
  );
};

export default SummaryPredictionPage;
