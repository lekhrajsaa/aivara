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


//Routes to Home 
  function closeBtnHanlder() {
    router.push('/home')
  }

  useEffect(() => {
    if (reportTableData && reportTableData.reportId) {
      console.log(reportTableData);

      const { siteCode, geoLocation, report } = reportTableData;

      const latitude = geoLocation.latitude;
      const longitude = geoLocation.longitude;

      if (report) {
        const reportList = report.map(item => {

          let Taxa_Details = "-";
          let Count_of_Images = 0;
          let Count_of_taxa = 0;
          let Relative_Abundance = "-";
          let GeoLocation = latitude + " " + longitude;

          if (item.objects_confidence.length > 0) {
            Taxa_Details = Object.keys(item.objects_confidence[0])[0];

            let temp = report.map(rep => {

              if (rep.objects_confidence.length > 0 && Object.keys(rep.objects_confidence[0])[0] == Taxa_Details) {
                Count_of_Images++; //increasing by 1 when the texa is matched
                Count_of_taxa = Count_of_taxa + rep.objects_count; //summing the object count when the texa is matched 
                return true;
              }
            });

            console.log(temp, "oooop")
          }

          return (
            <tr>
              <td>{siteCode}</td>
              <td>{GeoLocation}</td>
              <td>{Taxa_Details}</td>
              <td>{Count_of_Images}</td>
              <td>{Count_of_taxa}</td>
              <td>{Relative_Abundance}</td>
            </tr>
          )
        })

        settableData(reportList)

        console.log(reportList)
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
    documentTitle:`${pageTitle}`+ "_report",
    content: () => componentRef.current,
    onBeforePrint: () => {table.current.style.maxHeight = 'unset';},
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