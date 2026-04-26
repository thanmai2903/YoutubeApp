import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Head from "./Head";
import { useSelector } from "react-redux";

const Body = () => {
  const isMenuOpen = useSelector(
    (store) => store.app.isMenuOpen
  );

  return (
    <>
      <Head />

      <div className="pt-16">
  <Sidebar />

  <main
  className={`transition-all duration-300 ease-in-out ${
    isMenuOpen ? "ml-56" : "ml-20"
  }`}
>
  <Outlet />
</main>
</div>
    </>
  );
};

export default Body;