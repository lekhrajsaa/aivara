import React, { useEffect, useState } from "react";
//reactstrap used for the box to display Content inside
import { Col, Container, Row } from "reactstrap";
import classes from "./GenerateDetails.module.css";
//Stack used to display error message one on another on login and signup
import Stack from "@mui/material/Stack";
//Snackbar used to display error message
import Snackbar from "@mui/material/Snackbar";
//MuiAlert used for alerts errors
import MuiAlert from "@mui/material/Alert";
//useSelector used to access the redux elements and useDispatch used to set or change those elements in redux
import { useDispatch, useSelector } from "react-redux";
//used for dropsown in Type of sample
import Radio from "@mui/material/Radio";
//used to group all the dropdown in Type of sample
import RadioGroup from "@mui/material/RadioGroup";
//used in Type of sample for custom input
import FormControlLabel from "@mui/material/FormControlLabel";
//used in Type of sample for dropdown icon
import { BiChevronDown } from "react-icons/bi";
//useRouter used to route to another page
import Router, { useRouter } from "next/router";
//FormControl use in rapping up the dropdown
import FormControl from "@mui/material/FormControl";
//used in displaying message while report analysis
import BackdropBuffer from "../backdrop_buffer/backdrop_buffer";
//updating data in redux
import { setDetailData } from "../../redux/dataAction";

//unused imports might be deleted later
import { BsArrowLeft } from "react-icons/bs";
import Button from "@mui/material/Button";
import axios from "axios";
import { Xapkey } from "../../apikey";
import { ResetTvRounded, TryRounded } from "@mui/icons-material";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";

//Alert on a page
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
let messg;
//data to be displayed in dropdown
const sampledata = [
  { id: 1, sample: "River bed" },
  { id: 2, sample: "Reservoir " },
  { id: 3, sample: " Lake " },
  { id: 4, sample: "FreshWater" },
  { id: 5, sample: "Spring water" },
  { id: 6, sample: "Underground water" },
  { id: 7, sample: "Ocean" },
  { id: 8, sample: "Agricultural" },
  { id: 9, sample: "Industrial" },
];
//function to store details after the image is uploaded
const GenerateDetails = () => {
  const prevPage = useSelector((state) => state.userdata.prevPage);

  //setting up the initial value
  let sampleError = "";
  const initialValue = {
    clientName: "",
    sampleType: "",
    generatedBy: "",
    siteCode: "",
    latitude: "",
    longitude: "",
  };
  //storing the data given by the user
  const [report, setreport] = useState(initialValue);
  //setsampleType used to store the Type of sample
  const [sampleType, setsampleType] = useState("");
  //showMenu used to open and close the dropdown
  const [showMenu, setshowMenu] = useState(false);
  //To store any error if they occure
  const [formError, setformError] = useState({});
  //Toggle the submit button
  const [isSubmit, setisSubmit] = useState(false);
  //wait flag
  const [pleaseWait, setPleaseWait] = useState(false);
  //Not in use might be deleted later
  const [uploadPercentage, setUploadPercentage] = useState(0);

  console.log(uploadPercentage);

  //Store data once it is edited
  const handleReport = (e) => {
    const { name, value } = e.target;
    setreport({ ...report, [name]: value });
    setisSubmit(true);
  };
  //Things to get load before page loads
  useEffect(() => {
    console.log(formError);
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(report);
    }
  }, [formError]);
  //handleChange used only when user change on type of sample
  const handleChange = (event) => {
    setValues(event.target.value);
    setsampleType(event.target.value);
    setisSubmit(true);
  };
  //Storing changes in Type of sample
  const [values, setValues] = React.useState();
  //Storing error message if there exists any
  const [ErrorMessage, setErrorMessage] = useState(false);
  //Storing the token
  const [token, setToken] = useState();
  //isError for knowing if there exists any error or not
  const [isError, setIsError] = useState(false);
  //importing images from redux
  const images = useSelector((state) => state.userdata.lab_images);
  const route = useRouter();
  //used to store the details in redux
  const dispatch = useDispatch();
//not in use might be deleted later
  const [selectOpen, setselectOpen] = useState(false);

