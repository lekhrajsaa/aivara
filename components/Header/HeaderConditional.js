import React, { useState, useEffect } from "react";
//Col used for navbar dropdown
import { Col } from "reactstrap";
import classes from "./HeaderConditional.module.css";
//useRouter used to redirect page from one to another.
import { useRouter } from "next/router";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutPopup from "../util/logoutPopup";
import NotificationBox from "../Notifications/notificationBox";
//useSelector used to access the redux elements and useDispatch used to set or change those elements in redux
import { useSelector, useDispatch } from "react-redux";
//setNotification to update the given propery in redux
import { setNotification } from "../../redux/dataAction";

import axios from "axios";

//NAVBAR Without the signout button
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

//NAVBAR with Signout button
function WithSignout(props) {
//used to erease the localStorage token and email if set to true
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);
//used to toggle the notification box
  const [showNotificationBox, setShowNotificationBox] = useState(false);
//get all data for the notification box
  const notifications = useSelector((state) => state.userdata.notification);
  const router = useRouter();
  const dispatch = useDispatch();
//used to fetch all notification before page loads
  useEffect(() => {
    fetchNotification();
  }, []);

  //Function to remove the Data from LOCALSTORAGE
  const removeDetail = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };
  //Function to fetch NOTIFICATION To header
  const fetchNotification = async () => {
    const token = localStorage.getItem("token");
    const X_API_KEY = process.env.NEXT_PUBLIC_XAPI;
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

//API to fetch NOTIFICATION
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
      variables: {},
    });

    var config = {
      method: "post",
      url: `${SERVER_URL}api/v1`,
      headers: {
        "x-api-key": X_API_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
  
    try {
      const response = await axios(config);
      console.log(response.data.data.getNotification.notifications);
      dispatch(
        setNotification(
          response.data.data.getNotification.notifications.sort(function (
            a,
            b
          ) {
            return b.customTimeStamp - a.customTimeStamp;
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
//function to show any unread notification throw the icon
  function notificationIconClickHandler() {
    setShowNotificationBox((prv) => !prv);
  }

// dropdown state of notification 
  const [showDropDown, setShowDropDown] = useState(false);
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
              href="/home"
              className={classes.brandname}
              style={{ color: "white", marginLeft: "-20px" }}
            >
              AIVARA
            </a>
          </div>
        
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
              {notifications &&
                !(
                  notifications?.filter((notif) => notif.checked === false)
                    .length < 1
                ) && <span className={classes.notificationDot} />}
              
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
                  onClick={() => setShowDropDown(!showDropDown)}
                >
                  {" "}
                  <img src="./profileIcon.png" className={classes.img}></img>
                </button>
                {showDropDown ? (
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
                ) : null}
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

//NAVBAR without PROFILE_ICON
function WithoutPofile(props) {
  //used to toggle the profile icon
  const [profileIcon, setProfileIcon] = useState(true);

  const router = useRouter();
  //function to erease the token and email after signout
  const removeDetail = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };
//function to route to the home
  function logoClickHanlder() {
    router.push("/home");
  }

  return (
    <div style={{ backgroundColor: "#000000" }} className={classes.mobileH}>
      <nav className={"navbar " + classes.fix}>
        <div className="container-fluid">
          <div
            style={{ marginLeft: "3%", color: "white" }}
            className={classes.heading}
          >
            <a
              
              className={classes.brandname}
              style={{ color: "white", cursor: "pointer" }}
              onClick={logoClickHanlder}
            >
              AIVARA
            </a>
          </div>
          
          <Col md={1} xs={2} className={profileIcon ? classes.righBody : null}>
            <div className={classes.dropdown}>
              <button className={classes.dropbtn}>
                {" "}
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

//Function to display NAVBAR according to condition
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
