import React, { useEffect, useState } from "react";
// import classes from "../components/Header.module.css";
import classes from "../components/Header/Header.module.css";
import HeaderMobile from "../components/Header/HeaderMobile";


// import styles from "../components/LoginForm.module.css";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
var errors;
export default function verify() {
  const [email, setemail] = useState();
  const route = useRouter();
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  useEffect(() => {
    setemail(localStorage.getItem("email"));
  }, []);

  const ResendEmail = (e) => {
    e.preventDefault();
    let body = {
      query: `{
        resendEmail(email:"${String(email)}") {
          message
          status
        }
    }`,
      variables: {},
    };

    fetch(`${process.env.NEXT_PUBLIC_SERVER_API}api/v1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.errors && data.errors[0].status === 401) {
          console.log(data.errors[0].message);
          errors = data.errors[0].message;
          setErrorMessage(true);
        } else {
          if (data.data.resendEmail.status === 200) {
            errors = data.data.resendEmail.message;
            setSuccess(true);
            // console.log(data);
          } else {
            errors = "server Error";
            setErrorMessage(true);
          }
        }
      });
  };
  return (
    <>
      <div className={classes.verifyEmail}>
        <div className={classes.verifyEmail_header}>
          <d>
            <img src="/Frame.svg" alt="" />
          </d>
          <a
            className={classes.verifyEmail_backButton}
            onClick={() => route.push("/")}
            style={{ cursor: "pointer" }}
          >
            Back
          </a>
        </div>
        <div className={classes.verifyEmail_headerMobile}>
          <HeaderMobile className={classes.logo} />
          <div
            className={classes.back}
            style={{
              position: "absolute",
              top: "6%",
              left: "78%",
              textDecoration: "underline",
              color: "#818181",
              cursor: "pointer",
            }}
          >
            <a onClick={() => route.push("/")}>back</a>
          </div>
        </div>
        <div className={classes.verifyEmail_content}>
          <p className={classes.verifyEmail_text}>
            We have send an email to "{email}"
          </p>
          <p className={classes.verifyEmail_resend} onClick={ResendEmail}>
            resend
          </p>
        </div>
      </div>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
        >
          <Alert
            onClose={() => setSuccess(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {errors}
          </Alert>
        </Snackbar>

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
            {errors}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
