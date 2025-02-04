import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import AddUser from "./AddUser";
export default function AdminPanelComponnent() {
  return (
    <>
      <HeaderAdmin />
    
      <Outlet />
    </>
  );
}
