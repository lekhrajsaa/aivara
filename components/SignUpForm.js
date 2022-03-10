import React from "react";
import classes from "./LoginForm.module.css";
import { useState } from "react";
import Slide from "react-reveal/Slide";
import Cookies from "js-cookie";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showName, setShowName] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [text, setText] = useState("name");
  const [nameDisplay, setNameDisplay] = useState("name");
  const [emailDisplay, setEmailDisplay] = useState("hidden");
  const [phoneNumberDisplay, setPhoneNumberDisplay] = useState("hidden");
  const [passwordDisplay, setPasswordDisplay] = useState("hidden");
  const [confirmPasswordDisplay, setConfirmPasswordDisplay] =
    useState("hidden");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
const handleBack=()=>{
  if(showEmail){
  
    setPhoneNumberDisplay("hidden");
   
    setShowEmail(false);
 
      setText("name");
      setNameDisplay("text");
      setShowName(true);

  }
  if (showPhoneNumber) {
    setShowPhoneNumber(false);
    setEmailDisplay("email");
    setText("enter email id");
    setEmailDisplay("email");
    setShowName(false)
    setNameDisplay("hidden")
    setShowEmail(true)
  }
  if (showPassword) {
    setShowPhoneNumber(true);
    setEmailDisplay("hidden");
    setText("enter phone number");
    setPhoneNumberDisplay("number");
    setShowName(false)
    setPasswordDisplay("hidden")
    setNameDisplay("hidden")
  
    setShowPassword(false)
    
  }
  if (showConfirmPassword) {
    setConfirmPasswordDisplay("hidden")
    setShowPassword(true);
    setShowPhoneNumber(false);
    setEmailDisplay("hidden");
    setText("enter password");
    setPhoneNumberDisplay("hidden");
    setShowName(false)
    setNameDisplay("hidden")
    setPasswordDisplay("password")
  
    setShowConfirmPassword(false)
    
  }


}
const enterKey =(e) =>{
  if (e.key === 'Enter') {
    if (showName) {
      setShowEmail(true);
      setNameDisplay("hidden");
      setText("enter email id");
      setEmailDisplay("email");
      setShowName(false);
    }
    if (showEmail) {
      setShowPhoneNumber(true);
      setEmailDisplay("hidden");
      setText("enter phone number");
      setPhoneNumberDisplay("text");
    }
    if (showPhoneNumber) {
      setShowPassword(true);
      setPhoneNumberDisplay("hidden");
      setText("enter password");
      setPasswordDisplay("password");
    }
    if (showPassword) {
      setShowConfirmPassword(true);
      setPasswordDisplay("hidden");
      setText("confirm  password");
      setConfirmPasswordDisplay("password");
    }
    if (showConfirmPassword) {
      console.log(name, email, phoneNumber, password, confirmPassword);
      if (validateEmail(email)) {
        if (password === confirmPassword) {
          console.log("Password Matched");
          setSuccess(true);
          localStorage.setItem("name",name);
          Cookies.set("name",name)
          window.location.href="/profile"
         

          //Register API here
        } else {
          console.log("password Not matched");
          // Error Display here
        }
      } else {
        console.log("Please enter valid email address");
      }
    }
   
  }
}
  const changeField = () => {
    if (showName) {
      setShowEmail(true);
      setNameDisplay("hidden");
      setText("enter email id");
      setEmailDisplay("email");
      setShowName(false);
    }
    if (showEmail) {
      setShowPhoneNumber(true);
      setEmailDisplay("hidden");
      setText("enter phone number");
      setPhoneNumberDisplay("text");
    }
    if (showPhoneNumber) {
      setShowPassword(true);
      setPhoneNumberDisplay("hidden");
      setText("enter password");
      setPasswordDisplay("password");
    }
    if (showPassword) {
      setShowConfirmPassword(true);
      setPasswordDisplay("hidden");
      setText("confirm  password");
      setConfirmPasswordDisplay("password");
    }
    if (showConfirmPassword) {
      console.log(name, email, phoneNumber, password, confirmPassword);
      if (validateEmail(email)) {
        if (password === confirmPassword) {
          console.log("Password Matched");
          setSuccess(true);
          localStorage.setItem("name",name);
          Cookies.set("name",name)
          window.location.href="/profile"
          //Register API here
        } else {
          console.log("password Not matched");
          // Error Display here
        }
      } else {
        console.log("Please enter valid email address");
      }
    }
  };

  return (
    // <div class="row" style={{ marginTop: "10%", marginLeft: "10%" }}>
    //   <div class="col-md-5 col-xs-12">
    //     <form>
    <div> <div class={classes.back} style={{position:"absolute",
     top :"7%",
     left: "78%", textDecoration:"underline", color:"#818181"}}>
      <a onClick={()=>handleBack()}>back</a>
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
        <div
          
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
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
            Signup
          </label>
          <div class="row">
            <div class="col-7 col-xs-8">
              <input
               onKeyPress={(event) => enterKey(event)}
                type={nameDisplay}
                id="name"
                className={classes.email}
                placeholder={text}
                style={{
                  border: "0px",
                  outline: "none",
                  fontFamily: "Roboto, sans-serif",
                }}
                onChange={(e) => setName(e.target.value)}
              />
              {showEmail &&
                <Slide right >
                  <input
                   onKeyPress={(event) => enterKey(event)}
                    type={emailDisplay}
                    id="exampleInputEmail1"
                    className={classes.email}
                    placeholder={text}
                    style={{
                      border: "0px",
                      outline: "none",
                      fontFamily: "Roboto, sans-serif",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Slide>
              }
              {showPhoneNumber &&
                <Slide right >
                  <input
                   onKeyPress={(event) => enterKey(event)}
                    type={phoneNumberDisplay}
                    id="exampleInputEmail1"
                    className={classes.email}
                    placeholder={text}
                    style={{
                      border: "0px",
                      outline: "none",
                      fontFamily: "Roboto, sans-serif",
                    }}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Slide>
              }
              {showPassword &&
                <Slide right >
                  <input
                   onKeyPress={(event) => enterKey(event)}
                    type={passwordDisplay}
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
                </Slide>
              }
              {showConfirmPassword &&
                <Slide right>
                  <input
                   onKeyPress={(event) => enterKey(event)}
                    type={confirmPasswordDisplay}
                    id="exampleInputEmail1"
                    className={classes.email}
                    placeholder={text}
                    style={{
                      border: "0px",
                      outline: "none",
                      fontFamily: "Roboto, sans-serif",
                    }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Slide>
              }
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
            id="emailHelp"
            class="form-text"
            style={{
              marginTop: "4%",
              fontFamily: "Roboto, sans-serif",
              fontStyle: "normal",
              fontWeight: "300",
              fontSize: "88%",
              lineHeight: "15px",
              color: "#9B9B9B",
            }}
         className={classes.secure} >
            We'll send a secure magic link to the email address.
          </div>
          <div
            style={{
              fontFamily: "Roboto, sans-serif",
              fontStyle: "normal",
              fontWeight: "300",
              fontSize: "88%",
              lineHeight: "15px",
              color: "#9B9B9B",
            }}
            className={classes.secure}
          >
            Already registered click here to <a href="/">Login</a>
          </div>
        </div>
        
      )}
    </div>

   
    
    </div>

  );
};
export default SignUpForm;
