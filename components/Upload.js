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

function StyledDropzone(props) {
  const [fileName, setFileName] = useState([]);
  const [Token, setToken] = useState();
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [ImageData, setImagedata] = useState([]);

  const detailPageData = useSelector((state) => state.userdata.detailData);
  // const images = useSelector((state) => state.userdata.lab_images);

  const [pleaseWait, setPleaseWait] = useState(false);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: "image/jpeg,image/png,image/tif,image/tiff",
      onDrop: async (acceptedFiles) => {
        // setFileName(acceptedFiles);
        console.log('files', acceptedFiles);
        // dispatch(setImages(acceptedFiles));

        // setTimeout(() => {

          const formData = new FormData();
          acceptedFiles.forEach((file) => {
            formData.append("uploadImages", file);
          });
          console.log(formData);
          // dispatch(setImages(formData));
          // router.push("/detail");
          submitHandlder(acceptedFiles)
          // try {
          //   const res = await axios.post(
          //     `${process.env.NEXT_PUBLIC_SERVER_API}/postReport`,
          //     formData,
          //     {
          //       headers: {
          //         "Content-Type": "multipart/form-data",
          //         Authorization: `Bearer ${Token}`,
          //         "x-api-key": `${process.env.NEXT_PUBLIC_XAPI}`,
          //       },
          //     }
          //   );
          //   setFiles("");
          //   console.log(res.status);
          //   if (res.status === 200) {
          //     console.log(res);
          //     let arr = [];
          //     res.data.result.forEach((item) => {
          //       // let obj = { key: item.key, location: item.Location };
          //       // arr.push(obj);
          //       arr.push(item.Location);
          //     });

          //     console.log(arr);
          //     dispatch(setImages(arr));
          //     router.push("/detail");
          //   }
          // } catch (err) {
          //   console.log(err);
          // }
        // }, 500)
      },
    });
  console.log(fileName);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // const onSubmit = async () => {
  //   // e.preventDefault();

  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     formData.append("uploadImages", file);
  //   });

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/postReport",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     setFiles("");
  //     console.log(res);
  //   } catch (err) {
  //     if (err.response.status === 500) {
  //       console.log(err);
  //     } else {
  //       console.log(err.response.data.msg);
  //     }
  //   }
  // };

  // const onChanges = async (e) => {
  //   console.log("fff");
  //   console.log(
  //     e.target.files,

  //     "hello"
  //   );
  //   setFiles(e.target.files);
  //   const formData = new FormData();
  //   e.target.files.forEach((file) => {
  //     console.log("appe");
  //     formData.append("uploadImages", file);
  //   });

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/postReport",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     setFiles("");
  //     console.log(res);
  //   } catch (err) {
  //     if (err.response.status === 500) {
  //       console.log(err);
  //     } else {
  //       console.log(err.response.data.msg);
  //     }
  //   }
  // };

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
  // console.log(process.env.NEXT_PUBLIC_XAPI);

  async function submitHandlder(images) {
    // router.push('/report-data-uploaded');

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
      //${process.env.NEXT_PUBLIC_SERVER_API}/postReport
      //REACT_APP_SERVER
      //NEXT_PUBLIC_SERVER_API

      //setting wait flag as true
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

      //todo
      router.push('/report-data-uploaded');

      const response = await axios.post(`${SERVER_URL}postReport`, formData, { headers: headers, onUploadProgress: uploadingMonitor })

      const data = response.data;

      console.log(data, "gg")

      // setPleaseWait(false);

      // router.push('/report-data-uploaded');
      // try {
      //   console.log('request sent1')

      //   const response = await axios.post(
      //     `${process.env.NEXT_PUBLIC_SERVER_API}postReport`,
      //     formData,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${String(token)}`,
      //         "x-api-key": process.env.NEXT_PUBLIC_XAPI,
      //         origin: `${process.env.REACT_APP_CLIENT}`,
      //       },
      //       onUploadProgress: (data) => {
      //         let progresPercent = Math.floor(
      //           (data.loaded / data.total) * 100
      //         );
      //         // console.log(data.loaded, data.total, progresPercent);
      //         setUploadPercentage(progresPercent); //set the state for upload progress bar
      //       },
      //     }
      //   );

      //   const data = response.data;

      //   if (data.errors && data.errors[0].status === 401) {
      //     console.log(data.errors[0].message);
      //     errors = data.errors[0].message;
      //     setErrorMessage(true);
      //   } else {
      //     if (data.status === 200) {
      //       console.log(data);
      //     } else {
      //       errors = "server Error";
      //       setErrorMessage(true);
      //     }
      //   }

      //   console.log('request sent')
      // } catch (err) {
      //   console.log(err);
      //   errors = "server Error";
      //   setErrorMessage(true);
      //   setPleaseWait(false);
      // }

    } catch (err) {
      console.log(err, "errrrrrr not gg");
      // errors = "server Error";
      // setErrorMessage(true);
      setPleaseWait(false);
    }
    console.log(detailPageData)

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
          {/* <input type="submit" value="Upload" />
          </form> */}
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
        {/* <button
          style={{
            border: 'none',
            marginTop: '10px',
            background: '#B7D7F7',
            padding: '5px 10px',
            borderRadius: '5px'
          }}
          onClick={submitHandlder}
        >Submit</button> */}
      </div>

      {/* {pleaseWait && (
        <BackdropBuffer bufferText="Report Analysis is in process please wait..." />
      )} */}
    </div>
  );
}
export default StyledDropzone;