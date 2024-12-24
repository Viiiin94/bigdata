import type { YoutubeType } from "../utils/type";

export const YOUTUBE_URL = import.meta.env.VITE_API_YOUTUBE_URL;

export const fetchYoutube = async (value: string) => {
  const response = await fetch(YOUTUBE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: value,
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  if (response.ok) {
    const result: YoutubeType = await response.json();
    return result;
  }
};
