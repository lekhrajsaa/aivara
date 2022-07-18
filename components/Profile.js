import { Col, Container, Row } from "reactstrap";
import classes from "./LoginForm.module.css";
import axios from "axios";
import {
  Getting_user_data,
  setAiReportData,
  setReportTableData,
} from "../redux/dataAction";
import { useDispatch, useSelector } from "react-redux";
import { Xapkey } from "../apikey";
// import { Link, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/router";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
// import Paper from "@material-ui/core/Paper";
// import SearchBar from "material-ui-search-bar";
import { AiOutlineSearch } from "react-icons/ai";
import empty from "../asset/empty.png";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import Router from "next/router";


// import { DayPicker } from 'react-day-picker';

// import 'react-day-picker/dist/style.css';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;
const XAPIKEY = process.env.NEXT_PUBLIC_XAPI;
// const SERVER_URL = "http://localhost:5000/";

const labdata = [
  {
    labname: "Shree Datta Pathology Lab",
    date: "08/03/22;23:00",
    status: "complete",
  },
  {
    labname: "Chaudhari Diagnostic Center",
    date: "08/03/22;23:00",
    status: "incomplete",
  },
];

const Profile = () => {
  const [user, setuser] = useState([]);
  const [token, setToken] = useState();
  const [timePeriod, SettimePeriod] = useState("Today");
  const [name, setName] = useState();
  const userdata = useSelector((state) => state.userdata.userdata);
  // console.log("this is useradata")
  // console.log(userdata)
  const [array, setarray] = useState(labdata);
  const [dateTimeOpened, setDateTimeOpened] = useState(false);
  const [dateTimeValue, setDateTimeValue] = useState('Date/Time');

  const router = useRouter();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  // filter output
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchBarTab, setsearchBarTab] = useState(true);
  const [tableheaderTab, settableheaderTab] = useState(true);

  //
  // const [startDate, setstartDate] = useState('')
  // const [endDate, setendDate] = useState('')

  // for  toggle class
  const [datalenghtIszreo, setdatalenghtIszreo] = useState(false);
  const [openAlpha, setopenAlpha] = useState(false);
  const [openStatus, setopenStatus] = useState(false);
  const [openday, setopenday] = useState(false);
  const [openIncompleteStatusDilogBox, setOpenIncompleteStatusDilogBox] = useState(false);
  // const [openInReviewStatusDilogBox, setOpenInReviewStatusDilogBox] = useState(false);
  const [incompleteReportId, setIncompleteReportId] = useState("");

  const setclassname = datalenghtIszreo
    ? `${classes.scrollRep} ${classes.datalenght_zero}`
    : classes.datalenght_zero;
  console.log(datalenghtIszreo);
  const sortbox = () => {
    if (openAlpha) {
      setopenAlpha(false);
    } else {
      setopenAlpha(true);
    }
  };


  useEffect(() => {
    setFilteredResults(array)
  }, [array])


  const statusCheck = () => {
    if (openStatus) {
      setopenStatus(false);
    } else {
      setopenStatus(true);
    }
  };
  const daysfilter = () => {
    if (openday) {
      setopenday(false);
    } else {
      setopenday(true);
    }
  };

  // const selectdayHandler = (e) => {
  //   setopenday(false);
  //   SettimePeriod(e.target.innerText);

  //   // console.log(e.target.innerText);
  //   // handler
  //   const ONEDAY = 86400000;//ms

  //   switch (e.target.innerText) {
  //     case "Today":
  //       reportOfToday();
  //       break;
  //     case "Yesterday":
  //       filterReportsOnTimeStamp(ONEDAY);
  //       break;
  //     case "2 day ago":
  //       filterReportsOnTimeStamp(2 * ONEDAY);
  //       break;
  //     case "7 day ago":
  //       filterReportsOnTimeStamp(7 * ONEDAY);
  //       break;
  //     case "15 day ago":
  //       filterReportsOnTimeStamp(15 * ONEDAY);
  //       break;
  //     case "1 month ago":
  //       filterReportsOnTimeStamp(30 * ONEDAY);
  //       break;
  //     case "2 month ago":
  //       filterReportsOnTimeStamp(60 * ONEDAY);
  //       break;

  //     default:
  //       break;
  //   };

  //   function reportOfToday() {
  //     let dupiDate = new Date();

  //     const filteredOutput = array.filter(item => {
  //       let temp = item.customTimeStamp;
  //       let tempDate = new Date(temp);

  //       // let dupli = todayInMS - filterOn;

  //       // console.log("compare -->", `${dupiDate.getDate()} - ${dupiDate.getMonth()+1} - ${dupiDate.getFullYear()} --- ${dupiDate.getHours()} and ${tempDate.getDate()} - ${tempDate.getMonth()+1} - ${tempDate.getFullYear()} --- ${tempDate.getHours()}`)

  //       // (tempDate.getFullYear() <= dupiDate.getFullYear()  && tempDate.getMonth() <= dupiDate.getMonth() && tempDate.getDate() <= dupiDate.getDate())
  //       if (tempDate.getFullYear() === dupiDate.getFullYear() && tempDate.getMonth() === dupiDate.getMonth() && tempDate.getDate() === dupiDate.getDate()) {
  //         return true;
  //       }
  //       return false;
  //     });

  //     // console.log(filteredOutput)
  //     setFilteredResults(filteredOutput);

  //   }

  //   function filterReportsOnTimeStamp(filterOn) {
  //     let todayInMS = Date.now();

  //     let chacha = new Date(todayInMS);

  //     let todayAt12 = new Date(`${chacha.getFullYear()}-${chacha.getMonth() + 1}-${chacha.getDate()}`).getTime();// in ms

  //     // console.log(`${new Date(`${chacha.getFullYear()}-${chacha.getMonth()+1}-${chacha.getDate()}`).getDate()} and ${chacha.getTime()}`)

  //     const filteredOutput = array.filter(item => {
  //       let temp = item.customTimeStamp;
  //       let tempDate = new Date(temp);

  //       let dupli = todayAt12 - filterOn;
  //       let dupiDate = new Date(dupli);

  //       // console.log("compare -->", `${dupiDate.getDate()} - ${dupiDate.getMonth()+1} - ${dupiDate.getFullYear()} and ${tempDate.getDate()} - ${tempDate.getMonth()+1} - ${tempDate.getFullYear()}`)

  //       // (tempDate.getFullYear() <= dupiDate.getFullYear()  && tempDate.getMonth() <= dupiDate.getMonth() && tempDate.getDate() <= dupiDate.getDate())
  //       // console.log(temp," and ", dupli, temp > dupli)
  //       if (dupli <= temp) {
  //         // console.log("matched", item)
  //         return true;
  //       }
  //       return false;
  //     });

  //     // console.log(filteredOutput, "filterd date")
  //     setFilteredResults(filteredOutput);
  //   };
  // };

  const getUserData = async () => {
    let body = {
      query: `{
        getUser {
          name
          labName
          phoneNo
          email
          userId
          lastLoggedIn
          password
        }
      }`,
      variables: {},
    };
    let options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(token)}`,
        "x-api-key": process.env.NEXT_PUBLIC_XAPI,
      },
    };
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}api/v1`,
        body,
        options
      );
      console.log(resp);
      setuser(resp.data.data.getUser);
      dispatch(Getting_user_data(resp.data.data.getUser));
    } catch (err) {
      console.log(err);
    }
  };


  function dateTimeClickHanlder() {
    setDateTimeOpened(prv => !prv);
  }
  function dateTimeOptionClickHanlder(e) {
    setDateTimeValue(e.target.innerText);
    setDateTimeOpened(false)
  }

  // geting all report data from database
  const fetchAllReportData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", XAPIKEY);
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${SERVER_URL}getAllReport`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result && result.data && result.data.Items) {
          console.log(result.data.Items);
          setarray(result.data.Items)
        }
      })
      .catch((error) => console.log("error", error));
  };

  //
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      getUserData();
      fetchAllReportData();
    }
    if (array.length === 0) {
      setsearchBarTab(false);
      setdatalenghtIszreo(false);
    } else {
      setsearchBarTab(true);
      setdatalenghtIszreo(true);
    }
  }, [token]);

  //Day time filter

  const datetimeFilter = (a) => {
    console.log(a)
  }

  // searching Reports
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = array.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(array);
    }
  };
  const filteredData = array.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });

  // Ascending order filter
  const compare = (a, b) => {
    const labA = a.clientName.toUpperCase();
    const labB = b.clientName.toUpperCase();

    let comparison = 0;
    if (labA > labB) {
      comparison = 1;
    } else if (labA < labB) {
      comparison = -1;
    }
    return comparison;
  };
  const ascendOrder = () => {
    if (searchInput !== "") {
      setFilteredResults(filteredResults.sort(compare));
    } else {
      setarray(array.sort(compare));
    }
    setopenAlpha(false);
  };

  // Status filter
  const labstatus = (a) => {
    if (a === 'all') {
      setFilteredResults(array)
    }
    setFilteredResults(array.filter((e, i) => e.reportStatus.toLowerCase() === a))
    setopenStatus(false);
  };

  function reportStatusClickHanlder(stat) {
    if (stat === "incomplete") {
      setOpenIncompleteStatusDilogBox(true);
    } else if (stat.toLowerCase() === "complete") {
      setOpenCompleteStatusDilogBox(true);
    } else if (stat.toLowerCase() === "in review") {
      setOpenInReviewStatusDilogBox(true);
    }
  }

  function completeNowClickHanlder(e) {
    const token = localStorage.getItem("token");
    const reportId = incompleteReportId;

    if (reportId && token) {
      var myHeaders = new Headers();
      myHeaders.append("x-api-key", "d002d6d0-500e-42a4-a6c9-c18a74b81d88");
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${SERVER_URL}userReportData/${reportId}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          dispatch(setAiReportData(JSON.parse(result)));
          router.push("/analysis");
        })
        .catch((error) => console.log("error", error));
    }
  }

  // making dates short
  const dateConstractor = (timeStamp) => {
    if (timeStamp) {
      // return JSON.stringify(data).slice(1, 25)
      var date = JSON.stringify(new Date(timeStamp))
      // console.log(date, " DATE COMPARE ", new Date(timeStamp).getHours(), new Date(timeStamp).getMinutes())
      const day = date.slice(9, 11);
      const month = date.slice(6, 8);
      const year = date.slice(3, 5);
      const customDate = `${day}/${month}/${year}`;
      // const customDate = `${date.getDate()}/${date.getUTCMonth()}/${date.getFullYear()}`;
      // console.log('date', customDate)
      // console.log('hour', date.slice(12, 14))
      // const hour = Number(date.slice(12, 14)) % 12;
      // const minute = date.slice(15, 17);
      // const customTime = `${hour}:${minute}`;
      const customTime = date.slice(12, 17)
      const currentDate = customDate + " ; " + customTime;

      // const currentDate=customDate.splice
      return currentDate;
    }
  };

  //fetchOneReport
  const fetchOneReport = (reportId) => {
    console.log(reportId);
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", XAPIKEY);
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${SERVER_URL}getOneReport/${reportId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result && result.data && result.data.Item) {
          console.log(result.data.Item);
          dispatch(setReportTableData(result.data.Item));
          Router.push("/untitle");
        }
      })
      .catch((error) => console.log("error", error));
  };

  // calender filtering
//   const [isCalendarShow, setIsCalendarShow] = useState(false);
//   const [calenderOption, setCalenderOption] = useState("Today")

//   const todaay = new Date();
//   const ONE_DAYIN_MS = 86400000;
//   const TODAY_IN_MS = new Date(`${todaay.getFullYear()}-${todaay.getMonth() + 1}-${todaay.getDate()}`).getTime(); // at 12am
//   const NEXT_DAT_IN_MS = TODAY_IN_MS + ONE_DAYIN_MS - 1; //today at 11.59.00

//   //
//   const defaultSelected = {
//     from: new Date(TODAY_IN_MS),
//     to: new Date(TODAY_IN_MS)
//   };
//   const [range, setRange] = useState(defaultSelected);

//   let footer = <div style={{ display: "flex", justifyContent: "end" }}>
//   <button
//     onClick={() => {
//       setRange(defaultSelected)
//       setIsCalendarShow(false)
//     }}
//     style={{ margin: "20px 10px -5px 10px", borderRadius: "8px", width: "80px", backgroundColor: "rgba(95, 165, 250, 0.1)", border: "none", color: "black", padding: "5px", textAlign: "center", textDecoration: "none", display: "inline-bloc" }}
//   >
//     Cancel
//   </button>
//   <button
//     style={{ margin: "20px 10px -5px 10px", borderRadius: "8px", width: "80px", backgroundColor: "#5FA5FA", border: "none", color: "black", padding: "5px", textAlign: "center", textDecoration: "none", display: "inline-bloc" }}
//     onClick={() => {
//       updateCalender()
//       setIsCalendarShow(false)
//     }}
//   >
//     Ok
//   </button>
// </div>;

//   if (range?.from) {
//     if (!range.to) {
//       footer = footer;
//     } else if (range.to) {
//       footer = footer;
//     }
//   }

//   // filter reports on date
//   function updateCalender() {
//     let fromTime = new Date(range.from).getTime(); // in ms

//     // reports for a single day
//     if (!range.to) {
//       console.log("single date")

//       let toTimee = fromTime + ONE_DAYIN_MS;
//       return filterDateByTimestamp(fromTime, toTimee)
//     }

//     let toTime = new Date(range.to).getTime(); // in ms

//     // today
//     if (fromTime === toTime) {
//       console.log("today")

//       let toTimee = toTime + ONE_DAYIN_MS;
//       filterDateByTimestamp(fromTime, toTimee)
//     }

//     // reports for date range
//     if (range.from && range.to) {
//       console.log("range of date", range)
//       console.log(new Date(range.from).getTime(), "gg from")
//       console.log(new Date(range.to).getTime(), "gg to")

//       let toTimee = toTime + ONE_DAYIN_MS;
//       filterDateByTimestamp(fromTime, toTimee)
//     }
//   }

//   // filter logic
//   function filterDateByTimestamp(startValue, endValue) {

//     const filteredOutput = array.filter(item => {

//       let temp = item.customTimeStamp;

//       if (temp <= endValue && temp >= startValue) { return true; }
//       return false;
//     });

//     console.log(filteredOutput, " new calender ", startValue, " to ", endValue)

//     if (filteredOutput.length === 0) { console.log("pok u"); return setFilteredResults([]) }

//     setFilteredResults(filteredOutput)

//   }


  return (
    <div className={classes.homeBody}>
      <Container style={{ paddingLeft: 0, maxWidth: 'unset' }} className={classes.name}>
        {searchBarTab && (
          <div style={{ justifyContent: 'space-between', marginRight: '15%', width: 'unset' }} className={classes.search_main}>
            <div className={`${classes.form_group} ${classes.has_search}`}>
              <span className={classes.searchicon}>
                <AiOutlineSearch />
              </span>
              <input
                type="text"
                className={classes.form_control}
                placeHolder="Search"
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
            <div className={classes.dayfilter}>
              <h6 onClick={daysfilter} style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "18px" }}>
                {/* <div onClick={() => setIsCalendarShow(!isCalendarShow)}> {calenderOption} </div>                
                {isCalendarShow ? (
                  <div style={{ position: "absolute", top: "160px", right:"50px", background: "#fff", padding: "10px", display: "flex", boxShadow: "rgb(158 158 158) 5px 6px 16px 0px", borderRadius: "5%", zIndex: "100", transform: "scale(0.85, 0.8)" }}>

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
                ) : null} */}
              </h6>
            </div>
          </div>
        )}
      </Container>

      {/* <Container className={classes.report}>
        {searchBarTab && (
          <Row className={classes.tableheader}>
            <Col md={6} xs={6} className={classes.tableheader_text}>
              <p>
                Reports{" "}
                <span className={classes.alpha_sort_btn} onClick={sortbox}>
                  <BiChevronDown />
                </span>
                <span
                  className={
                    openAlpha
                      ? classes.alpha_sort_box
                      : classes.alpha_sort_box_hide
                  }
                >
                  <li className={classes.alpha_sort_text} onClick={ascendOrder}>
                    Alphabetical Sorting
                  </li>
                </span>
              </p>
            </Col>
            <Col md={4} xs={3} className={classes.proCol2}>
              <select
                id="datetimeStatus"
                className={classes.dateTimestatus_sort_box}
              >
               <option selected>Date/Time</option>
                <option value="date" onClick={datetimeFilter("date")}>
                  Date
                </option>
                <option value="time" onClick={datetimeFilter("time")}>
                  Time
                </option>
              </select>
            </Col>
            <Col md={1} xs={2} style={{ marginTop: "6px" }}>
              <p>View </p>
            </Col>
            <Col md={1} xs={1} className={classes.proCol5}>
              <p>
                Status
                <span className={classes.status_sort_btn} onClick={statusCheck}>
                  <BiChevronDown />
                </span>
                <span
                  className={
                    openStatus
                      ? classes.status_sort_box
                      : classes.status_sort_box_hide
                  }
                >
                  <li onClick={() => labstatus("complete")}>Complete</li>
                  <li onClick={() => labstatus("inreview")}>inreview</li>
                </span>
              </p>
            </Col>
          </Row>
        )}
        
        <div className={setclassname}>
          {searchInput.length > 0 ? (
            filteredResults.length === 0 ? (
              <Container className={classes.emptdata_img}>
                <img
                  src="https://esgplaybook.com/wp-content/uploads/undraw_Web_search_re_efla.png"
                  className={classes.dataempty_image}
                />
                <h4 className={classes.no_report}>No Reports Found </h4>
              </Container>
            ) : (
              filteredResults.map((a, i) => {
                // var date = new Date();
                // console.log(date);
                return (
                  <>
                    <Row className={classes.rowe}>
                      <Col md={6} xs={5} className={classes.proCol}>
                        {a.clientName}
                      </Col>
                      <Col md={4} xs={3} className={classes.proCol2}>
                        {a.customTimeStamp}
                      </Col>
                      <Col md={1} xs={2}>
                        <button className={classes.proCol3}>View</button>
                      </Col>
                      <Col md={1} xs={2} className={classes.proCol4}>
                        <p>{a.reportStatus}</p>
                      </Col>
                    </Row>
                  </>
                );
              })
            )
          ) : array.length === 0 ? (
            <Container
              className={classes.emptdata_img1}
              style={{ marginTop: "0px" }}
            >
              <img
                src="https://esgplaybook.com/wp-content/uploads/undraw_Web_search_re_efla.png"
                className={classes.dataempty_image1}
              />
              <h4 className={classes.no_report}>No Reports Found</h4>
            </Container>
          ) : (
            array.map((a, i) => {
              return (
                <>
                  <Row className={classes.rowe}>
                    <Col md={6} xs={5} className={classes.proCol}>
                      {a.clientName}
                    </Col>
                    <Col md={4} xs={3} className={classes.proCol2}>
                      {dateConstractor(a.customTimeStamp)}
                    </Col>
                    <Col md={1} xs={2}>
                      <button
                        className={classes.proCol3}
                        onClick={() => {
                          if (a.reportStatus.toLowerCase() === "complete") {
                            fetchOneReport(a.reportId);
                          } else {
                            console.log("Yo", a.reportStatus);
                            setOpenIncompleteStatusDilogBox(a.reportStatus);
                            setIncompleteReportId(a.reportId);
                          }
                        }}
                      >
                        View
                      </button>
                    </Col>
                    <Col md={1} xs={2}>
                      <p
                      // style={{cursor: 'pointer'}}
                      // onClick={e => { reportStatusClickHanlder(a.reportStatus)}}
                      // onMouseOver={e => e.target.style.color = '#395d89'}
                      // onMouseOut={e => e.target.style.color = '#212529'}
                      >
                        {a.reportStatus}
                      </p>
                    </Col>
                  </Row>
                </>
              );
            })
          )}
        </div>
      </Container> */}

      <Container
        style={{ marginLeft: '0', marginRight: '0', marginTop: '2%', maxWidth: 'unset' }}
      >
        <Row className={classes.tableheader}>
          <Col
            style={{ padding: 0 }}
            md={6}
            xs={6}
            className={classes.tableheader_text}
          >
            <p>
              Reports{" "}
              <span className={classes.alpha_sort_btn} onClick={sortbox}>
                <BiChevronDown />
              </span>
              <span
                className={
                  openAlpha
                    ? classes.alpha_sort_box
                    : classes.alpha_sort_box_hide
                }
              >
                <li className={classes.alpha_sort_text} onClick={ascendOrder}>
                  Alphabetical Sorting
                </li>
              </span>
            </p>
          </Col>
          <Col md={4} xs={3} className={classes.proCol2} >
            {/* <p>
              Date/Time{" "}
              <span className={classes.date_sort_btn}>
                <BiChevronDown />
              </span>
            </p> */}
            <div id="datetimeStatus" class={classes.dateTimestatus_sort_box}>
              <p onBlur={() => dateTimeOpened(false)} onClick={dateTimeClickHanlder} className={classes.datetimeStatus}>{dateTimeValue} <BiChevronDown /></p>
              <ul style={{ display: 'none' }} className={dateTimeOpened && classes.dateTimestatus_sort_box_options}>
                <li onClick={dateTimeOptionClickHanlder}>Date/Time</li>
                <li onClick={dateTimeOptionClickHanlder}>Date</li>
                <li onClick={dateTimeOptionClickHanlder}>Time</li>
              </ul>
            </div>
          </Col>
          <Col md={1} xs={2} >
            <p>View </p>
          </Col>
          <Col md={1} xs={1} className={classes.proCol5}>
            <p style={{ cursor: 'pointer' }} onClick={statusCheck}>
              Status
              <span className={classes.status_sort_btn}>
                <BiChevronDown />
              </span>
              <span
                className={
                  openStatus
                    ? classes.status_sort_box
                    : classes.status_sort_box_hide
                }
              >
                <li onClick={() => labstatus("all")}>All</li>
                <li onClick={() => labstatus("complete")}>Complete</li>
                <li onClick={() => labstatus("in review")}>inreview</li>
              </span>
            </p>
          </Col>
        </Row>

        <Row className={classes.reportListContainer} style={{ overflowY: 'scroll', height: '55vh', alignContent: 'flex-start', marginTop: '5px' }}>

          {filteredResults &&
            filteredResults.map((a, i) => {
              return (
                <>
                  <Row style={{ padding: '10px 0', marginLeft: '0', marginRight: '0', alignItems: 'center' }} className={classes.rowe}>
                    <Col md={6} xs={5} className={classes.proCol}>
                      {a.clientName}
                    </Col>
                    <Col md={4} xs={3} className={classes.proCol2}>
                      {dateConstractor(a.customTimeStamp)}
                    </Col>
                    <Col md={1} xs={2}>
                      <button
                        className={classes.proCol3}
                        onClick={() => {
                          if (a.reportStatus.toLowerCase() === "complete") {
                            fetchOneReport(a.reportId);
                          } else {
                            console.log("Yo", a.reportStatus);
                            setOpenIncompleteStatusDilogBox(a.reportStatus);
                            setIncompleteReportId(a.reportId);
                          }
                        }}
                      >
                        View
                      </button>
                    </Col>
                    <Col md={1} xs={2} className={classes.proCol4}>
                      <p>{a.reportStatus}</p>
                    </Col>
                  </Row>
                </>
              );
            })}

          {(filteredResults.length < 1) && <Container className={classes.emptdata_img}>
            <img
              src="https://esgplaybook.com/wp-content/uploads/undraw_Web_search_re_efla.png"
              className={classes.dataempty_image}
            />
            <h4 className={classes.no_report}>No Reports Found </h4>
          </Container>}
        </Row>

      </Container>

      <Container style={{ marginLeft: '-10px' }} className={classes.report2}>
        <div className={classes.uploadicon}>
          {/* <i
            className="fa-solid fa-arrow-up-from-bracket"
            style={{ color: "#395D89" }}
          ></i> */}
          <button
            className={classes.gen_button}
            onClick={() => router.push("/gen")}
          >
            <FileUploadOutlinedIcon />
            Generate report
          </button>
        </div>
      </Container>

      <Dialog
        open={openIncompleteStatusDilogBox}
        // onClose={() => setOpen(false)}
        aria-labelledby="dilog-title"
        aria-aria-describedby="dilog-description"
        sx={{ p: 2 }}
      >
        <DialogTitle id="dilog-title">
          Please complete your report details
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please click on complete now button to complete your report details
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mx: 1, mb: 1 }}>
          <Button onClick={() => setOpenIncompleteStatusDilogBox(false)}>
            Complete Later
          </Button>
          <Button variant="contained" onClick={completeNowClickHanlder}>
            Complete Now
          </Button>
        </DialogActions>
      </Dialog>



    </div>
  );
};

export default Profile;