import React, { useEffect, useState } from "react";
import Header from "../components/HeaderConditional";
import Profile from "../components/Profile";
import Sidebar from "../components/SideBar/SideBar";
import classes from "../components/LoginForm.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";

// import io from 'socket.io-client';
// const SOCKET_URL = "https://dev.aivara.in";

export default function home() {
  
  const router = useRouter();
  const [show, setShow]= useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      setShow(false);
      router.push("/")
    }
  })
  return (
    <>
      {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
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
      ></script> */}
      {/* =======================Header================================= */}
      {show && <>
      <Header headerWithSignout={true} />
      <Sidebar highlite={true} />

      <Profile /* updateReport={updateReport} *//>
      </>
}
    </>
  );
}
