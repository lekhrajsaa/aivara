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

import DateRangeSelector from 'react-daterangeselector';
import 'react-daterangeselector/dist/styles.min.css';

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
  const [startDate, setstartDate] = useState('')
  const [endDate, setendDate] = useState('')

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

  const selectdayHandler = (e) => {
    setopenday(false);
    SettimePeriod(e.target.innerText);

    // console.log(e.target.innerText);
    // handler
    const ONEDAY = 86400000;//ms

    switch (e.target.innerText) {
      case "Today":
        reportOfToday();
        break;
      case "Yesterday":
        filterReportsOnTimeStamp(ONEDAY);
        break;
      case "2 day ago":
        filterReportsOnTimeStamp(2 * ONEDAY);
        break;
      case "7 day ago":
        filterReportsOnTimeStamp(7 * ONEDAY);
        break;
      case "15 day ago":
        filterReportsOnTimeStamp(15 * ONEDAY);
        break;
      case "1 month ago":
        filterReportsOnTimeStamp(30 * ONEDAY);
        break;
      case "2 month ago":
        filterReportsOnTimeStamp(60 * ONEDAY);
        break;

      default:
        break;
    };

    function reportOfToday() {
      let dupiDate = new Date();

      const filteredOutput = array.filter(item => {
        let temp = item.customTimeStamp;
        let tempDate = new Date(temp);

        // let dupli = todayInMS - filterOn;

        // console.log("compare -->", `${dupiDate.getDate()} - ${dupiDate.getMonth()+1} - ${dupiDate.getFullYear()} --- ${dupiDate.getHours()} and ${tempDate.getDate()} - ${tempDate.getMonth()+1} - ${tempDate.getFullYear()} --- ${tempDate.getHours()}`)

        // (tempDate.getFullYear() <= dupiDate.getFullYear()  && tempDate.getMonth() <= dupiDate.getMonth() && tempDate.getDate() <= dupiDate.getDate())
        if (tempDate.getFullYear() === dupiDate.getFullYear() && tempDate.getMonth() === dupiDate.getMonth() && tempDate.getDate() === dupiDate.getDate()) {
          return true;
        }
        return false;
      });

      // console.log(filteredOutput)
      setFilteredResults(filteredOutput);

    }

    function filterReportsOnTimeStamp(filterOn) {
      let todayInMS = Date.now();

      let chacha = new Date(todayInMS);

      let todayAt12 = new Date(`${chacha.getFullYear()}-${chacha.getMonth() + 1}-${chacha.getDate()}`).getTime();// in ms

      // console.log(`${new Date(`${chacha.getFullYear()}-${chacha.getMonth()+1}-${chacha.getDate()}`).getDate()} and ${chacha.getTime()}`)

      const filteredOutput = array.filter(item => {
        let temp = item.customTimeStamp;
        let tempDate = new Date(temp);

        let dupli = todayAt12 - filterOn;
        let dupiDate = new Date(dupli);

        // console.log("compare -->", `${dupiDate.getDate()} - ${dupiDate.getMonth()+1} - ${dupiDate.getFullYear()} and ${tempDate.getDate()} - ${tempDate.getMonth()+1} - ${tempDate.getFullYear()}`)

        // (tempDate.getFullYear() <= dupiDate.getFullYear()  && tempDate.getMonth() <= dupiDate.getMonth() && tempDate.getDate() <= dupiDate.getDate())
        // console.log(temp," and ", dupli, temp > dupli)
        if (dupli <= temp) {
          // console.log("matched", item)
          return true;
        }
        return false;
      });

      // console.log(filteredOutput, "filterd date")
      setFilteredResults(filteredOutput);
    };
  };

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

  const todaay = new Date();
  const ONE_DAYIN_MS = 86400000;
  const TODAY_IN_MS = new Date(`${todaay.getFullYear()}-${todaay.getMonth() + 1}-${todaay.getDate()}`).getTime(); // at 12am
  const NEXT_DAT_IN_MS = TODAY_IN_MS + ONE_DAYIN_MS - 1; //today at 11.59.00


  function filterDateByTimestamp(startValue, endValue) {
    console.log(array, "okay")

    if (startValue > endValue) {

      const filteredOutput = array.filter(item => {
        console.log(item)

        let temp = item.customTimeStamp;
        let tempDate = new Date(temp);
        console.log(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())

        if (temp >= endValue && temp <= startValue) {
          // console.log("matched", item)
          return true;
        }
        return false;
      });

      console.log(filteredOutput, " new calender ", startValue, " to ", endValue)
    } else {
      const filteredOutput = array.filter(item => {
        let temp = item.customTimeStamp;
        let tempDate = new Date(temp);

        if (temp <= endValue && temp >= startValue) {
          // console.log("matched", item)
          return true;
        }
        return false;
      });

      console.log(filteredOutput, " new calender ", startValue, " to ", endValue)
    }
  }


  function callback(start, end) {

    let startDate = new Date(start._d);
    let endDate = new Date(end._d);

    let startDateTimestamp = startDate.getTime();
    let endDateTimestamp = endDate.getTime();

    // filterDateByTimestamp(startDateTimestamp, endDateTimestamp)

    setstartDate(startDateTimestamp);
    setendDate(endDateTimestamp);

    console.log("-----calender testing--------")
    // console.log(endDateTimestamp == 7 * NEXT_DAT_IN_MS , endDateTimestamp,NEXT_DAT_IN_MS, " <- start end -> ", startDateTimestamp == TODAY_IN_MS, startDateTimestamp, TODAY_IN_MS )

    // console.log(  ( NEXT_DAT_IN_MS - endDateTimestamp ) / ONE_DAYIN_MS , "days")

    if (startDateTimestamp <= NEXT_DAT_IN_MS && endDateTimestamp == NEXT_DAT_IN_MS) {
      const dispDay = Math.ceil((NEXT_DAT_IN_MS - startDateTimestamp) / ONE_DAYIN_MS) - 1;

      if (dispDay == 0) { console.log("Today"); SettimePeriod("Today") }
      else if (dispDay == 1) { console.log("Yesterday"); SettimePeriod("Yesterday") }
      else { console.log(`Last ${dispDay} Days`); SettimePeriod(`Last ${dispDay} Days`) }

    } else {
      console.log("custom");
      SettimePeriod("custom")
    }

  }

  useEffect(() => {
    console.log(startDate, endDate);

    const filteredOutput = array.filter(item => {
      // console.log(item)

      let temp = item.customTimeStamp;
      let tempDate = new Date(temp);
      // console.log(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())

      console.log("custom time stamp", temp, temp >= endDate && temp <= startDate || temp <= endDate && temp >= startDate)

      if ((temp >= endDate && temp <= startDate) || (temp <= endDate && temp >= startDate)) {
        // console.log("matched", item)
        // console.log(temp," -->", endDate,"to", startDate , timePeriod)
        return true;
      }
      return false;
    });

    console.log(filteredOutput, timePeriod)

    setFilteredResults([...filteredOutput]);

  }, [startDate, endDate])


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
              <h6 onClick={daysfilter} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                <DateRangeSelector
                  inputComponent={
                    <div style={{ position: "relative" }}>
                      <input type='text' name='dates' className='form-control pull-right' value={timePeriod} style={{ border: "none", textAlign: "center", fontSize: "22px", fontWeight: "600", cursor: "pointer" }} />
                      <BiChevronDown style={{ position: "absolute", right: "0", top: "12px" }} />
                    </div>
                  }
                  options={{
                    opens: 'left',
                    buttonClasses: ['btn btn-sm'],
                    applyClass: 'btn-primary',
                    separator: ' to ',
                    format: 'L',
                    dateLimit: { days: 90 },
                    ranges: {
                      'Today': [new Date(TODAY_IN_MS), new Date(NEXT_DAT_IN_MS)],
                      'Yesterday': [new Date((NEXT_DAT_IN_MS - 2 * ONE_DAYIN_MS) + 2), new Date(NEXT_DAT_IN_MS)],
                      'Last 7 Days': [new Date(NEXT_DAT_IN_MS - 7 * ONE_DAYIN_MS), new Date(NEXT_DAT_IN_MS)],
                      'Last 28 Days': [new Date(NEXT_DAT_IN_MS - 28 * ONE_DAYIN_MS), new Date(NEXT_DAT_IN_MS)],
                      'Last 60 Days': [new Date(NEXT_DAT_IN_MS - 60 * ONE_DAYIN_MS), new Date(NEXT_DAT_IN_MS)],
                      'Last 90 Days': [new Date(NEXT_DAT_IN_MS - 90 * ONE_DAYIN_MS), new Date(NEXT_DAT_IN_MS)],
                      'Last 120 Days': [new Date(NEXT_DAT_IN_MS - 120 * ONE_DAYIN_MS), new Date(NEXT_DAT_IN_MS)],
                      'Last 180 Days': [new Date(NEXT_DAT_IN_MS - 180 * ONE_DAYIN_MS), new Date(NEXT_DAT_IN_MS)]
                    },
                    locale: {
                      applyLabel: 'Update',
                      cancelLabel: 'Clear',
                      fromLabel: 'Start date',
                      toLabel: 'End date',
                      customRangeLabel: 'Custom'
                    },
                    minDate: new Date('2022-01-01T00:00:00.000Z'),
                    alwaysShowCalendars: true
                  }}
                  callback={callback}
                />

                {/* <div style={{position:"absolute", height:"35px", width:"145px", background:"#ffffff", padding:"6px 12px", border:"none"}}>{timePeriod}</div> */}

              </h6>
              {/* <div className={openday ? classes.listday : classes.listday_hide}> */}
              {/* <li onClick={selectdayHandler}>Today</li>
                <li onClick={selectdayHandler}>Yesterday</li>
                <li onClick={selectdayHandler}>2 day ago</li>
                <li onClick={selectdayHandler}>7 day ago</li>
                <li onClick={selectdayHandler}>15 day ago</li>
                <li onClick={selectdayHandler}>1 month ago</li>
                <li onClick={selectdayHandler}>2 month ago</li> */}
              {/* </div> */}
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
