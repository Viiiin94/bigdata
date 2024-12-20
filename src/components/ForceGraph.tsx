// import React, { useRef, useMemo } from "react";
// import ForceGraph2D from "react-force-graph-2d";

// import type { KeywordData } from "../utils/type";
// interface ForceGraphProps {
//   primaryKeyword: string;
//   relatedKeywords: KeywordData | undefined;
// }

// const ForceGraph = ({ primaryKeyword, relatedKeywords }: ForceGraphProps) => {
//   const graphRef = useRef<HTMLDivElement>(null);

//   const computedGraphData = () => {
//     const nodes = new Map<string, { id: string; value: number }>();
//     const links: {
//       source: string;
//       target: string;
//       value?: number;
//     }[] = [];

//     nodes.set(primaryKeyword, { id: primaryKeyword, value: 100 });

//     relatedKeywords?.forEach((keywordData) => {
//       const { keyWords, related } = keywordData;

//       if (!nodes.has(keyWords) || nodes.get(keyWords)!.value < 60) {
//         nodes.set(keyWords, { id: keyWords, value: 60 });
//       }

//       links.push({
//         source: primaryKeyword,
//         target: keyWords,
//         value: 1,
//       });

//       related.forEach((rel) => {
//         const { keyWords: relatedKeyword, relevance } = rel;

//         if (
//           relatedKeyword !== primaryKeyword &&
//           (!nodes.has(relatedKeyword) || nodes.get(relatedKeyword)!.value < 40)
//         ) {
//           nodes.set(relatedKeyword, { id: relatedKeyword, value: 40 });
//         }

//         if (
//           !links.some(
//             (link) => link.source === keyWords && link.target === relatedKeyword
//           )
//         ) {
//           links.push({
//             source: keyWords,
//             target: relatedKeyword,
//             value: relevance,
//           });
//         }
//       });
//     });

//     return {
//       nodes: Array.from(nodes.values()),
//       links,
//     };
//   };

//   const graphData = useMemo(() => computedGraphData(), [relatedKeywords]);

//   return (
//     <div className="relative">
//       <h1 className="text-3xl font-bold mb-4">연관도</h1>
//       <div
//         ref={graphRef}
//         style={{
//           width: "100%",
//           height: "500px",
//           border: "1px solid black",
//           position: "relative",
//         }}
//       >
//         <ForceGraph2D
//           graphData={graphData}
//           width={600}
//           height={500}
//           nodeLabel="id"
//           nodeCanvasObject={(node, ctx) => {
//             ctx.fillStyle =
//               node.value === 100
//                 ? "#333333"
//                 : node.value === 60
//                 ? "blue"
//                 : "orange";
//             const fontSize = (node.value / 20) * 4;
//             const x = node.x ?? 0;
//             const y = node.y ?? 0;
//             ctx.font = `${fontSize}px sans-serif`;
//             ctx.textAlign = "center";
//             ctx.textBaseline = "middle";
//             ctx.fillText(node.id, x, y);
//             ctx.beginPath();
//             ctx.fill();
//           }}
//           d3VelocityDecay={0.9} // 레이아웃 안정화 속도
//           d3AlphaDecay={0.01} // 애니메이션 안정화 속도
//         />
//       </div>
//     </div>
//   );
// };

// export default React.memo(ForceGraph);
