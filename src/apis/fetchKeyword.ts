/**
 * GRAPH Keyword
 * 그래프 시각화 API
 */
import { transformSearchData } from "../composables/transformData";
import type { SearchType } from "../utils/type";

export const GRAPH_URL = import.meta.env.VITE_API_GRAPH_URL;

export const fetchSearchData = async (value: string) => {
  const response = await fetch(`${GRAPH_URL}/${value}`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  if (response.ok) {
    const data: SearchType = await response.json();

    const result = Object.keys(data).map((key) => {
      return { [key]: data[key] };
    });

    return result;
  }
};

export const fetchSearchCounting = async (value: string) => {
  const response = await fetch(`${GRAPH_URL}/${value}`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  if (response.ok) {
    const data: SearchType = await response.json();

    // 도넛 그래프에 활용
    const category = Object.entries(data[value]?.검색건수?.category).map(
      ([key, value]) => ({
        category: key,
        searchCount: value,
      })
    );

    // 꺾은선 그래프에 활용
    const news = Object.entries(data[value]?.검색건수?.news).map(
      ([key, value]) => ({
        news: key,
        searchCount: value,
      })
    );

    return {
      category,
      news,
    };
  }
};

export const fetchSearchRelatedWords = async (value: string) => {
  const response = await fetch(`${GRAPH_URL}/${value}`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  if (response.ok) {
    const data: SearchType = await response.json();

    const d3Keywords = transformSearchData(data, value);

    // react-force-graph-2d
    const keyWords = Object.entries(data).map(([key, value]) => ({
      keyWords: key,
      related: Object.entries(value?.연관어 || {}).map(([key, value]) => ({
        keyWords: key,
        relevance: value?.검색건수.total * 100,
      })),
    }));

    const relatedWord = Object.entries(data[value]?.연관어 || {}).map(
      ([key, value]) => ({
        word: key,
        searchCount: value?.검색건수 || {},
        relevance: value?.연관도 || 0,
        category: value?.카테고리 || "",
      })
    );

    return { keyWords, relatedWord, d3Keywords };
  }
};
