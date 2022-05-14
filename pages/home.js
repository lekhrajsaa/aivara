import React, { useState } from "react";
import Header from "../components/HeaderConditional";
import Profile from "../components/Profile";
import Sidebar from "../components/SideBar/SideBar";
import classes from "../components/LoginForm.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Col, Container, Row } from "reactstrap";

export default function home() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <script
        src="https://kit.fontawesome.com/f80c821559.js"
        crossorigin="anonymous"
      ></script>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <script
        src="https://kit.fontawesome.com/4a4ddc9f6c.js"
        crossorigin="anonymous"
      ></script>
      {/* =======================Header================================= */}
      <Header headerWithSignout={true} />
      <Sidebar highlite={true} />
      {/* ===========================body============================= */}

      <Profile />
    </>
  );
}
