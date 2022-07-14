import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import classes from "./newHome.module.css";
import { BiChevronDown } from "react-icons/bi";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  SplitButton,
} from "react-bootstrap";
import { RiFileEditLine } from "react-icons/ri";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FiChevronDown } from "react-icons/fi";
import "react-circular-progressbar/dist/styles.css";

const XAPIKEY = process.env.NEXT_PUBLIC_XAPI;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;


const NewHome = () => {
  const userdata = useSelector((state) => state.userdata.userdata);
  const router = useRouter();
  
  const per = 66;
  const percentage = 56;
  const [timePeriod, setTimePeriod]=useState("Today")
  const [timePeriodOpen, setTimePeriodOpen] = useState(false)
  const [clientNumber, setClientNumber] = useState(0)
  const [reportNumber, setReportNumber] = useState(0)

  const selectdayHandler=(e)=>{
    setTimePeriod(e.target.innerText);
    setTimePeriodOpen(false);
  }
  // geting all report data from database
  const fetchAllReportData = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", XAPIKEY);
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${SERVER_URL}getAllReport`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result && result.data && result.data.Items) {
          console.log(result.data.Items);

          //set report no
          const reportNo = result.data.Items.length;
          // setReportNumber(reportNo)

          //set client no
          let clientNo = 0;
          if (reportNo > 0) {
            let clients = result.data.Items.map(item => item.clientName);
            clientNo = [...new Set(clients)].length
          }

          
          setReportNumber(100);
          setClientNumber(100);

          setTimeout(() => {setReportNumber(0); setClientNumber(0);}, 1000);
          setTimeout(() => {setReportNumber(reportNo); setClientNumber(clientNo);}, 2000);
        }

      })
      .catch(error => {
        console.log('error', error);
        setClientNumber(0);
        setReportNumber(0);
      });
  };

  //
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetchAllReportData(token);
    }
  }, [])

 

  return (
    <div className={classes.allBody}>
      <Container className={classes.name}>
        <Row>
          <Col md={11} xs={10}>
            <div className={classes.hello}>Hello, {userdata.name}</div>
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
            <h3 onClick={() => {setTimePeriodOpen(prv => !prv)}}>{timePeriod} <BiChevronDown /></h3>
            <ul style={{display: 'none'}} className={timePeriodOpen && classes.timePeriod_sort_box}>
              <li className={classes.timePeriod_sort_box_options} onClick={selectdayHandler}>
                Today
              </li>
              <li className={classes.timePeriod_sort_box_options} onClick={selectdayHandler}>
                Yesterday
              </li>
              <li className={classes.timePeriod_sort_box_options} onClick={selectdayHandler}>
                2 days ago
              </li>
              <li className={classes.timePeriod_sort_box_options} onClick={selectdayHandler}>
                7 days ago
              </li>
              <li className={classes.timePeriod_sort_box_options} onClick={selectdayHandler}>
                15 days ago
              </li>
              <li className={classes.timePeriod_sort_box_options} onClick={selectdayHandler}>
                1 month ago
              </li>
              <li className={classes.timePeriod_sort_box_options} onClick={selectdayHandler}>
                2 month ago
              </li>
            </ul>
          </div>

          <div className={classes.threeparts}>
            <div className={classes.chart}>
              <CircularProgressbar
                value={clientNumber}
                styles={buildStyles({
                  pathColor: "#4EAFE5",
                  // trailColor: "transparent",
                  // trailColor: "#d4e6fb",
                  trailColor: "rgb(212 230 251 / 20%)",
                  pathTransitionDuration: 0.5,
                })}
                className={classes.noOfClientsChart}
              />
              <CircularProgressbar
                value={reportNumber}
                styles={buildStyles({
                  pathColor: "#2438EE",
                  // trailColor: "transparent",
                  // trailColor: " rgb(133, 171, 254)",
                  trailColor: "rgb(133 171 254 / 12%)",
                })}
                className={classes.noOfReportsChart}
              />
            </div>
            <div className={classes.infoContainer}>
              <div className={classes.noOfClients}>
                No. of clients<br></br> {clientNumber}
              </div>
              <div className={classes.noOfReports}>
                No. of reports<br></br> {reportNumber}
              </div>
            </div>
          </div>
        </div>
        <div className={`${classes.viewReport} ${classes.child} `}>
          {/* <img
            src="/fileImage.png"
            alt="folder"
            className={classes.folder_image}
          /> */}

          {/* <a onClick={() => router.push("/home")} ><p className={classes.viewRep}>View Report</p></a> */}
          <a onClick={() => router.push("/gen")}>
            <Button className={classes.GenerateReport}>
              Generate Report <img src="./edit.png"></img>
            </Button>
            {/* <p className={classes.GenerateReport}>
              Generate Report <span> </span>
              <img src="./edit.png"></img>
            </p> */}
          </a>
        </div>
      </div>
    </div>
  );
};
export default NewHome;
