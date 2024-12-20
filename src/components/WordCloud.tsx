import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

interface SentimentType {
  word: string;
  probability?: number;
  size?: number;
}

interface WordCloudProps {
  sentiment: SentimentType;
  heading: string;
}

const WordCloud = ({ sentiment, heading }: WordCloudProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const processedData: any = Object.values(sentiment)
    .map((value) => ({
      text: value.text,
      size: value.size,
      value: value.size > 0 ? "P" : value.size < 0 ? "N" : "C",
    }))
    .sort((a, b) => b.size - a.size);

  useEffect(() => {
    const width = 800;
    const height = 600;

    d3.select(svgRef.current).selectAll("*").remove();

    const layout = cloud()
      .size([width, height])
      .words(processedData)
      .padding(5)
      .fontSize((d: any) => {
        const absSize = Math.abs(d.size);
        const scaledSize =
          d.size === 0 ? 30 : Math.min(80, Math.max(30, absSize));
        return scaledSize;
      })
      .rotate(() => 0)
      .on("end", draw);

    layout.start();

    function draw(words: any) {
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d: any) => `${d.size}px`)
        .style("fill", (d: any) => {
          if (d.value === "P") return "blue"; // T: 초록색
          if (d.value === "N") return "red"; // N: 빨간색
          return "orange"; // C: 오렌지색
        })
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d: any) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`
        )
        .text((d: any) => d.text);
    }
  }, [sentiment]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{heading}의 긍/부정어</h1>
      <svg
        ref={svgRef}
        width="800"
        height="600"
        style={{ border: "1px solid black" }}
      ></svg>
    </div>
  );
};

export default React.memo(WordCloud);
