import React, { useState, useEffect } from "react";
import Analysisheader from "../components/analysisFirst";

const Analysis = () => {
  const [token, setToken] = useState(false);
  // useEffect(() => {
  //   setToken(localStorage.getItem("isloggin"));
  // }, []);
  // if (token === null) {
  //   window.location.href = "/";
  // }
  return (
    <>
      <Analysisheader />
    </>
  );
};
export default Analysis;
