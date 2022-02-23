import React from "react";
import classes from "./LoginForm.module.css";
import { useState } from "react";
import Slide from "react-reveal/Slide";

const LoginForm = () => {
  const [text, setText] = useState("Enter email Id");
  const [show, setShow] = useState(false);
  const [fieldDisplay, setFieldDisplay] = useState("hidden");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeField = () => {
    if (show) {
      console.log(email, password);
      // login API comes here
    }
    setText("Enter Password");
    setShow(true);
    setFieldDisplay("password");
  };
  return (
    <div class="row" style={{ marginTop: "10%", marginLeft: "10%" }}>
      <div class="col-md-5 col-xs-12">
        <form>
          <div
            class="mb-3"
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <label
              for="exampleInputEmail1"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "24px",
                color: "#DCD3E9",
                marginBottom: "14%",
              }}
            >
              Login
            </label>
            <div class="row">
              <div class="col-7 col-xs-8">
                {!show && (
                  <input
                    type="email"
                    id="exampleInputEmail1"
                    className={classes.email}
                    placeholder={text}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      border: "0px",

                      outline: "none",
                      fontFamily: "Sora, sans-serif",
                    }}
                  />
                )}

                <Slide right when={show}>
                  <input
                    type={fieldDisplay}
                    id="exampleInputEmail1"
                    className={classes.email}
                    placeholder={text}
                    style={{
                      border: "0px",
                      outline: "none",
                      fontFamily: "Sora, sans-serif",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Slide>
              </div>
              <div class="col-2" style={{ zIndex: "100" }}>
              
  
             
             
          
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
                  <div className={classes.bottomLine} />
                </div>
              </div>
            </div>

         
            <div
              style={{
                fontFamily: "Sora",
                fontStyle: "normal",
                fontWeight: "300",
                fontSize: "12px",
                lineHeight: "15px",
                color: "#9B9B9B",
                marginTop:"3%"
              }}
            >
              Not Registered ? <a href="/signup">Signup</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
