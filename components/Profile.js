import { Col, Container, Row } from "reactstrap";
import classes from "./LoginForm.module.css";



import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const Profile = () => {
  const [name, setName] = useState("")
  useEffect(() => {
     var name = localStorage.getItem('name')
    name= name.split(" ")[0]
   setName(name)
   
  
  }, [])
  
   

  const array=[
      {
          title:"Lab report name here",
          date:"08/03/22;23:00"
      },
      {
        title:"Lab report name here",
        date:"08/03/22;23:00"
    },
    {
      title:"Lab report name here",
      date:"08/03/22;23:00"
  },
 
  {
    title:"Lab report name here",
    date:"08/03/22;23:00"
},

{
  title:"Lab report name here",
  date:"08/03/22;23:00"
},

{
  title:"Lab report name here",
  date:"08/03/22;23:00"
},

   

  ]
  return (
    <>
      <Container className={classes.name}>
        <Row>
          <Col md={11} xs={10}>
            <div className={classes.hello}>Hello, {name}</div>
            <div
              style={{
                color: "#C4C4C4",
                fontFamily: "Sora",
                fontSize: "80%",
              }}
            >
              Last login 22-2-22; 14:00
            </div>
          </Col>

          <Col md={1} xs={2}>
            <div className={classes.dropdown}>
              <button className={classes.dropbtn}>
                {" "}
                <img src="/user.svg"></img>
              </button>
              <div className={classes.dropdown_content}>
                <a href="#">View Profile</a>
                <a href="#">Edit Profile</a>
                <a href="#">Delete account</a>
                <a href="#">Help & Support</a>
              </div>
            </div>
          </Col>
        </Row>
        <div className={classes.profileLine}></div>
      </Container>
      <Container className={classes.report}>
        <h6 className={classes.heading}>History of the analyzed reports</h6>
        <div className={classes.scrollRep}>
          {array.map((a, i) => {
            return (
              <Row className={classes.rowe}>
                <Col md={7} xs={5} className={classes.proCol}>
                  {a.title}
                </Col>
                <Col md={4} xs={5} className={classes.proCol2}>
                  {a.date}
                </Col>
                <Col md={1} xs={2}>
                  <button className={classes.proCol3}>View</button>
                </Col>
              </Row>
            );
          })}
        </div>
      </Container>
      <Container className={classes.report2}>
      <div className={classes.uploadicon}>
        
        <i
          class="fa-solid fa-arrow-up-from-bracket"
          style={{ color: "#395D89" }}
        ></i> 
        <a href="/gen"style={{ color: "#395D89" , textDecoration:"none"}} >  Generate report</a>
      </div>
      </Container>
     
    </>
  );
};

export default Profile;
