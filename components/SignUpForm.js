import React from "react";
import classes from "./LoginForm.module.css";
import { useState } from "react";
import Slide from "react-reveal/Slide";
import Cookies from "js-cookie";

import { Col, Container, Row } from "reactstrap";

import { ProSidebar, SidebarContent } from "react-pro-sidebar";
import Header from "./Header";
import "react-pro-sidebar/dist/css/styles.css";
import sidebar from "./Sidenav.module.css";
import Footer from "./Footer";

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

  const [text, setText] = useState("Enter name");
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
  if(showPhoneNumber){
  
    setEmailDisplay("hidden");
   
    setShowPhoneNumber(false);
 
      setText("Enter name");
      setNameDisplay("text");
      setShowName(true);

  }
  if (showEmail) {
    setShowEmail(false);
    setPhoneNumberDisplay("number");
    setText("enter phone number");
    setPhoneNumberDisplay("number");
    setShowName(false)
    setNameDisplay("hidden")
    setShowPhoneNumber(true)
  }
  if (showPassword) {
    setShowEmail(true);
    setPhoneNumberDisplay("hidden");
    setText("enter email id");
    setEmailDisplay("email");
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
      setShowPhoneNumber(true);
      setNameDisplay("hidden");
      setText("enter phone number");
      setPhoneNumberDisplay("text");
      setShowName(false);
    }
    if (showPhoneNumber) {
      setShowEmail(true);
      setPhoneNumberDisplay("hidden");
      setText("enter email id");
      setEmailDisplay("email");
     
    }
    if (showEmail) {
      setShowPassword(true);
      setEmailDisplay("hidden");
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
          window.location.href="/home"
         

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
      setShowPhoneNumber(true);
      setNameDisplay("hidden");
      setText("enter phone number");
      setPhoneNumberDisplay("text");
      setShowName(false);
    }
    if (showPhoneNumber) {
      setShowEmail(true);
      setPhoneNumberDisplay("hidden");
      setText("enter email id");
      setEmailDisplay("email");
     
    }
    if (showEmail) {
      setShowPassword(true);
      setEmailDisplay("hidden");
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
          window.location.href="/home"
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
    <div>
       
      <div class={classes.back} style={{position:"absolute",
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
        <Container fluid className={classes.main}>
        <Row>
          <Col md={2}>
           
          <div >
      <ProSidebar breakPoint="lg" className={sidebar.sideBar}  >
        <div className={sidebar.scroll}>
        <SidebarContent className={sidebar.sideav__reg__content}>
          <Header />
          <ul className={sidebar.sidenav_reg__screens}>
            <li className={sidebar.listFont}>
              <span
                className={`${sidebar.dot} ${showEmail && sidebar.disable__dot}`}
              >
                {showEmail && <span>&#10003;</span>}
              </span>
              General Information
            </li>
            <li className={sidebar.listFont}>
              {!showEmail ?  <span
                className={`${sidebar.ext} `}
              >
               
              </span> : <span
                className={`${sidebar.dot} ${showPassword && sidebar.disable__dot}`}
              >
                {showPassword && <span>&#10003;</span>}
              </span>}
              
              Enter Email Id
            </li>
            <li className={sidebar.listFont}>
            {!showPassword ?  <span
                className={`${sidebar.ext} `}
              >
               
              </span> : <span
                className={`${sidebar.dot} ${showConfirmPassword && sidebar.disable__dot}`}
              >
                {showConfirmPassword && <span>&#10003;</span>}
              </span>}
             
              Enter Password
            </li>
            <li className={sidebar.listFont}>
            {!showConfirmPassword ?  <span
                className={`${sidebar.ext} `}
              >
               
              </span> :  <span className={`${sidebar.dot}`}></span>}
            
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
          
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          className={classes.signup}>
          <label
            for="exampleInputEmail1"
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "150%",
              color: "#DCD3E9",
              marginBottom: "10%",
              marginTop:"6%",
            }}
          
          >
            Sign up
          </label>
          <div class="row">
            <div class="col-4 col-xs-8">
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
              {showEmail &&
                <Slide right >
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
              }
              {showPhoneNumber &&
                <Slide right >
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
              }
              {showPassword &&
                <Slide right >
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
              }
              {showConfirmPassword &&
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Slide>
              }
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

          {/* <div
            id="emailHelp"
            class="form-text"
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
            Already registered click here to <a href="/">Login</a>
          </div>
          <div className={classes.step}>
        {
          showEmail && !showPassword? <p>Step 2 of 4</p> :
          showPassword && !showConfirmPassword? <p> Step 3 of 4</p> :
          showConfirmPassword ? <p> Step 4 of 4</p> : <p>Step 1 of 4</p>
        }
          </div>
          <Footer/>
        </div>
            </Col>
       </Row>
       </Container>
        
      )}
    </div>

   
    
    </div>

  );
};
export default SignUpForm;
