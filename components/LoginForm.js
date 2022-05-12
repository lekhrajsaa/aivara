import React from "react";
import classes from "./LoginForm.module.css";
import { useState, useEffect } from "react";
import Slide from "react-reveal/Slide";
import SignUpForm from "./SignUpForm";

import { ProSidebar, SidebarContent } from "react-pro-sidebar";
import { Col, Container, Row } from "reactstrap";
import sidebar from "./Sidenav.module.css";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";
import Footer from "./Footer";
import axios from "axios";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
var errors;
const LoginForm = () => {
  const [text, setText] = useState("enter email id");
  const [show, setShow] = useState(false);

  const [fieldDisplay, setFieldDisplay] = useState("hidden");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [dis, setDis] = useState("block");

  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/") {
      setLogin(true);
    } else if (window.location.pathname === "/signup") {
      setRegister(true);
    }
    console.log(window.location.pathname);
  }, []);
  const handleBack = () => {
    if (login) {
      setText("enter email");
      setDis("none");

      setShow(false);
    }
  };
  console.log(process.env.REACT_APP_SERVER);
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

      await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/api/v1`, {
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
    // <div class="row" style={{ marginTop: "10%", marginLeft: "10%" }}>

    //   <div class="col-md-5 col-xs-12">
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
                  class="mb-3"
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className={classes.login}
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
                  <div class="row">
                    <div class="col-4 col-xs-8">
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
                    <div class="col-2" style={{ zIndex: "100" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="currentColor"
                        class="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                        style={{ color: "#DCD3E9" }}
                        onClick={() => changeField()}
                        className={classes.email}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div class="row">
                      <div class="col-9">
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
    //   </div>
    // </div>
  );
};

export default LoginForm;
//"http://localhost:5000/api/v1"
