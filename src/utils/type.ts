// keyword GET parameter
// 검색건수 카테고리
export type CategoryCount = {
  [key: string]: number;
};

//검색건수 뉴스
export type NewsCount = {
  [key: string]: number;
};

//검색건수
export type SearchCount = {
  category: CategoryCount;
  news: NewsCount;
  total: number;
};

//검색 키워드의 연관어(내가 입력한 키워드)
export type RelatedWords = {
  [key: string]: {
    검색건수: SearchCount;
    연관도: number;
    카테고리: string;
  };
};

//검색 키워드 외 키워드(자동으로 딸려오는 키워드)
export type SearchType = {
  [key: string]: {
    검색건수: SearchCount;
    연관어: RelatedWords;
    카테고리: string;
  };
};
//ForceGraph의 연관어 키워드
export type KeywordData = {
  keyWords: string;
  related: {
    keyWords: string;
    relevance: number;
  }[];
}[];

//ForceGraph의 연관도 노드 및 링크 타입
export type Node = {
  id: string;
  value?: number;
  group?: number;
  children?: Node[]; // 하위 노드 배열
};

export type Link = {
  source: string;
  target: string;
  value?: number;
};

export type GraphData = {
  nodes: Node[];
  links: Link[];
};

export type NewsType = {
  category: string;
  origin_data: string;
  pre: string;
  tf_idf: {
    [key: string]: string;
  };
  token_data: string;
  w2v: {
    [key: string]: {
      [key: string]: number;
    };
  };
};

export type preNewsType = {
  category: string;
  origin_article: string;
  pre: string;
  summation_article: string;
  w2v: {
    prediction: string;
    sub_w2v: {
      sub_prediction: string;
      value: number;
    }[];
  }[];
};

export type SentimentType = {
  word: string;
  probability?: number;
  size: number;
};
