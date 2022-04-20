import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tab from "@mui/material/Tab";
import classes from "./EditProfile.module.css";
import { Button, Form, Modal } from "react-bootstrap";

//saving data edited on variables sent by backend
const EditProfile = () => {
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
  // getting data from the backend
  const LAUNCHES_QUERY = `
  {
    getUser {
      name
      labName
      phoneNo
      email
      userId
    }
  }`;
  console.log(process.env.REACT_APP_API);
  const [launches, setLaunches] = React.useState([]);
  React.useEffect(() => {
    const Token = localStorage.getItem("token");
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
        // "x-api-key": `${String(process.env.REACT_APP_API)}`,
      },
      body: JSON.stringify({ query: LAUNCHES_QUERY }),
    })
      .then((response) => response.json())
      .then((data, error) => {
        if (data) {
          setLaunches(data.data.getUser);
        } else {
          console.log(error);
        }
      });
  }, []);

  // logic for enabling and disabling the input field

  const [usernameDisabled, setUsernameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);

  function onusernameClickEditIcon() {
    setUsernameDisabled(!usernameDisabled);
  }
  function onEmailClickEditIcon() {
    setEmailDisabled(!emailDisabled);
  }

  // logic for submiting the data once edited
  const onsubmit = () => {
    if (user.username === "" || user.username.length === 0) {
      user.username = launches.name;
    }
    if (user.labName === "" || user.labName.length === 0) {
      user.labName = launches.labName;
    }
    const UPDATE_QUERY = `mutation {
        updateProfile(updateInput:{
            name: "${user.username}",
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
    }`;

    const Token = localStorage.getItem("token");
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: UPDATE_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  //logic for model open and close
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitPassword = () => {
    console.log(user.oldPassword);
    console.log(user.newPassword);
    
    const UPDATE_QUERY = `mutation {
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
      }
  }`;

    const Token = localStorage.getItem("token");
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: UPDATE_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <Tab label="Your Profile" className={classes.heading} />
      <Tab label="back" className={classes.back} />

      <div className={classes.details}>
        <form>
          <div className={classes.parent}>
            <label className={classes.child}>Username :</label>
            <input
              disabled={usernameDisabled}
              type="text"
              name="username"
              defaultValue={launches.name}
              onChange={userInput}
              className={`${classes.child} ${classes.input} ${
                usernameDisabled ? null : classes.dis
              }`}
            />
            <div onClick={onusernameClickEditIcon}>
              {!usernameDisabled ? <DoneIcon /> : <EditIcon />}
            </div>
          </div>
          <div className={classes.parent}>
            <label className={classes.child}>Lab Name :</label>
            <input
              disabled={emailDisabled}
              type="text"
              name="labName"
              defaultValue={launches.labName}
              onChange={userInput}
              className={`${classes.child} ${classes.input}  ${
                emailDisabled ? null : classes.dis
              }`}
            />
            <div onClick={onEmailClickEditIcon}>
              {!emailDisabled ? <DoneIcon /> : <EditIcon />}
            </div>
          </div>
          <div className={classes.parent}>
            <label className={classes.child}>Email Address :</label>
            <input
              disabled
              type="text"
              name="name"
              defaultValue={launches.email}
              className={`${classes.child} ${classes.input}`}
            />
            <div />
          </div>
          <div className={classes.parent}>
            <label className={classes.child}>Password:</label>
            <input
              disabled
              type="text"
              name="name"
              placeholder="************"
              className={`${classes.child} ${classes.input}`}
            />
            <EditIcon onClick={handleShow} />

            {/* //Modal Starts from Here */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Old Password</Form.Label>
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
                      type="text"
                      placeholder=""
                      name="newPassword"
                      onChange={userInput}
                      autoFocus
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    onSubmitPassword();
                    handleClose();
                  }}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          {!usernameDisabled || !emailDisabled ? (
            <button className={classes.btn} onClick={onsubmit}>
              Save
            </button>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default EditProfile;
