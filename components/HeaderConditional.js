import React from "react";
import { Col, Container, Row } from "reactstrap";

import classes from "./HeaderConditional.module.css";
import { useRouter } from "next/router";


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
  };
  return (
    <div
    style={{ backgroundColor: "#000000", padding: "6px" }}
    className={classes.mobileH}
  >
    <nav class="navbar" className={classes.fix} >
      <div class="container-fluid" className={classes.widthfix}>
        <div style={{ marginLeft: "4%", color:"white"}}>
          <a  href="/newHome" className={classes.brandname} style={{color:"white"}}>
            AIVARA
          </a>
        </div>

        {/* <a
          className={classes.gen}
          class="gen navbar-brand"
          href="/"
          style={{
            marginRight: "9%",
            fontFamily: "Sora",
            fontSize: "80%",
            color: "#B7D7F7",
          }}
          onClick={removeDetail}
        >
          Sign out
          <a>
            {" "}
            <img src="Settings.svg" style={{ marginLeft: "6%" }} />
          </a>
        </a> */}



        <Col md={1} xs={2}>
            <div className={classes.dropdown}>
              <button className={classes.dropbtn}>
                {" "}
                <img className={classes.img} src="/user.svg"></img>
              </button>
              <div className={classes.dropdown_content}>
                <a
                  onClick={() => router.push("/editProfile")}
                  style={{ cursor: "pointer" }}
                >
                  Manage accounts
                </a>
                <a
                 onClick={removeDetail}
                >
                  Sign out
                </a>
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
  if (headerWithSignout) {
    return <WithSignout />;
  }
  return <WithoutSignout />;
}
export default Header;
