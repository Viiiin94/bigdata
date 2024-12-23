import { Outlet } from "react-router";

import Header from "../app/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="w-[85%]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
