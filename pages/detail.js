import React, { useState, useEffect } from "react";
import GenerateDetails from "../components/GenerateDetails";
import HeaderApp from "../components/HeaderApp";
import Header from "../components/HeaderConditional";
import { useRouter } from "next/router";

import io from 'socket.io-client';

import { useDispatch } from "react-redux";
import { setAiReportData } from "../redux/dataAction";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

const detail = () => {
  const socket = io(`https://socket-server-demo-i.herokuapp.com`);//* socket url

  const dispatch = useDispatch();

  const [isRealTimeData, setIsRealTimeData] = useState(false);
  const [realtimeData, setRealtimeData] = useState({});

  const router = useRouter();
  const [show, setShow] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShow(false);
      router.push("/")
    }
  }, []);

  useEffect(() => {
    socket.on('report data', (data) => {
      console.log(data);

      setIsRealTimeData(data.flag);
      setRealtimeData(data);
    });
  }, [socket])

  //if realtime data received and flag is true
  if (isRealTimeData) {
    console.log(realtimeData, "gg");

    if (realtimeData.token && realtimeData.reportId) {
      var myHeaders = new Headers();
      myHeaders.append("x-api-key", "d002d6d0-500e-42a4-a6c9-c18a74b81d88");
      myHeaders.append("Authorization", `Bearer ${realtimeData.token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`${SERVER_URL}userReportData/${realtimeData.reportId}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          dispatch(setAiReportData(JSON.parse(result)))
          router.push("/analysis")
        })
        .catch(error => console.log('error', error));
    }

  }


  // const [token, setToken] = useState(false);
  // useEffect(() => {
  //   setToken(localStorage.getItem("isloggin"));
  // }, []);
  // if (token === null) {
  //   window.location.href = "/";
  // }
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
