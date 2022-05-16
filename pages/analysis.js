import React, { useState, useEffect } from "react";
import Analysisheader from "../components/analysisFirst";
import { useRouter } from "next/router";

const Analysis = () => {
  const router = useRouter();
  const [show, setShow]= useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      setShow(false);
      router.push("/")
    }
  })  // useEffect(() => {
  //   setToken(localStorage.getItem("isloggin"));
  // }, []);
  // if (token === null) {
  //   window.location.href = "/";
  // }
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
