import React, { useState, useEffect } from "react";
//EditIcon used for icon on page
import EditIcon from "@mui/icons-material/Edit";
//Icon used on a page tick
import DoneIcon from "@mui/icons-material/Done";
//Icon used to hide and display password
import VisibilityIcon from "@mui/icons-material/Visibility";

import classes from "./EditProfile.module.css";
//Button form and model used form react 
import { Button, Form, Modal } from "react-bootstrap";
//useRouter used to route to another page
import { useRouter } from "next/router";
//useSelector used to access the redux elements and useDispatch used to set or change those elements in redux
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
//icon used for back button
import { BsArrowLeft } from 'react-icons/bs';
//Stack used to display error message one on another 
import Stack from "@mui/material/Stack";
//Snackbar used to display error message 
import Snackbar from "@mui/material/Snackbar";
//MuiAlert used for alerts errors
import MuiAlert from "@mui/material/Alert";
//validator used to validate the password
import validator from "validator";
//Getting_user_data used to get data from the redux
import { Getting_user_data } from "../../redux/dataAction";
//unused imports might be deleted later
import Tab from "@mui/material/Tab";
import { AiOutlineArrowLeft } from 'react-icons/ai';



//Alert on a page
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
var errors;
let masg;

//saving data edited on variables sent by backend
const EditProfile = () => {
  const router = useRouter();
  //Storing the edited value 
  const [user, setuser] = useState({
    username: "",
    labName: "",
    oldPassword: "",
    newPassword: "",
    checkPassword: "",
  });
  useEffect(() => {
    
      getUserData();
    
    
  }, []);
  let name, value;
  //userInput updates the redux
  const userInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuser({ ...user, [name]: value });
  };
  //dispatch sends data to redux
  const dispatch = useDispatch();
  //imports data from redux
  const userdata = useSelector((state) => state.userdata.userdata);
  //toggle error Handle state 
  const [errorHandle, setErrorHandle] = useState(false);

  // logic for enabling and disabling the input field
  //allows to enable or desable edit username
  const [usernameDisabled, setUsernameDisabled] = useState(true);
  //allows to enable or desable edit labname
  const [emailDisabled, setEmailDisabled] = useState(true);
  //toggle Error message
  const [ErrorMessage, setErrorMessage] = useState(false);

  //Enabling and disabling to edit the USERNAME 
  function onusernameClickEditIcon() {
    setUsernameDisabled(!usernameDisabled);
  }

  //Enabling and disabling to edit the LABNAME 
  function onEmailClickEditIcon() {
    setEmailDisabled(!emailDisabled);
  }
  //Getting user data from the server
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    let body = {
      query: `{
        getUser {
          name
          labName
          phoneNo
          email
          userId
          lastLoggedIn
          password
        }
      }`,
      variables: {},
    };
    let options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(token)}`,
        "x-api-key": process.env.NEXT_PUBLIC_XAPI,
      },
    };
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}api/v1`,
        body,
        options
      );
      // console.log(resp);
      setuser(resp.data.data.getUser);
      // console.log(user.name);
      dispatch(Getting_user_data(resp.data.data.getUser));
    } catch (err) {
      console.log(err);
    }
  };

//Function for submitting the USERNAME and LABNAME after they are edited. 
  const onsubmit = async (e) => {
    const Token = localStorage.getItem("token");
    setUsernameDisabled(true);
    setEmailDisabled(true);
    e.preventDefault();

    if (user.username === "" || user.username=== undefined) {
      user.username = userdata.name;
    }
    if (user.labName === "" || user.labName.length === 0) {
      user.labName = userdata.labName;
    }
    let body = {
      query: `mutation {
        updateProfile(updateInput:{
            name: "${user.username}"
            labName: "${user.labName}"
        })
         {
            email
            userId
            name
            labName
            phoneNo
            isVerified
        }
    }`,
      varibles: {},
    };
    let options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
        "x-api-key": `${process.env.NEXT_PUBLIC_XAPI}`,
      },
    };

    // API call for Change in USERNAME and LABNAME

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}api/v1`,
        body,
        options
      );
      
      getUserData();
    } catch (err) {
      console.log(err);
    }
  };

  //logic for password model to open and close
  //logic for open and close of model
  const [show, setShow] = useState(false);
  //used once the user click on comfirm password to close model
  const [check, setCheck] = useState(false);
  //function to close the model
  const handleClose = () => setShow(false);
  //function to open the model
  const handleShow = () => setShow(true);
  //function to confirm password
  const checkMessage = () => {
    setCheck(!check);
  };
 // Check for the validation of PASSWORD
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
  //Checking if the oldpassword enterd by user equals to the oldpassword
  const onSubmitPassword = async () => {
    const Token = localStorage.getItem("token");
    if (userdata.password !== user.oldPassword) {
      setErrorHandle(true);
    }



    let body = {
      query: `mutation {
          updateProfile(updateInput:{
            oldPassword: "${user.oldPassword}",
            newPassword: "${user.newPassword}"
          })
           {
              email
              userId
              name
              labName
              phoneNo
              isVerified
              password
          }
      }`,
      varibles: {},
    };
    let options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
        "x-api-key": `${process.env.NEXT_PUBLIC_XAPI}`,
      },
    };
    //API call for passing NEW_PASSWORD and OLD_PASSWORD
    try {
      if (Passwordvalidate(user.newPassword)) {
        const resp = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_API}api/v1`,
          body,
          options
        );

        // console.log(resp.data.data.updateProfile);
        dispatch(Getting_user_data(resp.data.data.updateProfile));
        handleClose();
      }
      else {
        //errors to display  if the password does not match the following criteria
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
    } catch (err) {
      console.log(err);
    }
  };