//function for storing all the data
  const SubmitReport = async (e) => {
    console.log(images);
    e.preventDefault();

    setIsError(validate2(sampleType));

    setformError(validate(report));
    const { clientName, generatedBy, siteCode, longitude, latitude } = report;

    if (
      clientName &&
      sampleType &&
      generatedBy &&
      siteCode &&
      longitude &&
      latitude
    ) {
      dispatch(
        setDetailData({
          clientName,
          sampleType,
          generatedBy,
          siteCode,
          longitude,
          latitude,
        })
      );

      route.push("/gen");
      
    } else {
    }
  };

  //function to validate all the input fields
  const validate = (values) => {
    const errors = {};
    if (!values.clientName) {
      errors.clientName = "ClientName is required";
    }
    if (!values.sampleType) {
      errors.sampleType = "  SampleType is required";
    }
    if (!values.generatedBy) {
      errors.generatedBy = "GeneratedBy is required";
    }
    if (!values.siteCode) {
      errors.siteCode = "SiteCode is required";
    }
    if (!values.latitude) {
      errors.latitude = "Latitude is required";
    }
    if (!values.longitude) {
      errors.longitude = "  Longitude is required";
    }
    return errors;
  };
  //Function to validate Type of Sample
  const validate2 = (val) => {
    if (!val) {
      return true;
    } else {
      return false;
    }
  };
//Things to get load before the page loads
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  // dropdown for type of sample
  const [isModal, setIsModal] = useState(true);

  const contentClassname = isModal
    ? `${classes.select_tag} ${classes.select_tagopen}`
    : classes.select_tagopen;
