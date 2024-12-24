import { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

interface LineChartProps {
  lineDataKey: Array<string>;
  lineDataValue: Array<number>;
}

const LineChart = ({ lineDataKey, lineDataValue }: LineChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const renderChart = useCallback(() => {
    if (!containerRef.current || !svgRef.current) return;

    // 부모 요소 크기 계산
    const { clientWidth, clientHeight } = containerRef.current;

    // 마진 설정
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = clientWidth - margin.left - margin.right;
    const height = clientHeight - margin.top - margin.bottom;

    // 데이터 매핑
    const data = lineDataKey.map((key, i) => ({
      x: key,
      y: lineDataValue[i],
    }));

    // SVG 초기화
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${clientWidth} ${clientHeight}`) // 동적 크기
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X축 스케일
    const xScale = d3.scalePoint().domain(lineDataKey).range([0, width]);

    // Y축 스케일
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(lineDataValue) || 0])
      .nice()
      .range([height, 0]);

    // X축
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickSize(0))
      .selectAll("text")
      .style("font-size", "0.8rem")
      .attr("dy", "1.5rem")
      .style("text-anchor", "middle");

    // Y축
    svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "0.8rem");

    // 선 그리기
    const line = d3
      .line<{ x: string; y: number }>()
      .x((d) => xScale(d.x) || 0)
      .y((d) => yScale(d.y));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0CD3FF")
      .attr("stroke-width", 2)
      .attr("d", line as any);

    const tooltip = d3
      .select(containerRef.current)
      .append("div")
      .style("position", "absolute")
      .style("background", "rgba(0, 0, 0, 0.7)")
      .style("color", "#fff")
      .style("padding", "5px 10px")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("display", "none");

    // 데이터 포인트
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x) || 0)
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 4)
      .attr("fill", "#0CD3FF")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .on("mouseover", (event, d) => {
        tooltip.style("display", "block").html(`${d.x} : ${d.y}건`); // 툴팁 내용
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 10 + "px") // 마우스 위치 기준
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("display", "none"); // 툴팁 숨기기
      });
  }, [lineDataKey, lineDataValue]);

  useEffect(() => {
    renderChart();
    window.addEventListener("resize", renderChart); // 크기 변경에 따른 리렌더링
    return () => window.removeEventListener("resize", renderChart);
  }, [renderChart]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  );
};

export default LineChart;
