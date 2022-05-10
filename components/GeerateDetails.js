import React, { useEffect } from "react";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Col, Container, Row } from "reactstrap";
import classes from "./GenerateDetails.module.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import axios from "axios";
import { Xapkey } from "../apikey";
import { ResetTvRounded, TryRounded } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { padding } from "@mui/system";
import Typography from "@mui/material/Typography";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/router";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
let messg;
const sampledata = [
  { id: 1, sample: "River bed" },
  { id: 2, sample: "Lake", id: 3, sample: "Reservolr" },
  { id: 4, sample: "freshWater" },
  { id: 5, sample: "Spring water" },
  { id: 6, sample: "Underground water" },
  { id: 7, sample: "Ocean" },
  { id: 8, sample: "Agricultural" },
  { id: "9", sample: "Industrial" },
];

const GenerateDetails = () => {
  const [clientName, setclientName] = useState();
  const [sampleType, setsampleType] = useState();
  const [generatedBy, setgenerated] = useState();
  const [ErrorMessage, setErrorMessage] = useState(false);
  const [token, setToken] = useState();
  const [selectOpen, setselectOpen] = useState(false);
  const images = useSelector((state) => state.userdata.lab_images);
  const route = useRouter();
  const SubmitReport = async (e) => {
    console.log(images);
    e.preventDefault();
    console.log(images);
    if (!clientName || !sampleType || !generatedBy)
      (messg = "Enter all fileds"), setErrorMessage(true);
    // photos: ["xyz.jpg","abc.png"],
    // let body = {
    //   query: `mutation {
    //     postReport(reportInput:{
    //       photos:${JSON.stringify(images)},
    //       clientName: "${String(clientName)}",
    //       sampleType: "${String(sampleType)}",
    //       generatedBy: "${String(generated)}"
    //     }) {
    //       message
    //     }
    //   }`,
    //   variables: {},
    // };
    // let options = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${String(Token)}`,
    //     "x-api-key": Xapkey,
    //   },
    // };
    // try {
    //   const resp = await axios.post(
    //     `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1`,
    //     body,
    //     options
    //   );
    //   console.log(resp);
    // } catch (err) {
    //   console.log(err);
    // }
    // `${process.env.NEXT_PUBLIC_SERVER_API}/postReport`
    // const body = {
    //   clientName: String(clientName),
    //   sampleType: String(sampleType),
    //   generatedBy: String(generatedBy),
    // };

    try {
      var formData = new FormData();

      images.map((file, index) => {
        formData.append("uploadImages", file);
      });
      console.log(formData);
      formData.append("clientName", clientName);
      formData.append("sampleType", sampleType);
      formData.append("generatedBy", generatedBy);

      fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/postReport`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${String(token)}`,
          "x-api-key": process.env.NEXT_PUBLIC_XAPI,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors && data.errors[0].status === 401) {
            console.log(data.errors[0].message);
            errors = data.errors[0].message;
            setErrorMessage(true);
          } else {
            if (data.status === 200) {
              console.log(data);
            } else {
              errors = "server Error";
              setErrorMessage(true);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(images);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const [isModal, setIsModal] = useState(true);
  const [value, setValue] = React.useState();
  const contentClassname = isModal
    ? `${classes.select_tag} ${classes.select_tagopen}`
    : classes.select_tagopen;

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const OpenClose = () => {
    if (isModal === true) {
      setIsModal(false);
    } else {
      setIsModal(true);
    }
  };

  return (
    <>
      <p className={classes.head}>
        {" "}
        <span className={classes.arrowleft}>
          {" "}
          <BsArrowLeft onClick={() => route.push("/gen")} />
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
        {/* <a href="/gen">back</a> */}
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
                value={clientName}
                onChange={(e) => setclientName(e.target.value)}
              />
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
                className={classes.fill}
                value={value}
                onClick={OpenClose}
                style={{ cursor: "pointer" }}
              />
              <div className={contentClassname}>
                {sampledata.map((val) => {
                  return (
                    <>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        color="default"
                        value={value}
                        onChange={handleChange}
                        sx={{ fontSize: 2, marginLeft: 2, padding: 0 }}
                      >
                        <FormControlLabel
                          label={val.sample}
                          value={val.sample}
                          control={
                            <Radio
                              color="default"
                              name="typ1"
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 20,

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
              </div>
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
                value={generatedBy}
                onChange={(e) => setgenerated(e.target.value)}
                className={classes.fill}
              />
            </Col>
          </Row>
          <button className={classes.sub} onClick={SubmitReport}>
            SUBMIT
          </button>
        </Container>
      </form>
      <Container className={classes.footer}>
        <p> copyright aivara | terms and coditions </p>
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
