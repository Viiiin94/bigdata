import WordCloud from "../components/WordCloud";

import useSearchKeyword from "../store/useSearchKeyword";

const WordDivision = () => {
  const sentiment = useSearchKeyword((state) => state.sentimentData);

  return <div>{sentiment && <WordCloud sentiment={sentiment} />}</div>;
};

export default WordDivision;
