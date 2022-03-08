import { Col, Container, Row } from "reactstrap";
import classes from "./LoginForm.module.css";
import { Dropdown } from "reactstrap";
import { Nav, Navbar, NavbarToggler, Collapse, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Profile = () => {
  const user = (
    <div style={{ display: "inline-block" }}>
      <img src="/user.svg"></img>
    </div>
  );
  const array=[
      {
          title:"Report 1",
          date:"08/03/22;23:00"
      },
      {
        title:"Report 2",
        date:"08/03/22;23:00"
    },
    {
        title:"Report 3",
        date:"08/03/22;23:00"
    },
    {
        title:"Report 4",
        date:"08/03/22;23:00"
    },
    {
        title:"Report 5",
        date:"08/03/22;23:00"
    }

  ]
  return (
    <>
      <Container className={classes.name}>
        <Row>
          <Col md={10} xs={8}>
            <div className={classes.hello}>Hello, Jenil</div>
            <div
              style={{
                color: "#C4C4C4",
                fontFamily: "Roboto",
                fontSize: "80%",
              }}
            >
              Last login 22-2-22; 14:00
            </div>
          </Col>
          <Col md={2} xs={4}>
            {/* <NavDropdown title={user} id="nav-real">
              <NavDropdown.Item>View Profile</NavDropdown.Item>

                <NavDropdown.Item>Edit Profile</NavDropdown.Item>

                <NavDropdown.Item>Delete account</NavDropdown.Item>

                <NavDropdown.Item>Help & support</NavDropdown.Item>
            
            </NavDropdown> */}
          </Col>
        </Row>
        <div className={classes.profileLine}></div>
      </Container>
      <Container className={classes.report}><h6 className={classes.heading}>History of analyzed reports</h6>
     <div >
     {array.map((a,i)=>{
          

    return ( <Row className={classes.rowe}> 
        <Col md={8} xs={5} className={classes.proCol}>{a.title}</Col>
        <Col md={3} xs={5} className={classes.proCol2}>{a.date}</Col>
        <Col md={1} xs={2} ><button className={classes.proCol3}>View</button></Col>
      </Row>)
      })}
     </div>
    
      
      </Container>
    </>
  );
};

export default Profile;
