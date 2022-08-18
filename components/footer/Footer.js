import React from "react";
//container used for the box to display message inside
import { Container } from "reactstrap";
import classes from "../signup_and_login/LoginForm.module.css";

//message to display at bottom of the page
const Footer = () => {
  return (
     <Container fluid className={classes.footer}>
      By continuing, you acknowledge that you have read and understood, and
      agree to Aivara’s Terms of Service and Privacy Policy.
    </Container>
 
   
  );
};

export default Footer;
