import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "../layout/Layout";

import GraphPage from "../app/GraphPage";
import NewsPage from "../app/NewsPage";
import WordDivision from "../app/WordDivision";
import Homepage from "../app/Homepage";
import MentionPage from "../app/MentionPage";

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
          path: "/related",
          element: <GraphPage />,
        },
        {
          path: "/news",
          element: <NewsPage />,
        },
        {
          path: "/word-division",
          element: <WordDivision />,
        },
        {
          path: "/mention",
          element: <MentionPage />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Router;
