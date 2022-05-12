import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import LoginForm from "../components/LoginForm";
import getTabs from "../components/tab";

import Tabs from "react-responsive-tabs";
import StyledDropzone from "../components/Upload";
import { Nav, Container } from "react-bootstrap";

import GeneratePage from "../components/GenerateReportPages/GeneratePage";

const gen = () => {
  return <GeneratePage />;
};

export default gen;
