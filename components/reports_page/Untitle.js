import React, { useRef } from "react";
import { useReactToPrint } from 'react-to-print'
import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import classes from "./Untitle.module.css";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EmailShareButton } from 'react-share'
import Header from "../Header/HeaderConditional";



const XAPIKEY = process.env.NEXT_PUBLIC_XAPI;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

const Untitle = () => {
  const reportTableData = useSelector((state) => state.userdata.reportTableData);
  const [show, setShow] = useState(true);
  const [tableData, settableData] = useState([])
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [keepInput, setKeepInput] = useState(true);

  const [pageTitle, setPageTitle] = useState('Untitled')
  const [isEditEnable, setIsEditEnable] = useState(false);

  const titleInput = useRef();
  const table = useRef();

  const router = useRouter();

  console.log(reportTableData) //todo delete


  //Routes to Home 
  function closeBtnHanlder() {
    router.push('/reports')
  }

  useEffect(() => {
    if (reportTableData && reportTableData.reportId) {
      console.log(reportTableData);

      const { siteCode, geoLocation, report } = reportTableData;

      const latitude = geoLocation.latitude;
      const longitude = geoLocation.longitude;
      const GeoLocation = latitude + " " + longitude;

      let tempo = [];

      if (report) {

        // const reportList = report.map(item => {

        //   if (item.objects_count_custom) {
        //     tempo.push(item.objects_count_custom);
        //   }


        //   let Taxa_Details = "-";
        //   let Count_of_Images = 0;
        //   let Count_of_taxa = 0;
        //   let Relative_Abundance = "-";
        //   let GeoLocation = latitude + " " + longitude;

        //   if (item.objects_confidence.length > 0) {
        //     // Taxa_Details = Object.keys(item.objects_confidence[0])[0];

        //     // let temp = report.map(rep => {

        //     //   if (rep.objects_confidence.length > 0 && Object.keys(rep.objects_confidence[0])[0] == Taxa_Details) {
        //     //     Count_of_Images++; //increasing by 1 when the texa is matched
        //     //     Count_of_taxa = Count_of_taxa + rep.objects_count; //summing the object count when the texa is matched 
        //     //     return true;
        //     //   }
        //     // });

        //     // console.log(temp, "oooop")

        //     //todo make sure everything is okay
        //     //* in one image can be detect multiple organism
        //     //* then how to show taxa details
        //     //* what is meant my count of image
        //     //* what is count of taxa (is it obj count?)
        //     //todo relative abundance

        //     Taxa_Details = item.objects_confidence[0].detect;
        //     // Count_of_Images = Object.values()
        //   }

        //   return (
        //     <tr>
        //       <td>{siteCode}</td>
        //       <td>{GeoLocation}</td>
        //       <td>{Taxa_Details}</td>
        //       <td>{Count_of_Images}</td>
        //       <td>{Count_of_taxa}</td>
        //       <td>{Relative_Abundance}</td>
        //     </tr>
        //   )
        // })


        report.map(item => {

          if (item.objects_count_custom) {
            tempo.push(item.objects_count_custom);
          }

        })

        // settableData(reportList)

        // console.log(reportList)

        //todo

        console.log(tempo, "test tempoooooooooooooooooooooo 1");

        //
        let tempo2 = [];
        tempo.forEach(val => {
          val.detects.forEach(val2 => {
            tempo2.push(val2)
          })
        });

        console.log(tempo2, "test tempoooooooooooooooooooooo 2");

        tempo2 = [...new Set(tempo2)];

        console.log(tempo2, "test tempoooooooooooooooooooooo 2 new");

        //
        let Count_of_Images = [];
        let Count_of_taxa = [];

        tempo2.forEach(item => {
          let cnt_i = 0;
          let cnt_t = 0;

          tempo.map(item2 => {
            if (item2.detects.includes(item)) {
              cnt_i++;

              console.log(item2.values[item2.detects.indexOf(item)], " of -> ", item);
              cnt_t += item2.values[item2.detects.indexOf(item)];
            }
          })

          Count_of_Images.push(cnt_i);
          Count_of_taxa.push(cnt_t);
        });


        console.log(Count_of_taxa, "test tempoooooooooooooooooooooo 3", Count_of_Images);

        //*

        const reportList = tempo2.map((item, index) => {
          let Taxa_Details = item;
          let Relative_Abundance = "-";

          return (
            <tr>
              <td>{siteCode}</td>
              <td>{GeoLocation}</td>
              <td>{Taxa_Details}</td>
              <td>{Count_of_Images[index]}</td>
              <td>{Count_of_taxa[index]}</td>
              <td>{Relative_Abundance}</td>
            </tr>
          )
        })

        settableData(reportList); //todo


        // todo end
      }



    }
  }, [])

  //emailHandler
  const emailHandler = () => {
    const token = localStorage.getItem("token");
    // downloadTableViaEmail


    if (token) {
      var myHeaders = new Headers();
      myHeaders.append("x-api-key", XAPIKEY);
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "test": "test"
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      //API to get the details of Table
      fetch(`${SERVER_URL}downloadTableViaEmail`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }

  // making dates short
  const dateConstructor = (timeStamp) => {
    if (timeStamp) {
      // return JSON.stringify(data).slice(1, 25)
      var date = JSON.stringify(new Date(timeStamp))
      console.log(date)
      const day = date.slice(9, 11);
      const month = date.slice(6, 8);
      const year = date.slice(1, 5);
      const customDate = `${day}/${month}/${year}`;
      const customTime = date.slice(12, 17)

      // const currentDate=customDate.splice
      return { customDate, customTime };
    }
  };

  //Function to Uplaod a signature
  function fileInputChangeHandler(e) {

    const imgFile = e.target.files[0];

    if (imgFile) {
      setImageFile(imgFile)
      const reader = new FileReader();
      reader.readAsDataURL(imgFile)
      reader.onload = e => { setImagePreview(e.target.result) }
      reader.onerror = err => setImagePreview('')
    } else {
      setImagePreview('')
    }
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: `${pageTitle}` + "_report",
    content: () => componentRef.current,
    onBeforePrint: () => { table.current.style.maxHeight = 'unset'; },
    onAfterPrint: () => setKeepInput(true)
  });

  return (
    <>
      <div className={classes.mainContainer} ref={componentRef} style={{ width: "100%" }}>
        {show && <Header icon={true} />}
        <div className={classes.container}>
          <div className={classes.untitle}>
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              onBlur={() => setIsEditEnable(false)}
              disabled={!isEditEnable}
              ref={titleInput}
              style={{
                padding: "5px 10px", border: "none",
                width: `${pageTitle.length * 14 + 10}px`,
                color: "#313131", fontFamily: "sora",
                fontWeight: "700", background: "transparent"
              }}
            />
            <MdOutlineModeEdit onClick={() => {
              setIsEditEnable(true);
              setTimeout(() => {
                titleInput.current.focus();
                titleInput.current.select()
              }, 100)
            }} className={classes.editIcon} />
          </div>
          <div className={classes.download} onClick={() => { setKeepInput(false); handlePrint() }}>
            Download
          </div>
          <div className={classes.email} > {/*onClick={() => emailHandler()}*/}
            {/* <EmailShareButton
            body="This is the system generated mail from aivara"
              url= " https://dashboard.aivara.in"
              
              subject="Aivara report">
                Email</EmailShareButton> */}
          </div>
          <div onClick={closeBtnHanlder} className={classes.closeIcon}>
            <AiOutlineClose />
          </div>
        </div>
        <div className={classes.nameContainer}>
          <div className={classes.name}>
            Name of the company :{" "}
            <p className={classes.subName}>{reportTableData.clientName}</p>
          </div>
          <div className={classes.name}>
            Technician:{" "}
            <p className={`${classes.subName} `}>
              {reportTableData.generatedBy}
            </p>
          </div>
          <div className={classes.name}>
            Timestamp:
            <p className={`${classes.subName} ${classes.leftSubName}`}>
              {reportTableData.customTimeStamp && dateConstructor(reportTableData.customTimeStamp).customDate}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {reportTableData.customTimeStamp && dateConstructor(reportTableData.customTimeStamp).customTime}

            </p>
          </div>
        </div>

        <div ref={table} className={classes.table}>
          <Table bordered className={classes.tableBody}>
            <thead>
              <tr className={classes.tableHeading}>
                <th><span>Site Code</span></th>
                <th>Geographical Location</th>
                <th>Taxa Details</th>
                <th>Count of Images</th>
                <th>Count of taxa</th>
                <th><span>Relative Abundance</span></th>
              </tr>
            </thead>
            <tbody className={classes.tbody}>{tableData}</tbody>
          </Table>
        </div>
        <div className={classes.footer}>
          <div className={classes.signature}>
            <p className={classes.txtCenter}>
              <label htmlFor="uploadSignatureInput">
                {imagePreview && (
                  <img
                    style={{ height: "50px", width: "auto" }}
                    src={imagePreview}
                  />
                )}
                {!imagePreview && <BsUpload className={classes.uploadIcon} />}
                {!imagePreview && " Your Signature"}
              </label>
              {keepInput && <input onChange={fileInputChangeHandler}
                type="file" accept="image/jgp, image/jpeg"
                id="uploadSignatureInput" style={{ display: 'none' }} />}
            </p>
          </div>
          <div className={classes.footerTxt}>generated using technique</div>
        </div>
        <div className={classes.last}>Designation of who signed, date</div>
      </div>
    </>
  );
};
export default Untitle;

//* sample report

// [
//   {
//       "objects_count": {
//           "aulacoseira granulata": 2
//       },
//       "imageId": "24bb1541-0ec5-4d6c-9e49-55402625d751",
//       "objects_confidence": [
//           {
//               "cordinates": {
//                   "h": 259,
//                   "x": 186,
//                   "y": 116,
//                   "w": 210
//               },
//               "detect": "aulacoseira granulata",
//               "value": 0.999997
//           },
//           {
//               "cordinates": {
//                   "h": 234,
//                   "x": 66,
//                   "y": 206,
//                   "w": 169
//               },
//               "detect": "aulacoseira granulata",
//               "value": 0.999997
//           }
//       ],
//       "url": "https://aivara-report-image.s3.ap-south-1.amazonaws.com/0216-08-2022/Aulacoseira%20granulata%20152.jpg"
//   },
//   {
//       "objects_count": {
//           "aulacoseira granulata": 1
//       },
//       "imageId": "24bb1541-0ec5-4d6c-9e49-55402625d751",
//       "objects_confidence": [
//           {
//               "cordinates": {
//                   "h": 319,
//                   "x": 200,
//                   "y": 173,
//                   "w": 226
//               },
//               "detect": "aulacoseira granulata",
//               "value": 0.999983
//           }
//       ],
//       "url": "https://aivara-report-image.s3.ap-south-1.amazonaws.com/0216-08-2022/Aulacoseira%20granulata%20152.jpg"
//   },
//   {
//       "objects_count": {
//           "nitzschia palea": 1,
//           "aulacoseira granulata": 1
//       },
//       "imageId": "24bb1541-0ec5-4d6c-9e49-55402625d751",
//       "objects_confidence": [
//           {
//               "cordinates": {
//                   "h": 273,
//                   "x": 216,
//                   "y": 125,
//                   "w": 252
//               },
//               "detect": "aulacoseira granulata",
//               "value": 1
//           },
//           {
//               "cordinates": {
//                   "h": 256,
//                   "x": 284,
//                   "y": 195,
//                   "w": 403
//               },
//               "detect": "aulacoseira granulata",
//               "value": 1
//           }
//       ],
//       "url": "https://aivara-report-image.s3.ap-south-1.amazonaws.com/0216-08-2022/Aulacoseira%20granulata%20152.jpg"
//   },
//   {
//       "objects_count": {
//           "gomphonema parvulum": 1,
//           "aulacoseira granulata": 1
//       },
//       "imageId": "24bb1541-0ec5-4d6c-9e49-55402625d751",
//       "objects_confidence": [
//           {
//               "cordinates": {
//                   "h": 285,
//                   "x": 94,
//                   "y": 116,
//                   "w": 146
//               },
//               "detect": "gomphonema parvulum",
//               "value": 0.999382
//           },
//           {
//               "cordinates": {
//                   "h": 271,
//                   "x": 147,
//                   "y": 162,
//                   "w": 195
//               },
//               "detect": "gomphonema parvulum",
//               "value": 0.999382
//           }
//       ],
//       "url": "https://aivara-report-image.s3.ap-south-1.amazonaws.com/0216-08-2022/Aulacoseira%20granulata%20152.jpg"
//   }
// ]