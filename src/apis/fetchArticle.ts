/**
 * NEWS Article
 * 뉴스기사 API
 */
import type { NewsType } from "../utils/type";

export const ARTICLE_URL = import.meta.env.VITE_API_NEWS_ARTICLE_URL;

export const fetchSearchArticle = async (value: string) => {
  const response = await fetch(ARTICLE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  if (response.ok) {
    const data: NewsType = await response.json();

    const w2v = Object.entries(data.w2v)
      .filter(([key, value]) => key.length > 1 && Object.keys(value).length > 0)
      .map(([key, value]) => ({
        prediction: key,
        sub_w2v: Object.entries(value)
          .filter(([key]) => key.length > 1)
          .map(([key, value]) => ({
            sub_prediction: key,
            value: value * 100,
          })),
      }))
      .filter((item) => item.sub_w2v.length > 0);

    const result = {
      category: data.category,
      origin_article: data.origin_data,
      pre: data.pre,
      summation_article: data.token_data,
      w2v,
    };

    return result;
  }
};
