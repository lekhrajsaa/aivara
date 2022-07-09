import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import classes from "./Untitle.module.css";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const XAPIKEY = process.env.NEXT_PUBLIC_XAPI;
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_API;

const Untitle = () => {
  const reportTableData = useSelector((state) => state.userdata.reportTableData);

  const [tableData, settableData] = useState([])

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
              // console.log(rep, "test")

              if(rep.objects_confidence.length > 0 && Object.keys(rep.objects_confidence[0])[0] == Taxa_Details) {
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

      fetch(`${SERVER_URL}downloadTableViaEmail`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }

  // making dates short
  const dateConstractor = (data) => {
    if (data) {
      return JSON.stringify(data).slice(1, 25)
    }
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.untitle}>
          Untitled <MdOutlineModeEdit className={classes.editIcon} />
        </div>
        <div className={classes.download}>Download</div>
        <div
          className={classes.email}
          onClick={() => emailHandler()}
        >
          Email
        </div>
        <div className={classes.closeIcon}>
          <AiOutlineClose />
        </div>
      </div>
      <div className={classes.nameContainer}>
        <div className={classes.name}>
          Name of the company : <p className={classes.subName}>{reportTableData.clientName}</p>
        </div>
        <div className={classes.name}>
          Technician: <p className={`${classes.subName} `}>{reportTableData.generatedBy}</p>
        </div>
        <div className={classes.name}>
          Timestamp:<p className={`${classes.subName} ${classes.leftSubName}`}>{dateConstractor(reportTableData.customTimeStamp)}</p>
        </div>
      </div>

      <div className={classes.table} >
        <Table bordered className={classes.tableBody}>
          <thead >
            <tr className={classes.tableHeading}>
              <th>Site Code</th>
              <th>Geographical Location</th>
              <th>Taxa Details</th>
              <th>Count of Images</th>
              <th>Count of taxa</th>
              <th>Relative Abundance</th>
            </tr>
          </thead>
          <tbody className={classes.tbody} >
            {tableData}
          </tbody>
        </Table>
      </div>
      <div className={classes.footer}>
        <div className={classes.signature}>
          <p className={classes.txtCenter}>
            <BsUpload className={classes.uploadIcon} /> Your Signature{" "}
          </p>
        </div>
        <div className={classes.footerTxt}>generated using technique</div>
      </div>
      <div className={classes.last}>Designation of who signed, date</div>
    </>
  );
};
export default Untitle;
