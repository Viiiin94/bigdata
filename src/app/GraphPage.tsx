import LineChart from "../components/LineChart";
import DonutChart from "../components/DonutChart";
import ForceGraph2D from "../components/ForceGraph2D";

import useSearchKeyword from "../store/useSearchKeyword";

const GraphPage = () => {
  const categoryData = useSearchKeyword((state) => state.categoryData);
  const newsData = useSearchKeyword((state) => state.newsData);
  const relatedData = useSearchKeyword((state) => state.relatedData);

  return (
    <>
      <div className="flex place-items-center justify-center">
        {relatedData && <ForceGraph2D relatedWords={relatedData} />}
      </div>
      <div className="flex flex-row mt-8">
        {newsData && (
          <LineChart
            lineDataKey={newsData?.map((line) => line.news) as string[]}
            lineDataValue={newsData?.map((line) => line.searchCount)}
          />
        )}
        {relatedData && (
          <DonutChart
            donutDataKey={
              categoryData?.map((cate) => cate.category) as string[]
            }
            donutDataValue={categoryData?.map((cate) => cate.searchCount)}
          />
        )}
      </div>
    </>
  );
};

export default GraphPage;
