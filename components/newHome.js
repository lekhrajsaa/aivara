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
              { userdata.name} 
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
          <Dropdown>
            <Dropdown.Toggle
              className={classes.todayButton}
              variant=""
              id="dropdown-basic"
            >
              Today
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Today</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Yesterday</Dropdown.Item>
              <Dropdown.Item href="#/action-3">2 days ago</Dropdown.Item>
              <Dropdown.Item href="#/action-3">7 days ago</Dropdown.Item>
              <Dropdown.Item href="#/action-3">15 days ago</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
                No of clients<br></br> 0
              </div>
              <div className={classes.noOfReports}>
                No. of reports<br></br> 0
              </div>
            </div>
          </div>
        </div>
        <div className={`${classes.viewReport} ${classes.child} `}>
          <img
            src="/Folder_img.jpg"
            alt="folder"
            className={classes.folder_image}
          />

          <a onClick={() => router.push("/home")} ><p className={classes.viewRep}>View Report</p></a>
          <a onClick={() => router.push("/gen")} ><p className={classes.GenerateReport}>
            Generate Report <RiFileEditLine />
          </p></a>
        </div>
      </div>
    </div>
  );
};
export default NewHome;
