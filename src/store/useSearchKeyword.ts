import { create } from "zustand";
import {
  fetchSearchCounting,
  fetchSearchRelatedWords,
} from "../apis/fetchKeyword";
import { fetchSentiment } from "../apis/fetchSentimental";

import type { GraphData, SentimentType } from "../utils/type";

interface CategoryType {
  category?: string;
  news?: string;
  searchCount: number;
}
interface keywordState {
  keyword: string;
  setKeyword: (_: string) => void;
  relatedData: GraphData;
  categoryData: CategoryType[];
  newsData: CategoryType[];
  sentimentData: SentimentType;
  fetchData: () => Promise<void>;
  isLoading: boolean;
}

const useSearchKeyword = create<keywordState>((set, get) => ({
  keyword: "",
  relatedData: { nodes: [], links: [] },
  categoryData: [],
  newsData: [],
  sentimentData: { word: "", probability: 0, size: 0 },
  isLoading: false,

  setKeyword: (keyword) => set({ keyword }),

  fetchData: async () => {
    const { keyword } = get();
    if (!keyword) return;

    set({ isLoading: true }); // 로딩 상태 시작
    try {
      const searchResponse = await fetchSearchCounting(keyword);
      const forceResponse = await fetchSearchRelatedWords(keyword);
      const sentimetalResponse = await fetchSentiment(keyword);

      if (searchResponse || forceResponse || sentimetalResponse) {
        const resultCategory = searchResponse?.category;
        const resultNews = searchResponse?.news;
        const resultForceGraph2D = forceResponse?.d3Keywords;
        const resultSentimental = sentimetalResponse?.sentimentData;

        set({
          categoryData: resultCategory,
          newsData: resultNews,
          relatedData: resultForceGraph2D,
          sentimentData: resultSentimental,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ isLoading: false });
    }
  },
}));

export default useSearchKeyword;
