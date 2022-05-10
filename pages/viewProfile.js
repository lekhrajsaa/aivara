import React, { useState, useEffect } from "react";
import HeaderApp from "../components/HeaderApp";
import ViewProfile from "../components/ViewProfile";
export default function home() {
  const [token, setToken] = useState(false);
  useEffect(() => {
    setToken(localStorage.getItem("isloggin"));
  }, []);
  if (token === null) {
    window.location.href = "/";
  }
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
      <HeaderApp></HeaderApp>
      <main>
        <ViewProfile />
      </main>
    </>
  );
}
