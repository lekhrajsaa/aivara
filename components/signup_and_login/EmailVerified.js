import react from "react";
import {BsArrowLeft} from 'react-icons/bs';
import { useRouter } from "next/router";
import classes from "./EmailVerified.module.css";

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
