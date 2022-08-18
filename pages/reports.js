import React, { useEffect, useState } from "react";
import Header from "../components/Header/HeaderConditional";
import Profile from "../components/reports_page/Profile";
import Sidebar from "../components/SideBar/SideBar";
// import classes from "../components/LoginForm.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";

import { notificationApi } from "../components/Notifications/notificationApi";
import { setNotification } from "../redux/dataAction";
import { useDispatch } from "react-redux";
import io from 'socket.io-client';
const SOCKET_URL = "https://socket.aivara.in";

export default function home() {

  // realtime notification
  const socket = io(SOCKET_URL);
  const dispatch = useDispatch();

  useEffect(() => {

    socket.on('test api', (data) => {
      console.log(data);
    });

    socket.on('report data', (data) => {
      console.log(data);

      notificationApi()
        .then((response) => {
          console.log(response.data.data.getNotification.notifications)
          dispatch(setNotification(response.data.data.getNotification.notifications.sort(function (a, b) { return b.customTimeStamp - a.customTimeStamp })))
        })
        .catch((err) => {
          console.log(err)
        })
    });

  }, [socket])
  // realtime notification

  const router = useRouter();
  const [show, setShow] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShow(false);
      router.push("/")
    }
  })
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
      {show && <>
        <Header headerWithSignout={true} />
        <Sidebar highlite={true} />

        <Profile  />
      </>
      }
    </>
  );
}
