import React, { Component } from 'react';
// import { render } from 'react-dom';
// import Tabs from 'react-responsive-tabs';
import classes from "../signup_and_login/LoginForm.module.css";

// IMPORTANT you need to include the default styles
import 'react-responsive-tabs/styles.css';
import StyledDropzone from '../generate_report/Upload';

const atabs = [
  { name: 'Generate', content: <StyledDropzone/> },
  { name: 'In review'  },
  // { name: 'In review', biography: '...' },
  { name: 'Previous reports', biography: '...' },
 
];


export default function getTabs() {
  return atabs.map((atabs, index) => ({
    title: atabs.name,
    getContent: () => atabs.content,
    /* Optional parameters */
    key: index,
    tabClassName: classes.testTab,
    panelClassName: classes.test,
  }));
}
