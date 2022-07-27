import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

import classes from "./HeaderConditional.module.css";
import { useRouter } from "next/router";
import user from "../public/Profile_White.svg";
// import { Navbar,Container, Nav, NavDropdown } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutPopup from "./util/logoutPopup";

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

  const router = useRouter();
  const removeDetail = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

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
          <span
            style={{
              marginLeft: "84%",
              marginBottom: ".2rem",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <NotificationsIcon style={{ color: "white" }} />
            <span
              style={{
                position: "absolute",
                backgroundColor: "#3699FB",
                padding: ".25rem",
                borderRadius: "50%",
                top: ".3rem",
                right: ".15rem",
              }}
            />
          </span>
          {/* setProfile(); */}
          <Col
            style={{ width: "fit-content" }}
            md={1}
            xs={1}
            className={classes.fullDropdown}
          >
            <div style={{ width: "fit-content" }} className={classes.dropdown}>
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
                  onClick={()=> setOpenLogoutPopup(true)}
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
      </nav>
      <LogoutPopup setOpenLogoutPopup={setOpenLogoutPopup} open={openLogoutPopup} />
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
