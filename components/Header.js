import React from 'react'
import {Nav,Navbar,NavbarToggler,Collapse, Container} from 'reactstrap';

import { Link, NavLink} from 'react-router-dom';
import classes from "./Header.module.css";


const Header = () => {
  return (
   
  //   <nav class="navbar navbar-light " style={{marginTop:"4%" , marginLeft:"11%"}} >
  //   <div >
  //   <h7 style={{marginLeft:"1300%"}} className={classes.resend}>back</h7>
  //     <a class="navbar-brand" href="#">
  //       <img src="/Frame.png" alt=""/>
    
  //     </a>
    
  //   </div>
  // </nav>


<div class={classes.header}>
  <d ><img src="/Frame.svg" alt=""/></d>
  
</div>


  )
}

export default Header