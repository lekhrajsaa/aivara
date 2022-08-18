import React from "react";

import classes from "./LoginForm.module.css";


//This page is not used on any page Will be deleted later


const HeaderApp = () => {
  const removeDetail = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("isloggin");
    localStorage.removeItem("persist");
  };
  return (
    <div
      style={{ backgroundColor: "#000000", padding: "6px" }}
      className={classes.mobileH}
    >
      <nav className="navbar">
        <div className="container-fluid">
          <div style={{ marginLeft: "4%", color: "white" }}>
            <a className="navbar-brand" href="/home">
              <img src="/AivarA.svg" style={{ color: "white" }} />
            </a>
          </div>

          <a
            className={"gen navbar-brand " + classes.gen}
            href="/"
            style={{
              marginRight: "4%",
              fontFamily: "Sora",
              fontSize: "80%",
              color: "#B7D7F7",
            }}
            onClick={removeDetail}
          >
            Sign out
            <a>
              {" "}
              <img src="Settings.svg" style={{ marginLeft: "4%" }} />
            </a>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default HeaderApp;
