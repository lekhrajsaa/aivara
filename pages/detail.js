import React, { useState, useEffect } from "react";
import GenerateDetails from "../components/generate_report/GenerateDetails";
// import HeaderApp from "../components/HeaderApp";
import Header from "../components/Header/HeaderConditional";
import { useRouter } from "next/router";

import io from 'socket.io-client';

import { useDispatch } from "react-redux";
import { setAiReportData, setNotification } from "../redux/dataAction";
import { notificationApi } from "../components/Notifications/notificationApi";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

const SOCKET_URL = "https://socket.aivara.in";


const detail = () => {

  const router = useRouter();
  const [show, setShow] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShow(false);
      router.push("/")
    }
  }, []);

    // realtime notification
    const socket = io(SOCKET_URL);
    const dispatch = useDispatch();
  
    useEffect(() => {

      // socket test
      socket.on('test api', (data) => {
        console.log(data);
      });
  
      // listening for ai report generate
      socket.on('report data', (data) => {
        console.log(data);
  
        // notification api calling for notification update
        notificationApi()
          .then((response) => {
            console.log(response.data.data.getNotification.notifications)
            // updating notification data
            dispatch(setNotification(response.data.data.getNotification.notifications.sort(function (a, b) { return b.customTimeStamp - a.customTimeStamp })))
          })
          .catch((err) => {
            console.log(err)
          })
      });
  
    }, [socket])
    // realtime notification
    // realtime notification
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      {show && <>
        <Header headerWithSignout={true} />
        <GenerateDetails />
      </>
      }
    </div>

  );
};

export default detail;
