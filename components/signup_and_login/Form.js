import React from "react";
import classes from "./LoginForm.module.css";
import { useState, useEffect } from "react";
import Slide from "react-reveal/Slide";
import Fields from "./Fields";


const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [loginData, setLoginData] = useState([]);
  var slide
  useEffect(() => {
    if (window.location.pathname === "/login") {
      setLogin(true);
      Fields.login[0].show = true;
      Fields.login[0].type = "email";
      slide =  <Slide right >
      <input
        type={Fields.login[0].type}
        id="exampleInputEmail1"
        className={classes.email}
        placeholder={Fields.login[0].placeholder}
        style={{
          border: "0px",
          outline: "none",
          fontFamily: "Sora, sans-serif",
        }}
        onChange={(e) => setEmail(e.target.value)}
      />
    </Slide>
      console.log(Fields.login);
      setLoginData(Fields.login);
    } else if (window.location.pathname === "/signup") {
      setRegister(true);
    }
    console.log(window.location.pathname);
  }, []);

  const changeField = () => {

      loginData.slice(0,1).map(function(f,i){
          if(f.show === true ){
              f.show=false
              f.type="hidden"
              loginData[i+1].show = true
              loginData[i+1].type="password"
            console.log(i)
            console.log(loginData[i+1])
          
          }
          else{
              console.log("not found")
          }
      })
  };

  return (
    <div className="row" style={{ marginTop: "10%", marginLeft: "10%" }}>
      <div className="col-md-5 col-xs-12">
        <form>
          <div
            className="mb-3"
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
              {login ?  <label
              for="exampleInputEmail1"
              style={{
                fontFamily: "Sora, sans-serif",
                fontSize: "24px",
                color: "#DCD3E9",
                marginBottom: "14%",
              }}
            >
                Login
            </label>:
             <label
             for="exampleInputEmail1"
             style={{
               fontFamily: "Sora, sans-serif",
               fontSize: "24px",
               color: "#DCD3E9",
               marginBottom: "14%",
             }}
           >
            SignUp
           </label>}
           
            <div className="row">
              <div className="col-7 col-xs-8">
                { slide
                  }
                {register && <h1>REgister</h1>}
              </div>
              <div className="col-2" style={{ zIndex: "100" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
                  <div className={classes.bottomLine} />
                </div>
              </div>
            </div>

            <div
              id="emailHelp"
              className="form-text"
              style={{
                marginTop: "4%",
                fontFamily: 'Sora, sans-serif',
                fontStyle: "normal",
                fontWeight: "300",
                fontSize: "12px",
                lineHeight: "15px",
                color: "#9B9B9B",
              }}
            >
              We'll send a Secure magic link to the email address.
            </div>
            <div
              style={{
                fontFamily: 'Sora, sans-serif',
                fontStyle: "normal",
                fontWeight: "300",
                fontSize: "12px",
                lineHeight: "15px",
                color: "#9B9B9B",
              }}
            >
              Already Registered Click here to <a href="/login">Login</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUpForm;
