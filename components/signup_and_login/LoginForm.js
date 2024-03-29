import React from "react";
import classes from "./LoginForm.module.css";
import { useState, useEffect } from "react";
//Slide used for the animation of slide while filling the form
import Slide from "react-reveal/Slide";
import SignUpForm from "./SignUpForm";
//react-pro-sidebar used for the sidebar present in login and signup page
import { ProSidebar, SidebarContent } from "react-pro-sidebar";
//reactstrap used for the box to display content inside it
import { Col, Container, Row } from "reactstrap";
import sidebar from "../SideBar/Sidenav.module.css";
import Header from "../Header/Header";
import HeaderMobile from "../Header/HeaderMobile";
import Footer from "../footer/Footer";
//Stack used to display error message one on another on login and signup
import Stack from "@mui/material/Stack";
//Snackbar used to display error message 
import Snackbar from "@mui/material/Snackbar";
//MuiAlert used for alerts errors
import MuiAlert from "@mui/material/Alert";
//not used imports might be deleted later
import Button from "@mui/material/Button";
import axios from "axios";


//Alert on a page
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
var errors;
//login Form
const LoginForm = () => {
  //Message to display while filling form
  const [text, setText] = useState("enter email id");
  //toggle message to show or not
  const [show, setShow] = useState(false);
  //fieldDisplay used to hide password
  const [fieldDisplay, setFieldDisplay] = useState("hidden");
  //Capture email of user they enter
  const [email, setEmail] = useState("");
  //Capture password of user they enter
  const [password, setPassword] = useState("");
  //Default loginState false;
  const [login, setLogin] = useState(false);
  //setRegister To know wether the user is registerd or not
  const [register, setRegister] = useState(false);
  //setDis set to none once back
  const [dis, setDis] = useState("block");
  //setErrorMessage used to store error messages
  const [ErrorMessage, setErrorMessage] = useState(false);
  //Not used might be deleted later
  const [success, setSuccess] = useState(false);

  //Things to get load before page
  useEffect(() => {
    if (window.location.pathname === "/") {
      setLogin(true);
    } else if (window.location.pathname === "/signup") {
      setRegister(true);
    }
    console.log(window.location.pathname);
  }, []);

  //to store email while we go back in signin
  const handleBack = () => {
    if (login) {
      setText("enter email");
      setDis("none");

      setShow(false);
    }
  };
  console.log(process.env.REACT_APP_SERVER);
  //function to move next form once we press enter
  const enterKey = async (e) => {
    if (e.key === "Enter") {
      if (show) {
        console.log(email, password);
        localStorage.setItem("name", "");
        // window.location.href = "/home";
        // login API comes here

        let body = {
          query: `{
            login(email:"${String(email)}",password:"${String(password)}") {
                token
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

        await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/api/v1`, {
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
            } else {
              if (data.data.login.status === 200) {
                localStorage.setItem("token", data.data.login.token);
                localStorage.setItem("isloggin", true);
                window.location.href = "/newHome";
              } else {
                errors = "server Error";
                setErrorMessage(true);
              }
            }
          })
          .catch((rejected) => {
            console.log(rejected);
          });
      }

      setText("enter password");
      setShow(true);
      setFieldDisplay("password");
    }
  };
  //function to validate email and password and route to dashboard
  const changeField = async () => {
    if (show) {
      console.log(email, password);
      localStorage.setItem("name", "");
      // window.location.href = "/home";
      // login API comes here
      let body = {
        query: `{
          login(email:"${String(email)}",password:"${String(password)}") {
              token 
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

      //API call for validating email and password and route to the dashboard
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}api/v1`, {
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
            if (data.data.login.status === 200) {
              localStorage.setItem("token", data.data.login.token);
              localStorage.setItem("isloggin", true);
              window.location.href = "/home";
            } else {
              errors = "server Error";
              setErrorMessage(true);
            }
          }
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }

    setText("enter password");
    setShow(true);
    setFieldDisplay("password");
  };
  return (
    
    <>
      <HeaderMobile />
      {login ? (
        <Container fluid className={classes.main}>
          <Row>
            <Col md={2}>
              <div>
                <ProSidebar breakPoint="lg" className={sidebar.sideBar}>
                  <div className={sidebar.scroll}>
                    <SidebarContent className={sidebar.sideav__reg__content}>
                      <Header />
                      <ul className={sidebar.sidenav_reg__screens}>
                        <li className={sidebar.listFont}>
                          <span
                            className={`${sidebar.dot} ${
                              show && sidebar.disable__dot
                            }`}
                          >
                            {show && <span>&#10003;</span>}
                          </span>
                          Enter Email Id
                        </li>
                        <li className={sidebar.listFont}>
                          <span className={`${!show && sidebar.ext} `}></span>
                          Enter Password
                        </li>
                      </ul>
                    </SidebarContent>
                  </div>
                </ProSidebar>
              </div>
            </Col>
            <Col md={8}>
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
                <div
                  
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className={"mb-3 "+classes.login}
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
                    Login
                  </label>
                  <div className="row">
                    <div className="col-4 col-xs-8">
                      {!show && (
                        <input
                          onKeyPress={(event) => enterKey(event)}
                          type="email"
                          id="exampleInputEmail1"
                          className={classes.email}
                          placeholder={text}
                          value={email}
                          autoFocus
                          onChange={(e) => setEmail(e.target.value)}
                          style={{
                            border: "0px",

                            outline: "none",
                            fontFamily: "Sora, sans-serif",
                          }}
                        />
                      )}
                      {show && (
                        <Slide right>
                          <input
                            onKeyPress={(event) => enterKey(event)}
                            type={fieldDisplay}
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

                  <div
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontStyle: "normal",
                      fontWeight: "300",
                      fontSize: "14px",
                      lineHeight: "15px",
                      color: "#9B9B9B",
                      marginTop: "3%",
                    }}
                  >
                    Not registered ?{" "}
                    <a
                      style={{
                        cursor: "pointer",
                        color: "#0d6efd",
                        textDecoration: "underline",
                      }}
                      onClick={() => setLogin(false)}
                    >
                      Signup
                    </a>
                  </div>
                  <div className={classes.step}>
                    {show ? <p>Step 2 of 2 </p> : <p>Step 1 of 2</p>}
                  </div>
                  <Footer />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <SignUpForm />
      )}

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

export default LoginForm;

