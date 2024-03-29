import React from "react";
import classes from "./LoginForm.module.css";
import { useState } from "react";
//Slide used for the animation of slide while filling the form
import Slide from "react-reveal/Slide";
//Cookies used to store name
import Cookies from "js-cookie";
//container used for the box to display content inside it
import { Col, Container, Row } from "reactstrap";
//Stack used to display error message one on another on login and signup
import Stack from "@mui/material/Stack";
//Snackbar used to display error message 
import Snackbar from "@mui/material/Snackbar";
//MuiAlert used for alerts errors
import MuiAlert from "@mui/material/Alert";
//react-pro-sidebar used for the sidebar present in login and signup page
import { ProSidebar, SidebarContent } from "react-pro-sidebar";
import Header from "../Header/Header";
import "react-pro-sidebar/dist/css/styles.css";
import sidebar from "../SideBar/Sidenav.module.css";
import Footer from "../footer/Footer";
//validator used to validate password and its condition
import validator from "validator";
//unused imports might be deleted later
import { set } from "lodash";
import axios from "axios";
import Button from "@mui/material/Button";


//Alert on a page
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
var errors;
//Signup form
const SignUpForm = () => {
  //Capture name from the form
  const [name, setName] = useState("");
  //capture email from the form
  const [email, setEmail] = useState("");
  //capture phoneNumber from the form
  const [phoneNumber, setPhoneNumber] = useState("");
  //Capture labName from the form
  const [labName, setLabName] = useState("");
  //Capture password from the form
  const [password, setPassword] = useState("");
  //Capture confirmPassword from the form
  const [confirmPassword, setConfirmPassword] = useState("");
  //toggle the message to display on the form
  const [showName, setShowName] = useState(true);
  //show email on form once back button is clicked
  const [showEmail, setShowEmail] = useState(false);
  //show labName on form once back button is clicked
  const [showLabName, setShowLabName] = useState(false);
  //show Phone Number on form once back button is clicked
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  //show password on form once back button is clicked
  const [showPassword, setShowPassword] = useState(false);
  //Show confirmPassword on form once back button is clicked
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  //Message to display while filling form
  const [text, setText] = useState("Enter name");
  //setNameDisplay used to toggle when to show it or not
  const [nameDisplay, setNameDisplay] = useState("name");
  //setLabNameDisplay used to toggle when to show it or not
  const [labNameDisplay, setLabNameDisplay] = useState("hidden");
  //setEmailDisplay used to toggle when to show it or not
  const [emailDisplay, setEmailDisplay] = useState("hidden");
  //setPhoneNumberDisplay used to toggle when to show it or not
  const [phoneNumberDisplay, setPhoneNumberDisplay] = useState("hidden");
  //setPhoneNumberDisplay used to toggle when to show it or not
  const [passwordDisplay, setPasswordDisplay] = useState("hidden");
  //setConfirmPasswordDisplay //used to toggle when to show it or not
  const [confirmPasswordDisplay, setConfirmPasswordDisplay] =
    useState("hidden");
    //to confirm wether the given input is correct and validate successfully
  const [success, setSuccess] = useState(false);
  //to display error message if there exists any
  const [ErrorMessage, setErrorMessage] = useState(false);

//function to validate email if its valid or not
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  //function to validate phone number 
  const validatePhoneNumber = (number) => {
    return String(number).match(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    );
  };
//function to validate password in its length,upercase,lowercase,symbols
  const Passwordvalidate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return true;
    } else {
      return false;
    }
  };

//not used might be deleted later
  let textinfo = () => {
    <div>
      <h1>Strong password</h1>
    </div>;
  };
