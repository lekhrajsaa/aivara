import { Col, Container, Row } from "reactstrap";
import classes from "./LoginForm.module.css";
import axios from "axios";
import { Getting_user_data, setReportTableData } from "../redux/dataAction";
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
  DialogContentText
} from '@mui/material';

import Router from "next/router";
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
  {
    labname: "A Square Pathology Services",
    date: "08/03/22;23:00",
    status: "complete",
  },
  {
    labname: "Aashish Khattar Sonography Clinic",
    date: "08/03/22;23:00",
    status: "incomplete",
  },
  {
    labname: "New Point Pathology Lab",
    date: "08/03/22;23:00",
    status: "inprogress",
  },
  {
    labname: "Nucleus Pathology Laboratory",
    date: "08/03/22;23:00",
    status: "inprogress",
  },
];

const Profile = () => {
  const [user, setuser] = useState([]);
  const [token, setToken] = useState();
  const[timePeriod,SettimePeriod]=useState("Today");
  const [name, setName] = useState();
  const userdata = useSelector((state) => state.userdata.userdata);
  const [array, setarray] = useState(labdata);
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchBarTab, setsearchBarTab] = useState(true);
  const [tableheaderTab, settableheaderTab] = useState(true);
  // for  toggle class
  const [datalenghtIszreo, setdatalenghtIszreo] = useState(false);
  const [openAlpha, setopenAlpha] = useState(false);
  const [openStatus, setopenStatus] = useState(false);
  const [openday, setopenday] = useState(false);
  const [openIncompleteStatusDilogBox, setOpenIncompleteStatusDilogBox] = useState(false);
  const [openCompleteStatusDilogBox, setOpenCompleteStatusDilogBox] = useState(false);
  const [openInReviewStatusDilogBox, setOpenInReviewStatusDilogBox] = useState(false);


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
  const selectdayHandler=(e)=>{
    setopenday(false);
    console.log()
     SettimePeriod(e.target.innerHTML);
  }
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
      await setuser(resp.data.data.getUser);
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
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${SERVER_URL}getAllReport`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result && result.data && result.data.Items) {
          console.log(result.data.Items);
          setarray(result.data.Items)
        }

      })
      .catch(error => console.log('error', error));
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
    const labA = a.labname.toUpperCase();
    const labB = b.labname.toUpperCase();

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
      setarray(labdata.sort(compare));
    }
    setopenAlpha(false);
  };

  // Status filter
  const labstatus = (a) => {
    if (searchInput !== "") {
      setFilteredResults(labdata.filter((e, i, array) => e.status === a));
    } else {
      setarray(labdata.filter((e, i, array) => e.status === a));
    }
    setopenStatus(false);
  };

  function reportStatusClickHanlder(stat) {
    if (stat === "incomplete") {
      setOpenIncompleteStatusDilogBox(true);
    }else if(stat.toLowerCase() === "complete"){
      setOpenCompleteStatusDilogBox(true)
    }else if(stat.toLowerCase() === "in review"){
      setOpenInReviewStatusDilogBox(true);
    }
  }

  function completeNowClickHanlder(e){
    router.push('/analysis')
  }

  // making dates short
  const dateConstractor = (data) => {
    if(data){
      return JSON.stringify(data).slice(1, 25)
    }
  }

  //fetchOneReport
  const fetchOneReport = (reportId) => {
    console.log(reportId)
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", XAPIKEY);
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${SERVER_URL}getOneReport/${reportId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result && result.data && result.data.Item) {
          console.log(result.data.Item);
          dispatch(setReportTableData(result.data.Item))
          Router.push('/untitle')
        }        
      })
      .catch(error => console.log('error', error));
  }




  return (
    <div className={classes.homeBody}>
      <Container className={classes.name}>
        {searchBarTab && (
          <div className={classes.search_main}>
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
              <h6 onClick={daysfilter}>
               {timePeriod} <BiChevronDown />
              </h6>
              <div className={openday ? classes.listday : classes.listday_hide}>
                <li onClick={selectdayHandler}>Today</li>
                <li onClick={selectdayHandler}>Yesterday</li>
                <li onClick={selectdayHandler}>2 day ago</li>
                <li onClick={selectdayHandler}>7 day ago</li>
                <li onClick={selectdayHandler}>15 day ago</li>
                <li onClick={selectdayHandler}>1 month ago</li>
                <li onClick={selectdayHandler}>2 month ago</li>
              </div>
            </div>
          </div>
        )}
      </Container>

      <Container className={classes.report}>
        {searchBarTab && (
          <Row className={classes.tableheader}>
            <Col md={6} xs={6} className={classes.tableheader_text}>
              <p>
                Reports{" "}
                <span className={classes.alpha_sort_btn} onClick={sortbox}>
                  <BiChevronDown />
                </span>
                <div
                  className={
                    openAlpha
                      ? classes.alpha_sort_box
                      : classes.alpha_sort_box_hide
                  }
                >
                  <li className={classes.alpha_sort_text} onClick={ascendOrder}>
                    Alphabetical Sorting
                  </li>
                </div>
              </p>
            </Col>
            <Col md={4} xs={3} className={classes.proCol2}>
              <p>
                Date/Time{" "}
                <span className={classes.date_sort_btn}>
                  <BiChevronDown />
                </span>
              </p>
            </Col>
            <Col md={1} xs={2}>
              <p>View </p>
            </Col>
            <Col md={1} xs={1} className={classes.proCol5}>
              <p>
                Status
                <span className={classes.status_sort_btn} onClick={statusCheck}>
                  <BiChevronDown />
                </span>
                <div
                  className={
                    openStatus
                      ? classes.status_sort_box
                      : classes.status_sort_box_hide
                  }
                >
                  <li onClick={() => labstatus("complete")}>Complete</li>
                  <li onClick={() => labstatus("inpreview")}>inreview</li>
                  {/* <li onClick={() => labstatus("incomplete")}>InComplete</li> */}
                </div>
              </p>
            </Col>
          </Row>
        )}
        <div className={setclassname}>
          {searchInput.length > 1 ? (
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
                return (
                  <>
                    <Row className={classes.rowe}>
                      <Col md={6} xs={5} className={classes.proCol}>
                        {a.labname}
                      </Col>
                      <Col md={4} xs={3} className={classes.proCol2}>
                        {JSON.stringify(a.date).slice(1, 24)}
                      </Col>
                      <Col md={1} xs={2}>
                        <button className={classes.proCol3}>View</button>
                      </Col>
                      <Col md={1} xs={2} className={classes.proCol4}>
                        <p >filtred {a.status} </p>
                      </Col>
                    </Row>
                  </>
                );
              })
            )
          ) : array.length === 0 ? (
            <Container
              className={classes.emptdata_img1}
              style={{ marginTop: "200px" }}
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
                        onClick={() => {if(a.reportStatus.toLowerCase() === 'complete') {fetchOneReport(a.reportId)}else{console.log('Yo', a.reportStatus); setOpenIncompleteStatusDilogBox(a.reportStatus)}}}
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
                      >{a.reportStatus}</p>
                    </Col>
                  </Row>
                </>
              );
            })
          )}
        </div>
      </Container>
      <Container className={classes.report2}>
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
        aria-labelledby='dilog-title'
        aria-aria-describedby='dilog-description'
        sx={{ p: 2 }}

      >
        <DialogTitle id="dilog-title">Please complete your report details</DialogTitle>
        <DialogContent >
          <DialogContentText>
            Please click on complete now button to complete your report details
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mx: 1, mb: 1 }}>
          <Button onClick={() => setOpenIncompleteStatusDilogBox(false)}>Complete Later</Button>
          <Button variant="contained" onClick={completeNowClickHanlder}>Complete Now</Button>
        </DialogActions>
      </Dialog>

      {/* Report Status Complete */}
      <Dialog
        open={openCompleteStatusDilogBox}
        // onClose={() => setOpen(false)}
        aria-labelledby='dilog-title'
        aria-aria-describedby='dilog-description'
        sx={{ p: 2 }}

      >
        <DialogTitle id="dilog-title">Report Status</DialogTitle>
        <DialogContent >
          <DialogContentText>
            Your Report is Complete!
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mx: 1, mb: 1 }}>
          <Button variant="contained" onClick={() => setOpenCompleteStatusDilogBox(false)}>Okay</Button>
        </DialogActions>
      </Dialog>


      {/* Report Status Complete */}
      <Dialog
        open={openInReviewStatusDilogBox}
        // onClose={() => setOpen(false)}
        aria-labelledby='dilog-title'
        aria-aria-describedby='dilog-description'
        sx={{ p: 2 }}

      >
        <DialogTitle id="dilog-title">Report Status</DialogTitle>
        <DialogContent >
          <DialogContentText>
            Your Report is in review
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mx: 1, mb: 1 }}>
          <Button variant="contained" onClick={() => setOpenInReviewStatusDilogBox(false)}>Okay</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Profile;

