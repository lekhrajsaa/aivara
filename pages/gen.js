import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import LoginForm from "../components/LoginForm";
import getTabs from "../components/tab";

// import Tabs from "react-responsive-tabs";
// import StyledDropzone from "../components/Upload";
// import { Nav, Container } from "react-bootstrap";
import { useRouter } from "next/router";

import GeneratePage from "../components/GenerateReportPages/GeneratePage";

const gen = () => {
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
          <GeneratePage />
        </>
      )}
    </>
  );
};

export default gen;
