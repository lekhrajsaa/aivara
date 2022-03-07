import React from "react";
import classes from "./LoginForm.module.css";
import { useState, useEffect } from "react";
import Slide from "react-reveal/Slide";
import SignUpForm from "./SignUpForm";

const LoginForm = () => {
  const [text, setText] = useState("enter email id");
  const [show, setShow] = useState(false);
  const [fieldDisplay, setFieldDisplay] = useState("hidden");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [dis, setDis] = useState("block")
  useEffect(() => {
    if (window.location.pathname === "/") {
      setLogin(true);
    } else if (window.location.pathname === "/signup") {
      setRegister(true);
    }
    console.log(window.location.pathname);
  }, []);
  const handleBack=()=>{
    if (login){
     
      setText("enter email");
      setDis("none");
      
      setShow(false);
      
    }
  }
  const enterKey =(e) =>{
    if (e.key === 'Enter') {
      if (show) {
        console.log(email, password);
        window.location.href="/gen"
        // login API comes here
      }
     
      setText("enter password");
      setShow(true);
      setFieldDisplay("password");
    }
  }
  const changeField = () => {
   
    if (show) {
      console.log(email, password);
      window.location.href="/gen"
      // login API comes here
    }
   
    setText("enter password");
    setShow(true);
    setFieldDisplay("password");
  };
  return (
    <div>
  
    <div class="row" style={{ marginTop: "10%", marginLeft: "10%" }}>
      <div class="col-md-5 col-xs-12">
      
          {login ? (
            <div> <div class={classes.back} style={{position:"absolute",
             top :"7%",
             left: "78%", textDecoration:"underline", color:"#818181"}}>
              <a onClick={()=>handleBack()}>back</a>
             </div>
            <div
              class="mb-3"
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label
                for="exampleInputEmail1"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "150%",
                  color: "#DCD3E9",
                  marginBottom: "14%",
                }}
                className={classes.signup}
              >
                Login
              </label>
              <div class="row">
                <div class="col-7 col-xs-8">
                  {!show && (
                    <input
                    onKeyPress={(event) => enterKey(event)}
                      type="email"
                      id="exampleInputEmail1"
                      className={classes.email}
                      
                      placeholder={text}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        border: "0px",

                        outline: "none",
                        fontFamily: "Roboto, sans-serif",
                      }}
                    />
                  )}
  {show &&  <Slide right >
                    <input
                        onKeyPress={(event) => enterKey(event)}
                      type={fieldDisplay}
                      
                      id="exampleInputEmail1"
                      className={classes.email}
                      placeholder={text}
                      style={{
                        border: "0px",
                        outline: "none",
                        fontFamily: "Roboto, sans-serif",
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Slide>}
                 
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
                    <div
                      className={classes.bottomLine}
                      style={{ marginTop: "2%" }}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontFamily: "Roboto, sans-serif",
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
            </div>
         </div> ) : (
            <SignUpForm />
          )}
       
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
