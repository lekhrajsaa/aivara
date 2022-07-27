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
