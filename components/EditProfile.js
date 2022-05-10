import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tab from "@mui/material/Tab";
import classes from "./EditProfile.module.css";
import { Button, Form, Modal } from "react-bootstrap";
// import { Xapkey } from "../aivara";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import { Visibility } from "@mui/icons-material";
//saving data edited on variables sent by backend

let masg;
const EditProfile = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    username: "",
    labName: "",
    oldPassword: "",
    newPassword: "",
    checkPassword: "",
  });
  let name, value;
  const userInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuser({ ...user, [name]: value });
  };

  const userdata = useSelector((state) => state.userdata.userdata);
  const [errorHandle, setErrorHandle] = useState(false);

  // logic for enabling and disabling the input field

  const [usernameDisabled, setUsernameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);

  function onusernameClickEditIcon() {
    setUsernameDisabled(!usernameDisabled);
  }
  function onEmailClickEditIcon() {
    setEmailDisabled(!emailDisabled);
  }

  ////TRY
  const Token = localStorage.getItem("token");
  const onsubmit = async (e) => {
    setUsernameDisabled(true);
    setEmailDisabled(true);
    e.preventDefault();

    if (user.username === "" || user.username.length === 0) {
      user.username = userdata.name;
    }
    if (user.labName === "" || user.labName.length === 0) {
      user.labName = userdata.labName;
    }
    let body = {
      query: `mutation {
        updateProfile(updateInput:{
            name: "${user.username}",
            labName: "${user.labName}"s
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
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1`,
        body,
        options
      );
      console.log(resp.data.data.getUser);
    } catch (err) {
      console.log(err);
    }
  };

  //logic for model open and close
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const checkMessage = () => {
    setCheck(!check);
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();
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
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1`,
        body,
        options
      );

      console.log(resp.data.data.updateProfile);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

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
      <label className={classes.heading}>Your Profile</label>

      <a onClick={() => router.push("/home")} className={classes.back}>
        back
      </a>

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
              className={`${classes.child} ${classes.input} ${
                usernameDisabled ? null : classes.dis
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
              className={`${classes.child} ${classes.input}  ${
                emailDisabled ? null : classes.dis
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
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Conform Password</Form.Label>
                    <Form.Control
                      onClick={checkMessage}
                      type="text"
                      placeholder=""
                      name="newPassword"
                      onChange={userInput}
                      autoFocus
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
    </>
  );
};

export default EditProfile;
