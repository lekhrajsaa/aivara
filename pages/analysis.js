import React, { useState, useEffect } from "react";
import Analysisheader from "../components/analysis_page/analysisFirst";
//useRouter used to route to another page
import { useRouter } from "next/router";
//useDispatch used to dispach data to redux
import { useDispatch } from "react-redux";
import { notificationApi } from "../components/Notifications/notificationApi";
import { setNotification } from "../redux/dataAction";

import io from 'socket.io-client';
const SOCKET_URL = "https://socket.aivara.in";

const Analysis = () => {
  const router = useRouter();
  const [show, setShow] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShow(false);
      router.push("/")
    }
  })  // useEffect(() => {
  //   setToken(localStorage.getItem("isloggin"));
  // }, []);
  // if (token === null) {
  //   window.location.href = "/";
  // }

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
      {show && <>
        <Analysisheader />
      </>
      }
    </>
  );
};
export default Analysis;
