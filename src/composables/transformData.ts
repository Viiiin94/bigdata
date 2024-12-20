import { GraphData, SearchType, Node, Link } from "../utils/type"; // 타입 임포트

/**
 * API 데이터를 Force Graph용 노드 및 링크로 변환하는 함수
 * @param data - SearchType API 데이터
 * @param primaryKeyword - 검색 키워드 (1계층)
 * @returns GraphData
 */
export const transformSearchData = (
  data: SearchType,
  primaryKeyword: string
): GraphData => {
  const resultNodes: Node[] = [];
  const resultLinks: Link[] = [];
  // 중복 방지를 위한 집합
  const visited = new Set<string>();

  // 1계층: 검색 키워드
  // Helper 함수: 노드 생성 및 연결 추가
  const addNodeAndLinks = (
    parentNode: Node,
    relatedWords: SearchType[string]["연관어"],
    group: number
  ) => {
    for (const [word, details] of Object.entries(relatedWords)) {
      if (!visited.has(word)) {
        // 3계층 노드는 children을 빈 배열로 설정
        const childNode: Node = {
          id: word,
          value: details.검색건수.total,
          group,
          children: group === 3 ? [] : [], // 3계층의 children은 빈 배열
        };
        parentNode.children?.push(childNode); // 부모 노드에 자식 추가
        visited.add(word);

        // 링크 추가
        resultLinks.push({
          source: parentNode.id,
          target: word,
          value: details.연관도 * 100,
        });

        // group이 3보다 작은 경우에만 재귀 호출
        if (group < 3) {
          const grandChildren = data[word]?.연관어;
          if (grandChildren) {
            addNodeAndLinks(childNode, grandChildren, group + 1);
          }
        }
      }
    }
  };

  // 1계층 노드 추가
  if (data[primaryKeyword]) {
    const primaryNode: Node = {
      id: primaryKeyword,
      value: data[primaryKeyword].검색건수.total,
      group: 1,
      children: [],
    };
    resultNodes.push(primaryNode);
    visited.add(primaryKeyword);

    // 2계층 노드 추가
    const relatedWords = data[primaryKeyword].연관어;
    addNodeAndLinks(primaryNode, relatedWords, 2);
  }

  return { nodes: resultNodes, links: resultLinks };
};
