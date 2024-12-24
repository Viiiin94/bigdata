import { ChangeEvent, useState, useRef } from "react";

import Container from "../components/Container/Container";
import AsideContainer from "../components/Container/AsideContainer";
import ArticleContainer from "../components/Container/ArticleContainer";
import LinkForm from "../components/Form/LinkForm";

import useSearchYoutube from "../store/useSearchYoutube";

const SummaryPredictionPage = () => {
  const [text, setText] = useState<string>("");
  const textArea = useRef<HTMLTextAreaElement | null>(null);

  const youtubeData = useSearchYoutube((state) => state.youtubeData);
  const isLoading = useSearchYoutube((setText) => setText.isLoading);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
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
        <LinkForm />
        <div className="w-full">
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
        </div>
      </AsideContainer>
      <ArticleContainer>
        <div className="w-full h-[20%] bg-white rounded-lg mb-8 p-4">
          <h2 className="text-2xl font-bold mb-4">요약</h2>
          <p className="overflow-y-auto h-[74px]">
            {isLoading ? (
              "Loading..."
            ) : (
              <div>{youtubeData && youtubeData.summary}</div>
            )}
          </p>
        </div>
        <div className="w-full h-[42%] bg-white rounded-lg mg-8 p-4">
          <h2 className="text-2xl font-bold mb-4">
            {" "}
            {isLoading ? (
              "Loading..."
            ) : (
              <div>
                {youtubeData && (
                  <div className="flex flex-wrap">
                    {Object.entries(youtubeData.keywords).map(([key]) => (
                      <div className="mr-2 mb-2 text-lg font-bold">{key}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </h2>
        </div>
      </ArticleContainer>
    </Container>
  );
};

export default SummaryPredictionPage;
