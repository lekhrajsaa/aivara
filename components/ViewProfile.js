import classes from "./ViewProfile.module.css";
import Tab from "@mui/material/Tab";

import React, { useEffect, useState } from "react";

const LAUNCHES_QUERY = `
{
  getUser {
    name
    labName
    phoneNo
    email
    userId
  }
}`;

const ViewProfile = () => {
  const [launches, setLaunches] = React.useState([]);

  React.useEffect(() => {
    const Token = localStorage.getItem("token");
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Token}`,
        "Content-Type": "application/json",
        // "x-api-key" : `${String(process.env.REACT_APP_API)}`

      },
      body: JSON.stringify({ query: LAUNCHES_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLaunches(data.data.getUser);
      });
  }, []);

  return (
    <>
      <Tab label="Your Profile" className={classes.heading} />
      <Tab label="back" className={classes.back} />
      <div className={classes.details}>
        <div className={classes.parent}>
          <div className={classes.child}>Username :</div>
          <div className={classes.child}>{launches.name} </div>
        </div>
        <div className={classes.parent}>
          <div className={classes.child}>Lab Name :</div>
          <div className={classes.child}>{launches.labName}</div>
        </div>
        <div className={classes.parent}>
          <div className={classes.child}>Email Address :</div>
          <div className={classes.child}>{launches.email} </div>
        </div>
        <div className={classes.parent}>
          <div className={classes.child}>Password :</div>
          <div className={classes.child}>*********</div>
        </div>
      </div>
    </>
  );
};
export default ViewProfile;
