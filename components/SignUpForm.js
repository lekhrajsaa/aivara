import React from "react";
import classes from "./LoginForm.module.css";
import { useState } from "react";
import Slide from "react-reveal/Slide";

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

  const [text, setText] = useState("Name");
  const [nameDisplay, setNameDisplay] = useState("name");
  const [emailDisplay, setEmailDisplay] = useState("hidden");
  const [phoneNumberDisplay, setPhoneNumberDisplay] = useState("hidden");
  const [passwordDisplay, setPasswordDisplay] = useState("hidden");
  const [confirmPasswordDisplay, setConfirmPasswordDisplay] = useState("hidden");


  const changeField = () => {
    if (showName) {
      setShowEmail(true);
      setNameDisplay("hidden");
      setText("Enter Email Id");
      setEmailDisplay("email");
      setShowName(false);

    }
    if(showEmail){
        setShowPhoneNumber(true);
        setEmailDisplay("hidden");
        setText("Enter Phone Number");
        setPhoneNumberDisplay("text");
       
  
    }
    if(showPhoneNumber){
        setShowPassword(true);
        setPhoneNumberDisplay("hidden");
        setText("Enter Password");
        setPasswordDisplay("password");
       
  
    }
    if(showPassword){
        setShowConfirmPassword(true);
        setPasswordDisplay("hidden");
        setText("Confirm  Password");
        setConfirmPasswordDisplay("password");
       
  
    }
    if(showConfirmPassword){
        console.log(name, email, phoneNumber ,password,confirmPassword)
        if(password === confirmPassword){
            console.log("Password Matched")
            //Register API here
        }
        else{
            console.log("password Not matched")
            // Error Display here
        }
    }
  };

  return (
    <div class="row" style={{ marginTop: "10%", marginLeft: "10%" }}>
      <div class="col-md-5 col-xs-12">
        <form>
          <div class="mb-3" style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
            </label>
            <div class="row">
              <div class="col-7 col-xs-8">
           
                  <input
                    type={nameDisplay}
                    id="name"
                    className={classes.email}
                    placeholder={text}
                    style={{
                      border: "0px",
                      outline: "none",
                      fontFamily: "Sora, sans-serif",
                    }}
                    onChange={(e) => setName(e.target.value)}
                  />{
                        <Slide right when={showEmail}>
                      <input
                        type={emailDisplay}
                        id="exampleInputEmail1"
                        className={classes.email}
                        placeholder={text}
                        style={{
                          border: "0px",
                          outline: "none",
                          fontFamily: "Sora, sans-serif",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Slide>
                  }
                  {
                        <Slide right when={showPhoneNumber}>
                      <input
                        type={phoneNumberDisplay}
                        id="exampleInputEmail1"
                        className={classes.email}
                        placeholder={text}
                        style={{
                          border: "0px",
                          outline: "none",
                          fontFamily: "Sora, sans-serif",
                        }}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </Slide>
                  }
                    {
                        <Slide right when={showPassword}>
                      <input
                        type={passwordDisplay}
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
                  }
                  {
                        <Slide right when={showConfirmPassword}>
                      <input
                        type={confirmPasswordDisplay}
                        id="exampleInputEmail1"
                        className={classes.email}
                        placeholder={text}
                        style={{
                          border: "0px",
                          outline: "none",
                          fontFamily: "Sora, sans-serif",
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
                  <div className={classes.bottomLine} />
                </div>
              </div>
            </div>

            <div
              id="emailHelp"
              class="form-text"
              style={{
                marginTop: "4%",
                fontFamily: "Sora",
                fontStyle: "normal",
                fontWeight: "300",
                fontSize: "12px",
                lineHeight: "15px",
                color: "#9B9B9B",
              }}
            >
              We'll send a Secure magic link to the email address.
            </div>
            <div style={{
                fontFamily: "Sora",
                fontStyle: "normal",
                fontWeight: "300",
                fontSize: "12px",
                lineHeight: "15px",
                color: "#9B9B9B",
              }}>
              Already Registered Click here to <a href="/login">Login</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUpForm;
