import React, { useState,useEffect } from "react";
import GenerateDetails from "../components/GeerateDetails";
import HeaderApp from "../components/HeaderApp";
import Header from "../components/HeaderConditional";
import { useRouter } from "next/router";


const detail = () => {
  const router = useRouter();
  const [show, setShow]= useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      setShow(false);
      router.push("/")
    }
  })
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
