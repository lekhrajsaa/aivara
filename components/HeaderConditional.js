import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";

import classes from "./HeaderConditional.module.css";
import { useRouter } from "next/router";
import user from "../public/Profile_White.svg";
// import { Navbar,Container, Nav, NavDropdown } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutPopup from "./util/logoutPopup";
import NotificationBox from "./Notifications/notificationBox";

import { useSelector, useDispatch } from 'react-redux';
import { setNotification } from '../redux/dataAction';

import axios from "axios";


function WithoutSignout(props) {
  return (
    <div className={classes.body}>
      <nav>
        <div className={classes.head}>
          <p>AIVARA</p>
        </div>
      </nav>
    </div>
  );
}

function WithSignout(props) {
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
  const [showNotificationBox, setShowNotificationBox] = useState(false);

  const notifications = useSelector(state => state.userdata.notification);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchNotification()
  }, []);


  const removeDetail = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  const fetchNotification = async () => {
    const token = localStorage.getItem('token');
    const X_API_KEY = process.env.NEXT_PUBLIC_XAPI;
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

    var data = JSON.stringify({
      query: `{
        getNotification{
            notifications{
                clientName
                id
                reportId
                reportStatus
                customTimeStamp
                checked
            }
            status
        }
    }`,
      variables: {}
    });

    var config = {
      method: 'post',
      url: `${SERVER_URL}api/v1`,
      headers: {
        'x-api-key': X_API_KEY,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios(config);
      console.log(response.data.data.getNotification.notifications)
      dispatch(setNotification(response.data.data.getNotification.notifications.sort(function (a, b) { return b.customTimeStamp - a.customTimeStamp })))
    } catch (error) {
      console.log(error)
    }
  }

  function notificationIconClickHandler() {
    setShowNotificationBox((prv) => !prv);
  }

  return (
    <div
      style={{
        backgroundColor: "#0b0a0a",
      }}
      className={classes.mobileH}
    >
      <nav className={"navbar " + classes.fix}>
        <div className="container-fluid">
          <div
            style={{ marginLeft: "3%", color: "white" }}
            className={classes.heading}
          >
            <a
              href="/newHome"
              className={classes.brandname}
              style={{ color: "white", marginLeft: "-20px" }}
            >
              AIVARA
            </a>
          </div>
          {/* setProfile(); */}
          {showNotificationBox && (
            <NotificationBox setShowNotificationBox={setShowNotificationBox} />
          )}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                marginRight: "1rem",
                marginBottom: ".2rem",
                cursor: "pointer",
                position: "relative",
              }}
            >

              <NotificationsIcon
                onClick={notificationIconClickHandler}
                style={{ color: "white" }}
              />
              {!(notifications.filter(notif => notif.checked === false).length < 1) && <span className={classes.notificationDot} />}
              {/* <span className={classes.notificationDot}/> */}
            </span>

            <Col
              style={{ width: "fit-content" }}
              md={1}
              xs={1}
              className={classes.fullDropdown}
            >
              <div
                style={{ width: "fit-content" }}
                className={classes.dropdown}
              >
                <button
                  style={{
                    width: "fit-content",
                  }}
                  className={classes.dropbtn}
                >
                  {" "}
                  {/* <img className={classes.img} src="/user.svg"></img> */}
                  {/* <CgProfile className={classes.img} /> */}
                  <img src="./profileIcon.png" className={classes.img}></img>
                </button>
                <div className={classes.dropdown_content}>
                  <a
                    onClick={() => router.push("/editProfile")}
                    style={{
                      cursor: "pointer",
                      color: "#000000",
                      fontWeight: "500",
                    }}
                  >
                    Manage accounts
                  </a>
                  <a
                    onClick={() => setOpenLogoutPopup(true)}
                    style={{ color: "#000000", fontWeight: "500" }}
                  >
                    Sign out
                  </a>
                  <a href="#" style={{ color: "#000000", fontWeight: "500" }}>
                    Help & Support
                  </a>
                </div>
              </div>
            </Col>
          </div>
        </div>
      </nav>
      <LogoutPopup
        setOpenLogoutPopup={setOpenLogoutPopup}
        open={openLogoutPopup}
      />
    </div>
  );
}

function WithoutPofile(props) {
  const [profileIcon, setProfileIcon] = useState(true);

  const router = useRouter();
  const removeDetail = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  return (
    <div style={{ backgroundColor: "#000000" }} className={classes.mobileH}>
      <nav className={"navbar " + classes.fix}>
        <div className="container-fluid">
          <div
            style={{ marginLeft: "3%", color: "white" }}
            className={classes.heading}
          >
            <a
              href="/Home"
              className={classes.brandname}
              style={{ color: "white" }}
            >
              AIVARA
            </a>
          </div>
          {/* setProfile(); */}
          <Col md={1} xs={2} className={profileIcon ? classes.righBody : null}>
            <div className={classes.dropdown}>
              <button className={classes.dropbtn}>
                {" "}
                {/* <img className={classes.img} src="/user.svg"></img> */}
                {/* <CgProfile className={classes.img} /> */}
                <img src="./Profile_White.svg" className={classes.img}></img>
              </button>
              <div className={classes.dropdown_content}>
                <a
                  onClick={() => router.push("/editProfile")}
                  style={{ cursor: "pointer" }}
                >
                  Manage accounts
                </a>
                <a onClick={removeDetail}>Sign out</a>
                <a href="#">Help & Support</a>
              </div>
            </div>
          </Col>
        </div>
      </nav>
    </div>
  );
}

function Header(props) {
  const headerWithSignout = props.headerWithSignout;
  const icon = props.icon;
  if (headerWithSignout) {
    return <WithSignout />;
  } else if (icon) {
    return <WithoutPofile />;
  }
  return <WithoutSignout />;
}
export default Header;
