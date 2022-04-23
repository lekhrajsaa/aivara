import React, { useMemo, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Tab, Tabs, TabPanel } from "@mui/material";
import classes from "./LoginForm.module.css";
import { setImages } from "../redux/dataAction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import S3FileUpload from "../node_modules/react-s3";
import { Construction } from "@mui/icons-material";
import axios from "axios";

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

  fontFamily: "Sora",
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
  // const [files, setFiles] = useState();
  // const [fileName, setFileName] = useState("");

  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const config = {
    bucketName: "aivara-images",
    dirName: "logo-banner" /* optional */,
    region: "ap-south-1",
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: "a3Hsl+3nR7uVR3T0onaukC45e2+Yi8oWqNeMRphf",
  };

  // let formData2 = new FormData();
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: "image/jpeg,image/png",
      onDrop: (acceptedFiles) => {
        setFiles(acceptedFiles);
        setFileName(acceptedFiles);
        saveFile(acceptedFiles);
        console.log(acceptedFiles);
      },
    });

  // const fileupload = async (e) => {
  //   try {
  //     // console.log("hh");
  //     // setFiless(e.target.files[0].name);
  //     // // setFileName(e.target.files[0].name);
  //     // await uploadimage();
  //     const file = e.target.files[0];
  //     console.log(file);
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     // formData.append("fileName", fileName);
  //     console.log(formData);
  //     const res = await axios.post(
  //       "http://localhost:5000/postReport",
  //       formData
  //     );

  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // console.log(fileName);
  // const uploadimage = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", filess);
  //     // formData.append("fileName", fileName);
  //     console.log(formData);
  //     const res = await axios.post(
  //       "http://localhost:5000/postReport",
  //       formData
  //     );

  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleClick = () =>
    inputRef && inputRef.current && inputRef.current.click();
  const handleFiles = (e) => {
    setFiles(e.target.files ? Array.from(e.target.files) : []);
    handleSubmit(e);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (files.length > 0) {
      console.log("hdhhdhhf");
      const formData = new FormData();
      files.forEach((file) => formData.append("multipleImages", file));
      axios
        .post("http://localhost:5000/postReport", formData)
        .then((data) => {
          setMessage(data.data.message);
          console.log(data);
        })
        .catch((error) => {
          setMessage("Error");
          console.log(error);
        });
      setFiles([]);
      formRef.current && formRef.current.reset();
      setTimeout(() => {
        setMessage("");
      }, 4000);
    }
    console.log("end");
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks
  //   files.forEach((file) => URL.revokeObjectURL(file.preview));
  // }, [files]);

  // const onImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let img = event.target.files[0];
  //     s3.uploadFile(img, config).then((data) => {
  //       // console.log(data);
  //       setBannerImage(data.location);
  //     });
  //   }
  // };

  // className: 'dropzone'
  return (
    <div>
      <div
        style={{
          borderTop: "1px solid #E3E1E1",
          paddingTop: "3%",
          width: "90%",
        }}
      ></div>
      <div className={classes.uploadBox}>
        <div onClick={handleClick}>
          <input
            type="file"
            ref={inputRef}
            onChange={handleFiles}
            className={classes.Inputimg}
            multiple
          />

          <img
            width="50"
            height="50"
            src="picture-double-landscape.svg"
            className={classes.img}
          />
          <h4
            className={classes.photo}
            style={{
              color: "#717171",
              fontSize: "100%",
              fontFamily: "Sora",
              fontWeight: "400",
            }}
          >
            Upload a photo
          </h4>
          <p
            className={classes.drag}
            style={{
              color: "#717171",
              fontSize: "90%",
              fontFamily: "Sora",
              fontWeight: "400",
            }}
          >
            Drag & drop or click to{" "}
            <a style={{ textDecoration: "underline" }}>select</a>
          </p>
          <p
            style={{
              marginTop: "15%",
              fontSize: "75%",
              color: "#A7A7A7",
              fontFamily: "Sora",
              fontWeight: "400",
            }}
            className={classes.only}
          >
            only .jpeg and .png formats not exceeding 100 MB
          </p>
        </div>
      </div>
    </div>
  );
}
<StyledDropzone />;
export default StyledDropzone;
// Object.createObjectURL(file, { preview: file })
// if (filess.length != 0) {
//   // dispatch(setImages(files));
//   // router.push("/detail");
//   console.log(filess);
// }
//{...getInputProps()}
//{...getRootProps({ style })}
