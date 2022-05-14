import { Col, Container, Row } from "reactstrap";
import classes from "./LoginForm.module.css";
import axios from "axios";
import { Getting_user_data } from "../redux/dataAction";
import { useDispatch, useSelector } from "react-redux";
import { Xapkey } from "../apikey";
import { Link, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/router";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
// import Paper from "@material-ui/core/Paper";
// import SearchBar from "material-ui-search-bar";
import { AiOutlineSearch } from "react-icons/ai";
import empty from "../asset/empty.png";
const Profile = () => {
  const [user, setuser] = useState([]);
  const [token, setToken] = useState();
  const [name, setName] = useState();
  const userdata = useSelector((state) => state.userdata.userdata);
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchBarTab, setsearchBarTab] = useState(true);
  const [tableheaderTab, settableheaderTab] = useState(true);
  // for  toggle class
  const [datalenghtIszreo, setdatalenghtIszreo] = useState(false);

  const setclassname = datalenghtIszreo
    ? `${classes.scrollRep} ${classes.datalenght_zero}`
    : classes.datalenght_zero;
  console.log(datalenghtIszreo);
  const array = [
    {
      title: "Shree Datta Pathology Lab",
      date: "08/03/22;23:00",
      status: "complete",
    },
    {
      title: "Chaudhari Diagnostic Center",
      date: "08/03/22;23:00",
      status: "complete",
    },
    {
      title: "A Square Pathology Services",
      date: "08/03/22;23:00",
      status: "complete",
    },
    {
      title: "Aashish Khattar Sonography Clinic",
      date: "08/03/22;23:00",
      status: "complete",
    },
    {
      title: "New Point Pathology Lab",
      date: "08/03/22;23:00",
      status: "complete",
    },
    {
      title: "Nucleus Pathology Laboratory",
      date: "08/03/22;23:00",
      status: "complete",
    },
  ];

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
        "http://15.206.145.166/api/v1",
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

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      getUserData();
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
  const functstart = async () => {};
  console.log(tableheaderTab);
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
          </div>
        )}
      </Container>

      <Container className={classes.report}>
        {searchBarTab && (
          <Row className={classes.tableheader}>
            <Col md={6} xs={6} className={classes.tableheader_text}>
              <p>
                Reports{" "}
                <span className={classes.alpha_sort_btn}>
                  <BiChevronDown />
                </span>
              </p>
              <div className={classes.alpha_sort_box}>
                <li>Alphabetical Sorting</li>
              </div>
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
            <Col md={1} xs={1}>
              <p>
                Status{" "}
                <span className={classes.status_sort_btn}>
                  <BiChevronDown />
                </span>
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
                  <Row className={classes.rowe}>
                    <Col md={6} xs={5} className={classes.proCol}>
                      {a.title}
                    </Col>
                    <Col md={4} xs={3} className={classes.proCol2}>
                      {a.date}
                    </Col>
                    <Col md={1} xs={2}>
                      <button className={classes.proCol3}>View</button>
                    </Col>
                    <Col md={1} xs={2} className={classes.proCol4}>
                      <p>{a.status}</p>
                    </Col>
                  </Row>
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
                <Row className={classes.rowe}>
                  <Col md={6} xs={5} className={classes.proCol}>
                    {a.title}
                  </Col>
                  <Col md={4} xs={3} className={classes.proCol2}>
                    {a.date}
                  </Col>
                  <Col md={1} xs={2}>
                    <button className={classes.proCol3}>View</button>
                  </Col>
                  <Col md={1} xs={2}>
                    <p>{a.status}</p>
                  </Col>
                </Row>
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
    </div>
  );
};

export default Profile;

{
  /* <Container className={classes.report}>
<Row className={classes.tableheader}>
  <Col md={6} xs={6} className={classes.tableheader_text}>
    <p>Report</p>
  </Col>
  <Col md={4} xs={3} className={classes.proCol2}>
    <p>Date/Time</p>
  </Col>
  <Col md={1} xs={2}>
    <p>View</p>
  </Col>
  <Col md={1} xs={1}>
    <p>Status</p>
  </Col>
</Row>
<div className={classes.scrollRep}>
  {array.map((a, i) => {
    return (
      <Row className={classes.rowe}>
        <Col md={5} xs={7} className={classes.proCol}>
          {a.title}
        </Col>
        <Col md={5} xs={3} className={classes.proCol2}>
          {a.date}
        </Col>
        <Col md={1} xs={1}>
          <button className={classes.proCol3}>View</button>
        </Col>
        <Col md={1} xs={1}>
          <button className={classes.proCol3}>{a.status}</button>
        </Col>
      </Row>
    );
  })}
</div>
</Container> */
}
