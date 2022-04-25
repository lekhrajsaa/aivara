import classes from "./ViewProfile.module.css";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ViewProfile = () => {
  const router = useRouter();
  const userdata = useSelector((state) => state.userdata.userdata);

  return (
    <>
      <label className={classes.heading}>Your Profile</label>
      <a onClick={() => router.push("/home")} className={classes.back}>
        back
      </a>

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
