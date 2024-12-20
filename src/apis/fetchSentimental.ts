import type { SentimentType } from "../utils/type";

export const SENTIMENT_URL = import.meta.env.VITE_API_SENTIMENT_URL;

/**
 * SENTIMENT DIVISION
 * 긍부정어 API
 */

export const fetchSentiment = async (value: string) => {
  const response = await fetch(`${SENTIMENT_URL}/${value}`);

  try {
    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    if (response.ok) {
      const data = await response.json();

      const sentimentData: SentimentType = data.map(
        ([word, probability, weight]: SentimentType[]) => ({
          text: word,
          probability: probability,
          size: weight,
        })
      );
      return { sentimentData };
    }
  } catch (error) {
    console.error(error);
  }
};
