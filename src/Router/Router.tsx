import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "../layout/Layout";

// import GraphPage from "../app/GraphPage";
// import WordDivision from "../app/WordDivision";
import NewsPage from "../app/NewsPage";
import Homepage from "../app/Homepage";
import MentionPage from "../app/MentionPage";
import RelatedPage from "../app/RelatedPage";
import SentimentPage from "../app/SentimentPage";

const Router = () => {
  const routes = [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/mention",
          element: <MentionPage />,
        },
        {
          path: "/related",
          element: <RelatedPage />,
        },
        {
          path: "/sentiment",
          element: <SentimentPage />,
        },
        {
          path: "/news",
          element: <NewsPage />,
        },
        // {
        //   path: "/related1",
        //   element: <GraphPage />,
        // },
        // {
        //   path: "/word-division",
        //   element: <WordDivision />,
        // },
      ],
    },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Router;
