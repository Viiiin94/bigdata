import { useState, ChangeEvent, useEffect } from "react";

import ArticleContainer from "../components/Container/ArticleContainer";
import AsideContainer from "../components/Container/AsideContainer";
import Container from "../components/Container/Container";

import CalanderBox from "../components/Box/CalanderBox";
import SocialNetworks from "../components/Box/SocialNetworks";
import ArticleBox from "../components/Box/ArticleBox";

import SearchForm from "../components/Form/SearchForm";

import { socialNetworks, calander } from "../utils/data";

const SentimentPage = () => {
  const [getYear, setGetYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [selectMonth, setSelectMonth] = useState<string>("");
  const [selectSns, setSelectSns] = useState<string[]>([]);
  const [selectArticle, setSelectArticle] = useState<string>("news");

  const decrementYear = () => {
    setGetYear((prevYear) => (parseInt(prevYear) - 1).toString());
  };

  const incrementYear = () => {
    setGetYear((prevYear) => (parseInt(prevYear) + 1).toString());
  };

  const onChangeArticle = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectArticle(e.target.value);
  };

  const onChangeMonth = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectMonth(e.target.value);
  };

  const toggleSns = (article: string) => {
    setSelectSns((prev) =>
      prev.includes(article)
        ? prev.filter((item) => item !== article)
        : [...prev, article]
    );
  };

  useEffect(() => {
    console.log(selectMonth);
  }, [selectMonth]);
  return (
    <Container>
      <AsideContainer>
        <h2 className="text-2xl font-bold mb-8">긍•부정 분석</h2>
        <SearchForm />
        <div className="bg-[#E4EAF2] rounded-lg px-4 py-2 mb-4">
          <CalanderBox
            decrementYear={decrementYear}
            incrementYear={incrementYear}
            getYear={getYear}
            onChangeMonth={onChangeMonth}
            selectMonth={selectMonth}
            calander={calander}
          />
        </div>
        <div className="flex mb-4">
          <SocialNetworks
            socialNetworks={socialNetworks}
            selectSns={selectSns}
            toggleSns={toggleSns}
          />
        </div>
        <div className="h-[232px] border box-border border-[#898989] mb-2">
          그래프
        </div>
        <div>
          <ArticleBox
            selectArticle={selectArticle}
            onChangeArticle={onChangeArticle}
          />
        </div>
      </AsideContainer>
      <ArticleContainer>
        <h2 className="text-2xl font-bold mb-4">긍•부정 워드 클라우드</h2>
        <div className="w-full h-[42%] bg-white rounded-lg mb-8"></div>
        <h2 className="text-2xl font-bold mb-4">긍•부정 추이 분석</h2>
        <div className="w-full h-[42%] bg-white rounded-lg"></div>
      </ArticleContainer>
    </Container>
  );
};

export default SentimentPage;
