import { Outlet } from "react-router";

import Header from "../app/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="my-8">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
