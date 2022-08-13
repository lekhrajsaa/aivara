import { Col, Container, Row } from "reactstrap";
import classes from "../signup_and_login/LoginForm.module.css";
import axios from "axios";
import {
  Getting_user_data,
  setAiReportData,
  setPrevPage,
  setReportTableData,
} from "../../redux/dataAction";
import { useDispatch, useSelector } from "react-redux";
import { Xapkey } from "../../apikey";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";

import { useRouter } from "next/router";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { AiOutlineSearch } from "react-icons/ai";
// import empty from "../asset/empty.png";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import Router from "next/router";

import { DayPicker } from "react-day-picker";

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
  const [dateTimeValue, setDateTimeValue] = useState("Date/Time");
  const [showDate, setShowDate] = useState(true);
  const [showTime, setShowTime] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  // filter output
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchBarTab, setsearchBarTab] = useState(true);
  const [tableheaderTab, settableheaderTab] = useState(true);

  // for toggle the up and down arrow icon
  const [arrow, setArrow] = useState(true);

  //
  // const [startDate, setstartDate] = useState('')
  // const [endDate, setendDate] = useState('')

  // for  toggle class
  const [datalenghtIszreo, setdatalenghtIszreo] = useState(false);
  const [openAlpha, setopenAlpha] = useState(false);
  const [openStatus, setopenStatus] = useState(false);
  const [openday, setopenday] = useState(false);
  const [openIncompleteStatusDilogBox, setOpenIncompleteStatusDilogBox] =
    useState(false);
  const [openInAiProcessDilogBox, setOpenInAiProcessDilogBox] = useState(false);
  const [incompleteReportId, setIncompleteReportId] = useState("");

  // sorting arrangement
  const sortbox = () => {
    if (openAlpha) {
      setopenAlpha(false);
    } else {
      setopenAlpha(true);
    }
  };

  useEffect(() => {
    setFilteredResults(array);
  }, [array]);

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
          setarray(result.data.Items);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    dispatch(setPrevPage("/reports"));
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

  console.log(filteredResults);

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

  // ascending order filter of client name
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

  // returns client name with ascending order
  const ascendOrder = () => {
    if (searchInput !== "") {
      setFilteredResults(filteredResults.sort(compare));
    } else {
      setarray(array.sort(compare));
    }
    setArrow(false);
  };

  // descending order filter of client name
  const dCompare = (a, b) => {
    const labA = a.clientName.toUpperCase();
    const labB = b.clientName.toUpperCase();

    let comparison = 0;
    if (labA > labB) {
      comparison = -1;
    } else if (labA < labB) {
      comparison = 1;
    }
    return comparison;
  };

  // returns client name with descending order
  const descendOrder = () => {
    if (searchInput !== "") {
      setFilteredResults(filteredResults.sort(dCompare));
    } else {
      setarray(array.sort(dCompare));
    }
    setArrow(true);
  };

  //ascending order filter of date/time
  const ascCompare = (a, b) => {
    const t1 = new Date(a.customTimeStamp).valueOf();
    const t2 = new Date(b.customTimeStamp).valueOf();
    console.log(t1 - t2);
    return t1 - t2;
  };

  // returns date/time with ascending order
  const ascTime = () => {
    if (searchInput !== "") {
      setFilteredResults(filteredResults.sort(ascCompare));
    } else {
      setarray(array.sort(ascCompare));
    }
    setArrow(false);
  };

  //descending order filter of date/time
  const descCompare = (a, b) => {
    const t1 = new Date(a.customTimeStamp).valueOf();
    const t2 = new Date(b.customTimeStamp).valueOf();
    return t2 - t1;
  };

  // returns date/time with descending order
  const descTime = () => {
    if (searchInput !== "") {
      setFilteredResults(filteredResults.sort(descCompare));
    } else {
      setarray(array.sort(descCompare));
    }
    setArrow(true);
  };

  // Status filter
  const labstatus = (a) => {
    if (a === "all") {
      setTimeout(() => {
        setFilteredResults(array);
      }, 0);
    }
    setFilteredResults(
      array.filter((e, i) => e.reportStatus.toLowerCase() === a)
    );
    setopenStatus(false);
  };

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

      fetch(`${SERVER_URL}getOneReport/${reportId}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result && result.data && result.data.Item) {
            console.log(result.data.Item, "one");
            dispatch(setAiReportData(result.data.Item));
            router.push("/analysis");
          }
        })
        .catch((error) => console.log("error", error));

      // fetch(`${SERVER_URL}userReportData/${reportId}`, requestOptions)
      //   .then((response) => response.text())
      //   .then((result) => {
      //     console.log(result, "two");
      //     dispatch(setAiReportData(JSON.parse(result)));
      //     router.push("/analysis");
      //   })
      //   .catch((error) => console.log("error", error));


    }
  }

  const timeMacker = (timeStamp) => {
    if (timeStamp) {
      const newDate = new Date(timeStamp);

      console.log(newDate.getHours(), newDate.getMinutes(), "from time macker");

      const h =
        parseInt(newDate.getHours() / 10) === 0
          ? `0${newDate.getHours()}`
          : `${newDate.getHours()}`;
      const m =
        parseInt(newDate.getMinutes() / 10) === 0
          ? `0${newDate.getMinutes()}`
          : `${newDate.getMinutes()}`;

      return `${h}:${m}`;
    }
  };

  const dateMacker = (timeStamp) => {
    if (timeStamp) {
      const newDate = new Date(timeStamp);

      // console.log(newDate.getDate(), newDate.getFullYear(), newDate.getMonth()+1, "from date macker")

      return `${newDate.getDate()}/${newDate.getMonth() + 1}/${JSON.stringify(
        newDate.getFullYear()
      ).slice(2, 4)}`;
    }
  };

  // console.log(timeMacker(1657474021848));
  // console.log(dateMacker(1657474021848));

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
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [calenderOption, setCalenderOption] = useState("Today");

  const todaay = new Date();
  const ONE_DAYIN_MS = 86400000;
  const TODAY_IN_MS = new Date(
    `${todaay.getFullYear()}-${todaay.getMonth() + 1}-${todaay.getDate()}`
  ).getTime(); // at 12am
  const NEXT_DAT_IN_MS = TODAY_IN_MS + ONE_DAYIN_MS - 1; //today at 11.59.00

  //
  const defaultSelected = {
    from: new Date(TODAY_IN_MS),
    to: new Date(TODAY_IN_MS),
  };
  const [range, setRange] = useState(defaultSelected);

  let footer = (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        borderTop: "rgb(158 158 158) 2px solid",
      }}
    >
      <button
        onClick={() => {
          setRange(defaultSelected);
          setIsCalendarShow(false);
        }}
        style={{
          margin: "20px 10px -5px 10px",
          borderRadius: "8px",
          width: "80px",
          backgroundColor: "rgba(95, 165, 250, 0.1)",
          border: "none",
          color: "black",
          padding: "5px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-bloc",
        }}
      >
        Cancel
      </button>
      <button
        style={{
          margin: "20px 10px -5px 10px",
          borderRadius: "8px",
          width: "80px",
          backgroundColor: "#5FA5FA",
          border: "none",
          color: "black",
          padding: "5px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-bloc",
        }}
        onClick={() => {
          updateCalender();
          setIsCalendarShow(false);
        }}
      >
        Ok
      </button>
    </div>
  );

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
      console.log("single date");

      let toTimee = fromTime + ONE_DAYIN_MS;
      return filterDateByTimestamp(fromTime, toTimee);
    }

    let toTime = new Date(range.to).getTime(); // in ms

    // today
    if (fromTime === toTime) {
      console.log("today");

      let toTimee = toTime + ONE_DAYIN_MS;
      filterDateByTimestamp(fromTime, toTimee);
    }

    // reports for date range
    if (range.from && range.to) {
      console.log("range of date", range);
      console.log(new Date(range.from).getTime(), "gg from");
      console.log(new Date(range.to).getTime(), "gg to");

      let toTimee = toTime + ONE_DAYIN_MS;
      filterDateByTimestamp(fromTime, toTimee);
    }
  }

  // filter logic
  function filterDateByTimestamp(startValue, endValue) {
    const filteredOutput = array.filter((item) => {
      let temp = item.customTimeStamp;

      if (temp <= endValue && temp >= startValue) {
        return true;
      }
      return false;
    });

    console.log(filteredOutput, " new calender ", startValue, " to ", endValue);

    if (filteredOutput.length === 0) {
      console.log("pok u");
      return setFilteredResults([]);
    }

    setFilteredResults(filteredOutput);
  }

  return (
    <div className={classes.homeBody}>
      <Container
        style={{ paddingLeft: 0, maxWidth: "unset" }}
        className={classes.name}
      >
        {searchBarTab && (
          <div
            style={{ justifyContent: "space-between", width: "unset" }}
            className={classes.search_main}
          >
            <div className={`${classes.form_group} ${classes.has_search}`}>
              <span className={classes.searchicon}>
                {/* <AiOutlineSearch /> */}
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="7.82345"
                    cy="7.82345"
                    r="6.74142"
                    stroke="#696969"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.5117 12.8633L15.1547 15.4994"
                    stroke="#696969"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <input
                type="text"
                className={classes.form_control}
                placeHolder="Search"
                onChange={(e) => searchItems(e.target.value)}
              />
            </div>
            <div className={classes.dayfilter}>
              <h6
                onClick={daysfilter}
                style={{
                  height: "50px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  fontSize: "18px",
                }}
              >
                <div
                  onClick={() => setIsCalendarShow(!isCalendarShow)}
                  style={{
                    display: "flex",
                    position: "relative",
                    width: "200px",
                  }}
                >
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
                  <div
                    style={{
                      position: "absolute",
                      top: "100px",
                      right: "50px",
                      background: "#fff",
                      padding: "10px",
                      display: "flex",
                      boxShadow: "rgb(158 158 158) 5px 6px 16px 0px",
                      borderRadius: "5%",
                      zIndex: "100",
                      transform: "scale(0.85, 0.8)",
                    }}
                  >
                    <div
                      style={{
                        width: "140px",
                        padding: "10px",
                        borderRight: "rgb(158 158 158) 2px solid",
                      }}
                    >
                      <div
                        style={{ marginTop: "25px", textAlign: "start" }}
                        onClick={(e) => {
                          setCalenderOption("Today");
                          setRange({
                            from: new Date(TODAY_IN_MS),
                            to: new Date(TODAY_IN_MS),
                          });
                        }}
                      >
                        Today
                      </div>
                      <div
                        style={{ marginTop: "25px", textAlign: "start" }}
                        onClick={(e) => {
                          setCalenderOption("Yesterday");
                          setRange({
                            from: new Date(TODAY_IN_MS - ONE_DAYIN_MS),
                            to: new Date(TODAY_IN_MS),
                          });
                        }}
                      >
                        Yesterday
                      </div>
                      <div
                        style={{ marginTop: "25px", textAlign: "start" }}
                        onClick={(e) => {
                          setCalenderOption("2 days ago");
                          setRange({
                            from: new Date(TODAY_IN_MS - 2 * ONE_DAYIN_MS),
                            to: new Date(TODAY_IN_MS),
                          });
                        }}
                      >
                        2 days ago
                      </div>
                      <div
                        style={{ marginTop: "25px", textAlign: "start" }}
                        onClick={(e) => {
                          setCalenderOption("7 days ago");
                          setRange({
                            from: new Date(TODAY_IN_MS - 7 * ONE_DAYIN_MS),
                            to: new Date(TODAY_IN_MS),
                          });
                        }}
                      >
                        7 days ago
                      </div>
                      <div
                        style={{ marginTop: "25px", textAlign: "start" }}
                        onClick={(e) => {
                          setCalenderOption("15 days ago");
                          setRange({
                            from: new Date(TODAY_IN_MS - 15 * ONE_DAYIN_MS),
                            to: new Date(TODAY_IN_MS),
                          });
                        }}
                      >
                        15 days ago
                      </div>
                      <div
                        style={{ marginTop: "25px", textAlign: "start" }}
                        onClick={(e) => {
                          setCalenderOption("1 month ago");
                          setRange({
                            from: new Date(TODAY_IN_MS - 30 * ONE_DAYIN_MS),
                            to: new Date(TODAY_IN_MS),
                          });
                        }}
                      >
                        1 month ago
                      </div>
                      <div
                        style={{ marginTop: "25px", textAlign: "start" }}
                        onClick={(e) => {
                          setCalenderOption("2 month ago");
                          setRange({
                            from: new Date(TODAY_IN_MS - 60 * ONE_DAYIN_MS),
                            to: new Date(TODAY_IN_MS),
                          });
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
            </div>
          </div>
        )}
      </Container>

      <Container
        style={{
          marginLeft: "0",
          marginRight: "0",
          marginTop: "2%",
          maxWidth: "unset",
        }}
      >
        <Row className={classes.tableheader}>
          <Col
            style={{ padding: 0 }}
            md={6}
            xs={6}
            className={classes.tableheader_text}
          >
            {arrow ? (
              <p
                onClick={() => {
                  ascendOrder();
                  sortbox();
                }}
                style={{ cursor: "pointer" }}
              >
                Reports
                <span className={classes.alpha_sort_btn}>
                  <BiChevronDown />
                </span>
              </p>
            ) : (
              <p
                onClick={() => {
                  descendOrder();
                  sortbox();
                }}
                style={{ cursor: "pointer" }}
              >
                Reports
                <span className={classes.alpha_sort_btn}>
                  <BiChevronUp />
                </span>
              </p>
            )}
          </Col>
          <Col
            md={4}
            xs={3}
            className={classes.proCol2 + " " + classes.proCol3}
          >
            <div id="datetimeStatus" class={classes.dateTimestatus_sort_box}>
              {arrow ? (
                <p
                  onBlur={() => dateTimeOpened(false)}
                  onClick={() => {
                    ascTime();
                    sortbox();
                  }}
                  className={classes.datetimeStatus}
                >
                  {dateTimeValue} <BiChevronDown />
                </p>
              ) : (
                <p
                  onBlur={() => dateTimeOpened(false)}
                  onClick={() => {
                    descTime();
                    sortbox();
                  }}
                  className={classes.datetimeStatus}
                >
                  {dateTimeValue} <BiChevronUp />
                </p>
              )}
              <ul
                style={{ display: "none" }}
                className={
                  dateTimeOpened && classes.dateTimestatus_sort_box_options
                }
              ></ul>
            </div>
          </Col>
          <Col md={1} xs={2} className={classes.proCol3}>
            <p>View </p>
          </Col>
          <Col
            md={1}
            xs={1}
            className={classes.proCol5 + " " + classes.proCol3}
          >
            <p style={{ cursor: "pointer" }} onClick={statusCheck}>
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
                <li onClick={() => labstatus("in ai process")}>
                  In AI process
                </li>
                <li onClick={() => labstatus("incomplete")}>Incomplete</li>
              </span>
            </p>
          </Col>
        </Row>

        <Row
          className={classes.reportListContainer}
          style={{
            overflowY: "scroll",
            height: "55vh",
            alignContent: "flex-start",
            marginTop: "5px",
          }}
        >
          {filteredResults &&
            filteredResults.map((a, i) => {
              console.log(a);
              return (
                <>
                  <Row
                    style={{
                      padding: "10px 0",
                      marginLeft: "0",
                      marginRight: "0",
                      alignItems: "center",
                    }}
                    className={classes.rowe}
                  >
                    <Col md={6} xs={5} className={classes.proCol}>
                      {a.clientName}
                    </Col>
                    <Col md={4} xs={3} className={classes.proCol2}>
                      {/* {dateConstractor(a.customTimeStamp)} */}
                      {showDate ? dateMacker(a.customTimeStamp) : null}
                      {showDate && showTime ? " ; " : null}
                      {showTime ? timeMacker(a.customTimeStamp) : null}
                    </Col>
                    <Col md={1} xs={2}>
                      <button
                        className={classes.proCol3}
                        onClick={() => {
                          if (a.reportStatus.toLowerCase() === "complete") {
                            fetchOneReport(a.reportId);
                          } else if (
                            a.reportStatus.toLowerCase() === "in review"
                          ) {
                            console.log("Yo", a.reportStatus);
                            setOpenIncompleteStatusDilogBox(a.reportStatus);
                            setIncompleteReportId(a.reportId);
                          } else if (
                            a.reportStatus.toLowerCase() === "incomplete"
                          ) {
                            setIncompleteReportId(a.reportId);
                            setOpenIncompleteStatusDilogBox(true);
                          } else if (
                            a.reportStatus.toLowerCase() === "in ai process"
                          ) {
                            setOpenInAiProcessDilogBox(true);
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

          {filteredResults.length < 1 && (
            <Container className={classes.emptdata_img}>
              <img
                src="https://esgplaybook.com/wp-content/uploads/undraw_Web_search_re_efla.png"
                className={classes.dataempty_image}
              />
              <h4 className={classes.no_report}>No Reports Found </h4>
            </Container>
          )}
        </Row>
      </Container>

      <Container style={{ marginLeft: "-10px" }} className={classes.report2}>
        <div className={classes.uploadicon}>
          <button
            className={classes.gen_button}
            onClick={() => router.push("/detail")}
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
      <Dialog
        open={openInAiProcessDilogBox}
        // onClose={() => setOpen(false)}
        aria-labelledby="dilog-title"
        aria-aria-describedby="dilog-description"
        sx={{ p: 2 }}
      >
        <DialogTitle id="dilog-title">IN AI PROCESS</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please wait..! The report is in AI process
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "center" }}
          sx={{ mx: 1, mb: 1 }}
        >
          <Button
            style={{ width: "96%", textAlign: "center" }}
            variant="contained"
            onClick={() => setOpenInAiProcessDilogBox(false)}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
