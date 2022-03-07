import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Tab, Tabs, TabPanel } from "@mui/material";
import classes from "./LoginForm.module.css";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "10%",
  borderWidth: 1,
  borderRadius: 1,
  borderColor: "#eeeeee",

  backgroundColor: "#F9F9F9",
  color: "#bdbdbd",
  outline: "none",

  fontFamily: "Roboto",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function StyledDropzone(props) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: "image/jpeg,image/png" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div >
      <div style={{  borderTop:"1px solid #E3E1E1" , paddingTop:"3%" , width:"90%"}} ></div>
      <div className={classes.uploadBox}>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />

          <img width="50" height="50" src="picture-double-landscape.svg" className={classes.img} />
          <h4 className={classes.photo}
            style={{
              color: "#717171",
              fontSize: "100%",
              fontFamily: "Roboto",
              fontWeight: "400",
            }}
          >
            Upload a photo
          </h4>
          <p className={classes.drag}
            style={{
              color: "#717171",
              fontSize: "90%",
              fontFamily: "Roboto",
              fontWeight: "400",
            }}
          >
            Drag & drop or click to{" "}
            <a style={{ textDecoration: "underline" }}>select</a>
          </p>
          <p style={{ marginTop: "15%", fontSize: "75%", color: "#A7A7A7", fontFamily: "Roboto",
              fontWeight: "400",}} className={classes.only}>
            only .jpeg and .png formats not exceeding 100 MB
          </p>
        </div>
      </div>
    </div>
  );
}

<StyledDropzone />;
export default StyledDropzone;