//Function to show and hide the PASSWORD
  function showPassword() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }  
  return (
    <>
      <a onClick={() => router.push("/home")}>
        <BsArrowLeft className={classes.backArrow} />
      </a>
      <label className={classes.heading}>Your Profile</label>

      

      <div className={classes.details}>
        <form>
          <div className={classes.parent}>
            <label className={`${classes.child} ${classes.tit}`}>
              Username :
            </label>
            <input
              autofocus
              disabled={usernameDisabled}
              type="text"
              name="username"
              id="userName"
              defaultValue={userdata.name}
              onChange={userInput}
              className={`${classes.child} ${classes.input} ${usernameDisabled ? null : classes.dis
                }`}
            />
            <></>
            <div onClick={onusernameClickEditIcon} className={classes.icon}>
              {!usernameDisabled ? <DoneIcon /> : <EditIcon />}
            </div>
          </div>
          <div className={classes.parent}>
            <label className={`${classes.child} ${classes.tit}`}>
              Lab Name :
            </label>
            <input
              disabled={emailDisabled}
              type="text"
              name="labName"
              defaultValue={userdata.labName}
              onChange={userInput}
              className={`${classes.child} ${classes.input}  ${emailDisabled ? null : classes.dis
                }`}
            />
            <></>
            <div onClick={onEmailClickEditIcon} className={classes.icon}>
              {!emailDisabled ? <DoneIcon /> : <EditIcon />}
            </div>
          </div>
          <div className={classes.parent}>
            <label className={`${classes.child} ${classes.tit}`}>
              Email Address :
            </label>
            <input
              disabled
              type="text"
              name="name"
              defaultValue={userdata.email}
              className={`${classes.child} ${classes.input}`}
            />
            <div />
          </div>
          <div className={classes.parent}>
            <label className={`${classes.child} ${classes.tit}`}>
              Password:
            </label>
            <div className={classes.child}>
              <input
                disabled
                id="myInput"
                type="password"
                name="pass"
                value={userdata.password}
                className={` ${classes.input}`}
              />
              <VisibilityIcon
                onClick={showPassword}
                className={classes.visIcon}
              />
            </div>
            <EditIcon onClick={handleShow} className={classes.icon} />

            {/* //Modal Starts from Here */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title className={classes.modalTitle}>
                  Change Password
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className={classes.modalText}>
                      Old Password
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name="oldPassword"
                      onChange={userInput}
                      autoFocus
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name="checkPassword"
                      onChange={userInput}

                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      onClick={checkMessage}
                      type="text"
                      placeholder=""
                      name="newPassword"
                      onChange={userInput}

                    />

                    {errorHandle && (
                      <p style={{ color: "red" }}>
                        The Old Password is incorrect{" "}
                      </p>
                    )}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {check && user.newPassword === user.checkPassword ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      onSubmitPassword();
                    }}
                    className={classes.passwordBtn}
                  >
                    Save Password
                  </Button>
                ) : null}
              </Modal.Footer>
            </Modal>
          </div>
          {!usernameDisabled || !emailDisabled ? (
            <button className={classes.btn} onClick={onsubmit}>
              SAVE
            </button>
          ) : null}
        </form>
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

export default EditProfile;
