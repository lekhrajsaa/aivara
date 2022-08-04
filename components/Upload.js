import React, { useMemo, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Tab, Tabs, TabPanel } from "@mui/material";
import classes from "./LoginForm.module.css";
import { setImages } from "../redux/dataAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Construction } from "@mui/icons-material";
import axios from "axios";
import BackdropBuffer from './backdrop_buffer/backdrop_buffer';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

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


//Function To GEt the IMAGES from the user
function StyledDropzone(props) {
  const [fileName, setFileName] = useState([]);
  const [Token, setToken] = useState();
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [ImageData, setImagedata] = useState([]);

  const detailPageData = useSelector((state) => state.userdata.detailData);

  const [pleaseWait, setPleaseWait] = useState(false);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: "image/jpeg,image/png,image/tif,image/tiff",
      onDrop: async (acceptedFiles) => {
        
        console.log('files', acceptedFiles);
      
          const formData = new FormData();
          acceptedFiles.forEach((file) => {
            formData.append("uploadImages", file);
          });
          console.log(formData);
          
          submitHandlder(acceptedFiles)
          
      },
    });
  console.log(fileName);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  
  async function submitHandlder(images) {
//Function to GET other details from the User 
    const { clientName, sampleType, generatedBy, siteCode, latitude, longitude } = detailPageData;

    try {
      var formData = new FormData();

      images.map((file, index) => {
        formData.append("uploadImages", file);
      });

      formData.append("clientName", clientName);
      formData.append("sampleType", sampleType);
      formData.append("generatedBy", generatedBy);
      formData.append("siteCode", siteCode);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      
      setPleaseWait(true);

      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${String(token)}`,
        "x-api-key": process.env.NEXT_PUBLIC_XAPI,
        origin: `${process.env.REACT_APP_CLIENT}`,
      }

      const uploadingMonitor = (data) => {
        let progresPercent = Math.floor(
          (data.loaded / data.total) * 100
        );

        console.log(`${progresPercent} % uploaded ^-^`)
      };

      console.log(formData, "before post", clientName, sampleType, latitude);

      //Push all the data Collected 
      router.push('/report-data-uploaded');

      const response = await axios.post(`${SERVER_URL}postReport`, formData, { headers: headers, onUploadProgress: uploadingMonitor })

      const data = response.data;

    } catch (err) {
      console.log(err, "Data not submitted");
     
      setPleaseWait(false);
    }


  }


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
        <div {...getRootProps({ style })}>
          {/* <form onSubmit={onSubmit}> */}
          <input
            multiple
            type="file"
            name="uploadImages"
            onChange={(e) => onChanges(e)}
            className={classes.Inputimg}
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
            Total upload size not exceeding 1 GB
          </p>
        </div>
        
      </div>

      
    </div>
  );
}
export default StyledDropzone;