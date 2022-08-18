import react from "react";
//useRouter used to route to different pages
import { useRouter } from "next/router";

import classes from "./EmailVerified.module.css";
//Message to be displayed once the email is verified
const EmailVerified = () => {
  const router = useRouter();
  return (
    <>
      <div className={classes.circle}>
        <img src="./circle_tick.png"></img>
      </div>
      <div className={classes.txt}>
        <p>You have successfully verified</p>
        <p>your email.</p>
      </div>
    </>
  );
};
export default EmailVerified;
