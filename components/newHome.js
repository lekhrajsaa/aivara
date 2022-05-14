import React from "react";
import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import classes from "./newHome.module.css";
import {
  ButtonGroup,
  Dropdown,
  DropdownButton,
  SplitButton,
} from "react-bootstrap";
import { RiFileEditLine } from "react-icons/ri";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FiChevronDown } from "react-icons/fi";
import "react-circular-progressbar/dist/styles.css";

const NewHome = () => {
  const userdata = useSelector((state) => state.userdata.userdata);
  const percentage = 56;
  const per = 66;
  const router = useRouter();

  return (
    <div className={classes.allBody}>
      <Container className={classes.name}>
        <Row>
          <Col md={11} xs={10}>
            <div className={classes.hello}>
              Hello,<span> </span>
              {userdata.name}
            </div>
            <div
              style={{
                color: "#C4C4C4",
                fontFamily: "Sora",
                fontSize: "80%",
              }}
              className={classes.lastLog}
            >
              Last login {userdata.lastLoggedIn}
            </div>
          </Col>
        </Row>
        <div className={classes.profileLine}></div>
      </Container>
      <div className={classes.parent}>
        <div className={`${classes.clientCount} ${classes.child} `}>
          {/* <Dropdown >
            <Dropdown.Toggle
              className={classes.todayButton}
              variant=""
              id="dropdown-basic"
            >
              Today
            </Dropdown.Toggle>

            <Dropdown.Menu className={classes.dropDownToday}>
              <Dropdown.Item href="#/action-1" className={classes.firstItem}>Today</Dropdown.Item>
              <Dropdown.Item href="#/action-2" className={classes.firstItem}>Yesterday</Dropdown.Item>
              <Dropdown.Item href="#/action-3" className={classes.firstItem}>2 days ago</Dropdown.Item>
              <Dropdown.Item href="#/action-3" className={classes.firstItem}>7 days ago</Dropdown.Item>
              <Dropdown.Item href="#/action-3" className={classes.firstItem}>15 days ago</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

          <div className={classes.dropdown}>
            <button className={classes.dropbtn}>
              {" "}
              {/* <img className={classes.img} src="/user.svg"></img> */}
              {/* <CgProfile className={classes.img} /> */}
              {/* <img src="./profileIcon.png" className={classes.img}></img> */}
              Today
              <img src="./downArraw.png" className={classes.todayIcon}></img>
            </button>
            <div className={classes.dropdown_content}>
              <a style={{color:"#000000", fontFamily:"Inter", fontWeight:"400", backgroundColor:"#ddd"}} defaultChecked>Today</a>
              <a style={{color:"#000000", fontFamily:"Inter", fontWeight:"400"}}>Yesterday</a>
              <a style={{color:"#000000", fontFamily:"Inter", fontWeight:"400"}}>2 days ago</a>
              <a style={{color:"#000000", fontFamily:"Inter", fontWeight:"400"}}>7 days ago</a>
              <a style={{color:"#000000", fontFamily:"Inter", fontWeight:"400"}}>15 days ago</a>
              
            </div>
          </div>

          <div className={classes.threeparts}>
            <div className={classes.chart}>
              <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                  pathColor: "#4EAFE5",
                  trailColor: "transparent",
                  pathTransitionDuration: 0.5,
                })}
                className={classes.noOfClientsChart}
              />
              <CircularProgressbar
                value={per}
                styles={buildStyles({
                  pathColor: "#2438EE",
                  trailColor: "transparent",
                })}
                className={classes.noOfReportsChart}
              />
            </div>
            <div>
              <div className={classes.noOfClients}>
                No. of clients<br></br> 0
              </div>
              <div className={classes.noOfReports}>
                No. of reports<br></br> 0
              </div>
            </div>
          </div>
        </div>
        <div className={`${classes.viewReport} ${classes.child} `}>
          <img
            src="/fileImage.png"
            alt="folder"
            className={classes.folder_image}
          />

          {/* <a onClick={() => router.push("/home")} ><p className={classes.viewRep}>View Report</p></a> */}
          <a onClick={() => router.push("/gen")}>
            <p className={classes.GenerateReport}>
              Generate Report <span> </span>
              <img src="./edit.png"></img>
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
export default NewHome;
