import WordCloud from "../components/WordCloud";

import useSearchKeyword from "../store/useSearchKeyword";

const WordDivision = () => {
  const searchKeyword = useSearchKeyword((state) => state.keyword);
  const sentiment = useSearchKeyword((state) => state.sentimentData);

  return (
    <div>
      {sentiment && <WordCloud sentiment={sentiment} heading={searchKeyword} />}
    </div>
  );
};

export default WordDivision;
