import React, { useState, useEffect } from "react";
import Footer from "../components/footer/Footer";
// import HeaderApp from "../components/HeaderApp";
// import LoginForm from "../components/LoginForm";
// import getTabs from "../components/generate_report/tab";

// import Tabs from "react-responsive-tabs";
// import StyledDropzone from "../components/Upload";
// import { Nav, Container } from "react-bootstrap";
import { useRouter } from "next/router";

import GeneratePage from "../components/generate_report/GeneratePage";
import { useDispatch } from "react-redux";
import { notificationApi } from "../components/Notifications/notificationApi";
import { setNotification } from "../redux/dataAction";

import io from 'socket.io-client';
const SOCKET_URL = "https://socket.aivara.in";


const gen = () => {
  const router = useRouter();
  const [show, setShow] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShow(false);
      router.push("/");
    }
  });

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

  return (
    <>
      {show && (
        <>
          <GeneratePage />
        </>
      )}
    </>
  );
};

export default gen;
