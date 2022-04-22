import classes from "./ViewProfile.module.css";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// const LAUNCHES_QUERY = `
// {
//   getUser {
//     name
//     labName
//     phoneNo
//     email
//     userId
//   }
// }`;

const ViewProfile = () => {
  // const [launches, setLaunches] = React.useState([]);
  const router = useRouter();
  const userdata = useSelector((state) => state.userdata.userdata);
  console.log(userdata);
  // React.useEffect(() => {
  //   const Token = localStorage.getItem("token");
  //   fetch("http://localhost:5000/graphql", {
  //     method: "POST",
  //     headers: {
  //       "Authorization": `Bearer ${Token}`,
  //       "Content-Type": "application/json",
  //       // "x-api-key" : `${String(process.env.REACT_APP_API)}`

  //     },
  //     body: JSON.stringify({ query: LAUNCHES_QUERY }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLaunches(data.data.getUser);
  //     });
  // }, []);

  return (
    <>
      {/* <Tab label="Your Profile" className={classes.heading} /> */}
      <label className={classes.heading}>Your Profile</label>
      <a onClick={() => router.push("/home")} className={classes.back}>
        back
      </a>
      {/* <Tab label="back" className={classes.back} /> */}
      <div className={classes.details}>
        <div className={classes.parent}>
          <div className={`${classes.child} ${classes.tit}`}>Username :</div>
          <div className={`${classes.child} ${classes.val}`}>
            {userdata.name}
          </div>
        </div>
        <div className={classes.parent}>
          <div className={`${classes.child} ${classes.tit}`}>Lab Name :</div>
          <div className={`${classes.child} ${classes.val}`}>
            {userdata.labName}
          </div>
        </div>
        <div className={classes.parent}>
          <div className={`${classes.child} ${classes.tit}`}>
            Email Address :
          </div>
          <div className={`${classes.child} ${classes.val}`}>
            {userdata.email}{" "}
          </div>
        </div>
        <div className={classes.parent}>
          <div className={`${classes.child} ${classes.tit}`}>Password :</div>
          {/* <div className={classes.child}>*********</div> */}
          <input
            disabled
            id="myInput"
            type="password"
            name="pass"
            value={userdata.password}
            className={`${classes.child} ${classes.val} ${classes.input}`}
          />
        </div>
      </div>
    </>
  );
};
export default ViewProfile;