//function to handle once the back button is pressed on signup page
  const handleBack = () => {
    if (showLabName) {
      setShowLabName(false);
      setText("Enter name");
      setNameDisplay("text");
      setShowName(true);
    }
    if (showPhoneNumber) {
      setShowPhoneNumber(false);

      setText("Enter lab name");
      setLabNameDisplay("text");
      setShowLabName(true);
    }
    if (showEmail) {
      setShowEmail(false);

      setText("enter phone number");
      setPhoneNumberDisplay("number");
      setShowLabName(false);
      setLabNameDisplay("hidden");
      setShowPhoneNumber(true);
    }
    if (showPassword) {
      setShowEmail(true);
      setPhoneNumberDisplay("hidden");
      setText("enter email id");
      setEmailDisplay("email");
      setShowName(false);
      setPasswordDisplay("hidden");
      setNameDisplay("hidden");

      setShowPassword(false);
    }
    if (showConfirmPassword) {
      setConfirmPasswordDisplay("hidden");
      setShowPassword(true);
      setShowPhoneNumber(false);
      setEmailDisplay("hidden");
      setText("enter password");
      setPhoneNumberDisplay("hidden");
      setShowName(false);
      setNameDisplay("hidden");
      setPasswordDisplay("password");

      setShowConfirmPassword(false);
    }
  };

  //function to handle form once enter button is pressed
  const enterKey = async (e) => {
    if (e.key === "Enter") {
      if (showName) {
        setShowLabName(true);
        setNameDisplay("hidden");
        setText("enter lab name");
        setLabNameDisplay("text");
        setShowName(false);
      }
      if (showLabName) {
        setShowPhoneNumber(true);
        setLabNameDisplay("hidden");
        setText("enter phone number");
        setPhoneNumberDisplay("text");
        setShowLabName(false);
      }
      if (showPhoneNumber) {
        if (validatePhoneNumber(phoneNumber)) {
          setShowEmail(true);
          setPhoneNumberDisplay("hidden");
          setText("enter email id");
          setEmailDisplay("email");
        } else {
          setShowPhoneNumber(true);
          errors = "Enter valid phone number";
          setErrorMessage(true);
        }
      }
      if (showEmail) {
        if (validateEmail(email)) {
          setShowPassword(true);
          setEmailDisplay("hidden");
          setText("enter password");
          setPasswordDisplay("password");
        } else {
          setShowEmail(true);
          errors = " Enter valid email";
          setErrorMessage(true);
        }
      }

      if (showPassword) {
        if (Passwordvalidate(password)) {
          setShowConfirmPassword(true);
          setPasswordDisplay("hidden");
          setText("confirm  password");
          setConfirmPasswordDisplay("password");
        } else {
          // errors = "please Enter valid password";
          errors = (
            <div>
              <h6>Password must contains</h6>
              <div className={classes.PasswordValid}>
                <li>Minmum 8 Character</li>
                <li>At least one Number</li>
                <li>At least one Uppercase</li>
                <li>At least one Special Charaters</li>
              </div>
            </div>
          );
          setErrorMessage(true);
        }
      }
      if (showConfirmPassword) {
        console.log(
          name,
          labName,
          email,
          phoneNumber,
          password,
          confirmPassword
        );
        if (validateEmail(email)) {
          if (password === confirmPassword) {
            console.log("Password Matched");
            // setSuccess(true);
            localStorage.setItem("name", name);
            Cookies.set("name", name);
            // window.location.href="/home"

            //Register API here
            let body = {
              query: `mutation {
              signup(signupInput:{
                name:"${String(name)}",
                labName:"${String(labName)}",
                phoneNo:"${String(phoneNumber)}",
                email:"${String(email)}",
                password:"${String(password)}",
                confirmPassword:"${String(confirmPassword)}"
              }) {
                message,
                status
              }
          }`,
              variables: {},
            };
            let options = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            
//Api call to post all the details and validate it
            fetch(`${process.env.NEXT_PUBLIC_SERVER_API}api/v1`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (data.errors && data.errors[0].status === 401) {
                  console.log(data.errors[0].message);
                  errors = data.errors[0].message;
                  setErrorMessage(true);
                }

                if (data.errors && data.errors[0].status === 401) {
                  console.log(data.errors[0].message);
                  errors = data.errors[0].message;
                  setErrorMessage(true);
                } else {
                  if (data != null && data.data.signup.status === 200) {
                    localStorage.setItem("email", email);
                    window.location.href = "/verify";
                  } else {
                    errors = "server Error";
                    setErrorMessage(true);
                  }
                }
              });

            localStorage.setItem("email", email);
            // window.location.href="/verify"
          } else {
            console.log("password Not matched");
            setConfirmPassword(true);
            errors = "password Not matched";
            setErrorMessage(true);
          }
        } else {
          console.log(" Enter valid email address");
        }
      }
    }
  };
