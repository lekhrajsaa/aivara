import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

import classes from "./HeaderConditional.module.css";
import { useRouter } from "next/router";
import user from "../public/Profile_White.svg";
// import { Navbar,Container, Nav, NavDropdown } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
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
  const router = useRouter();
  const removeDetail = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  return (
    <div
      style={{ backgroundColor: "#000000", height: "44px" }}
      className={classes.mobileH}
    >
      <nav class="navbar" className={classes.fix}>
        <div class="container-fluid">
          <div
            style={{ marginLeft: "3%", color: "white" }}
            className={classes.heading}
          >
            <a
              href="/newHome"
              className={classes.brandname}
              style={{ color: "white" }}
            >
              AIVARA
            </a>
          </div>
          setProfile();
          <Col md={1} xs={2}>
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

function WithoutPofile(props) {
  const [profileIcon, setProfileIcon] = useState(true);

  const router = useRouter();
  const removeDetail = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/";
  };

  return (
    <div
      style={{ backgroundColor: "#000000", height: "44px" }}
      className={classes.mobileH}
    >
      <nav class="navbar" className={classes.fix}>
        <div class="container-fluid">
          <div
            style={{ marginLeft: "3%", color: "white" }}
            className={classes.heading}
          >
            <a
              href="/newHome"
              className={classes.brandname}
              style={{ color: "white" }}
            >
              AIVARA
            </a>
          </div>
          setProfile();
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
  const icon =props.icon;
  if (headerWithSignout) {
    return <WithSignout />;
  }else if (icon){
    return <WithoutPofile />
  }
  return <WithoutSignout />;
}
export default Header;
