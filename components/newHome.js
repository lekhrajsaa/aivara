import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import classes from "./newHome.module.css";
import calClass from "./LoginForm.module.css";
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

import { DayPicker } from 'react-day-picker';
import { setPrevPage } from "../redux/dataAction";

const XAPIKEY = process.env.NEXT_PUBLIC_XAPI;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;


const NewHome = () => {
  const userdata = useSelector((state) => state.userdata.userdata);
  const router = useRouter();
  const dispatch = useDispatch();

  const [totalReport, setTotalReport] = useState(100)
  const [array, setarray] = useState([])

  const [timePeriod, setTimePeriod] = useState("Today")
  const [timePeriodOpen, setTimePeriodOpen] = useState(false)
  const [clientNumber, setClientNumber] = useState(0)
  const [reportNumber, setReportNumber] = useState(0)

  const selectdayHandler = (e) => {
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
          console.log(result.data);

          if (result.data.ScannedCount) {
            setTotalReport(result.data.ScannedCount)
          }

          //set report no
          const reportNo = result.data.Items.length;
          // setReportNumber(reportNo)

          setarray(result.data.Items)

          //set client no
          let clientNo = 0;
          if (reportNo > 0) {
            let clients = result.data.Items.map(item => item.clientName);
            clientNo = [...new Set(clients)].length
          }


          setReportNumber(100);
          setClientNumber(100);

          setTimeout(() => { setReportNumber(0); setClientNumber(0); }, 1000);
          setTimeout(() => { setReportNumber(reportNo); setClientNumber(clientNo); }, 2000);
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

    dispatch(setPrevPage("/home"))
  }, [])


  // calender filtering
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [calenderOption, setCalenderOption] = useState("Today")

  const todaay = new Date();
  const ONE_DAYIN_MS = 86400000;
  const TODAY_IN_MS = new Date(`${todaay.getFullYear()}-${todaay.getMonth() + 1}-${todaay.getDate()}`).getTime(); // at 12am
  const NEXT_DAT_IN_MS = TODAY_IN_MS + ONE_DAYIN_MS - 1; //today at 11.59.00

  //
  const defaultSelected = {
    from: new Date(TODAY_IN_MS),
    to: new Date(TODAY_IN_MS)
  };
  const [range, setRange] = useState(defaultSelected);

  let footer = <div style={{ display: "flex", justifyContent: "end", borderTop: "rgb(158 158 158) 2px solid" }}>
    <button
      onClick={() => {
        setRange(defaultSelected)
        setIsCalendarShow(false)
      }}
      style={{ margin: "20px 10px -5px 10px", borderRadius: "8px", width: "80px", backgroundColor: "rgba(95, 165, 250, 0.1)", border: "none", color: "black", padding: "5px", textAlign: "center", textDecoration: "none", display: "inline-bloc" }}
    >
      Cancel
    </button>
    <button
      style={{ margin: "20px 10px -5px 10px", borderRadius: "8px", width: "80px", backgroundColor: "#5FA5FA", border: "none", color: "black", padding: "5px", textAlign: "center", textDecoration: "none", display: "inline-bloc" }}
      onClick={() => {
        updateCalender()
        setIsCalendarShow(false)
      }}
    >
      Ok
    </button>
  </div>;

  if (range?.from) {
    if (!range.to) {
      footer = footer;
    } else if (range.to) {
      footer = footer;
    }
  }

  // filter reports on date
  function updateCalender() {
    let fromTime = new Date(range.from).getTime(); // in ms

    // reports for a single day
    if (!range.to) {
      console.log("single date")

      let toTimee = fromTime + ONE_DAYIN_MS;
      return filterDateByTimestamp(fromTime, toTimee)
    }

    let toTime = new Date(range.to).getTime(); // in ms

    // today
    if (fromTime === toTime) {
      console.log("today")

      let toTimee = toTime + ONE_DAYIN_MS;
      filterDateByTimestamp(fromTime, toTimee)
    }

    // reports for date range
    if (range.from && range.to) {
      console.log("range of date", range)
      console.log(new Date(range.from).getTime(), "gg from")
      console.log(new Date(range.to).getTime(), "gg to")

      let toTimee = toTime + ONE_DAYIN_MS;
      filterDateByTimestamp(fromTime, toTimee)
    }
  }

  // filter logic
  function filterDateByTimestamp(startValue, endValue) {

    if (array.length === 0) {
      setReportNumber(0);
      setClientNumber(0);
      return;
    }

    const filteredOutput = array.filter(item => {

      let temp = item.customTimeStamp;

      if (temp <= endValue && temp >= startValue) { return true; }
      return false;
    });

    console.log(filteredOutput, " new calender ", startValue, " to ", endValue)

    if (filteredOutput.length === 0) {
      console.log("pok u");
      setReportNumber(0);
      setClientNumber(0);
      return;
    }

    //set report no
    const reportNo = filteredOutput.length;

    //set client no
    let clientNo = 0;
    if (reportNo > 0) {
      let clients = filteredOutput.map(item => item.clientName);
      clientNo = [...new Set(clients)].length
    }


    setReportNumber(totalReport);
    setClientNumber(totalReport);

    setTimeout(() => { setReportNumber(0); setClientNumber(0); }, 1000);
    setTimeout(() => { setReportNumber(reportNo); setClientNumber(clientNo); }, 2000);

  }

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
            {/* <div className={calClass.dayfilter}> */}
            <h6 style={{ height: "50px", display: "flex", justifyContent: "start", alignItems: "center", fontSize: "18px" }}>
              <div onClick={() => setIsCalendarShow(!isCalendarShow)} style={{ display: "flex", position: "relative", width: "200px" }}>

                <div style={{ position: "absolute", left: "10px" }}>
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5438 1.16981L14.5449 1.94736C17.4021 2.1713 19.2896 4.11829 19.2927 7.10408L19.3039 15.8438C19.308 19.0991 17.2629 21.1021 13.9847 21.1073L5.97716 21.1176C2.71947 21.1218 0.648715 19.0711 0.644619 15.8064L0.633353 7.1694C0.629257 4.1639 2.45013 2.2221 5.30739 1.9598L5.30637 1.18225C5.30535 0.726088 5.6433 0.382928 6.09391 0.382928C6.54452 0.381892 6.88248 0.724014 6.8835 1.18018L6.88453 1.90589L12.9677 1.8976L12.9667 1.17188C12.9657 0.71572 13.3037 0.373598 13.7543 0.372561C14.1946 0.371524 14.5428 0.713647 14.5438 1.16981ZM2.21147 7.48974L17.7165 7.46901V7.10615C17.6725 4.87717 16.5541 3.70773 14.5469 3.53356L14.5479 4.33185C14.5479 4.77764 14.2007 5.13117 13.7604 5.13117C13.3098 5.13221 12.9708 4.77972 12.9708 4.33392L12.9698 3.49416L6.88654 3.50246L6.88756 4.34118C6.88756 4.78801 6.55063 5.1405 6.10002 5.1405C5.64941 5.14154 5.31043 4.79008 5.31043 4.34325L5.30941 3.54496C3.31239 3.74505 2.20738 4.91864 2.21045 7.16732L2.21147 7.48974ZM13.3292 12.2017V12.2131C13.3394 12.69 13.7286 13.0518 14.2007 13.0415C14.6616 13.0301 15.0292 12.6351 15.019 12.1582C14.9975 11.702 14.6278 11.3298 14.1679 11.3308C13.6968 11.3412 13.3282 11.7248 13.3292 12.2017ZM14.1751 16.8567C13.704 16.8463 13.3241 16.4534 13.3231 15.9765C13.3128 15.4996 13.6907 15.1046 14.1618 15.0932H14.172C14.6534 15.0932 15.0436 15.4861 15.0436 15.9734C15.0446 16.4606 14.6554 16.8556 14.1751 16.8567ZM9.10991 12.2183C9.13039 12.6952 9.52058 13.0674 9.99167 13.0466C10.4525 13.0249 10.8202 12.6309 10.7997 12.154C10.7884 11.6875 10.4095 11.3246 9.94866 11.3257C9.47756 11.3464 9.10888 11.7414 9.10991 12.2183ZM9.99576 16.81C9.52467 16.8307 9.13551 16.4585 9.114 15.9816C9.114 15.5047 9.48166 15.1108 9.95275 15.089C10.4136 15.088 10.7935 15.4508 10.8038 15.9163C10.8253 16.3943 10.4566 16.7882 9.99576 16.81ZM4.89055 12.2546C4.91103 12.7315 5.30122 13.1047 5.77231 13.0829C6.23316 13.0622 6.60082 12.6672 6.57931 12.1903C6.56907 11.7238 6.19015 11.3609 5.72827 11.3619C5.25718 11.3827 4.88953 11.7777 4.89055 12.2546ZM5.77641 16.8152C5.30531 16.837 4.91615 16.4637 4.89465 15.9868C4.89362 15.5099 5.2623 15.1149 5.73339 15.0942C6.19424 15.0932 6.57419 15.456 6.58443 15.9226C6.60594 16.3995 6.23828 16.7945 5.77641 16.8152Z"
                      fill="#838383"
                    />
                  </svg>
                </div>

                <div style={{ margin: "0 0 0 45px" }}>{calenderOption}</div>

                <div style={{ position: "absolute", right: "10px" }}>
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 8L0 0H12L6 8Z" fill="#838383" />
                  </svg>
                </div>

              </div>
              {isCalendarShow ? (
                <div style={{ position: "absolute", top: "10px", left: "0px", background: "#fff", padding: "10px", display: "flex", boxShadow: "rgb(158 158 158) 5px 6px 16px 0px", borderRadius: "5%", zIndex: "100", transform: "scale(0.85, 0.8)" }}>

                  <div style={{ width: "140px", padding: "10px", borderRight: "rgb(158 158 158) 2px solid" }}>
                    <div
                      style={{ marginTop: "25px", textAlign: "start" }}
                      onClick={(e) => {
                        setCalenderOption("Today")
                        setRange({
                          from: new Date(TODAY_IN_MS),
                          to: new Date(TODAY_IN_MS)
                        })
                      }}
                    >
                      Today
                    </div>
                    <div
                      style={{ marginTop: "25px", textAlign: "start" }}
                      onClick={(e) => {
                        setCalenderOption("Yesterday")
                        setRange({
                          from: new Date(TODAY_IN_MS - ONE_DAYIN_MS),
                          to: new Date(TODAY_IN_MS)
                        })
                      }}
                    >
                      Yesterday
                    </div>
                    <div
                      style={{ marginTop: "25px", textAlign: "start" }}
                      onClick={(e) => {
                        setCalenderOption("2 days ago")
                        setRange({
                          from: new Date(TODAY_IN_MS - 2 * ONE_DAYIN_MS),
                          to: new Date(TODAY_IN_MS)
                        })
                      }}
                    >
                      2 days ago
                    </div>
                    <div
                      style={{ marginTop: "25px", textAlign: "start" }}
                      onClick={(e) => {
                        setCalenderOption("7 days ago")
                        setRange({
                          from: new Date(TODAY_IN_MS - 7 * ONE_DAYIN_MS),
                          to: new Date(TODAY_IN_MS)
                        })
                      }}
                    >
                      7 days ago
                    </div>
                    <div
                      style={{ marginTop: "25px", textAlign: "start" }}
                      onClick={(e) => {
                        setCalenderOption("15 days ago")
                        setRange({
                          from: new Date(TODAY_IN_MS - 15 * ONE_DAYIN_MS),
                          to: new Date(TODAY_IN_MS)
                        })
                      }}
                    >
                      15 days ago
                    </div>
                    <div
                      style={{ marginTop: "25px", textAlign: "start" }}
                      onClick={(e) => {
                        setCalenderOption("1 month ago")
                        setRange({
                          from: new Date(TODAY_IN_MS - 30 * ONE_DAYIN_MS),
                          to: new Date(TODAY_IN_MS)
                        })
                      }}
                    >
                      1 month ago
                    </div>
                    <div
                      style={{ marginTop: "25px", textAlign: "start" }}
                      onClick={(e) => {
                        setCalenderOption("2 month ago")
                        setRange({
                          from: new Date(TODAY_IN_MS - 60 * ONE_DAYIN_MS),
                          to: new Date(TODAY_IN_MS)
                        })
                      }}
                    >
                      2 month ago
                    </div>
                  </div>

                  <DayPicker
                    style={{ background: "#fff", padding: "10px" }}
                    mode="range"
                    defaultMonth={todaay}
                    selected={range}
                    footer={footer}
                    onSelect={setRange}
                    onBlur={() => setIsCalendarShow(false)}
                  />
                </div>
              ) : null}
            </h6>
            {/* </div> */}
          </div>
          {/* <div className={classes.dropdown}>
            <h3 onClick={() => { setTimePeriodOpen(prv => !prv) }}>{timePeriod} <BiChevronDown /></h3>
            <ul style={{ display: 'none' }} className={timePeriodOpen && classes.timePeriod_sort_box}>
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
          </div> */}

          <div className={classes.threeparts}>
            <div className={classes.chart}>
              <CircularProgressbar
                value={(clientNumber / totalReport) * 100}
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
                value={(reportNumber / totalReport) * 100}
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
          {/* <a onClick={() => router.push("/gen")}> */}
          <a onClick={() => router.push("/detail")}>
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
