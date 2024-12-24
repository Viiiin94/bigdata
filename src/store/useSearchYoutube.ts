import { create } from "zustand";

import { fetchYoutube } from "../apis/fetchYoutube";
import { YoutubeType } from "../utils/type";

interface LinkState {
  link: string;
  setLink: (_: string) => void;
  youtubeData: YoutubeType;
  fetchData: () => Promise<void>;
  isLoading: boolean;
}

const useSearchYoutube = create<LinkState>((set, get) => ({
  link: "",
  youtubeData: {
    category_probs: {},
    keywords: {},
    subtitle_text: "",
    summary: "",
  },
  isLoading: false,

  setLink: (link) => set({ link }),

  fetchData: async () => {
    const { link } = get();
    if (!link) return;

    set({ isLoading: true }); // 로딩 상태 시작
    try {
      const youtubeResponse = await fetchYoutube(link);
      if (youtubeResponse) {
        const resultYoutube = youtubeResponse;
        set({
          youtubeData: resultYoutube,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ isLoading: false });
    }
  },
}));

export default useSearchYoutube;