//function to open and close the dropdown
  const OpenClose = () => {
    if (isModal === true && showMenu == true) {
      setIsModal(false);
    } else {
      setIsModal(true);
      setshowMenu(true);
    }
  };
  //function to hide the dropdown
  const hideMenu = () => {
    setshowMenu(false);
  };
  

  return (
    <>
      <p className={classes.head}>
        {" "}
        <span className={classes.arrowleft}>
          {" "}
          {/* <BsArrowLeft onClick={() => route.push("/gen")} /> */}
        </span>{" "}
        <span className={classes.head2}>Generate : </span> Add details
      </p>
      <div
        className={classes.back}
        style={{
          position: "absolute",
          top: "10%",
          left: "78%",
          textDecoration: "underline",
          color: "#000000",
        }}
      >
        <a onClick={() => route.push(prevPage)}>back</a>
      </div>
      <form>
        <Container fluid className={classes.cont}>
          <Row className={classes.rowe}>
            <Col md={3}>
              <label for="name" className={classes.detail}>
                Name of the Client
              </label>
            </Col>
            <Col md={5}>
              <input
                type="text"
                name="clientName"
                className={classes.fill}
                value={report.clientName}
                // value={clientName}
                required
                // onChange={(e) => setclientName(e.target.value)}
                onChange={handleReport}
              />
              <p className={classes.danger_text}>{formError.clientName}</p>
            </Col>
          </Row>
          <Row className={classes.rowe}>
            <Col md={3}>
              {" "}
              <label for="nature" className={classes.detail}>
                Type of sample
              </label>
            </Col>
            <Col md={5}>
              <span className={classes.searchicon}>
                <BiChevronDown onClick={OpenClose} />
              </span>
              <input
                type="null"
                name="sampleType"
                className={classes.fill}
                value={values}
                required
                onChange={(e) => setsampleType(e.target.value)}
                onClick={OpenClose}
                style={{ cursor: "pointer" }}
              />
              <div className={contentClassname}>
                {showMenu ? (
                  <FormControl style={{ position: "x`x" }}>
                    <div onClick={hideMenu} className={classes.Invisible}></div>
                    {sampledata.map((val) => {
                      return (
                        <>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            color="default"
                            value={values}
                            onChange={handleChange}
                            sx={{ fontSize: 2, marginLeft: 2, padding: 0 }}
                          >
                            <FormControlLabel
                              label={val.sample}
                              value={val.sample}
                              control={
                                <Radio
                                  color="default"
                                  sx={{
                                    "& .MuiSvgIcon-root": {
                                      fontSize: 20,
                                      display: "block",
                                      padding: 0,
                                    },
                                  }}
                                />
                              }
                            />
                          </RadioGroup>
                        </>
                      );
                    })}
                  </FormControl>
                ) : null}
              </div>
              <p className={classes.danger_text}>
                {isError && <p>SampleType is required</p>}
              </p>
            </Col>
          </Row>
          <Row className={classes.rowe}>
            <Col md={3}>
              {" "}
              <label for="generated" className={classes.detail}>
                Generated by ( technician )
              </label>
            </Col>
            <Col md={5}>
              <input
                type="text"
                name="generatedBy"
                required
                // value={generatedBy}
                value={report.generatedBy}
                // onChange={(e) => setgenerated(e.target.value)}
                onChange={handleReport}
                className={classes.fill}
              />
              <p className={classes.danger_text}>{formError.generatedBy}</p>
            </Col>
          </Row>
          <Row className={classes.rowe}>
            <Col md={3}>
              <label for="name" className={classes.detail}>
                Site Code
              </label>
            </Col>
            <Col md={5}>
              <input
                type="text"
                name="siteCode"
                required
                className={classes.fill}
                // value={siteCode}
                value={report.siteCode}
                // onChange={(e) => setsiteCode(e.target.value)}
                onChange={handleReport}
              />
              <p className={classes.danger_text}>{formError.siteCode}</p>
            </Col>
          </Row>
          {/* =========================================== */}
          <Row className={classes.rowe}>
            <Col md={3}>
              <label for="exampleCity" className={classes.detail}>
                Geographical Location
              </label>
            </Col>

            <Col md={4} className={classes.geographical_sapce}>
              <label for="exampleState" className={classes.detail1}>
                Latitude:
              </label>
              <input
                id="exampleState"
                name="latitude"
                className={classes.fill1}
                // value={latitude}
                value={report.latitude}
                required
                // onChange={(e) => setlatitude(e.target.value)}
                onChange={handleReport}
              />

              <label
                for="exampleZip"
                className={`${classes.detail1} ${classes.detail12}`}
              >
                Longitude:
              </label>
              <input
                id="exampleZip"
                name="longitude"
                required
                // value={longitude}
                value={report.longitude}
                // onChange={(e) => setlongitude(e.target.value)}
                onChange={handleReport}
                className={`${classes.fill1} ${classes.fill12}`}
              />
              <p className={classes.danger_text}>
                {formError.latitude}{" "}
                <span className={classes.longitude}>
                  {" "}
                  {formError.longitude}
                </span>
              </p>
            </Col>
          </Row>

          {/* ============================================= */}
          <button className={classes.sub} onClick={SubmitReport}>
            SUBMIT
          </button>
        </Container>
      </form>
      {/* {pleaseWait ? <div style={{ textAlign: "center", color: "Highlight" }}>
        Report Analysis is in process please wait...
      </div> : null} */}

      {pleaseWait && (
        <BackdropBuffer bufferText="Report Analysis is in process please wait..." />
      )}

      <Container className={classes.footer}>
        {/* <p> copyright aivara | terms and coditions </p> */}
      </Container>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={ErrorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(false)}
        >
          <Alert
            onClose={() => setErrorMessage(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {messg}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};
export default GenerateDetails;

// "Content-Type": "application/json ",
//             Authorization: Token,
//             "x-api-key": process.env.NEXT_PUBLIC_XAPI,

// const uploaddetails =async()=>{
//   try{
//     const resp = await fetch("http://localhost:5000/postReport", {
//       method: "POST",

//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + Token,
//         "x-api-key": process.env.NEXT_PUBLIC_XAPI,
//       },
//       body: JSON.stringify({
//         companyName,
//         sampleType,
//         generatedBy,
//       }),
//     });
//     console.log(resp);
//   }catch(err){
//     console.log(err);
//   }
// }
// .then((response) => response.json())
//  .then((data) => {
//    if (data.errors && data.errors[0].status === 401) {
//      console.log(data.errors[0].message);
//      errors = data.errors[0].message;
//      setErrorMessage(true);
//    } else {
//      if (data.data.status === 200) {
//        console.log(data);
//      } else {
//        errors = "server Error";
//        setErrorMessage(true);
//      }
//    }
//  });

{
  /* <div className="row">
            <div className="col-sm-3">
              <label for="exampleZip" className={classes.detail}>
                Geographical Location
              </label>
            </div>
            <div className="col-sm-4 " className={classes.geographical_filed}>
              <label for="exampleZip" className={classes.detail1}>
                Longitude:
              </label>
              <input id="exampleZip" name="zip" className={classes.fill1} />
              <label for="exampleZip" className={classes.detail1}>
                Longitude:
              </label>
              <input id="exampleZip" name="zip" className={classes.fill1} />
            </div>
          </div> */
}
