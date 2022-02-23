import React from 'react'
import {Nav,Navbar,NavbarToggler,Collapse, Container} from 'reactstrap';
import classes from "./LoginForm.module.css";
import { Link, NavLink} from 'react-router-dom';


const Header = () => {
  return (
   
    <nav class="navbar navbar-light " style={{marginTop:"4%" , marginLeft:"11%"}} >
    <div >
      <a class="navbar-brand" href="#">
        <img src="/Frame.png" alt=""/>
      </a>
    </div>
  </nav>
  )
}

export default Header