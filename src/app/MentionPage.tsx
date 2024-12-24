import { useState, ChangeEvent, useEffect } from "react";

import LineChart2D from "../components/LineChart2D";

import Container from "../components/Container/Container";
import ArticleContainer from "../components/Container/ArticleContainer";
import AsideContainer from "../components/Container/AsideContainer";
import CalanderBox from "../components/Box/CalanderBox";
import SocialNetworks from "../components/Box/SocialNetworks";
import ArticleBox from "../components/Box/ArticleBox";
import SearchForm from "../components/Form/SearchForm";

import { socialNetworks, calander } from "../utils/data";
import useSearchKeyword from "../store/useSearchKeyword";

const MentionPage = () => {
  const newsData = useSearchKeyword((state) => state.newsData);

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
        <h2 className="text-2xl font-bold mb-8">언급량 분석</h2>
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
        <div>
          <div
            className="w-full flex place-items-center py-4 px-8 mb-2 rounded-lg
                        bg-gradient-to-br from-[#E589CA] to-[#EF855B] justify-between"
          >
            <span className="">언급량이 많은 채널</span>

            <h3 className="text-4xl">
              뉴스 <strong className="text-white">NEWS</strong>
            </h3>
          </div>
          <div
            className="w-full flex place-items-center py-4 px-8 mb-2 rounded-lg
                        bg-gradient-to-br from-[#89B2F0] to-[#70DD80] justify-between"
          >
            <span className="">언급량이 가장 많은 날짜</span>
            <h3 className="text-4xl">2024.12.20</h3>
          </div>
          <div
            className="w-full flex place-items-center py-4 px-8 mb-2 rounded-lg
                        bg-gradient-to-br from-[#D48CF2] to-[#F3C965] justify-between"
          >
            <span className="">총 언급량</span>
            <h3 className="text-4xl">2,000</h3>
          </div>
        </div>
        <div>
          <ArticleBox
            selectArticle={selectArticle}
            onChangeArticle={onChangeArticle}
          />
        </div>
      </AsideContainer>

      <ArticleContainer>
        <h2 className="text-2xl font-bold mb-4">언급량 추이</h2>
        <div className="w-full h-[42%] bg-white rounded-lg mb-8">
          {newsData && newsData.length > 0 ? (
            <LineChart2D
              lineDataKey={newsData.map((line) => line.news) as string[]}
              lineDataValue={newsData.map((line) => line.searchCount)}
            />
          ) : (
            <></>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-4">언급량</h2>
        <div className="w-full h-[42%] bg-white rounded-lg"></div>
      </ArticleContainer>
    </Container>
  );
};

export default MentionPage;
