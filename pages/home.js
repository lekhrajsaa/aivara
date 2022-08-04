import React, { useEffect, useState } from "react";

import Header from "../components/HeaderConditional";
import Sidebar from "../components/SideBar/SideBar";
import NewHome from "../components/newHome";
import { useRouter } from "next/router";
import NotificationBox from "../components/Notifications/notificationBox";
import { notificationApi } from "../components/Notifications/notificationApi";
import { setNotification } from "../redux/dataAction";
import { useDispatch } from "react-redux";
import io from 'socket.io-client';
const SOCKET_URL = "https://socket.aivara.in";


export default function newHom() {
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
          <Header headerWithSignout={true} />
          {/* <NotificationBox /> */}
          <Sidebar highlitehome={true} />
          <NewHome />
        </>
      )}
    </>
  );
}
