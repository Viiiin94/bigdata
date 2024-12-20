import { createBrowserRouter, RouterProvider } from "react-router";

import Layout from "../layout/Layout";
import GraphPage from "../app/GraphPage";
import NewsPage from "../app/NewsPage";
import WordDivision from "../app/WordDivision";
import Test from "../app/test";

const Router = () => {
  const routes = [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Test />,
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
      ],
    },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Router;
