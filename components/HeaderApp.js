import React from "react";

import classes from "./LoginForm.module.css";
import { Link, NavLink } from "react-router-dom";
import { motion } from 'framer-motion';




const HeaderApp = () => {
  return (
    <div style={{backgroundColor: "#000000" , padding:"6px"}}>
    <nav class="navbar" >
      <div class="container-fluid">
        
      <motion.div style={{ marginLeft: "4%" ,color:"white" }}  >
          <a class="navbar-brand"   >
           <img src="/AivarA.svg" style={{color:"white"}}/>
          </a>
          </motion.div> 
        <a
          className={classes.gen}
          class="gen navbar-brand"
          href="/"
          style={{
            marginRight: "7%",
            fontFamily: "Roboto",
            fontSize: "75%",
            color: "#B7D7F7",
          }}
        >
          Signout
        </a>
      </div>
    </nav>
    </div>
  );
};

export default HeaderApp;
