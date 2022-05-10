<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
>>>>>>> 8b2429a644d0d106cffbac21e422853c71cc29fc
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import LoginForm from "../components/LoginForm";
import getTabs from "../components/tab";

import Tabs from "react-responsive-tabs";
import StyledDropzone from "../components/Upload";
import {Nav, Container } from "react-bootstrap";

import GeneratePage from "../components/GenerateReportPages/GeneratePage";

const gen = () => {
  return (
          <GeneratePage />
  );
};

export default gen;
