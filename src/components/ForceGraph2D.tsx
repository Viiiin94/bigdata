import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface NodeType {
  id: string;
  value?: number;
  group?: number;
  children?: NodeType[] | null;
  _children?: NodeType[] | null;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  isExpanded?: boolean;
  radius?: number;
}

interface LinkType {
  source: string;
  target: string;
}

interface GraphData {
  nodes: NodeType[];
  links: LinkType[];
}

const ForceGraph2D = ({ relatedWords }: { relatedWords: GraphData }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [filteredData, setFilteredData] = useState<GraphData>({
    nodes: [],
    links: [],
  });

  const flattenData = (data: GraphData): GraphData => {
    const nodes: NodeType[] = [];
    const links: LinkType[] = [];

    const traverse = (node: NodeType, parentId?: string) => {
      nodes.push({ ...node, isExpanded: false }); // 초기 상태 확장 비활성화
      if (parentId) {
        links.push({ source: parentId, target: node.id });
      }
      if (node.children) {
        node.children.forEach((child) => traverse(child, node.id));
      }
    };

    data.nodes.forEach((rootNode) => traverse(rootNode));
    return { nodes, links };
  };

  const toggleNode = (node: NodeType) => {
    if (node.children) {
      node._children = node.children;
      node.children = null;
    } else {
      node.children = node._children || [];
      node._children = null;
    }

    const updatedData = { ...relatedWords };
    const updateNode = (nodes: NodeType[]) => {
      nodes.forEach((n) => {
        if (n.id === node.id) {
          n.children = node.children;
          n._children = node._children;
        }
        if (n.children) updateNode(n.children);
      });
    };
    updateNode(updatedData.nodes);

    setFilteredData(flattenData(updatedData));
  };

  useEffect(() => {
    setFilteredData(flattenData(relatedWords));
  }, [relatedWords]);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 950;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove(); // SVG 초기화

    const zoomG = svg.append("g");

    // Zoom 설정
    const zoom = d3
      .zoom<SVGSVGElement, any>()
      .scaleExtent([0.5, 5])
      .on("zoom", (event) => zoomG.attr("transform", event.transform));
    svg.call(zoom);

    const simulation = d3
      .forceSimulation(filteredData.nodes)
      .force(
        "link",
        d3
          .forceLink(filteredData.links)
          .id((d: any) => d.id)
          .distance((link: any) => {
            const sourceGroup = link.source.group;
            const targetGroup = link.target.group;

            // 그룹 간 거리 설정
            if (sourceGroup === 1 && targetGroup === 2) return 100; // group 1 ↔ group 2
            if (sourceGroup === 2 && targetGroup === 3) return 100; // group 2 ↔ group 3
            return 100; // 기본 거리
          })
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d: any) => d.radius + 1)
          .iterations(3)
      )
      .force("center", d3.forceCenter(width / 2, height / 2));

    // 링크
    const link = zoomG
      .append("g")
      .selectAll("line")
      .data(filteredData.links)
      .enter()
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1);

    // 노드
    const node = zoomG
      .append("g")
      .selectAll("g")
      .data(filteredData.nodes)
      .enter()
      .append("g")
      .call(
        d3
          .drag<SVGGElement, any>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append("circle")
      .attr("r", 50)
      .attr("fill", (d) =>
        d.group === 1 ? "#333" : d.group === 2 ? "#85a5f2" : "#62c796"
      )
      .style("cursor", "pointer")
      .on("click", (_, d) => {
        if (d.group !== 3) {
          toggleNode(d);
        }
      });

    node
      .append("text")
      .attr("dy", 4)
      .attr("text-anchor", "middle")
      .style("cursor", "pointer")
      .attr("fill", "#fff")
      .text((d) => d.id)
      .on("click", (_, d) => {
        if (d.group !== 3) {
          toggleNode(d);
        }
      });

    node.each(function (d) {
      const textElement = d3
        .select(this)
        .select("text")
        .node() as SVGTextElement;

      if (textElement) {
        const textLength = textElement.getBBox().width; // 텍스트 길이 계산
        d.radius = Math.max(textLength / 2 + 10, 20); // 반지름 계산

        // circle 반지름 업데이트
        if (d.group !== 1) {
          d3.select(this).select("circle").attr("r", d.radius);
        }
      }
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
    });
  }, [filteredData]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">키워드 연관어</h1>
      <svg
        ref={svgRef}
        width="950"
        height="600"
        style={{ border: "1px solid black" }}
      ></svg>
    </div>
  );
};

export default React.memo(ForceGraph2D);
