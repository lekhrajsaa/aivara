import React from "react";

import classes from "./LoginForm.module.css";
import { Link, NavLink } from "react-router-dom";

const HeaderApp = () => {
  const removeDetail = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };
  return (
    <div
      style={{ backgroundColor: "#000000", padding: "6px" }}
      className={classes.mobileH}
    >
      <nav class="navbar">
        <div class="container-fluid">
          <div style={{ marginLeft: "4%", color: "white" }}>
            <a class="navbar-brand" href="/home">
              <img src="/AivarA.svg" style={{ color: "white" }} />
            </a>
          </div>

          <a
            className={classes.gen}
            class="gen navbar-brand"
            href="/"
            style={{
              marginRight: "15%",
              fontFamily: "Sora",
              fontSize: "80%",
              color: "#B7D7F7",
            }}
            onClick={removeDetail}
          >
            Sign out
            <a>
              {" "}
              <img src="Settings.svg" style={{ marginLeft: "10%" }} />
            </a>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default HeaderApp;