//function to manipulate form according to the field
  const changeField = async () => {
    if (showName) {
      setShowLabName(true);
      setNameDisplay("hidden");
      setText("enter lab name");
      setLabNameDisplay("text");
      setShowName(false);
    }
    if (showLabName) {
      setShowPhoneNumber(true);
      setLabNameDisplay("hidden");
      setText("enter phone number");
      setPhoneNumberDisplay("text");
      setShowLabName(false);
    }
    if (showPhoneNumber) {
      if (validatePhoneNumber(phoneNumber)) {
        setShowEmail(true);
        setPhoneNumberDisplay("hidden");
        setText("enter email id");
        setEmailDisplay("email");
      } else {
        setShowPhoneNumber(true);
        errors = "Enter valid phone number";
        setErrorMessage(true);
      }
    }
    if (showEmail) {
      if (validateEmail(email)) {
        setShowPassword(true);
        setEmailDisplay("hidden");
        setText("enter password");
        setPasswordDisplay("password");
      } else {
        setShowEmail(true);
        errors = " Enter valid email";
        setErrorMessage(true);
      }
    }

    if (showPassword) {
      if (Passwordvalidate(password)) {
        setShowConfirmPassword(true);
        setPasswordDisplay("hidden");
        setText("confirm  password");
        setConfirmPasswordDisplay("password");
      } else {
        //error message
        errors = (
          <div>
            <h6>Password must contains</h6>
            <div className={classes.PasswordValid}>
              <li>Minmum 8 Character</li>
              <li>At least one Number</li>
              <li>At least one Uppercase</li>
              <li>At least one Special Charaters</li>
            </div>
          </div>
        );
        setErrorMessage(true);
      }
    }
    if (showConfirmPassword) {
      console.log(name, email, labName, phoneNumber, password, confirmPassword);
      if (validateEmail(email)) {
        if (password === confirmPassword) {
          console.log("Password Matched");
          setSuccess(true);
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          Cookies.set("name", name);
          // window.location.href="/home"
          //Register API here

          let body = {
            query: `mutation{
              signup(signupInput:{
                name:"${String(name)}",
                labName:"${String(labName)}",
                phoneNo:"${String(phoneNumber)}",
                email:"${String(email)}",
                password:"${String(password)}",
                confirmPassword:"${String(confirmPassword)}"
              }) {
                message
                status
              }
          }`,
            variables: {},
          };
          let options = {
            headers: {
              "Content-Type": "application/json",
            },
          };
    //Api call to submit all the details of the user

          fetch(`${process.env.NEXT_PUBLIC_SERVER_API}api/v1`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.errors && data.errors[0].status === 401) {
                console.log(data.errors[0].message);
                errors = data.errors[0].message;
                setErrorMessage(true);
              } else {
                if (data != null && data.data.signup.status === 200) {
                  localStorage.setItem("email", email);
                  window.location.href = "/verify";
                } else {
                  errors = "server Error";
                  setErrorMessage(true);
                }
              }
            });

          //  window.location.href="/verify"
        } else {
          errors = "password Not matched";
          setErrorMessage(true);
          // Error Display here
        }
      } else {
        console.log("Please enter valid email address");
      }
    }
  };

  return (
    <>
      {/* // <div className="row" style={{ marginTop: "10%", marginLeft: "10%" }}>
    //   <div className="col-md-5 col-xs-12">
    //     <form> */}
      <div>
        <div
          className={classes.back}
          style={{
            position: "absolute",
            top: "7%",
            left: "78%",
            textDecoration: "underline",
            color: "#818181",
          }}
        >
          <a onClick={() => handleBack()}>back</a>
        </div>

        <div>
          {" "}
          {success ? (
            <div>
              <p className={classes.success}>
                {" "}
                We have sent an email to "{email}"{" "}
              </p>
              <p className={classes.resend}>resend</p>
            </div>
          ) : (
            <Container fluid className={classes.main}>
              <Row>
                <Col md={2}>
                  <div>
                    <ProSidebar breakPoint="lg" className={sidebar.sideBar}>
                      <div className={sidebar.scroll}>
                        <SidebarContent
                          className={sidebar.sideav__reg__content}
                        >
                          <Header />
                          <ul className={sidebar.sidenav_reg__screens}>
                            <li className={sidebar.listFont}>
                              <span
                                className={`${sidebar.dot} ${
                                  showEmail && sidebar.disable__dot
                                }`}
                              >
                                {showEmail && <span>&#10003;</span>}
                              </span>
                              General Information
                            </li>
                            <li className={sidebar.listFont}>
                              {!showEmail ? (
                                <span className={`${sidebar.ext} `}></span>
                              ) : (
                                <span
                                  className={`${sidebar.dot} ${
                                    showPassword && sidebar.disable__dot
                                  }`}
                                >
                                  {showPassword && <span>&#10003;</span>}
                                </span>
                              )}
                              Enter Email Id
                            </li>
                            <li className={sidebar.listFont}>
                              {!showPassword ? (
                                <span className={`${sidebar.ext} `}></span>
                              ) : (
                                <span
                                  className={`${sidebar.dot} ${
                                    showConfirmPassword && sidebar.disable__dot
                                  }`}
                                >
                                  {showConfirmPassword && <span>&#10003;</span>}
                                </span>
                              )}
                              Enter Password
                            </li>
                            <li className={sidebar.listFont}>
                              {!showConfirmPassword ? (
                                <span className={`${sidebar.ext} `}></span>
                              ) : (
                                <span className={`${sidebar.dot}`}></span>
                              )}
                              Your accout is ready!
                            </li>
                          </ul>
                        </SidebarContent>
                      </div>
                    </ProSidebar>
                  </div>
                </Col>
                <Col md={8}>
                  <div
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className={classes.signup}
                  >
                    <label
                      for="exampleInputEmail1"
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: "150%",
                        color: "#DCD3E9",
                        marginBottom: "10%",
                        marginTop: "6%",
                      }}
                    >
                      Sign up
                    </label>
                    <div className="row">
                      <div className="col-4 col-xs-8">
                        <input
                          onKeyPress={(event) => enterKey(event)}
                          type={nameDisplay}
                          id="name"
                          className={classes.email}
                          autoFocus
                          placeholder={text}
                          style={{
                            border: "0px",
                            outline: "none",
                            fontFamily: "Sora, sans-serif",
                          }}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {showEmail && (
                          <Slide right>
                            <input
                              onKeyPress={(event) => enterKey(event)}
                              type={emailDisplay}
                              id="exampleInputEmail1"
                              className={classes.email}
                              placeholder={text}
                              autoFocus
                              style={{
                                border: "0px",
                                outline: "none",
                                fontFamily: "Sora, sans-serif",
                              }}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Slide>
                        )}
                        {showLabName && (
                          <Slide right>
                            <input
                              onKeyPress={(event) => enterKey(event)}
                              type={labNameDisplay}
                              id="exampleInputEmail1"
                              className={classes.email}
                              placeholder={text}
                              autoFocus
                              style={{
                                border: "0px",
                                outline: "none",
                                fontFamily: "Sora, sans-serif",
                              }}
                              onChange={(e) => setLabName(e.target.value)}
                            />
                          </Slide>
                        )}
                        {showPhoneNumber && (
                          <Slide right>
                            <input
                              onKeyPress={(event) => enterKey(event)}
                              type={phoneNumberDisplay}
                              id="exampleInputEmail1"
                              className={classes.email}
                              placeholder={text}
                              autoFocus
                              style={{
                                border: "0px",
                                outline: "none",
                                fontFamily: "Sora, sans-serif",
                              }}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </Slide>
                        )}
                        {showPassword && (
                          <Slide right>
                            <input
                              onKeyPress={(event) => enterKey(event)}
                              type={passwordDisplay}
                              id="exampleInputEmail1"
                              className={classes.email}
                              placeholder={text}
                              autoFocus
                              style={{
                                border: "0px",
                                outline: "none",
                                fontFamily: "Sora, sans-serif",
                              }}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Slide>
                        )}
                        {showConfirmPassword && (
                          <Slide right>
                            <input
                              onKeyPress={(event) => enterKey(event)}
                              type={confirmPasswordDisplay}
                              id="exampleInputEmail1"
                              className={classes.email}
                              autoFocus
                              placeholder={text}
                              style={{
                                border: "0px",
                                outline: "none",
                                fontFamily: "Sora, sans-serif",
                              }}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </Slide>
                        )}
                      </div>
                      <div className="col-2" style={{ zIndex: "100" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          style={{ color: "#DCD3E9" }}
                          onClick={() => changeField()}
                          className={"bi bi-arrow-right "+classes.email}
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="row">
                        <div className="col-9">
                          <div
                            className={classes.bottomLine}
                            style={{ marginTop: "2%" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div
            id="emailHelp"
            className="form-text"
            style={{
              marginTop: "4%",
              fontFamily: "Sora, sans-serif",
              fontStyle: "normal",
              fontWeight: "300",
              fontSize: "88%",
              lineHeight: "15px",
              color: "#9B9B9B",
            }}
         className={classes.secure} >
            We'll send a secure magic link to the email address.
          </div> */}
                    <div
                      style={{
                        marginTop: "3%",
                        fontFamily: "Sora, sans-serif",
                        fontStyle: "normal",
                        fontWeight: "300",
                        fontSize: "88%",
                        lineHeight: "15px",
                        color: "#9B9B9B",
                      }}
                      className={classes.secure}
                    >
                      <div className={classes.strongpassword}></div>
                      Already registered click here to <a href="/">Login</a>
                    </div>
                    <div className={classes.step}>
                      {showEmail && !showPassword ? (
                        <p>Step 2 of 4</p>
                      ) : showPassword && !showConfirmPassword ? (
                        <p> Step 3 of 4</p>
                      ) : showConfirmPassword ? (
                        <p> Step 4 of 4</p>
                      ) : (
                        <p>Step 1 of 4</p>
                      )}
                    </div>
                    <Footer />
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </div>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={ErrorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(false)}
        >
          <Alert
            onClose={() => setErrorMessage(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errors}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};
export default SignUpForm;
