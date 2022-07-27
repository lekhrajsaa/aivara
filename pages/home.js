import React, { useEffect, useState } from "react";

import Header from "../components/HeaderConditional";
import Sidebar from "../components/SideBar/SideBar";
import NewHome from "../components/newHome";
import { useRouter } from "next/router";
import NotificationBox from "../components/Notifications/notificationBox";

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
      ></script>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      ></link> */}

      {show && (
        <>
          <Header headerWithSignout={true} />
          <NotificationBox />
          <Sidebar highlitehome={true} />
          <NewHome />
        </>
      )}
    </>
  );
}
